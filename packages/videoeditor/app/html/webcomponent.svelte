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

<div class="slidecontainer">
	<input type="range" min="1" max="100" value="50" class="slider" id="myRange" />
	<input type="range" min="1" max="100" value="50" class="slider" id="myRange2" />
</div>

<style lang="scss">
	@import "../styles/webcomponent.scss";
</style>
