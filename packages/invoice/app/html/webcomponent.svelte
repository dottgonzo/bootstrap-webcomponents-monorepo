<svelte:options tag="hb-invoice" />

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

	import { createEventDispatcher } from "svelte";
	import { get_current_component } from "svelte/internal";
	export let id: string;

	$: {
		if (!id) id = null;

		// 		for(const product of products){
		// if(!product._icon) {
		// 	switch(){

		// 	}
		// 	product._icon=''
		// }
		// 		}
	}
	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();
	function dispatch(name, detail) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}
</script>

<div>f</div>

<style lang="scss">
	// @import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
</style>
