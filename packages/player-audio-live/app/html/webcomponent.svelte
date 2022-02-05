<svelte:options tag="hb-player-audio-live" />

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
		if (!id) {
			id = null;
		}
	}
</script>

<div>ciao</div>

<style lang="scss">
	// @import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
</style>
