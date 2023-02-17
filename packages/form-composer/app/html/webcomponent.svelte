<svelte:options tag="hb-form-composer" />

<script lang="ts">
	import pkg from "../../package.json";

	import { get_current_component, onDestroy, onMount } from "svelte/internal";

	import { createEventDispatcher } from "svelte";
	import parseStyle from "style-to-object";
	import { addComponent, getChildStyleToPass } from "wc-js-utils/main";
	import type { Component } from "@app/types/webcomponent.type";
	import { styleSetup as formStyleSetup } from "../../node_modules/@htmlbricks/hb-form/release/docs";
	import type { Component as FormComponent, Events as FormEvents } from "../../node_modules/@htmlbricks/hb-form/release/webcomponent.type";

	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();

	function dispatch(name: string, detail: any) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}

	export let id: string;
	export let style: string;
	export let debug: boolean;

	let outputSchema: FormComponent["schema"] = [];

	const schema4selector: FormComponent["schema"] = [
		{
			type: "text",
			placeholder: "Label...",
			id: "label",
			required: true,
			label: "Property Label",
			validationTip: "This field cannot be empty.",
		},
		{
			type: "select",
			placeholder: "Select something here...",
			id: "type",
			required: true,
			label: "Selection of something",
			validationTip: "This field cannot be empty.",
			params: {
				options: [
					{ label: "", value: "" },
					{ label: "text", value: "text" },
					{ label: "textarea", value: "textarea" },
					{ label: "number", value: "number" },
					{ label: "select", value: "select" },
					{ label: "radio", value: "radio" },
				],
			},
		},
		{
			type: "checkbox",
			placeholder: "Required...",
			id: "required",
			label: "Is Required?",
		},
		{
			type: "checkbox",
			placeholder: "Conditional...",
			id: "conditional",
			label: "Is Conditional?",
		},

		{
			type: "number",
			placeholder: "Min Length...",
			id: "minLength",
			label: "Min Length",
			dependencies: [
				{
					id: "type",
					values: ["text", "textarea"],
				},
			],
		},
		{
			type: "number",
			placeholder: "Max Length...",
			id: "maxLength",
			label: "Max Length",
			dependencies: [
				{
					id: "type",
					values: ["text", "textarea"],
				},
			],
		},
	];

	let parsedStyle: { [x: string]: string };
	//  let componentStyleToSet: string = "";
	let formStyleToSet: string = "";
	onMount(() => {
		addComponent({ repoName: "@htmlbricks/hb-form", version: pkg.version });
	});
	$: {
		if (!id) id = "";
		if (style) {
			parsedStyle = parseStyle(style);
			formStyleToSet = getChildStyleToPass(parsedStyle, formStyleSetup?.vars);
		}
		if (typeof debug === "string" && (debug === "true" || debug === "yes" || debug === "")) debug = true;
		else debug = false;
	}

	function dispatchCustomEvent() {
		dispatch("event", { test: true });
	}
	function changeItemSchema(customEvent: FormEvents["change"]) {
		console.log("changeItemSchema", customEvent);
	}
	function addSchema(e: any) {
		console.log("addSchema", e);
		switch (e.type) {
			case "textarea":
			case "text":
				outputSchema = [
					...outputSchema,
					{
						id: e.id,
						type: e.type,
						label: e.label,
						required: e.required,
						placeholder: e.placeholder,
						params: e.params,
					},
				];
				break;
		}
	}
</script>

TO BE DONE
<br />
<br />
<hb-form
	on:submit={(e) => {
		addSchema(e.detail);
	}}
	hide_submit={outputSchema?.length ? "yes" : "no"}
	on:change={(e) => changeItemSchema(e.detail)}
	schema={JSON.stringify(schema4selector)}
/>
{#each outputSchema as sch (sch.id)}
	<hb-form
		on:submit={(e) => {
			addSchema(e.detail);
		}}
		on:change={(e) => changeItemSchema(e.detail)}
		schema={JSON.stringify(schema4selector)}
	/>
{/each}
{#if debug}
	<h2 style="margin:60px;text-align:center;color:blue">output</h2>

	{#if outputSchema?.length}
		<hb-form schema={JSON.stringify(outputSchema)} style={formStyleToSet} />
	{:else}
		...no output
	{/if}
{/if}

<style lang="scss">
	@import "../styles/webcomponent.scss";
	// @import "../styles/bootstrap.scss";
</style>
