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
	export let is_ptz_connected: Component["is_ptz_connected"];
	export let is_ptz_panel_opened: Component["is_ptz_panel_opened"];

	let htmlVideoElement: HTMLVideoElement;

	let parsedStyle: { [x: string]: string };

	let playerLiveStyleSetupToSet: string = "";
	let padJoystickStyleSetupToSet: string = "";
	let tableStyleSetupToSet: string = "";
	let dialogStyleSetupToSet: string = "";
	let selectedPresetToken = "";
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
			label: "Token",
			key: "token",
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
	type Trect = { top: number; left: number; width: number; height: number };

	let isVideoPaused: boolean;
	let isVideoPlaying: boolean;
	let isVideoLoaded = false;

	let showTablePresets = false;
	let showConfirmAddSceneToPreset = false;
	let showConfirmDeletePreset = false;
	let showConfirmGoToPreset = false;
	let showGoToHomeConfirm = false;
	let isGridOpen = false;
	let dpadOrJoystick: "dpad" | "joystick" = "dpad";
	let selectingZone = false;
	let rect: Trect = { top: 0, left: 0, width: 0, height: 0 };
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

		if ((is_ptz_connected as unknown as string) === "") is_ptz_connected = true;
		if (!is_ptz_connected) is_ptz_connected = false;
		if (typeof is_ptz_connected === "string") is_ptz_connected = is_ptz_connected === "true" || is_ptz_connected === "yes" ? true : false;

		if ((is_ptz_panel_opened as unknown as string) === "") is_ptz_panel_opened = true;
		if (!is_ptz_panel_opened) is_ptz_panel_opened = false;
		if (typeof is_ptz_panel_opened === "string") is_ptz_panel_opened = is_ptz_panel_opened === "true" || is_ptz_panel_opened === "yes" ? true : false;

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
					_id: p.token + "_" + p.name,
					name: p.name,
					token: p.token,
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
		const zoomActionEventPayload: Events["zoomAction"] = { time: new Date(), id, movementSettings, direction };

		dispatch("zoomAction", zoomActionEventPayload);
	}
	function goToHome() {
		if (!configuration.home) return console.error("Go to home is not enabled in the configuration");
		const goToHomeEventPayload: Events["goToHome"] = { time: new Date(), id, movementSettings };
		dispatch("goToHome", { id, movementSettings });
	}
	function setPreset() {
		if (!configuration.addPreset) return console.error("Add scene to preset is not enabled in the configuration");
		const addAsPresetEventPayload: Events["setPreset"] = { time: new Date(), id };

		dispatch("setPreset", addAsPresetEventPayload);
	}
	function goToSelectedArea() {
		if (!configuration?.clickToCenter) return console.error("Click to center is not enabled in the configuration");
		const videoRect = htmlVideoElement.getBoundingClientRect();
		const goToSelectedAreaEventPayload: Events["goToSelectedArea"] = Object.assign(
			{ time: new Date(), id, movementSettings, htmlVideoElementWidth: videoRect.width, htmlVideoElementHeight: videoRect.height },
			rect,
		);

		dispatch("goToSelectedArea", goToSelectedAreaEventPayload);
		selectingZone = false;
		rect = { top: 0, left: 0, width: 0, height: 0 };
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
	function goToPreset(token: string) {
		if (!configuration.switchPreset) return console.error("Switch preset is not enabled in the configuration");

		const preset = presets.find((p) => p.token === token);
		if (preset) {
			const goToPresetEventPayload: Events["goToPreset"] = Object.assign({ time: new Date(), playerId: id, movementSettings }, preset);

			dispatch("goToPreset", goToPresetEventPayload);
		} else console.error("Preset not found");
	}

	function initializeVideo() {
		const initVideoEventPayload: Events["initVideo"] = { time: new Date(), id, htmlVideoElement };
		dispatch("initVideo", initVideoEventPayload);

		htmlVideoElement.onloadedmetadata = () => {
			isVideoLoaded = true;
		};
		htmlVideoElement.onpause = () => {
			isVideoPaused = true;
			isVideoPlaying = false;
		};
		htmlVideoElement.onplay = () => {
			isVideoPaused = false;
			isVideoPlaying = true;
		};
		htmlVideoElement.onclick = (element_click) => {
			if (selectingZone) {
				const containerPos = htmlVideoElement.getBoundingClientRect();

				const newClick = { x: element_click.clientX - containerPos.left, y: element_click.clientY - containerPos.top, width: 0, height: 0 };
				if (!rectClicks.start) {
					rectClicks = { start: newClick };
				} else {
					rectClicks = { start: rectClicks.start, end: newClick };
					goToSelectedArea();
				}
			}
		};
		htmlVideoElement.onmousemove = (element_click) => {
			if (selectingZone) {
				const newClick = {
					x: element_click.clientX,
					y: element_click.clientY,
				};
				if (rectClicks.start) {
					rectClicks = { start: rectClicks.start, end: newClick };
					rect = {
						top: rectClicks.start.y > rectClicks.end.y ? rectClicks.end.y : rectClicks.start.y,
						left: rectClicks.start.x > rectClicks.end.x ? rectClicks.end.x : rectClicks.start.x,
						width: Math.abs((rectClicks?.start?.x || 0) - (rectClicks?.end?.x || 0)),
						height: Math.abs((rectClicks?.start?.y || 0) - (rectClicks?.end?.y || 0)),
					};
				}
			}
		};
	}

	function deletePreset(token: string) {
		if (!configuration.deletePreset) return console.error("Delete preset is not enabled in the configuration");

		const preset = presets.find((p) => p.token === token);
		if (preset) {
			const deletePresetEventPayload: Events["deletePreset"] = Object.assign({ time: new Date(), playerId: id }, preset);

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
		console.log(c, "presetclick");
		showTablePresets = false;
		const presetToken = presets.find((f) => c.itemId.includes(f.token + "_"))?.token;
		selectedPresetToken = presetToken;

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

	function playOrPauseVideo() {
		if (!htmlVideoElement) return console.error("Video element not found");
		if (htmlVideoElement.paused) htmlVideoElement.play();
		else htmlVideoElement.pause();
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
		if (e?.detail?.confirm) setPreset();
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
	id={"del_" + selectedPresetToken}
	on:modalShow={(s) => {
		showConfirmDeletePreset = s.detail.show;
	}}
	title="Go to Preset {selectedPresetToken ? presets.find((f) => f.token === selectedPresetToken)?.token : ''}"
	show={showConfirmDeletePreset ? "yes" : "no"}
	confirmlabel="delete"
	confirm_btn_class="danger"
	on:modalConfirm={(e) => {
		console.log(e.detail, "detail");
		if (e?.detail?.confirm) deletePreset(e.detail.id.split("del_")[1]);
	}}
>
	<div slot="body-content">Are You sure to DELETE preset {selectedPresetToken ? presets.find((f) => f.token === selectedPresetToken)?.token : ""}?</div>
</hb-dialog>

<!-- This Dialog allows to confirm the Go To Preset -->

<hb-dialog
	id={"goto_" + selectedPresetToken}
	on:modalShow={(s) => {
		showConfirmGoToPreset = s.detail.show;
	}}
	title="Go to Preset {selectedPresetToken ? presets.find((f) => f.token === selectedPresetToken)?.token : ''}"
	show={showConfirmGoToPreset ? "yes" : "no"}
	confirmlabel="go"
	confirm_btn_class="light"
	on:modalConfirm={(e) => {
		console.log(e.detail.id.split("goto")[1], "detail");
		if (e?.detail?.confirm) goToPreset(e.detail.id.split("goto_")[1]);
	}}
>
	<div slot="body-content">Are You sure to GO to preset "{selectedPresetToken ? presets.find((f) => f.token === selectedPresetToken)?.token : ""}"?</div>
</hb-dialog>

<div
	id="container"
	style="cursor: {selectingZone ? 'crosshair' : ''};"
	on:mousemove={(element_click) => {
		if (selectingZone) {
			const containerPos = htmlVideoElement.getBoundingClientRect();

			const newClick = {
				x: element_click.clientX - containerPos.left,
				y: element_click.clientY - containerPos.top,
			};
			if (rectClicks.start) {
				rectClicks = { start: rectClicks.start, end: newClick };
				rect = {
					top: rectClicks.start.y > rectClicks.end.y ? rectClicks.end.y : rectClicks.start.y,
					left: rectClicks.start.x > rectClicks.end.x ? rectClicks.end.x : rectClicks.start.x,
					width: Math.abs((rectClicks?.start?.x || 0) - (rectClicks?.end?.x || 0)),
					height: Math.abs((rectClicks?.start?.y || 0) - (rectClicks?.end?.y || 0)),
				};
			}
		}
	}}
>
	<hb-player-live
		on:htmlVideoInit={(e) => {
			console.log(e.detail, "detailvid");
			htmlVideoElement = e.detail.htmlVideoElement;
			initializeVideo();
		}}
		no_controls="yes"
		id="player"
		mediauri={live_uri}
		style={playerLiveStyleSetupToSet}
	/>
	<div
		id="area_selector"
		style="display:{selectingZone ? 'inherit' : 'none'}; width:{rect.width}px; height:{rect.height}px;top:{rect.top}px;left:{rect.left}px;"
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
	{#if is_ptz_connected}
		{#if is_ptz_panel_opened}
			<div id="controller">
				<div id="panel">
					<div id="joystick" class="area">
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
					<div id="buttons" class="area">
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
					<div id="speed" class="area">
						<span class="slider_label">speed:</span> <input class="range" type="range" bind:value={movementSettings.speed} />
					</div>
					<div id="precision" class="area">
						<span class="slider_label">precision:</span> <input class="range" type="range" bind:value={movementSettings.precision} />
					</div>
					<div id="presets_view" class="area">
						<button on:click={() => showGrid()} class="btn btn-sm btn-{isGridOpen ? 'primary' : 'light'}">
							<i class="bi bi-grid-3x3" />
						</button>
						<button
							disabled={configuration?.joystick ? false : true}
							on:click={() => showJoystick()}
							class="btn btn-sm btn-{dpadOrJoystick && dpadOrJoystick === 'dpad' ? 'light' : 'primary'}"
						>
							<i class="bi bi-joystick" />
						</button>

						<button style="float:right;margin-right:5px;" on:click={() => htmlVideoElement.requestFullscreen()} class="btn btn-sm btn-light">
							<i class="bi bi-arrows-fullscreen" />
						</button>
						<!-- <button on:click={() => openPresetsModal()} class="btn btn-primary">
					<i class="bi bi-gear-fill" />
				</button> -->
					</div>
					<div id="presets_select" class="area">
						<button disabled={configuration?.addPreset ? false : true} on:click={() => confirmAddSceneToPresets()} class="btn btn-sm btn-light">
							<i class="bi bi-plus-circle-fill" />
						</button>
						<button
							disabled={configuration?.presets ? false : true}
							style="width:130px!important;display:inline-block!important"
							on:click={() => {
								openPresetsModal();
							}}
							class="btn btn-sm btn-{current_preset ? 'primary' : 'light'}"
							>{current_preset} <i style="float:right" class="bi bi-arrow-down-up" /></button
						>
						<!-- <select
					on:change={(e) => {
						goToPreset(e);
					}}
					class="btn btn-primary"
					bind:value={current_preset}
				>
					{#each presets as preset (preset.id)}
						<option value={preset.id}>{preset.label || preset.id}</option>
					{/each}
				</select> -->
					</div>
					<div id="presets_buttons" class="area">
						<button
							disabled={!isVideoLoaded}
							on:click={() => (htmlVideoElement.muted = !htmlVideoElement.muted)}
							class="btn btn-sm btn-{isVideoLoaded ? (htmlVideoElement?.muted ? 'warning' : 'primary') : 'light'}"
						>
							<i class="bi bi-{htmlVideoElement?.muted || !htmlVideoElement ? 'volume-mute-fill' : 'volume-up-fill'}" />
						</button>
						<button
							disabled={!isVideoLoaded}
							on:click={() => playOrPauseVideo()}
							class="btn btn-sm btn-{isVideoLoaded ? (isVideoPlaying ? 'primary' : 'warning') : 'light'}"
						>
							<i class="bi bi-{isVideoPaused || !htmlVideoElement ? 'pause-fill' : 'play'}" />
						</button>
						<button disabled={configuration?.settings ? false : true} on:click={() => showSettings()} class="btn btn-sm btn-light">
							<i class="bi bi-sliders" />
							<span class="timecell">
								<!-- <i class="bi bi-clock" /> -->
								<span>{time}</span>
							</span>
						</button>
					</div>
				</div>
			</div>
		{/if}
		<div
			id="opener"
			on:click={() => {
				is_ptz_panel_opened = !is_ptz_panel_opened;
				dispatch("panelMove", { id, opened: is_ptz_panel_opened });
			}}
			style="left:{is_ptz_panel_opened ? '500' : '0'}px;"
		>
			<i class="bi-{is_ptz_panel_opened ? 'caret-left-fill' : 'caret-right-fill'}" />
		</div>
	{/if}
</div>

<style lang="scss">
	@import "../styles/webcomponent.scss";
	@import "../styles/bootstrap.scss";
</style>
