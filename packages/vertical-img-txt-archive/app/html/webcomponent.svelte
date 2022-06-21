<svelte:options tag="hb-vertical-img-txt-archive" />

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
	export let size: number;
	export let collection: Component["collection"];
	let innerWidth: number;
	let vsize: number;
	let parsedStyle: { [x: string]: string };
	//  let componentStyleToSet: string = "";

	$: {
		if (!innerWidth) innerWidth = 0;

		if (!id) id = "";
		if (style) {
			parsedStyle = parseStyle(style);
			// componentStyleToSet = getChildStyleToPass(parsedStyle, componentStyleSetup?.vars);
		}
		if (typeof collection === "string") {
			try {
				collection = JSON.parse(collection);
			} catch (err) {
				console.error("error parsing collection", err);
			}
		}
		let i = 0;
		if (collection?.length)
			collection.forEach((item) => {
				item.index = i++;
			});
		if (size) {
			if (typeof size === "string") size = Number(size);
			vsize = size;
		} else if (collection) {
			const n = Math.round(innerWidth / 250);
			vsize = n < collection.length ? n : collection.length;
		} else {
			vsize = 5;
		}
	}

	function dispatchCustomEvent() {
		dispatch("event", { test: true });
	}
</script>

<svelte:window bind:innerWidth />
{#if collection?.length}
	<div id="collection_container" part="container" style="grid-template-columns: repeat({vsize || 5}, auto)">
		{#each collection as item (item.index)}
			<div class="collection_item" part="item">
				<div class="collection_item_image">
					<img part="image" src={item.image} alt={item.title} />
				</div>
				<div class="collection_item_text">
					<h3 part="title">{item.title}</h3>
					<p part="text">{item.text}</p>
				</div>
			</div>
		{/each}
	</div>
{/if}

<style lang="scss">
	@import "../styles/webcomponent.scss";
	// @import "../styles/bootstrap.scss";
</style>
