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

<button id="paybtn" on:click={() => payByAccount()} class="btn">google pay</button>

<style lang="scss">
	@import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";

	#paybtn {
		width: 100%;
		background-color: black;
		color: white;
	}
</style>
