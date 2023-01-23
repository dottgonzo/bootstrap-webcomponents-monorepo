<svelte:options tag="hb-site-slideshow-horizontal" />

<script lang="ts">
	import { get_current_component, onDestroy, onMount } from "svelte/internal";

	import { createEventDispatcher } from "svelte";
	import parseStyle from "style-to-object";
	import { addComponent, getChildStyleToPass } from "@htmlbricks/hb-jsutils/main";
	import type { Component } from "@app/types/webcomponent.type";

	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();

	function dispatch(name: string, detail: any) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}

	export let id: string;
	export let style: string;
	export let data: Component["data"];
	export let slide: number;
	export let type: Component["type"];
	export let size: number;

	let parsedStyle: { [x: string]: string };
	//  let componentStyleToSet: string = "";
	let chunks: Component["data"];
	let innerWidth: number;
	let vsize: number;
	$: {
		if (!innerWidth) innerWidth = 0;
		if (size) vsize = size;
		else vsize = Math.round(innerWidth / 250);
		if (!slide) slide = 0;
		if (typeof slide === "string") slide = Number(slide);
		if (type !== "videos") type = "images";
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

				chunks = data.slice(slide, slide + vsize);
				if (chunks.length < vsize && data.length > vsize) {
					chunks = chunks.concat(data.slice(0, vsize - chunks.length));
				}
			} else if (slide < 0) {
				if (slide > -vsize) {
					chunks = data.slice(slide);
					chunks = chunks.concat(data.slice(0, slide + vsize));
				} else if (slide > data.length * -1) {
					chunks = data.slice(slide).slice(0, vsize);
				} else {
					slide = 0;
					chunks = data.slice(0, vsize);
				}
			}
		}
	}
	function setSlides(n: number) {
		slide = n;
	}
</script>

<svelte:window bind:innerWidth />
{#if chunks?.length}
	<div class="wrapper">
		<section style="grid-template-columns: repeat({vsize}, auto);">
			<!-- svelte-ignore a11y-invalid-attribute -->
			<a
				on:click={() => {
					setSlides(slide - 1);
				}}
				href={null}
				class="arrow__btn"><div>‹</div></a
			>
			{#each chunks as item (item.index)}
				{#if item.externalLink}
					<div on:click={() => window.open(item.externalLink, "_blank")} class="item">
						<img src={item.href} alt={item.caption} />
						{#if type === "videos"}
							<div class="play">
								<div class="play_container"><div class="play_symbol">▶</div></div>
							</div>
							<div class="video_sub">
								<div class="video_sub_title" part="video_sub_title">{item.caption}</div>
								{#if item.duration}<div class="video_sub_time" part="video_sub_time">{item.duration}</div>{/if}
							</div>
						{:else if item.caption}
							<div class="caption"><div class="caption_content" part="caption_content">{item.caption}</div></div>
						{/if}
					</div>
				{:else if item.link}
					<div on:click={() => (window.location.href = item.link)} class="item">
						<img src={item.href} alt={item.caption} />
						{#if type === "videos"}
							<div class="play">
								<div class="play_container"><div class="play_symbol">▶</div></div>
							</div>
							<div class="video_sub">
								<div class="video_sub_title" part="video_sub_title">{item.caption}</div>
								{#if item.duration}<div class="video_sub_time" part="video_sub_time">{item.duration}</div>{/if}
							</div>
						{:else if item.caption}
							<div class="caption"><div class="caption_content" part="caption_content">{item.caption}</div></div>
						{/if}
					</div>
				{:else if item.key}
					<div on:click={() => dispatch("slideClick", { key: item.key })} class="item">
						<img src={item.href} alt={item.caption} />
						{#if type === "videos"}
							<div class="play">
								<div class="play_container"><div class="play_symbol">▶</div></div>
							</div>
							<div class="video_sub">
								<div class="video_sub_title" part="video_sub_title">{item.caption}</div>
								{#if item.duration}<div class="video_sub_time" part="video_sub_time">{item.duration}</div>{/if}
							</div>
						{:else if item.caption}
							<div class="caption"><div class="caption_content" part="caption_content">{item.caption}</div></div>
						{/if}
					</div>
				{:else}
					<div class="item">
						<img src={item.href} alt={item.caption} />
						{#if type === "videos"}
							<div class="play">
								<div class="play_container"><div class="play_symbol">▶</div></div>
							</div>
							<div class="video_sub">
								<div class="video_sub_title" part="video_sub_title">{item.caption}</div>
								{#if item.duration}<div class="video_sub_time" part="video_sub_time">{item.duration}</div>{/if}
							</div>
						{:else if item.caption}
							<div class="caption"><div class="caption_content" part="caption_content">{item.caption}</div></div>
						{/if}
					</div>
				{/if}
			{/each}
			<!-- svelte-ignore a11y-invalid-attribute -->

			<a
				on:click={() => {
					setSlides(slide + 1);
				}}
				href={null}
				class="arrow__btn"><div>›</div></a
			>
		</section>
	</div>
	<!-- <div class="mobile_wrapper">mob</div> -->
{/if}

<style lang="scss">
	@import "../styles/webcomponent.scss";
	// @import "../styles/bootstrap.scss";
</style>
