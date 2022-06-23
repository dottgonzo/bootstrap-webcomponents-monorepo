<svelte:options tag="hb-dialogform" />

<script lang="ts">
	import { get_current_component, now } from "svelte/internal";
	import { createEventDispatcher } from "svelte";
	import { addComponent, getChildStyleToPass } from "@htmlbricks/hb-jsutils/main";
	import pkg from "../../package.json";
	import { styleSetup as formStyleSetup } from "../../node_modules/@htmlbricks/hb-form/release/docs";
	import { styleSetup as dialogStyleSetup } from "../../node_modules/@htmlbricks/hb-dialog/release/docs";
	import parseStyle from "style-to-object";
	import type { Component } from "@app/types/webcomponent.type";
	import type { Events as FormEvents } from "../../node_modules/@htmlbricks/hb-form/release/webcomponent.type";
	import type { Events as DialogEvents } from "../../node_modules/@htmlbricks/hb-dialog/release/webcomponent.type";

	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();
	function dispatch(name, detail) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}
	let dialogStyleToSet: string = "";
	let formStyleToSet: string = "";
	let parsedStyle: { [x: string]: string };

	export let id: string;
	export let style: string;
	export let show: Component["show"];
	export let schema: Component["schema"];
	export let dialogclasses: Component["dialogclasses"];
	export let title: Component["title"];
	export let backdrop: Component["backdrop"];
	export let keyboard: Component["keyboard"];
	export let describedby: Component["describedby"];
	export let labelledby: Component["labelledby"];
	export let content: Component["content"];
	export let closelabel: Component["closelabel"];
	export let confirmlabel: Component["confirmlabel"];
	$: {
		if (!id) id = "";
		if (style) {
			parsedStyle = parseStyle(style);
			dialogStyleToSet = getChildStyleToPass(parsedStyle, dialogStyleSetup?.vars);
			formStyleToSet = getChildStyleToPass(parsedStyle, formStyleSetup?.vars);
		}
		if (show === "yes" || (show as unknown) === "") show = "yes";
		else show = "no";
		// if (typeof schema === "string") {
		// 	try {
		// 		schema = JSON.parse(schema);
		// 	} catch (err) {
		// 		console.error("error parsing schema", err);
		// 	}
		// }
		if (!schema) schema = [];
		if (!describedby) describedby = "";
		if (!labelledby) labelledby = "";
		if (!content) content = "";
		if (!closelabel) closelabel = "";
		if (!confirmlabel) confirmlabel = "";
		if (!dialogclasses) dialogclasses = "";
		if (!title) title = "";
		if (typeof backdrop === "string") backdrop = backdrop === "true" || backdrop === "yes";
		else if (backdrop === undefined) backdrop = true;
		if (typeof keyboard === "string") keyboard = keyboard === "true" || keyboard === "yes";
		else if (keyboard === undefined) keyboard = true;
	}
	addComponent({ repoName: "@htmlbricks/hb-dialog", version: pkg.version });
	addComponent({ repoName: "@htmlbricks/hb-form", version: pkg.version });
	let formValues: any;
	function modalShow(detail: DialogEvents["modalShow"]) {
		show = detail.show ? "yes" : "no";
		dispatch("modalShow", detail);
	}
	function changeForm(detail: FormEvents["change"]) {
		if (detail._valid) formIsValid = true;
		else formIsValid = false;
		delete detail._id;
		formValues = detail;
	}
	function formSubmit(detail: DialogEvents["modalConfirm"]) {
		if (detail.confirm && formValues && formValues._valid) {
			const newValues = Object.assign({}, formValues, { _id: id });
			dispatch("modalFormConfirm", newValues);
		} else if (!detail.confirm) {
			console.warn("form submit cancelled");
		} else {
			console.error("form submit invalid");
		}
	}
	let formIsValid: boolean = false;
</script>

<span>
	<hb-dialog
		style={dialogStyleToSet}
		disable_confirm={formIsValid ? "no" : "yes"}
		id={id ? id + "_modalform" : "modalform" + Date.now()}
		{show}
		{title}
		{confirmlabel}
		{content}
		{closelabel}
		on:modalConfirm={(e) => {
			formSubmit(e.detail);
		}}
		on:modalShow={(e) => {
			modalShow(e.detail);
		}}
	>
		<div slot="body-content">
			<div><slot name="form-header" /></div>
			<div><hb-form style={formStyleToSet} {schema} on:change={(e) => changeForm(e.detail)} hide_submit="yes" /></div>
			<div><slot name="form-footer" /></div>
		</div>
		{#if $$slots.header}
			<div slot="header">
				<slot name="header" />
			</div>
		{/if}
		{#if $$slots["modal-footer"]}
			<div slot="modal-footer">
				<slot name="modal-footer" />
			</div>
		{/if}
		{#if $$slots.footer}
			<div slot="footer">
				<slot name="footer" />
			</div>
		{/if}
		{#if $$slots["close-button-label"]}
			<div slot="close-button-label">
				<slot name="close-button-label" />
			</div>
		{/if}
		{#if $$slots["confirm-button-label"]}
			<div slot="confirm-button-label">
				<slot name="confirm-button-label" />
			</div>
		{/if}
	</hb-dialog>
</span>

<style lang="scss">
	// @import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";

	// .modal {
	// 	display: block;
	// }
</style>
