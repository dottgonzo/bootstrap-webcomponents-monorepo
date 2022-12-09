<svelte:options tag="hb-stylus-notebook" />

<script lang="ts">
	import { get_current_component, onDestroy, onMount } from "svelte/internal";
	import pkg from "../../package.json";

	import { createEventDispatcher } from "svelte";
	import parseStyle from "style-to-object";
	import { addComponent, getChildStyleToPass } from "@htmlbricks/hb-jsutils/main";
	import type { Component } from "@app/types/webcomponent.type";
	import { styleSetup as stylusPaperSetup } from "../../node_modules/@htmlbricks/hb-stylus-paper/release/docs";

	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();

	function dispatch(name, detail) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}

	export let id: string;
	export let style: string;

	export let string: string;
	export let json: Component["json"];
	export let boolean: boolean;

	let parsedStyle: { [x: string]: string };
	let stylusPaperStyleToSet: string = "";

	$: {
		if (!id) id = "";
		if (style) {
			parsedStyle = parseStyle(style);
			stylusPaperStyleToSet = getChildStyleToPass(parsedStyle, stylusPaperSetup?.vars);
		}
		if (!string) string = "";

		// json
		if (typeof json === "string") {
			try {
				json = JSON.parse(json);
			} catch (err) {
				console.error("error parsing json", err);
			}
		}
		// boolean
		if (boolean === ("" as unknown)) boolean = true;
		if (typeof boolean === "string") boolean = boolean === "no" || boolean === "false" ? false : true;
		if (!boolean) boolean = false;
	}
	addComponent({ repoName: "@htmlbricks/hb-stylus-paper", version: pkg.version });

	onMount(() => {
		console.log(component.shadowRoot.getElementById("skeletontest"));
	});

	function dispatchCustomEvent() {
		dispatch("event", { test: true });
	}
</script>

<div part="testpart" on:click={() => dispatchCustomEvent()} id="skeletontest">{string}</div>
{#if json && typeof json === "object"}<div>
		{#each Object.keys(json) as l} <span>{l}: {json[l]}</span>{/each}
	</div>{/if}
<div part="testpart">{boolean}</div>
slot: <slot name="skelcontent" /> /endslot<br />
slot debug: {Object.keys($$slots)[0]}/endslot

<stylus-paper id="stylus-paper" {style} />

<style lang="scss">
	@import "../styles/webcomponent.scss";
	@import "../styles/bootstrap.scss";
</style>
