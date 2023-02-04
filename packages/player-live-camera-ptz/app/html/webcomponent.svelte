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

	export let current_preset: Component["current_preset"];

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
	let showConfirmAddSceneToPreset = false;
	let showGoToHomeConfirm = false;
	let isGridOpen = false;
	let dpadOrJoystick: "dpad" | "joystick";
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
		if (!current_preset) current_preset = "";
		if (!dpadOrJoystick) dpadOrJoystick = "dpad";
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
	function addSceneAsPreset() {
		const addAsPresetEventPayload: Events["addSceneAsPreset"] = { id };

		dispatch("addSceneAsPreset", addAsPresetEventPayload);
	}
	function openPresetsModal() {
		showTablePresets = !showTablePresets;
	}
	function confirmAddSceneToPresets() {
		showConfirmAddSceneToPreset = !showConfirmAddSceneToPreset;
	}
	function confirmGoToHome() {
		showGoToHomeConfirm = !showGoToHomeConfirm;
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
	function showGrid() {
		isGridOpen = !isGridOpen;
	}
	function selectZone() {}
	function showJoystick() {
		if (dpadOrJoystick === "dpad") {
			dpadOrJoystick = "joystick";
		} else {
			dpadOrJoystick = "dpad";
		}
	}
	function selectPreset() {}
	function showSettings() {}

	addComponent({ repoName: "@htmlbricks/hb-player-live", version: pkg.version });
	addComponent({ repoName: "@htmlbricks/hb-pad-joystick", version: pkg.version });
	addComponent({ repoName: "@htmlbricks/hb-table", version: pkg.version });
	addComponent({ repoName: "@htmlbricks/hb-dialog", version: pkg.version });
</script>

<svelte:head>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@latest/font/bootstrap-icons.css" />
</svelte:head>

<!-- This Dialog allows to manage the presets -->
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
		<button type="button" class="btn btn-primary" on:click={() => openPresetsModal()}>Close</button>
	</div> -->
</hb-dialog>

<!-- This Dialog allows to confirm the addSceneToPreset -->

<hb-dialog
	on:modalShow={(s) => {
		showConfirmAddSceneToPreset = s.detail.show;
	}}
	title="Add Scene to Preset"
	show={showConfirmAddSceneToPreset ? "yes" : "no"}
	on:modalConfirm={(e) => {
		if (e?.detail?.confirm) addSceneAsPreset();
	}}
>
	<!-- <div slot="header">
		<h5 class="modal-title">Presets</h5>
	</div> -->
	<div slot="body-content">Are You sure to add this scene to the preset?</div>
	<!-- <div slot="footer">
		<button type="button" class="btn btn-primary" on:click={() => openPresetsModal()}>Close</button>
	</div> -->
</hb-dialog>

<!-- This Dialog allows to confirm the Go To Home Movement -->

<hb-dialog
	on:modalShow={(s) => {
		showGoToHomeConfirm = s.detail.show;
	}}
	title="Go to Home"
	show={showGoToHomeConfirm ? "yes" : "no"}
	on:modalConfirm={(e) => {
		if (e?.detail?.confirm) goToHome();
	}}
>
	<div slot="body-content">Are You sure to go To Home?</div>
</hb-dialog>

<div id="container">
	<hb-player-live no_controls="yes" id="player" mediauri={live_uri} style={playerLiveStyleSetupToSet} />
	<div id="grid" style="display:{isGridOpen ? 'inherit' : 'none'}">
		<table id="grid_table">
			<tr>
				<td />
				<td />
				<td />
				<td />
			</tr>
			<tr>
				<td />
				<td />
				<td />
				<td />
			</tr>
			<tr>
				<td />
				<td />
				<td />
				<td />
			</tr>
			<tr>
				<td />
				<td />
				<td />
				<td />
			</tr>
		</table>
	</div>
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
					pad_or_joystick={dpadOrJoystick}
					size="60px"
					style={padJoystickStyleSetupToSet}
				/>
			</div>
			<div id="buttons">
				<div class="btn-group" style="margin-right:10px">
					<button on:click={() => zoomAction("in")} class="btn btn-sm btn-primary">
						<i class="bi bi-zoom-in" />
					</button>
					<button on:click={() => zoomAction("out")} class="btn btn-sm btn-primary">
						<i class="bi bi-zoom-out" />
					</button>
				</div>
				<button on:click={() => confirmGoToHome()} class="btn btn-sm btn-primary">
					<i class="bi bi-house-door-fill" />
				</button>
				<button on:click={() => selectZone()} class="btn btn-sm btn-primary">
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
				<button on:click={() => showGrid()} class="btn btn-primary">
					<i class="bi bi-grid-3x3" />
				</button>
				<button on:click={() => showJoystick()} class="btn btn-primary">
					<i class="bi bi-joystick" />
				</button>
				<button on:click={() => showSettings()} class="btn btn-primary">
					<i class="bi bi-sliders" />
				</button>
				<!-- <button on:click={() => openPresetsModal()} class="btn btn-primary">
					<i class="bi bi-gear-fill" />
				</button> -->
			</div>
			<div id="presets_select">
				<button on:click={() => confirmAddSceneToPresets()} class="btn btn-sm btn-primary">
					<i class="bi bi-plus-circle-fill" />
				</button>
				<button
					style="width:120px!important;display:inline-block!important"
					on:click={() => {
						openPresetsModal();
					}}
					class="btn btn-sm btn-primary">{current_preset} <i style="float:right" class="bi bi-arrow-down-up" /></button
				>
				<!-- <select
					on:change={(e) => {
						changePreset(e);
					}}
					class="btn btn-primary"
					bind:value={current_preset}
				>
					{#each presets as preset (preset.id)}
						<option value={preset.id}>{preset.label || preset.id}</option>
					{/each}
				</select> -->
			</div>
			<div id="presets_buttons">
				<span class="timecell">
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
