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

	import { get_current_component } from "svelte/internal";
	import { createEventDispatcher } from "svelte";

	export let id: string;
	export let style: string;
	export let content: string;
	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();

	function dispatch(name: string, detail: any) {
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
		if (!content) {
			content = "";
		}
	}
	let flash = false;
	function copyToClipBoard() {
		if (flash) return;
		navigator.clipboard.writeText(content);
		flash = true;
		dispatch("clipboardCopyText", { text: content });
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
	<code part="content" style="overflow-wrap: break-word;">{content}</code>
</div>

<style lang="scss">
	@import "../styles/webcomponent.scss";

	#content {
		background-color: var(--hb-area-code-background);
		padding: 28px 12px 28px 12px;
		position: relative;
	}
	#copycode {
		position: absolute;
		right: 6px;
		top: 6px;
		font-size: 0.6em;
	}
	#copybutton {
		cursor: pointer;
	}
</style>
