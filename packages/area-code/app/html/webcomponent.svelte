<svelte:options tag="hb-area-code" />

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

	export let id: string;
	export let content: string;

	$: {
		if (!id) {
			id = null;
		}
		if (!content) {
			content = null;
		}
	}
	let flash = false;
	function copyToClipBoard() {
		navigator.clipboard.writeText(content);
		flash = true;

		setInterval(() => {
			flash = false;
		}, 5000);
	}
</script>

<div id="content" part="content">
	<div id="copycode">
		<div style="display:{flash ? 'inline-block' : 'none'}" id="flash">copied to the clipboard</div>
		<button id="copybutton" on:click={copyToClipBoard}>{flash ? "ok!" : "copy"}</button>
	</div>
	<code>{content}</code>
</div>

<style lang="scss">
	#content {
		background-color: rgb(232 232 232 / 57%);
		padding: 26px 12px 12px 12px;
		position: relative;
		padding-bottom: 30px;
	}
	#copycode {
		position: absolute;
		right: 4px;
		top: 4px;
		font-size: 0.7em;
	}
	#copybutton {
		cursor: pointer;
	}
</style>
