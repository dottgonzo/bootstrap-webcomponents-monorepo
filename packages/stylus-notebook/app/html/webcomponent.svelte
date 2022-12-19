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
	import type { Component as paperComponent, Events as paperEvents } from "../../node_modules/@htmlbricks/hb-stylus-paper/release/webcomponent.type";
	import type { Component as inputFileComponent, Events as inputFileEvents } from "../../node_modules/@htmlbricks/hb-input-file/release/webcomponent.type";

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
	let insert_image: paperComponent["insert_image"];
	let insert_text: paperComponent["insert_text"];

	export let load_draw: Component["load_draw"];
	let start_index: number;

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

		if (
			(historyIndex || historyIndex === 0) &&
			started &&
			(!changeHistoryIndex || changeHistoryIndex !== -1) &&
			(!start_index || (start_index < historyIndex && (!changeHistoryIndex || changeHistoryIndex < start_index)))
		)
			enableUndo = true;
		else enableUndo = false;

		if (typeof load_draw === "string" && (load_draw as string)?.length) {
			try {
				load_draw = JSON.parse(load_draw);
			} catch (err) {
				console.error("error parsing json", err);
			}
		} else if (!load_draw) {
			load_draw = null;
		}
	}
	addComponent({ repoName: "@htmlbricks/hb-stylus-paper", version: pkg.version });
	addComponent({ repoName: "@htmlbricks/hb-input-file", version: pkg.version });

	onMount(() => {
		console.log(component.shadowRoot.getElementById("skeletontest"));
	});

	function downloadObjectAsJson(exportObj: any, exportName: string) {
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
	function onHistoryIndexChange(details: { index: number; start_index?: number }) {
		if (!started) started = true;
		console.log("h", details);
		historyIndex = details.index - 1;
		if (details.start_index) start_index = details.start_index;

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
	function onFileInsertLoaded(e: inputFileEvents["setValue"]) {
		const fileName = (e.value as unknown as File)?.name;
		if (fileName) {
			const reader = new FileReader();
			reader.readAsDataURL(e.value as unknown as Blob);

			reader.onload = function (evt) {
				try {
					// load_draw = evt.target.result.toString();
					console.log("insert file", evt.target, evt.target?.result);
					if (evt.target?.result) {
						const imageBase64 = evt.target.result.toString();
						const imageType = imageBase64.split(";")[0].split(":")[1] as "png" | "jpg";

						insert_image = {
							base64: evt.target.result.toString(),
							type: imageType,
							name: fileName,
						};
					}
					// insert_object=""
				} catch (e) {
					console.error("error loading file");
				}
			};
			reader.onerror = function (evt) {
				console.error("error reading file");
			};
		}
	}

	function onPaperSave(e: paperEvents["save"]) {
		console.log("save", e);
		save_as = null;
		downloadObjectAsJson(e, e.name + ".json");
	}

	function onDrawLoaded(e: inputFileEvents["setValue"]) {
		console.log("file", e);
		if ((e.value as unknown as File).name) {
			const reader = new FileReader();
			reader.readAsText(e.value as unknown as Blob, "UTF-8");

			reader.onload = function (evt) {
				try {
					load_draw = JSON.parse(evt.target.result.toString());
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
	<br />load:<hb-input-file
		id="loadfile"
		style={inputFileStyleToSet}
		on:setValue={(e) => onDrawLoaded(e.detail)}
		schemaentry={JSON.stringify({ label: "ciao", id: "xxxxxxx" })}
	/>
	insert:<hb-input-file
		id="insertfile"
		style={inputFileStyleToSet}
		on:setValue={(e) => onFileInsertLoaded(e.detail)}
		schemaentry={JSON.stringify({ label: "ciao" })}
	/>
</div>
<div part="paper-container" id="paper-container" style="position:relative">
	<hb-stylus-paper
		id="stylus-paper"
		goto={changeHistoryIndex}
		style={stylusPaperStyleToSet}
		background_color="green"
		{mode}
		save_as={JSON.stringify(save_as)}
		load_draw={load_draw ? JSON.stringify(load_draw) : null}
		insert_image={insert_image ? JSON.stringify(insert_image) : null}
		insert_text={insert_text ? JSON.stringify(insert_text) : null}
		on:historyIndex={(e) => onHistoryIndexChange(e.detail)}
		on:save={(e) => onPaperSave(e.detail)}
	/>
</div>

<style lang="scss">
	@import "../styles/webcomponent.scss";
	// @import "../styles/bootstrap.scss";
</style>
