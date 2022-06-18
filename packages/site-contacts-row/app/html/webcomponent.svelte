<svelte:options tag="hb-site-contacts-row" />

<script lang="ts">
	import { get_current_component, onDestroy, onMount } from "svelte/internal";

	import { createEventDispatcher } from "svelte";
	import parseStyle from "style-to-object";
	import { addComponent, getChildStyleToPass } from "@htmlbricks/hb-jsutils/main";
	import type { Component } from "@app/types/webcomponent.type";

	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();

	function dispatch(name, detail) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}

	export let id: string;
	export let style: string;

	export let addresses: Component["addresses"];
	export let phones: Component["phones"];
	export let emails: Component["emails"];
	export let websites: Component["websites"];

	let parsedStyle: { [x: string]: string };
	//  let componentStyleToSet: string = "";

	$: {
		if (!id) id = "";
		if (style) {
			parsedStyle = parseStyle(style);
			// componentStyleToSet = getChildStyleToPass(parsedStyle, componentStyleSetup?.vars);
		}
		if (typeof addresses === "string") {
			try {
				addresses = JSON.parse(addresses);
			} catch (err) {
				console.error("error parsing addresses", err);
			}
		}
		if (typeof phones === "string") {
			try {
				phones = JSON.parse(phones);
			} catch (err) {
				console.error("error parsing phones", err);
			}
		}
		if (typeof emails === "string") {
			try {
				emails = JSON.parse(emails);
			} catch (err) {
				console.error("error parsing emails", err);
			}
		}
		if (typeof websites === "string") {
			try {
				websites = JSON.parse(websites);
			} catch (err) {
				console.error("error parsing websites", err);
			}
		}
	}
</script>

<div>
	{#if addresses}
		<div>
			<div>icon</div>
			<div>name</div>
			<div>ul</div>
		</div>
	{/if}
	{#if phones}
		<div>
			<div>icon</div>
			<div>name</div>
			<div>ul</div>
		</div>
	{/if}
	{#if emails}
		<div>
			<div>icon</div>
			<div>name</div>
			<div>ul</div>
		</div>
	{/if}
	{#if websites}
		<div>
			<div>icon</div>
			<div>name</div>
			<div>ul</div>
		</div>
	{/if}
</div>

<style lang="scss">
	@import "../styles/webcomponent.scss";
	// @import "../styles/bootstrap.scss";
</style>
