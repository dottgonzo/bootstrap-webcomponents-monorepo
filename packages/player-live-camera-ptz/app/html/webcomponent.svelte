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
	export let configuration: Component["configuration"];

	export let current_preset: Component["current_preset"];

	let htmlVideoElement: HTMLVideoElement;

	let parsedStyle: { [x: string]: string };

	let playerLiveStyleSetupToSet: string = "";
	let padJoystickStyleSetupToSet: string = "";
	let tableStyleSetupToSet: string = "";
	let dialogStyleSetupToSet: string = "";
	let selectedPresetId = "";
	const movementSettings = {
		precision: 50,
		speed: 50,
	};
	const defaultConfiguration: Component["configuration"] = {
		joystick: true,
		presets: true,
		deletePreset: true,
		addPreset: true,
		switchPreset: true,
		home: true,
		zoom: {
			in: true,
			out: true,
		},
		pan: true,
		tilt: true,
		clickToCenter: true,
		settings: true,
	};
	let time = new Date().toLocaleTimeString();
	let tablePresetsRows: TableComponent["rows"];
	const tablePresetsHeaders: TableComponent["headers"] = [
		{
			label: "Name",
			key: "name",
			copyTxt: true,
		},
		{
			label: "Number",
			key: "number",
			type: "number",
			copyTxt: true,
		},
	];
	const tablePresetsActions: TableComponent["actions"] = [
		{
			name: "goto",
			type: "icon",
			iconOrText: "arrow-right-circle",
		},
		{
			name: "delete",
			type: "icon",
			iconOrText: "x-circle-fill",
			btnClass: "danger",
		},
	];

	type TrectClicks = { start?: { x: number; y: number }; end?: { x: number; y: number } };

	let showTablePresets = false;
	let showConfirmAddSceneToPreset = false;
	let showConfirmDeletePreset = false;
	let showConfirmGoToPreset = false;
	let showGoToHomeConfirm = false;
	let isGridOpen = false;
	let dpadOrJoystick: "dpad" | "joystick" = "dpad";
	let selectingZone = false;
	let rect = { x: 0, y: 0, width: 0, height: 0 };
	let rectClicks: TrectClicks = {};
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
		if (!configuration) configuration = defaultConfiguration;
		else if (typeof configuration === "string") {
			configuration = JSON.parse(configuration);
		}
		if (!current_preset) current_preset = "";
		if (!presets) presets = [];
		else if (typeof presets === "string") {
			presets = JSON.parse(presets);
		}
		if (!tablePresetsRows?.length && presets.length) {
			tablePresetsRows = presets.map((p) => {
				return {
					_id: p.id,
					name: p.name,
					number: p.number,
				};
			});
		}
		if (!position) position = "right-bottom";
	}
	setInterval(() => {
		time = new Date().toLocaleTimeString();
	}, 1000);
	function zoomAction(direction: "in" | "out") {
		if (!configuration.zoom) return console.error("Zoom is not enabled in the configuration");
		if (!configuration.zoom[direction]) return console.error(`Zoom ${direction} is not enabled in the configuration`);
		const zoomActionEventPayload: Events["zoomAction"] = { id, movementSettings, direction };

		dispatch("zoomAction", zoomActionEventPayload);
	}
	function goToHome() {
		if (!configuration.home) return console.error("Go to home is not enabled in the configuration");
		const goToHomeEventPayload: Events["goToHome"] = { id, movementSettings };
		dispatch("goToHome", { id, movementSettings });
	}
	function addSceneAsPreset() {
		if (!configuration.addPreset) return console.error("Add scene to preset is not enabled in the configuration");
		const addAsPresetEventPayload: Events["addSceneAsPreset"] = { id };

		dispatch("addSceneAsPreset", addAsPresetEventPayload);
	}
	function sendRect() {
		if (!configuration?.clickToCenter) return console.error("Click to center is not enabled in the configuration");
		const sendRectEventPayload: Events["sendRect"] = Object.assign(
			{ id, movementSettings, htmlVideoElementWidth: htmlVideoElement.width, htmlVideoElementHeight: htmlVideoElement.height },
			rect,
		);

		dispatch("sendRect", sendRectEventPayload);
		selectingZone = false;
		rect = { x: 0, y: 0, width: 0, height: 0 };
		rectClicks = {};
	}
	function openPresetsModal() {
		if (!configuration.presets) return console.error("Presets is not enabled in the configuration");
		showTablePresets = !showTablePresets;
	}
	function confirmAddSceneToPresets() {
		if (!configuration.addPreset) return console.error("Add scene to preset is not enabled in the configuration");
		showConfirmAddSceneToPreset = !showConfirmAddSceneToPreset;
	}
	function confirmGoToHome() {
		if (!configuration.home) return console.error("Go to home is not enabled in the configuration");
		showGoToHomeConfirm = !showGoToHomeConfirm;
	}
	function changePreset(presetId: string) {
		if (!configuration.switchPreset) return console.error("Switch preset is not enabled in the configuration");

		const preset = presets.find((p) => p.id === presetId);
		if (preset) {
			const changePresetEventPayload: Events["changePreset"] = Object.assign({ playerId: id, movementSettings }, preset);

			dispatch("changePreset", changePresetEventPayload);
		} else console.error("Preset not found");
	}

	function deletePreset(presetId: string) {
		if (!configuration.deletePreset) return console.error("Delete preset is not enabled in the configuration");

		const preset = presets.find((p) => p.id === presetId);
		if (preset) {
			const deletePresetEventPayload: Events["deletePreset"] = Object.assign({ playerId: id }, preset);

			dispatch("deletePreset", deletePresetEventPayload);
		} else console.error("Preset not found");
	}

	function sendJoystickPosition(position: padJoystickEvents["sendJoystickPosition"]) {
		if (!configuration?.joystick || configuration?.pan || configuration?.tilt)
			return console.error("Pan and Tilt on joystick are not enabled in the configuration");
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
		if (configuration.pan && configuration.tilt) dispatch("sendDirection", { id, movementSettings, direction: direction.direction, joyId: direction.id });
		else console.error("Pan and Tilt are not enabled in the configuration");
	}
	function showGrid() {
		isGridOpen = !isGridOpen;
	}
	function selectZone() {
		if (!configuration?.clickToCenter) return console.error("Click to center is not enabled in the configuration");
		selectingZone = !selectingZone;
	}
	function showJoystick() {
		if (dpadOrJoystick === "dpad") {
			if (!configuration?.joystick) return console.error("Joystick is not enabled in the configuration");

			dpadOrJoystick = "joystick";
		} else {
			dpadOrJoystick = "dpad";
		}
	}

	function showSettings() {}
	function presetsActionClick(c: { itemId: string; action: string; id: string }) {
		showTablePresets = false;
		selectedPresetId = c.itemId;

		switch (c.action) {
			case "goto":
				showConfirmGoToPreset = true;
				break;
			case "delete":
				showConfirmDeletePreset = true;
				break;
			default:
				return console.error("Action not found");
		}
	}

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
	hide_confirm="yes"
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
				actions={JSON.stringify(tablePresetsActions)}
				size="12"
				disablepagination={tablePresetsRows.length < 12 ? "yes" : "no"}
				on:tableaction={(e) => {
					presetsActionClick(e.detail);
				}}
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
<!-- This Dialog allows to confirm the delete preset -->

<hb-dialog
	id={"del_" + selectedPresetId}
	on:modalShow={(s) => {
		showConfirmDeletePreset = s.detail.show;
	}}
	title="Go to Preset {selectedPresetId ? presets.find((f) => f.id === selectedPresetId)?.id : ''}"
	show={showConfirmDeletePreset ? "yes" : "no"}
	confirmlabel="delete"
	confirm_btn_class="danger"
	on:modalConfirm={(e) => {
		console.log(e.detail, "detail");
		if (e?.detail?.confirm) deletePreset(e.detail.id.split("del_")[1]);
	}}
>
	<div slot="body-content">Are You sure to DELETE preset {selectedPresetId ? presets.find((f) => f.id === selectedPresetId)?.id : ""}?</div>
</hb-dialog>

<!-- This Dialog allows to confirm the Go To Preset -->

<hb-dialog
	id={"goto_" + selectedPresetId}
	on:modalShow={(s) => {
		showConfirmGoToPreset = s.detail.show;
	}}
	title="Go to Preset {selectedPresetId ? presets.find((f) => f.id === selectedPresetId)?.id : ''}"
	show={showConfirmGoToPreset ? "yes" : "no"}
	confirmlabel="go"
	confirm_btn_class="light"
	on:modalConfirm={(e) => {
		console.log(e.detail.id.split("goto")[1], "detail");
		if (e?.detail?.confirm) changePreset(e.detail.id.split("goto_")[1]);
	}}
>
	<div slot="body-content">Are You sure to GO to preset "{selectedPresetId ? presets.find((f) => f.id === selectedPresetId)?.id : ""}"?</div>
</hb-dialog>

<div id="container">
	<hb-player-live
		on:htmlVideoInit={(e) => {
			console.log(e.detail, "detailvid");
			htmlVideoElement = e.detail.htmlVideoElement;
			htmlVideoElement.onclick = (element_click) => {
				if (selectingZone) {
					const newClick = { x: element_click.clientX, y: element_click.clientY };
					if (!rectClicks.start) {
						rectClicks.start = newClick;
					} else {
						rectClicks.end = newClick;
						sendRect();
					}
				}
			};
			htmlVideoElement.onmousemove = (element_click) => {
				if (selectingZone) {
					const newClick = { x: element_click.clientX, y: element_click.clientY };
					if (rectClicks.start) {
						rectClicks.end = newClick;
					}
				}
			};
		}}
		no_controls="yes"
		id="player"
		mediauri={live_uri}
		style={playerLiveStyleSetupToSet}
	/>
	<div
		id="area_selector"
		style="display:{selectingZone ? 'inherit' : 'none'}; width:{((rectClicks?.start?.x || 0) + (rectClicks?.end?.x || 0)) / 2}px;height:{((rectClicks?.start
			?.y || 0) +
			(rectClicks?.end?.y || 0)) /
			2}px;top:{Math.abs((rectClicks?.start?.y || 0) - (rectClicks?.end?.y || 0))}px;left:{Math.abs(
			(rectClicks?.start?.x || 0) - (rectClicks?.end?.x || 0),
		)}px;"
	/>
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
				{#if dpadOrJoystick === "dpad"}
					<hb-pad-joystick
						id={"pad_" + dpadOrJoystick}
						on:sendDirection={(e) => {
							sendDirection(e.detail);
						}}
						pad_or_joystick="dpad"
						size="60px"
						style={padJoystickStyleSetupToSet}
					/>
				{:else}
					<hb-pad-joystick
						id={"pad_" + dpadOrJoystick}
						on:sendJoystickPosition={(e) => {
							sendJoystickPosition(e.detail);
						}}
						pad_or_joystick="joystick"
						size="60px"
						style={padJoystickStyleSetupToSet}
					/>
				{/if}
			</div>
			<div id="buttons">
				<div class="btn-group" style="margin-right:10px">
					<button disabled={configuration?.zoom?.in ? false : true} on:click={() => zoomAction("in")} class="btn btn-sm btn-light">
						<i class="bi bi-zoom-in" />
					</button>
					<button disabled={configuration?.zoom?.out ? false : true} on:click={() => zoomAction("out")} class="btn btn-sm btn-light">
						<i class="bi bi-zoom-out" />
					</button>
				</div>
				<button disabled={configuration?.home ? false : true} on:click={() => confirmGoToHome()} class="btn btn-sm btn-light">
					<i class="bi bi-house-door-fill" />
				</button>
				<button
					disabled={configuration?.clickToCenter ? false : true}
					on:click={() => selectZone()}
					class="btn btn-sm btn-{selectingZone ? 'primary' : 'light'}"
				>
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
				<button on:click={() => showGrid()} class="btn btn-{isGridOpen ? 'primary' : 'light'}">
					<i class="bi bi-grid-3x3" />
				</button>
				<button
					disabled={configuration?.joystick ? false : true}
					on:click={() => showJoystick()}
					class="btn btn-{dpadOrJoystick && dpadOrJoystick === 'dpad' ? 'light' : 'primary'}"
				>
					<i class="bi bi-joystick" />
				</button>
				<button disabled={configuration?.settings ? false : true} on:click={() => showSettings()} class="btn btn-light">
					<i class="bi bi-sliders" />
				</button>
				<!-- <button on:click={() => openPresetsModal()} class="btn btn-primary">
					<i class="bi bi-gear-fill" />
				</button> -->
			</div>
			<div id="presets_select">
				<button disabled={configuration?.addPreset ? false : true} on:click={() => confirmAddSceneToPresets()} class="btn btn-sm btn-light">
					<i class="bi bi-plus-circle-fill" />
				</button>
				<button
					disabled={configuration?.presets ? false : true}
					style="width:120px!important;display:inline-block!important"
					on:click={() => {
						openPresetsModal();
					}}
					class="btn btn-sm btn-{current_preset ? 'primary' : 'light'}">{current_preset} <i style="float:right" class="bi bi-arrow-down-up" /></button
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
