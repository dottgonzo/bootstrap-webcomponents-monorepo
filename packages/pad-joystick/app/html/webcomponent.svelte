<svelte:options tag="hb-pad-joystick" />

<script lang="ts">
	import { get_current_component, onDestroy, onMount } from "svelte/internal";

	import { createEventDispatcher } from "svelte";
	import parseStyle from "style-to-object";
	import JoyStick from "html5-joystick-new";

	import { addComponent, getChildStyleToPass } from "wc-js-utils/main";
	import type { Component, CardinalDirection } from "@app/types/webcomponent.type";

	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();

	function dispatch(name: string, detail: any) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}

	export let id: string;
	export let style: string;

	export let pad_or_joystick: Component["pad_or_joystick"];
	export let joystick_parameters: Component["joystick_parameters"];

	let joystick: JoyStick;

	// let nipple: nipplejs.JoystickManager;

	let parsedStyle: { [x: string]: string };
	//  let componentStyleToSet: string = "";

	$: {
		if (!id) id = "";
		if (style) {
			parsedStyle = parseStyle(style);
			// componentStyleToSet = getChildStyleToPass(parsedStyle, componentStyleSetup?.vars);
		}
		if (!pad_or_joystick) pad_or_joystick = "dpad";
	}

	onMount(() => {
		// nipple = nipplejs.create({
		// 	zone: component.shadowRoot.getElementById("nipple"),
		// 	mode: "static",
		// 	position: { left: "50%", top: "50%" },
		// 	color: "red",
		// });
		const joyEl = component.shadowRoot.getElementById("joystick");
		if (pad_or_joystick === "joystick" && !joystick && joyEl?.style) {
			const defaultInternalFillColor = "#F2eef6";
			const defaultInternalStrokeColor = "#Ece2f7";
			const defaultExternalStrokeColor = "silver";

			joystick = new JoyStick(joyEl, {
				parameters: {
					internalFillColor: joystick_parameters?.internalFillColor || defaultInternalFillColor,
					internalStrokeColor: joystick_parameters?.internalStrokeColor || defaultInternalStrokeColor,
					externalStrokeColor: joystick_parameters?.externalStrokeColor || defaultExternalStrokeColor,
				},
				callback: (pos: { x: number; y: number; cardinalDirection: CardinalDirection; xPosition: number; yPosition: number }) => {
					sendJoystickPosition({
						x: pos.x,
						y: pos.y,
						cardinalDirection: pos.cardinalDirection,
					});
				},
			});
		}
	});

	function sendArrow(direction: "up" | "right" | "down" | "left") {
		dispatch("sendDirection", { id, direction });
	}
	function sendJoystickPosition(pos: { x: number; y: number; cardinalDirection: CardinalDirection }) {
		dispatch("sendJoystickPosition", Object.assign({ id }, pos));
	}
</script>

{#if pad_or_joystick === "dpad"}
	<div class="set">
		<nav class="d-pad">
			<button on:click={() => sendArrow("up")} class="up" />
			<button on:click={() => sendArrow("right")} class="right" />
			<button on:click={() => sendArrow("down")} class="down" />
			<button on:click={() => sendArrow("left")} class="left" />
		</nav>
	</div>
{:else if pad_or_joystick === "joystick"}
	<div id="joystick" />
{:else}
	<div>Unknown type</div>
{/if}

<style lang="scss">
	@import "../styles/webcomponent.scss";
</style>
