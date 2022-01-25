<svelte:options tag="hb-payment-google" />

<script lang="ts">
	/**
	 * Svelte Payment Page WebComponent
	 * =====================
	 *
	 * @contributors: Dario Caruso <dev@dariocaruso.info> (https://dariocaruso.info)
	 *
	 * @license: MIT License
	 *
	 */

	import { createEventDispatcher } from "svelte";
	import { get_current_component } from "svelte/internal";

	export let id: string;

	$: {
		if (!id) id = null;
	}

	function payByAccount() {
		dispatch("payByAccount", {});
	}
	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();
	function dispatch(name, detail) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}
</script>

<div>
	<div><button on:click={() => payByAccount()} style="width:100%;background-color:black;color:white" class="btn">google pay</button></div>
</div>

<style lang="scss">
	@import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
</style>
