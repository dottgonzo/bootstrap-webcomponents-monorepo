<svelte:options tag="hb-player-live-camera-ptz" />

<script lang="ts">
	import pkg from "../../package.json";

	import { get_current_component, onDestroy, onMount, text } from "svelte/internal";

	import { createEventDispatcher } from "svelte";
	import parseStyle from "style-to-object";
	import { addComponent, getChildStyleToPass } from "@htmlbricks/hb-jsutils/main";
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
				<hb-pad-joystick size="60px" style={padJoystickStyleSetupToSet} />
			</div>
			<div id="buttons">
				<button class="btn btn-sm btn-secondary">
					<i class="bi bi-zoom-in" />
				</button>
				<button class="btn btn-sm btn-secondary">
					<i class="bi bi-zoom-out" />
				</button>
			</div>
			<div id="speed"><input type="range" /></div>
			<div id="accurancy"><input type="range" /></div>
			<div id="presets_view">
				<button class="btn btn-secondary">
					<i class="bi bi-house-door-fill" />
				</button>
				<button class="btn btn-secondary">
					<i class="bi bi-gear-fill" />
				</button>
				<button class="btn btn-secondary">
					<i class="bi bi-plus-circle-fill" />
				</button>
			</div>
			<div id="presets_select">
				<select class="btn btn-primary">
					<option>ciao3</option>
					<option>ciao3</option>
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
