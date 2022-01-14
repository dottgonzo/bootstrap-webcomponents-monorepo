<svelte:options tag="hb-gauges" />

<script lang="ts">
	import { get_current_component, onMount } from "svelte/internal";
	import { createEventDispatcher } from "svelte";
	import pkg from "../../package.json";
	const component = get_current_component();
	// const svelteDispatch = createEventDispatcher();
	// function dispatch(name, detail) {
	// 	svelteDispatch(name, detail);
	// 	component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	// }

	export let id: string;

	$: {
		if (!id) id = "";
	}
</script>

<div id="gauge" />

<style lang="scss">
	// @import "../styles/webcomponent.scss";
</style>
