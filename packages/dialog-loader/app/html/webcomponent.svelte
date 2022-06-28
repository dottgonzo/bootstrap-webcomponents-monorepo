<svelte:options tag="hb-dialog-loader" />

<script lang="ts">
	import { get_current_component } from "svelte/internal";
	import { createEventDispatcher } from "svelte";
	import pkg from "../../package.json";
	import axios, { type AxiosRequestConfig } from "axios";
	import { addComponent, getChildStyleToPass } from "@htmlbricks/hb-jsutils/main";
	import parseStyle from "style-to-object";
	let parsedStyle: { [x: string]: string };
	import { styleSetup as dialogStyleSetup } from "../../node_modules/@htmlbricks/hb-dialog/release/docs";
	import type { Component } from "@app/types/webcomponent.type";
	let dialogStyleToSet: string = "";

	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();
	function dispatch(name, detail) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}

	addComponent({ repoName: "@htmlbricks/hb-dialog", version: pkg.version });

	export let id: string;
	export let style: string;
	export let percentage: number;
	export let title: string;

	let completed: boolean;
	$: {
		if (!percentage) percentage = 0;
		else if (typeof percentage === "string") percentage = parseInt(percentage);

		if (!id) id = null;
		if (!title) title = "loading";
		if (style) {
			parsedStyle = parseStyle(style);
			dialogStyleToSet = getChildStyleToPass(parsedStyle, dialogStyleSetup?.vars);
		}
		if (!completed) completed = false;
	}

	function dialogShowEvent(d: { id: string; show: true }) {
		dispatch("modalShow", d);
	}
</script>

<hb-dialog style={dialogStyleToSet} show={percentage ? "yes" : "no"} on:modalShow={(d) => dialogShowEvent(d.detail)}>
	<span slot="title">
		<slot name="title">{title}</slot>
	</span>
	<div slot="body-content">
		<div class="progress">
			<div
				class="progress-bar"
				style="width:{Math.round(percentage)}%"
				role="progressbar"
				aria-valuenow={Math.round(percentage)}
				aria-valuemin="0"
				aria-valuemax="100"
			>
				{Math.round(percentage)}%
			</div>
		</div>
	</div>
	<span slot="modal-footer" />
</hb-dialog>

<style lang="scss">
	@import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
</style>
