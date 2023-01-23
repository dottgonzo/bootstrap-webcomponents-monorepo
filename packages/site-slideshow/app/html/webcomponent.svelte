<svelte:options tag="hb-site-slideshow" />

<script lang="ts">
	import { afterUpdate, beforeUpdate, get_current_component, onDestroy, onMount } from "svelte/internal";

	import { createEventDispatcher } from "svelte";
	import parseStyle from "style-to-object";
	import { addComponent, getChildStyleToPass } from "@htmlbricks/hb-jsutils/main";
	import type { Component, IData } from "../types/webcomponent.type";

	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();

	function dispatch(name: string, detail: any) {
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
	let overlayed = $$slots.overlay ? true : false;
	$: {
		if (!id) id = "";
		if (style) {
			parsedStyle = parseStyle(style);
			// componentStyleToSet = getChildStyleToPass(parsedStyle, componentStyleSetup?.vars);
		}
		overlayed = $$slots.overlay ? true : false;
		console.log(overlayed, "overlayed");
		if (typeof data === "string") data = JSON.parse(data);
		if (data?.length) {
			data = data.filter((f) => f?.href);
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
	// beforeUpdate(() => {
	// 	console.log($$slots.overlay, "beforeUpdate");
	// 	overlayed = $$slots.overlay ? true : false;
	// });
	onMount(() => {
		// overlayed = $$slots.overlay ? true : false;
		// console.log($$slots.overlay, "after");

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
	{#if !overlayed || !mouseentered}
		<div id="cover_on_images" part="cover_on_images"><slot name="cover_on_images" /></div>
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
			<div id="content">
				<!-- Full-width images with number and caption text -->
				{#each data as slide (slide.index + slide.href)}
					<div class="mySlides fade" style={slide.index === index ? "display:block;" : "display:none;"}>
						<!-- <div part="number" class="numbertext">{slide.index + 1} / {data.length}</div> -->
						<img alt="" src={slide.href} />
						<!-- {#if slide.caption}<div part="caption" class="text">{slide.caption}</div>{/if} -->
					</div>
				{/each}

				<!-- Next and previous buttons -->
				<span class="prev" on:click={() => plusSlides(-1)}><slot name="prev">&#10094;</slot></span>
				<span class="next" on:click={() => plusSlides(1)}><slot name="next">&#10095;</slot></span>
			</div>
		</div>
		<!-- The dots/circles -->
		<div id="dots" part="dots" style={data.find((f) => f.caption) ? "bottom: 100px;" : ""}>
			<slot name="dots">
				{#each data as slide (slide.index)}
					<span part="dot" style={slide.index === index ? "background-color: #717171;" : ""} class="dot" on:click={() => currentSlide(slide.index)} />
				{/each}
			</slot>
		</div>
		{#if data?.[index]?.caption}
			<div part="caption_container" id="caption">
				<div part="caption_content" class="text">
					{data[index].caption}
				</div>
			</div>
		{/if}
	{:else}
		<div
			id="overlay"
			on:mouseenter={() => {
				mouseentered = true;
				// dispatch("onHover", { index, hover: mouseentered });
			}}
			on:mouseleave={() => {
				mouseentered = false;

				dispatch("onHover", { index, hover: mouseentered });
			}}
		>
			<slot name="overlay">overlay</slot>
		</div>
	{/if}
{:else}
	no image provided as data
{/if}

<style lang="scss">
	@import "../styles/webcomponent.scss";
	// @import "../styles/bootstrap.scss";
</style>
