<svelte:options tag="hb-stylus-notebook" />

<script lang="ts">
	import { get_current_component, onDestroy, onMount } from "svelte/internal";
	import pkg from "../../package.json";

	import { createEventDispatcher } from "svelte";
	import parseStyle from "style-to-object";
	import { addComponent, getChildStyleToPass } from "@htmlbricks/hb-jsutils/main";
	import type { Component } from "@app/types/webcomponent.type";
	import { styleSetup as stylePaperSetup } from "../../node_modules/@htmlbricks/hb-stylus-paper/release/docs";
	import { styleSetup as styleInputFileSetup } from "../../node_modules/@htmlbricks/hb-input-file/release/docs";
	import type { Component as paperComponent } from "../../node_modules/@htmlbricks/hb-stylus-paper/release/webcomponent.type";

	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();

	function dispatch(name, detail) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}

	export let id: string;
	export let style: string;

	let mode: paperComponent["mode"] = "draw";

	let parsedStyle: { [x: string]: string };
	let stylusPaperStyleToSet: string = "";
	let inputFileStyleToSet: string = "";

	let historyIndex: number;
	let changeHistoryIndex: number;

	let enableUndo: boolean = false;
	let enableRedo: boolean;
	let started = false;
	let save_as: paperComponent["save_as"];

	let load_draw: string;
	$: {
		if (!id) id = "";
		if (style) {
			parsedStyle = parseStyle(style);
			stylusPaperStyleToSet = getChildStyleToPass(parsedStyle, stylePaperSetup?.vars);
			inputFileStyleToSet = getChildStyleToPass(parsedStyle, styleInputFileSetup?.vars);
		}

		if (!historyIndex && historyIndex !== 0) historyIndex = 0;

		if ((changeHistoryIndex === 0 || changeHistoryIndex) && changeHistoryIndex < historyIndex) enableRedo = true;
		else enableRedo = false;

		if ((historyIndex || historyIndex === 0) && started && (!changeHistoryIndex || changeHistoryIndex !== -1)) enableUndo = true;
		else enableUndo = false;
	}
	addComponent({ repoName: "@htmlbricks/hb-stylus-paper", version: pkg.version });
	addComponent({ repoName: "@htmlbricks/hb-input-file", version: pkg.version });

	onMount(() => {
		console.log(component.shadowRoot.getElementById("skeletontest"));
	});

	function downloadObjectAsJson(exportObj: JSON, exportName: string) {
		var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
		var downloadAnchorNode = document.createElement("a");
		downloadAnchorNode.setAttribute("href", dataStr);
		downloadAnchorNode.setAttribute("download", exportName);
		document.body.appendChild(downloadAnchorNode); // required for firefox
		downloadAnchorNode.click();
		downloadAnchorNode.remove();
	}

	function changeMode(name: paperComponent["mode"]) {
		mode = name;
	}
	function undo() {
		console.log("ch", historyIndex, changeHistoryIndex);
		if (historyIndex >= 0 && (!changeHistoryIndex || changeHistoryIndex > -1)) {
			changeHistoryIndex = changeHistoryIndex || changeHistoryIndex === 0 ? changeHistoryIndex - 1 : historyIndex - 1;
			console.log("undo", historyIndex, changeHistoryIndex);
		}
	}
	function redo() {
		console.log(historyIndex, changeHistoryIndex);

		if ((changeHistoryIndex || changeHistoryIndex === 0) && changeHistoryIndex <= historyIndex) {
			changeHistoryIndex++;
			// if (changeHistoryIndex === historyIndex - 2) changeHistoryIndex = historyIndex - 1;
			console.log("redo", historyIndex, changeHistoryIndex);
		}
	}
	function onHistoryIndexChange(details: { index: number }) {
		if (!started) started = true;
		console.log("h", details);
		historyIndex = details.index - 1;

		changeHistoryIndex = null;
	}
	function save() {
		save_as = {
			name: "test",
			type: "json",
		};
	}
	function load() {}
	function move() {}
	function insert() {}

	function onPaperSave(e) {
		console.log("save", e);
		save_as = null;
		downloadObjectAsJson(e, e.name + ".json");
	}

	function onFileSelected(e) {
		console.log("file", e);
		if (e.value.name) {
			const reader = new FileReader();
			reader.readAsText(e.value, "UTF-8");

			reader.onload = function (evt) {
				console.log(evt.target.result);
				try {
					load_draw = evt.target.result.toString();
				} catch (e) {
					console.error("error loading file");
				}
			};
			reader.onerror = function (evt) {
				console.error("error reading file");
			};
		}
	}
</script>

<div part="controller" id="controller">
	<button on:click={() => changeMode("eraser")}>clear</button>
	<button on:click={() => changeMode("select")}>select</button>
	<button on:click={() => changeMode("draw")}>draw</button>
	<button on:click={() => undo()} disabled={!enableUndo}>undo</button>
	<button on:click={() => redo()} disabled={!enableRedo}>redo</button>
	<button on:click={() => load()}>load</button>
	<button on:click={() => save()} disabled={!enableUndo}>save</button>
	<button on:click={() => move()} disabled={!enableUndo}>move</button>
	<button disabled={mode !== "draw"}>brush</button>
	<hb-input-file id="input-file" style={inputFileStyleToSet} on:setValue={(e) => onFileSelected(e.detail)} />
</div>
<div part="paper-container" id="paper-container" style="position:relative">
	<hb-stylus-paper
		id="stylus-paper"
		goto={changeHistoryIndex}
		style={stylusPaperStyleToSet}
		background_color="green"
		{mode}
		save_as={JSON.stringify(save_as)}
		{load_draw}
		on:historyIndex={(e) => onHistoryIndexChange(e.detail)}
		on:save={(e) => onPaperSave(e.detail)}
	/>
</div>

<style lang="scss">
	@import "../styles/webcomponent.scss";
	// @import "../styles/bootstrap.scss";
</style>
