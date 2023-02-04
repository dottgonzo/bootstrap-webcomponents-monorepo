<svelte:options tag="hb-player-live-camera-ptz" />

<script lang="ts">
	import pkg from "../../package.json";

	import { get_current_component, onDestroy, onMount, text } from "svelte/internal";

	import { createEventDispatcher } from "svelte";
	import parseStyle from "style-to-object";
	import { addComponent, getChildStyleToPass } from "@htmlbricks/hb-jsutils/main";
	import type { Events as padJoystickEvents } from "@htmlbricks/hb-pad-joystick/release/webcomponent.type";
	import type { Component as PlayerLiveComponent } from "@htmlbricks/hb-player-live/release/webcomponent.type";
	import type { Events as PlayerLiveEvents } from "@htmlbricks/hb-player-live/release/webcomponent.type";
	import type { Component } from "@app/types/webcomponent.type";

	import { styleSetup as playerLiveStyleSetup } from "../../node_modules/@htmlbricks/hb-player-live/release/docs";
	import { styleSetup as padJoystickStyleSetup } from "../../node_modules/@htmlbricks/hb-pad-joystick/release/docs";

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

	let parsedStyle: { [x: string]: string };

	let playerLiveStyleSetupToSet: string = "";
	let padJoystickStyleSetupToSet: string = "";

	$: {
		if (!live_uri) live_uri = "";
		if (!id) id = "";
		if (style) {
			parsedStyle = parseStyle(style);
			playerLiveStyleSetupToSet = getChildStyleToPass(parsedStyle, playerLiveStyleSetup?.vars);
			padJoystickStyleSetupToSet = getChildStyleToPass(parsedStyle, padJoystickStyleSetup?.vars);
		}
		if (!presets) presets = [];
	}
	function zoomAction(direction: "in" | "out") {
		dispatch("zoomAction", { id, direction });
	}
	function goToHome() {
		dispatch("goToHome", { id });
	}
	function addAsPreset() {
		dispatch("addAsPreset", { id });
	}
	function openPresetsModal() {}
	function changeAccuracy(e: any) {}
	function changeSpeed(e: any) {}
	function changePreset(e: any) {
		const presetClick = e.target.value;
		const preset = presets.find((p) => p.id === presetClick);
		if (preset) dispatch("changePreset", Object.assign({ playerId: id }, preset));
		else console.error("Preset not found");
	}
	function sendJoystickPosition(position: padJoystickEvents["sendJoystickPosition"]) {
		dispatch("sendJoystickPosition", { id, x: position.x, y: position.y, cardinalDirection: position.cardinalDirection, joyId: position.id });
	}
	function sendDirection(direction: padJoystickEvents["sendDirection"]) {
		dispatch("sendDirection", { id, direction: direction.direction, joyId: direction.id });
	}
	addComponent({ repoName: "@htmlbricks/hb-player-live", version: pkg.version });
	addComponent({ repoName: "@htmlbricks/hb-pad-joystick", version: pkg.version });
</script>

<svelte:head>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@latest/font/bootstrap-icons.css" />
</svelte:head>
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
				<button on:click={() => zoomAction("in")} class="btn btn-sm btn-secondary">
					<i class="bi bi-joystick" />
				</button>
				<button on:click={() => zoomAction("in")} class="btn btn-sm btn-secondary">
					<i class="bi bi-square" />
				</button>
			</div>
			<div id="speed">
				<input
					on:input={(e) => {
						changeSpeed(e);
					}}
					type="range"
				/>
			</div>
			<div id="accurancy">
				<input
					on:input={(e) => {
						changeAccuracy(e);
					}}
					type="range"
				/>
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
			<div id="presets_buttons" />
		</div>
	</div>
</div>

<style lang="scss">
	@import "../styles/webcomponent.scss";
	@import "../styles/bootstrap.scss";
</style>
