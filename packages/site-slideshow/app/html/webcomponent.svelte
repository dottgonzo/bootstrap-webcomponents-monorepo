<svelte:options tag="hb-site-slideshow" />

<script lang="ts">
	import { get_current_component, onDestroy, onMount } from "svelte/internal";

	import { createEventDispatcher } from "svelte";
	import parseStyle from "style-to-object";
	import { addComponent, getChildStyleToPass } from "@htmlbricks/hb-jsutils/main";
	import type { Component, IData } from "../types/webcomponent.type";

	// import { styleSetup as componentStyleSetup } from "../../node_modules/@htmlbricks/hb-skel-component/release/docs";

	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();

	function dispatch(name, detail) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}

	export let id: string;
	export let style: string;

	export let data: Array<IData & { index: number }>;
	export let index: number;
	export let timer: number;

	let parsedStyle: { [x: string]: string };
	//  let componentStyleToSet: string = "";
	let lastTimer: number;
	let mouseentered: boolean;
	$: {
		if (!id) id = "";
		if (style) {
			parsedStyle = parseStyle(style);
			// componentStyleToSet = getChildStyleToPass(parsedStyle, componentStyleSetup?.vars);
		}

		if (typeof data === "string") data = JSON.parse(data);
		if (data?.length) {
			data = data.filter((f) => f.href);
			data.forEach((item, index) => {
				if (!item.index) item.index = index;
			});
		}
		if (typeof index === "string") index = Number(index);
		if (!index || index < 0 || index > data.length - 1) index = 0;
		if (typeof timer === "string") {
			timer = Number(timer) < 100 ? 100 : Number(timer);

			if (timerActive && lastTimer && lastTimer !== timer) {
				console.log("activate timer2", timer);

				clearInterval(timerActive);
				timerActive = setInterval(() => {
					if (mouseentered) return;

					console.log("debug timer");

					if (index + 1 > data.length - 1) {
						index = 0;
					} else {
						index++;
					}
					dispatch("changeSlide", { index });
				}, timer);
			}
		} else if (timer) {
			if (timer < 100) timer = 100;
			if (timerActive && lastTimer && lastTimer !== timer) {
				console.log("activate timer3", timer);

				clearInterval(timerActive);
				timerActive = setInterval(() => {
					if (mouseentered) return;

					console.log("debug timer");

					if (index + 1 > data.length - 1) {
						index = 0;
					} else {
						index++;
					}
					dispatch("changeSlide", { index });
				}, timer);
			}
		}
		lastTimer = timer;
	}
	if (!mouseentered) {
		mouseentered = false;
	}
	let timerActive: number;
	onMount(() => {
		if (timer && !timerActive) {
			console.log("activate timer", timer);
			timerActive = setInterval(() => {
				if (mouseentered) return;
				console.log("debug timer");
				if (index + 1 > data.length - 1) {
					index = 0;
				} else {
					index++;
				}
				dispatch("changeSlide", { index });
			}, timer);
		}
		return () => {
			if (timerActive) {
				clearInterval(timerActive);
				timerActive = undefined;
			}
		};
	});
	// onDestroy(() => {
	// 	console.log("DESTROYYYY");
	// 	clearInterval(timerActive);
	// });

	// Next/previous controls
	function plusSlides(n) {
		if (index + n > data.length - 1 || index + n < 0) {
			if (index + n > data.length - 1) {
				index = 0;
			} else {
				index = data.length - 1;
			}
		} else {
			index = index + n;
		}
		dispatch("changeSlide", { index });
	}

	// Thumbnail image controls
	function currentSlide(n) {
		if (!(index + n > data.length || index + n < 0)) {
			index = n;
			dispatch("changeSlide", { index });
		} else {
			console.warn("Slide index out of range");
		}
	}
</script>

<!-- Slideshow container -->
{#if data?.length}
	<div
		class="slideshow-container"
		on:mouseenter={() => {
			mouseentered = true;
			dispatch("onHover", { index, hover: mouseentered });
		}}
		on:mouseleave={() => {
			mouseentered = false;

			dispatch("onHover", { index, hover: mouseentered });
		}}
	>
		<!-- Full-width images with number and caption text -->
		{#each data as slide (slide.index + slide.href)}
			<div class="mySlides fade" style={slide.index === index ? "display:block;" : "display:none;"}>
				<!-- <div part="number" class="numbertext">{slide.index + 1} / {data.length}</div> -->
				<img alt="" src={slide.href} />
				<!-- {#if slide.caption}<div part="caption" class="text">{slide.caption}</div>{/if} -->
			</div>
		{/each}

		<!-- Next and previous buttons -->
		<span class="prev" on:click={() => plusSlides(-1)}>&#10094;</span>
		<span class="next" on:click={() => plusSlides(1)}>&#10095;</span>
	</div>
	<!-- The dots/circles -->
	<div id="footer">
		<div id="dots">
			{#each data as slide, i}
				<span part="dot" style={i === index ? "background-color: #717171;" : ""} class="dot" on:click={() => currentSlide(i)} />
			{/each}
		</div>
	</div>
	{#if data?.[index]?.caption}
		<div id="caption">
			<div part="caption" class="text">
				{data[index].caption}
			</div>
		</div>
	{/if}
{:else}
	no image provided as data
{/if}

<style lang="scss">
	@import "../styles/webcomponent.scss";
	// @import "../styles/bootstrap.scss";
</style>
