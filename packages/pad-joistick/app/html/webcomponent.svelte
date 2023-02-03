<svelte:options tag="hb-pad-joistick" />

<script lang="ts">
	import { get_current_component, onDestroy, onMount } from "svelte/internal";

	import { createEventDispatcher } from "svelte";
	import parseStyle from "style-to-object";
	import { addComponent, getChildStyleToPass } from "@htmlbricks/hb-jsutils/main";
	import type { Component } from "@app/types/webcomponent.type";

	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();

	function dispatch(name: string, detail: any) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}

	export let id: string;
	export let style: string;

	export let type: Component["type"];

	// let nipple: nipplejs.JoystickManager;

	let parsedStyle: { [x: string]: string };
	//  let componentStyleToSet: string = "";

	$: {
		if (!id) id = "";
		if (style) {
			parsedStyle = parseStyle(style);
			// componentStyleToSet = getChildStyleToPass(parsedStyle, componentStyleSetup?.vars);
		}
		if (!type) type = "dpad";
	}

	onMount(() => {
		// nipple = nipplejs.create({
		// 	zone: component.shadowRoot.getElementById("nipple"),
		// 	mode: "static",
		// 	position: { left: "50%", top: "50%" },
		// 	color: "red",
		// });
	});

	function sendArrow(direction: "up" | "right" | "down" | "left") {
		dispatch("sendDirection", { direction });
	}
</script>

{#if type === "dpad"}
	<div class="set">
		<nav class="d-pad">
			<button on:click={() => sendArrow("up")} class="up" />
			<button on:click={() => sendArrow("right")} class="right" />
			<button on:click={() => sendArrow("down")} class="down" />
			<button on:click={() => sendArrow("left")} class="left" />
		</nav>
	</div>
{/if}

<style lang="scss">
	@import "../styles/webcomponent.scss";
</style>
