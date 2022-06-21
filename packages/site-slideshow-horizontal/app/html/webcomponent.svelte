<svelte:options tag="hb-site-slideshow-horizontal" />

<script lang="ts">
	import { get_current_component, onDestroy, onMount } from "svelte/internal";

	import { createEventDispatcher } from "svelte";
	import parseStyle from "style-to-object";
	import { addComponent, getChildStyleToPass } from "@htmlbricks/hb-jsutils/main";
	import type { Component } from "@app/types/webcomponent.type";

	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();

	function dispatch(name, detail) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}

	export let id: string;
	export let style: string;
	export let data: Component["data"];

	let parsedStyle: { [x: string]: string };
	//  let componentStyleToSet: string = "";
	let slide: number;
	let chunks: Component["data"];
	function chunkData(array: Component["data"], chunkSize: number) {
		const chunks: Component["data"][] = [];
		for (let i = 0; i < array.length; i += chunkSize) {
			const chunk = array.slice(i, i + chunkSize);
			chunks.push(chunk);
			// do whatever
		}
		return chunks;
	}
	$: {
		if (!slide) slide = 0;
		if (!id) id = "";
		if (style) {
			parsedStyle = parseStyle(style);
			// componentStyleToSet = getChildStyleToPass(parsedStyle, componentStyleSetup?.vars);
		}
		if (typeof data === "string") {
			try {
				data = JSON.parse(data);
			} catch (err) {
				console.error("error parsing data", err);
			}
		}
		if (data) {
			let i = 0;
			data = data.filter((f) => f.href).sort((a, b) => a.index - b.index);
			data.forEach((item) => {
				item.index = i++;
			});
			if (slide >= 0) {
				if (slide === data.length) slide = 0;

				chunks = data.slice(slide, slide + 5);
				if (chunks.length < 5 && data.length > 5) {
					chunks = chunks.concat(data.slice(0, 5 - chunks.length));
				}
			} else if (slide < 0) {
				if (slide > -5) {
					chunks = data.slice(slide);
					console.log(slide, chunks);

					chunks = chunks.concat(data.slice(0, slide + 5));
					console.log(slide, chunks, slide);
				} else if (slide > data.length * -1) {
					chunks = data.slice(slide).slice(0, 5);
				} else {
					slide = 0;
					chunks = data.slice(0, 5);
				}
			}
		}
	}
	function setSlides(n: number) {
		slide = n;
	}
</script>

{#if chunks?.length}
	<div class="wrapper">
		<section id="section1">
			<!-- svelte-ignore a11y-invalid-attribute -->
			<a
				on:click={() => {
					setSlides(slide - 1);
				}}
				href={null}
				class="arrow__btn">‹</a
			>
			{#each chunks as item (item.index)}
				<div class="item">
					<img src={item.href} alt={item.caption} />
				</div>
			{/each}
			<!-- svelte-ignore a11y-invalid-attribute -->

			<a
				on:click={() => {
					setSlides(slide + 1);
				}}
				href={null}
				class="arrow__btn">›</a
			>
		</section>
	</div>

	<!-- <div id="container">
		{#each data as item (item.index)}
			<img src={item.href} alt={item.caption} />
		{/each}
	</div> -->
{/if}

<style lang="scss">
	@import "../styles/webcomponent.scss";
	// @import "../styles/bootstrap.scss";
</style>
