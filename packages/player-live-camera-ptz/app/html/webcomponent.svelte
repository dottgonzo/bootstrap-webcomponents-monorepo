<svelte:options tag="hb-messages-box" />

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

	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();

	function dispatch(name, detail) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}
	export let id: string;
	export let style: string;

	let parsedStyle: { [x: string]: string };

	let playerLiveStyleSetupToSet: string = "";

	$: {
		if (!id) id = "";
		if (style) {
			parsedStyle = parseStyle(style);
			playerLiveStyleSetupToSet = getChildStyleToPass(parsedStyle, playerLiveStyleSetup?.vars);
		}
	}

	addComponent({ repoName: "@htmlbricks/hb-player-live", version: pkg.version });
</script>

<hb-player-live style={playerLiveStyleSetupToSet} />

<style lang="scss">
	@import "../styles/webcomponent.scss";
	// @import "../styles/bootstrap.scss";
</style>
