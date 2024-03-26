<svelte:options tag="hb-matrix-video" />

<script lang="ts">
	import { get_current_component, onDestroy, onMount } from "svelte/internal";
	import pkg from "../../package.json";

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
			} catch (err) {
				console.error("error parsing items", err);
			}
		}
	}
	addComponent({ repoName: "@htmlbricks/hb-player-live", version: pkg.version });

	onMount(() => {
		console.log(component.shadowRoot.getElementById("skeletontest"));
	});

	function dispatchCustomEvent() {
		dispatch("event", { test: true });
	}
</script>

{#if items && typeof items === "object"}
	{#each items as l}
		<div class="item">{JSON.stringify(l)}</div>
	{/each}
{/if}

<style lang="scss">
	@import "../styles/webcomponent.scss";
	@import "../styles/bootstrap.scss";
</style>
