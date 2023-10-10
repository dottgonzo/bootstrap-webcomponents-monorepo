<svelte:options tag="hb-page-vcard" />

<script lang="ts">
	import { get_current_component, onDestroy, onMount } from "svelte/internal";

	import { createEventDispatcher } from "svelte";
	import parseStyle from "style-to-object";
	import { addComponent, getChildStyleToPass } from "wc-js-utils/main";
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
	export let options: Component["options"];

	let parsedStyle: { [x: string]: string };
	//  let componentStyleToSet: string = "";

	$: {
		if (!id) id = "";
		if (style) {
			parsedStyle = parseStyle(style);
			// componentStyleToSet = getChildStyleToPass(parsedStyle, componentStyleSetup?.vars);
		}

		// data
		if (typeof data === "string") {
			try {
				data = JSON.parse(data);
			} catch (err) {
				console.error("error parsing data", err);
			}
		}

		// options
		if (typeof options === "string") {
			try {
				options = JSON.parse(options);
			} catch (err) {
				console.error("error parsing options", err);
			}
		}
	}

	onMount(() => {
		// console.log(component.shadowRoot.getElementById("skeletontest"));
	});

	function dispatchCustomEvent() {
		dispatch("event", { test: true });
	}
</script>

{#if data && typeof data === "object"}
	<section>
		{#each Object.keys(data) as l}
			{#if typeof data[l] === "object"}
				{#each Object.keys(data[l]) as ll}
					{#if typeof data[l][ll] === "object"}
						{#each Object.keys(data[l][ll]) as lll}
							<div>{l} {ll} {lll}: {data[l][ll][lll]}</div>
						{/each}
					{:else}
						<div>{l} {ll}: {data[l][ll]}</div>
					{/if}
				{/each}
			{:else}
				<div>{l}: {data[l]}</div>
			{/if}
		{/each}
	</section>
{/if}

slot: <slot name="skelcontent" /> /endslot<br />
slot debug: {Object.keys($$slots)[0]}/endslot

<style lang="scss">
	@import "../styles/webcomponent.scss";
	@import "../styles/bootstrap.scss";
</style>
