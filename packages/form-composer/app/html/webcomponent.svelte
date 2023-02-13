<svelte:options tag="hb-form-composer" />

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

	export let string: string;
	export let json: Component["json"];
	export let boolean: boolean;

	let parsedStyle: { [x: string]: string };
	//  let componentStyleToSet: string = "";

	$: {
		if (!id) id = "";
		if (style) {
			parsedStyle = parseStyle(style);
			// componentStyleToSet = getChildStyleToPass(parsedStyle, componentStyleSetup?.vars);
		}
		if (!string) string = "";

		// json
		if (typeof json === "string") {
			try {
				json = JSON.parse(json);
			} catch (err) {
				console.error("error parsing json", err);
			}
		}
		// boolean
		if (boolean === ("" as unknown)) boolean = true;
		if (typeof boolean === "string") boolean = boolean === "no" || boolean === "false" ? false : true;
		if (!boolean) boolean = false;
	}

	function dispatchCustomEvent() {
		dispatch("event", { test: true });
	}
</script>

TO BE DONE

<style lang="scss">
	@import "../styles/webcomponent.scss";
	// @import "../styles/bootstrap.scss";
</style>
