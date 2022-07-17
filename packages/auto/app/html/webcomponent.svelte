<svelte:options tag="hb-auto" />

<script lang="ts">
	/**
	 * Svelte Video Login/Register/Forget Password WebComponent
	 * =====================
	 *
	 * @contributors: Dario Caruso <dev@dariocaruso.info> (https://dariocaruso.info)
	 *
	 * @license: MIT License
	 *
	 */

	import { get_current_component } from "svelte/internal";
	import { createEventDispatcher } from "svelte";
	import type { Component } from "@app/types/webcomponent.type";

	export let id: string;
	export let style: string;
	export let body: Component["body"];
	export let layout: Component["layout"];
	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();

	function dispatch(name, detail) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}
	$: {
		if (!id) {
			id = "";
		}
		if (!style) {
			style = "";
		}

		if (typeof body === "string") {
			try {
				body = JSON.parse(body);
			} catch (err) {
				console.error("error parsing json", err);
			}
		}

		if (typeof layout === "string") {
			try {
				layout = JSON.parse(layout);
			} catch (err) {
				console.error("error parsing json", err);
			}
		}
	}
</script>

c

<style lang="scss">
	@import "../styles/webcomponent.scss";
</style>
