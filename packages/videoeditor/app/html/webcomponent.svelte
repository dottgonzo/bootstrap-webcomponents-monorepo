<svelte:options tag="videoeditorbootstrap-component" />

<script lang="ts">
	/**
	 * Svelte Video Gallery WebComponent
	 * =====================
	 *
	 * @contributors: Dario Caruso <dev@dariocaruso.info> (https://dariocaruso.info)
	 *
	 * @license: MIT License
	 *
	 */

	export let id: string;
	$: {
		if (!id) {
			id = "";
		}
	}
</script>

<div>ciao</div>

<style lang="scss">
	@import "../styles/webcomponent.scss";
</style>
