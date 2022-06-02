<svelte:options tag="hb-site-paragraph-with-image" />

<script lang="ts">
	import { get_current_component, onDestroy, onMount } from "svelte/internal";

	import { createEventDispatcher } from "svelte";
	import parseStyle from "style-to-object";
	import { addComponent, getChildStyleToPass } from "@htmlbricks/hb-jsutils/main";

	// import { styleSetup as componentStyleSetup } from "../../node_modules/@htmlbricks/hb-skel-component/release/docs";

	import type { Component } from "../types/webcomponent.type";

	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();

	function dispatch(name, detail) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}

	export let id: string;
	export let style: string;

	export let img: Component["img"];
	export let text: Component["text"];

	let parsedStyle: { [x: string]: string };
	//  let componentStyleToSet: string = "";

	$: {
		if (!id) id = "";
		if (style) {
			parsedStyle = parseStyle(style);
			// componentStyleToSet = getChildStyleToPass(parsedStyle, componentStyleSetup?.vars);
		}
		if (!img) img = null;
		else if (typeof img === "string") img = JSON.parse(img);
		if (!text) text = null;
		else if (typeof text === "string") text = JSON.parse(text);
	}

	function dispatchClick() {
		dispatch("elClick", { key: text.link.key });
	}
</script>

<div id="row_container">
	<div id="image_container">
		{#if img?.src}
			<div id="image_content">
				<img alt={img.alt} src={img.src} />
			</div>
		{:else}
			no img
		{/if}
	</div>
	<div id="text_container">
		{#if text?.body || text?.title}
			<div id="text_content">
				<h1>{text.title}</h1>
				<p>{text.body}</p>
				{#if text.link}
					<p>
						<button class="" on:click={dispatchClick} />
					</p>
				{/if}
			</div>
		{:else}
			no title or body
		{/if}
	</div>
</div>

<style lang="scss">
	@import "../styles/webcomponent.scss";
	@import "../styles/bootstrap.scss";
</style>
