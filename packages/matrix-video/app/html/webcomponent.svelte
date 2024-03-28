<svelte:options tag="hb-matrix-video" />

<script lang="ts">
	import { get_current_component, onDestroy, onMount } from "svelte/internal";
	import pkg from "../../package.json";
	import debounce from "debounce";

	import { createEventDispatcher } from "svelte";
	import parseStyle from "style-to-object";
	import { addComponent, getChildStyleToPass } from "wc-js-utils/main";
	import type { Component } from "@app/types/webcomponent.type";
	import { styleSetup as playerLiveStyleSetup } from "@htmlbricks/hb-player-live/release/docs";

	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();

	function dispatch(name: string, detail: any) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}

	export let id: string;
	export let style: string;

	export let items: Component["items"];

	let parsedStyle: { [x: string]: string };
	let playerLiveStyleToSet: string = "";

	let h: number;
	let w: number;
	let o: "landscape" | "portrait";

	let rows: number;
	let cols: number;
	let videoSelectedId: string | undefined;

	let drawItems: { row: number; items: Component["items"] }[] = [];

	function setRowsAndCols() {
		if (w && h && o) {
			// Calculate the optimal number of rows and columns for the given items
			// (only works for 1 or 2 items at the moment
			const videoAspectRatio = 16 / 9;
			const containerAspectRatio = w / h;
			let optimalRows: number;
			let optimalCols: number;
			if (items.length === 1) {
				optimalRows = 1;
				optimalCols = 1;
			} else if (w < 450) {
				optimalCols = 1;
				optimalRows = items.length;
			} else if (items.length === 2) {
				if (containerAspectRatio > videoAspectRatio) {
					// Window is wider than the video aspect ratio (landscape orientation)
					optimalRows = 1;
					optimalCols = 2;
				} else {
					// Window is taller than the video aspect ratio (portrait orientation)
					optimalRows = 2;
					optimalCols = 1;
				}
			} else {
				// Calculate for both landscape and portrait orientations
				if (containerAspectRatio > videoAspectRatio) {
					// Window is wider than the video aspect ratio (landscape orientation)
					let minDiff = Infinity;

					for (let rows = 1; rows <= items.length; rows++) {
						const cols = Math.ceil(items.length / rows);
						const totalWidth = (h / rows) * videoAspectRatio * cols;

						if (totalWidth <= w) {
							const diff = w - totalWidth;
							if (diff < minDiff) {
								minDiff = diff;
								optimalRows = rows;
								optimalCols = cols;
							}
						}
					}
				} else {
					// Window is taller than the video aspect ratio (portrait orientation)
					let minDiff = Infinity;

					for (let cols = 1; cols <= items.length; cols++) {
						const rows = Math.ceil(items.length / cols);
						const totalHeight = (w / cols / videoAspectRatio) * rows;

						if (totalHeight <= h) {
							const diff = h - totalHeight;
							if (diff < minDiff) {
								minDiff = diff;
								optimalCols = cols;
								optimalRows = rows;
							}
						}
					}
				}
			}
			rows = optimalRows;
			cols = optimalCols;
			if (rows && cols) {
				const newDrawItems: { row: number; items: Component["items"] }[] = [];
				for (let i = 0; i < rows; i++) {
					for (let j = 0; j < cols; j++) {
						const item = items[i * cols + j];
						if (item) {
							if (!newDrawItems[i]) {
								newDrawItems[i] = { row: i, items: [] };
							}
							newDrawItems[i].items[j] = item;
						}
					}
				}
				drawItems = newDrawItems;
				console.log(drawItems, rows, cols, "drawItems");
			}
		}
	}
	function setSize() {
		if (window.innerWidth && window.innerHeight) {
			const htmlContainer: HTMLElement = component?.shadowRoot?.getElementById("matrix");

			if (htmlContainer?.style) {
				h = window.innerHeight - component?.shadowRoot?.getElementById("matrix")?.offsetTop;
				w = Number(htmlContainer.clientWidth);
				o = w > h ? "landscape" : "portrait";

				htmlContainer.style.height = h + "px";
				console.log(`setSize w:${w} h:${h}`);
				setRowsAndCols();
			}
		}

		//
	}

	$: {
		if (!id) id = "";
		if (style) {
			parsedStyle = parseStyle(style);
			playerLiveStyleToSet = getChildStyleToPass(parsedStyle, playerLiveStyleSetup?.vars);
		}

		// json
		if (typeof items === "string") {
			try {
				items = JSON.parse(items);
				setRowsAndCols();
			} catch (err) {
				console.error("error parsing items", err);
			}
		}
	}
	addComponent({ repoName: "@htmlbricks/hb-player-live", version: pkg.version });

	onMount(() => {
		setSize();
	});

	function hoverItem(id?: string) {
		videoSelectedId = id;
		dispatch("hoverItem", { id, selected: videoSelectedId ? true : false });
	}
	function dispatchClickSelected() {
		if (videoSelectedId) dispatch("clickItem", { id: videoSelectedId });
		else console.info("No video selected");
	}

	function iframeFix(e: any) {
		const iframe: HTMLIFrameElement = e;
		try {
			iframe.contentWindow?.document.addEventListener("click", () => {
				dispatchClickSelected();
			});
		} catch (err) {
			console.warn("error adding click event to iframe", err);
		}
	}
</script>

<svelte:window on:resize={debounce(setSize, 200)} />

<!-- <div id="cssonly">
	{#if items && typeof items === "object"}
		{#each items as i (i.id)}
			<div class="player" on:mouseleave={(e) => selectItem()} on:mouseenter={(e) => selectItem(i.id)} id="select_{i.id}">
				{#if i.type === "iframe"}
					<iframe title={i.title} src={i.uri}></iframe>
				{/if}
			</div>
		{/each}
	{/if}
</div> -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div id="matrix">
	{#if items && typeof items === "object"}
		{#each drawItems as row (row.row)}
			<div class="row">
				{#each row.items as i (i.id)}
					<div
						class="col"
						style="padding-right:0px;padding-left:0px;--bs-gutter-x: 0px;"
						on:mouseleave={(e) => hoverItem()}
						on:mouseenter={(e) => hoverItem(i.id)}
						id="select_{i.id}"
					>
						{#if i.type === "iframe"}
							<iframe title={i.title} src={i.uri} on:load={(e) => iframeFix(e.target)}></iframe>
						{:else if i.type === "video"}
							<!-- svelte-ignore a11y-media-has-caption -->
							<video controls>
								<source title={i.title} src={i.uri} type="video/mp4" />
								Your browser does not support the video tag.
							</video>
						{/if}
					</div>
				{/each}
			</div>
		{/each}
	{/if}
</div>

<style lang="scss">
	@import "../styles/webcomponent.scss";
	@import "../styles/bootstrap.scss";
</style>
