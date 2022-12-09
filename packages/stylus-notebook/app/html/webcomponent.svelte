<svelte:options tag="hb-stylus-notebook" />

<script lang="ts">
	import { get_current_component, onDestroy, onMount } from "svelte/internal";
	import pkg from "../../package.json";

	import { createEventDispatcher } from "svelte";
	import parseStyle from "style-to-object";
	import { addComponent, getChildStyleToPass } from "@htmlbricks/hb-jsutils/main";
	import type { Component } from "@app/types/webcomponent.type";
	import { styleSetup as stylusPaperSetup } from "../../node_modules/@htmlbricks/hb-stylus-paper/release/docs";
	import type { Component as paperComponent } from "../../node_modules/@htmlbricks/hb-stylus-paper/release/webcomponent.type";

	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();

	function dispatch(name, detail) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}

	export let id: string;
	export let style: string;

	export let string: string;
	export let json: Component["json"];
	export let boolean: boolean;

	let mode: paperComponent["mode"] = "draw";

	let parsedStyle: { [x: string]: string };
	let stylusPaperStyleToSet: string = "";

	let historyIndex: number;
	let changeHistoryIndex: number;

	$: {
		if (!id) id = "";
		if (style) {
			parsedStyle = parseStyle(style);
			stylusPaperStyleToSet = getChildStyleToPass(parsedStyle, stylusPaperSetup?.vars);
		}
		if (!string) string = "";

		if (!historyIndex) historyIndex = 0;

		// json
		if (typeof json === "string") {
			try {
				json = JSON.parse(json);
			} catch (err) {
				console.error("error parsing json", err);
			}
		}
		// boolean
		if (boolean === ("" as unknown)) boolean = true;
		if (typeof boolean === "string") boolean = boolean === "no" || boolean === "false" ? false : true;
		if (!boolean) boolean = false;
	}
	addComponent({ repoName: "@htmlbricks/hb-stylus-paper", version: pkg.version });

	onMount(() => {
		console.log(component.shadowRoot.getElementById("skeletontest"));
	});

	function changeMode(name: paperComponent["mode"]) {
		mode = name;
	}
	function undo() {
		if (changeHistoryIndex > 0) changeHistoryIndex = historyIndex - 1;
	}
	function redo() {
		if (changeHistoryIndex && changeHistoryIndex < historyIndex) changeHistoryIndex++;
	}
	function onHistoryIndexChange(details: { i: number }) {
		historyIndex = details.i;
		changeHistoryIndex = null;
	}
</script>

<div part="controller" id="controller">
	<button on:click={() => changeMode("eraser")}>clear</button>
	<button on:click={() => changeMode("select")}>select</button>
	<button on:click={() => changeMode("draw")}>draw</button>
	<button on:click={() => undo()} disabled={historyIndex === 0}>undo</button>
	<button on:click={() => redo()}>redo</button>
</div>
<div part="paper-container" id="paper-container" style="position:relative">
	<hb-stylus-paper id="stylus-paper" style={stylusPaperStyleToSet} background_color="green" {mode} on:historyIndex={(e) => onHistoryIndexChange(e.details)} />
</div>

<style lang="scss">
	@import "../styles/webcomponent.scss";
	// @import "../styles/bootstrap.scss";
</style>
