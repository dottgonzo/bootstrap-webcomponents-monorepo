<svelte:options tag="hb-messages-topics-card" />

<script lang="ts">
	import pkg from "../../package.json";

	import { get_current_component, onDestroy, onMount } from "svelte/internal";

	import { createEventDispatcher } from "svelte";
	import parseStyle from "style-to-object";
	import { addComponent, getChildStyleToPass } from "@htmlbricks/hb-jsutils/main";
	import type { Component as messageListComponent } from "@htmlbricks/hb-messages-list/release/webcomponent.type";
	import type { Events as messageSendEvents } from "@htmlbricks/hb-messages-send/release/webcomponent.type";
	import type { Component } from "@app/types/webcomponent.type";

	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();

	function dispatch(name, detail) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}
	export let id: string;
	export let style: string;

	export let time: string;
	export let title: string;
	export let text: string;
	export let img_uri: string;
	export let counter: number;

	let parsedStyle: { [x: string]: string };
	//  let componentStyleToSet: string = "";

	let localeTimeString: string;

	$: {
		if (!id) id = "";
		if (style) {
			parsedStyle = parseStyle(style);
		}

		if (typeof counter === "string") {
			try {
				counter = Number(counter);
			} catch (err) {
				console.error("error parsing counter", err);
			}
		}

		localeTimeString = time ? new Date(time).toLocaleTimeString() : "";
	}
</script>

<div id="grid">
	<img src={img_uri} alt={img_uri} />
	<div id="header">
		<span class="text-item" id="title">{title}</span>
		<span class="text-item right" id="time">{localeTimeString}</span>
	</div>
	<div id="details">
		<span id="description" class="text-item">{text}</span>
		<span id="counter" class="text-item right">{counter.toString()}</span>
	</div>
</div>

<style lang="scss">
	@import "../styles/webcomponent.scss";
	// @import "../styles/bootstrap.scss";
</style>
