<svelte:options tag="hb-player-live-camera-ptz" />

<script lang="ts">
	import pkg from "../../package.json";

	import { get_current_component, onDestroy, onMount, text } from "svelte/internal";

	import { createEventDispatcher } from "svelte";
	import parseStyle from "style-to-object";
	import { addComponent, getChildStyleToPass } from "@htmlbricks/hb-jsutils/main";
	import type { Events as padJoystickEvents } from "@htmlbricks/hb-pad-joystick/release/webcomponent.type";
	import type { Component as PlayerLiveComponent } from "@htmlbricks/hb-player-live/release/webcomponent.type";
	import type { Component as TableComponent } from "@htmlbricks/hb-table/release/webcomponent.type";
	import type { Events as PlayerLiveEvents } from "@htmlbricks/hb-player-live/release/webcomponent.type";
	import type { Component, Events } from "@app/types/webcomponent.type";

	import { styleSetup as playerLiveStyleSetup } from "../../node_modules/@htmlbricks/hb-player-live/release/docs";
	import { styleSetup as padJoystickStyleSetup } from "../../node_modules/@htmlbricks/hb-pad-joystick/release/docs";
	import { styleSetup as tableStyleSetup } from "../../node_modules/@htmlbricks/hb-table/release/docs";
	import { styleSetup as dialogStyleSetup } from "../../node_modules/@htmlbricks/hb-dialog/release/docs";

	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();

	function dispatch(name: string, detail: any) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}
	export let id: string;
	export let style: string;

	export let live_uri: string;
	export let presets: Component["presets"];
	export let position: Component["position"];

	let parsedStyle: { [x: string]: string };

	let playerLiveStyleSetupToSet: string = "";
	let padJoystickStyleSetupToSet: string = "";
	let tableStyleSetupToSet: string = "";
	let dialogStyleSetupToSet: string = "";
	const movementSettings = {
		precision: 50,
		speed: 50,
	};
	let time = new Date().toLocaleTimeString();
	let tablePresetsRows: TableComponent["rows"];
	const tablePresetsHeaders = [
		{
			label: "Label",
			key: "label",
		},
	];
	let showTablePresets = false;
	$: {
		if (!live_uri) live_uri = "";
		if (!id) id = "";
		if (style) {
			parsedStyle = parseStyle(style);
			playerLiveStyleSetupToSet = getChildStyleToPass(parsedStyle, playerLiveStyleSetup?.vars);
			padJoystickStyleSetupToSet = getChildStyleToPass(parsedStyle, padJoystickStyleSetup?.vars);
			tableStyleSetupToSet = getChildStyleToPass(parsedStyle, tableStyleSetup?.vars);
			dialogStyleSetupToSet = getChildStyleToPass(parsedStyle, dialogStyleSetup?.vars);
		}
		if (!presets) presets = [];
		else if (typeof presets === "string") {
			presets = JSON.parse(presets);
		}
		if (!tablePresetsRows?.length && presets.length) {
			tablePresetsRows = presets.map((p) => {
				return {
					_id: p.id,
					label: p.label,
				};
			});
		}
		if (!position) position = "right-bottom";
	}
	setInterval(() => {
		time = new Date().toLocaleTimeString();
	}, 1000);
	function zoomAction(direction: "in" | "out") {
		const zoomActionEventPayload: Events["zoomAction"] = { id, movementSettings, direction };

		dispatch("zoomAction", zoomActionEventPayload);
	}
	function goToHome() {
		const goToHomeEventPayload: Events["goToHome"] = { id, movementSettings };
		dispatch("goToHome", { id, movementSettings });
	}
	function addAsPreset() {
		const addAsPresetEventPayload: Events["addAsPreset"] = { id };

		dispatch("addAsPreset", addAsPresetEventPayload);
	}
	function openPresetsModal() {
		showTablePresets = !showTablePresets;
	}

	function changePreset(e: any) {
		const presetClick = e.target.value;
		const preset = presets.find((p) => p.id === presetClick);
		if (preset) {
			const changePresetEventPayload: Events["changePreset"] = Object.assign({ playerId: id, movementSettings }, preset);

			dispatch("changePreset", changePresetEventPayload);
		} else console.error("Preset not found");
	}
	function sendJoystickPosition(position: padJoystickEvents["sendJoystickPosition"]) {
		dispatch("sendJoystickPosition", {
			id,
			x: position.x,
			y: position.y,
			cardinalDirection: position.cardinalDirection,
			joyId: position.id,
			movementSettings,
		});
	}
	function sendDirection(direction: padJoystickEvents["sendDirection"]) {
		dispatch("sendDirection", { id, movementSettings, direction: direction.direction, joyId: direction.id });
	}
	function showGrid() {}
	function selectZone() {}
	function showJoystick() {}

	addComponent({ repoName: "@htmlbricks/hb-player-live", version: pkg.version });
	addComponent({ repoName: "@htmlbricks/hb-pad-joystick", version: pkg.version });
	addComponent({ repoName: "@htmlbricks/hb-table", version: pkg.version });
	addComponent({ repoName: "@htmlbricks/hb-dialog", version: pkg.version });
</script>

<svelte:head>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@latest/font/bootstrap-icons.css" />
</svelte:head>
<hb-dialog
	on:modalShow={(s) => {
		showTablePresets = s.detail.show;
	}}
	title="Presets"
	show={showTablePresets ? "yes" : "no"}
>
	<!-- <div slot="header">
		<h5 class="modal-title">Presets</h5>
	</div> -->
	<div slot="body-content">
		{#if tablePresetsRows?.length}
			<hb-table
				style={tableStyleSetupToSet}
				rows={JSON.stringify(tablePresetsRows)}
				headers={JSON.stringify(tablePresetsHeaders)}
				size="12"
				disablepagination={tablePresetsRows.length < 12 ? "yes" : "no"}
			/>
		{/if}
	</div>
	<!-- <div slot="footer">
		<button type="button" class="btn btn-secondary" on:click={() => openPresetsModal()}>Close</button>
	</div> -->
</hb-dialog>
<div id="container">
	<hb-player-live mediauri={live_uri} style={playerLiveStyleSetupToSet} />
	<div id="controller">
		<div id="panel">
			<div id="joystick">
				<hb-pad-joystick
					on:sendJoystickPosition={(e) => {
						sendJoystickPosition(e.detail);
					}}
					on:sendDirection={(e) => {
						sendDirection(e.detail);
					}}
					size="60px"
					style={padJoystickStyleSetupToSet}
				/>
			</div>
			<div id="buttons">
				<div class="btn-group" style="margin-right:10px">
					<button on:click={() => zoomAction("in")} class="btn btn-sm btn-secondary">
						<i class="bi bi-zoom-in" />
					</button>
					<button on:click={() => zoomAction("out")} class="btn btn-sm btn-secondary">
						<i class="bi bi-zoom-out" />
					</button>
				</div>
				<button on:click={() => showGrid()} class="btn btn-sm btn-secondary">
					<i class="bi bi-grid-3x3" />
				</button>
				<button on:click={() => showJoystick()} class="btn btn-sm btn-secondary">
					<i class="bi bi-joystick" />
				</button>
				<button on:click={() => selectZone()} class="btn btn-sm btn-secondary">
					<i class="bi bi-square" />
				</button>
			</div>
			<div id="speed">
				<span class="slider_label">speed:</span> <input type="range" bind:value={movementSettings.speed} />
			</div>
			<div id="precision">
				<span class="slider_label">precision:</span> <input type="range" bind:value={movementSettings.precision} />
			</div>
			<div id="presets_view">
				<button on:click={() => goToHome()} class="btn btn-secondary">
					<i class="bi bi-house-door-fill" />
				</button>
				<button on:click={() => openPresetsModal()} class="btn btn-secondary">
					<i class="bi bi-gear-fill" />
				</button>
				<button on:click={() => addAsPreset()} class="btn btn-secondary">
					<i class="bi bi-plus-circle-fill" />
				</button>
			</div>
			<div id="presets_select">
				<select
					on:change={(e) => {
						changePreset(e);
					}}
					class="btn btn-primary"
				>
					{#each presets as preset (preset.id)}
						<option value={preset.id}>{preset.label || preset.id}</option>
					{/each}
				</select>
			</div>
			<div id="presets_buttons">
				<span style="font-size:0.8em;color:grey">
					<i class="bi bi-clock" />
					<span>{time}</span>
				</span>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	@import "../styles/webcomponent.scss";
	@import "../styles/bootstrap.scss";
</style>
