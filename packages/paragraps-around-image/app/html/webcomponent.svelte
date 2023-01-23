<svelte:options tag="hb-paragraps-around-image" />

<script lang="ts">
	import { get_current_component, onDestroy, onMount } from "svelte/internal";

	import { createEventDispatcher } from "svelte";
	import parseStyle from "style-to-object";
	import { addComponent, getChildStyleToPass } from "@htmlbricks/hb-jsutils/main";
	import type { Component } from "@app/types/webcomponent.type";
	import Cell from "@app/html/cell.svelte";

	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();

	function dispatch(name: string, detail: any) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}

	export let id: string;
	export let style: string;
	export let img: string;

	export let paragraphs: Component["paragraphs"];

	let parsedStyle: { [x: string]: string };
	//  let componentStyleToSet: string = "";

	$: {
		if (!id) id = "";
		if (!img) img = "";
		if (style) {
			parsedStyle = parseStyle(style);
			// componentStyleToSet = getChildStyleToPass(parsedStyle, componentStyleSetup?.vars);
		}
		if (typeof paragraphs === "string") {
			try {
				paragraphs = JSON.parse(paragraphs);
			} catch (err) {
				console.error("error parsing paragraphs", err);
			}
		}
	}
	function paragraphClick(el) {
		dispatch("paragraphPressed", el.detail);
	}
</script>

<svelte:head>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@latest/font/bootstrap-icons.css" />
</svelte:head>
{#if paragraphs?.length && img}
	<div id="container">
		<div class="col" id="left">
			{#if paragraphs[0]}
				<Cell on:paragraphPressed={(el) => paragraphClick(el)} paragraph={paragraphs[0]} max_lines="8" />
			{/if}
			{#if paragraphs[2]}
				<Cell on:paragraphPressed={(el) => paragraphClick(el)} paragraph={paragraphs[2]} max_lines="8" />
			{/if}
			{#if paragraphs[4]}
				<Cell on:paragraphPressed={(el) => paragraphClick(el)} paragraph={paragraphs[4]} max_lines="8" />
			{/if}
		</div>
		<div class="col" id="center">
			<img id="center_image" src={img} alt="" />
		</div>
		<div class="col" id="right">
			{#if paragraphs[1]}
				<Cell on:paragraphPressed={(el) => paragraphClick(el)} paragraph={paragraphs[1]} max_lines="8" />
			{/if}
			{#if paragraphs[3]}
				<Cell on:paragraphPressed={(el) => paragraphClick(el)} paragraph={paragraphs[3]} max_lines="8" />
			{/if}
			{#if paragraphs[5]}
				<Cell on:paragraphPressed={(el) => paragraphClick(el)} paragraph={paragraphs[5]} max_lines="8" />
			{/if}
		</div>
	</div>
{/if}

<style lang="scss">
	@import "../styles/webcomponent.scss";
	// @import "../styles/bootstrap.scss";
</style>
