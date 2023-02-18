<svelte:options tag="hb-form-composer" />

<script lang="ts">
	import pkg from "../../package.json";

	import { get_current_component, onMount } from "svelte/internal";

	import { createEventDispatcher } from "svelte";
	import parseStyle from "style-to-object";
	import { addComponent, getChildStyleToPass } from "wc-js-utils/main";
	import type { Component } from "@app/types/webcomponent.type";
	import { styleSetup as formStyleSetup } from "../../node_modules/@htmlbricks/hb-form/release/docs";
	import { styleSetup as tableStyleSetup } from "../../node_modules/@htmlbricks/hb-table/release/docs";
	import type { Component as FormComponent, Events as FormEvents } from "../../node_modules/@htmlbricks/hb-form/release/webcomponent.type";
	import type { Component as TableComponent, Events as TableEvents } from "../../node_modules/@htmlbricks/hb-table/release/webcomponent.type";

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
					{ label: "email", value: "email" },
					{ label: "number", value: "number" },
					{ label: "select", value: "select" },
					{ label: "radio", value: "radio" },
					{ label: "checkbox", value: "checkbox" },
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
		{
			type: "text",
			placeholder: "Option Label...",
			id: "optionLabel1",
			label: "Option Label",
			dependencies: [
				{
					id: "type",
					values: ["select", "radio"],
				},
			],
		},
		{
			type: "text",
			placeholder: "Option Values (separated by comma)...",
			id: "optionValues1",
			label: "Option Values",
			dependencies: [
				{
					id: "type",
					values: ["select", "radio"],
				},
			],
		},
		{
			type: "text",
			placeholder: "Option Label...",
			id: "optionLabel2",
			label: "Option Label",
			dependencies: [
				{
					id: "optionLabel1",
				},
				{
					id: "optionValues1",
				},
			],
		},
		{
			type: "text",
			placeholder: "Option Values (separated by comma)...",
			id: "optionValues2",
			label: "Option Values",
			dependencies: [
				{
					id: "optionLabel1",
				},
				{
					id: "optionValues1",
				},
			],
		},
		{
			type: "text",
			placeholder: "Option Label...",
			id: "optionLabel3",
			label: "Option Label",
			dependencies: [
				{
					id: "optionLabel2",
				},
				{
					id: "optionValues2",
				},
			],
		},
		{
			type: "text",
			placeholder: "Option Values (separated by comma)...",
			id: "optionValues3",
			label: "Option Values",
			dependencies: [
				{
					id: "optionLabel2",
				},
				{
					id: "optionValues2",
				},
			],
		},
		{
			type: "text",
			placeholder: "Option Label...",
			id: "optionLabel4",
			label: "Option Label",
			dependencies: [
				{
					id: "optionLabel3",
				},
				{
					id: "optionValues3",
				},
			],
		},
		{
			type: "text",
			placeholder: "Option Values (separated by comma)...",
			id: "optionValues4",
			label: "Option Values",
			dependencies: [
				{
					id: "optionLabel3",
				},
				{
					id: "optionValues3",
				},
			],
		},
		{
			type: "text",
			placeholder: "Option Label...",
			id: "optionLabel5",
			label: "Option Label",
			dependencies: [
				{
					id: "optionLabel4",
				},
				{
					id: "optionValues4",
				},
			],
		},
		{
			type: "text",
			placeholder: "Option Values (separated by comma)...",
			id: "optionValues5",
			label: "Option Values",
			dependencies: [
				{
					id: "optionLabel4",
				},
				{
					id: "optionValues4",
				},
			],
		},
		{
			type: "text",
			placeholder: "Option Label...",
			id: "optionLabel6",
			label: "Option Label",
			dependencies: [
				{
					id: "optionLabel5",
				},
				{
					id: "optionValues5",
				},
			],
		},
		{
			type: "text",
			placeholder: "Option Values (separated by comma)...",
			id: "optionValues6",
			label: "Option Values",
			dependencies: [
				{
					id: "optionLabel5",
				},
				{
					id: "optionValues5",
				},
			],
		},
		{
			type: "text",
			placeholder: "Option Label...",
			id: "optionLabel7",
			label: "Option Label",
			dependencies: [
				{
					id: "optionLabel6",
				},
				{
					id: "optionValues6",
				},
			],
		},
		{
			type: "text",
			placeholder: "Option Values (separated by comma)...",
			id: "optionValues7",
			label: "Option Values",
			dependencies: [
				{
					id: "optionLabel6",
				},
				{
					id: "optionValues6",
				},
			],
		},
		{
			type: "text",
			placeholder: "Option Label...",
			id: "optionLabel8",
			label: "Option Label",
			dependencies: [
				{
					id: "optionLabel7",
				},
				{
					id: "optionValues7",
				},
			],
		},
		{
			type: "text",
			placeholder: "Option Values (separated by comma)...",
			id: "optionValues8",
			label: "Option Values",
			dependencies: [
				{
					id: "optionLabel7",
				},
				{
					id: "optionValues7",
				},
			],
		},
		{
			type: "text",
			placeholder: "Option Label...",
			id: "optionLabel9",
			label: "Option Label",
			dependencies: [
				{
					id: "optionLabel8",
				},
				{
					id: "optionValues8",
				},
			],
		},
		{
			type: "text",
			placeholder: "Option Values (separated by comma)...",
			id: "optionValues9",
			label: "Option Values",
			dependencies: [
				{
					id: "optionLabel8",
				},
				{
					id: "optionValues8",
				},
			],
		},
		{
			type: "text",
			placeholder: "Option Label...",
			id: "optionLabel10",
			label: "Option Label",
			dependencies: [
				{
					id: "optionLabel9",
				},
				{
					id: "optionValues9",
				},
			],
		},
		{
			type: "text",
			placeholder: "Option Values (separated by comma)...",
			id: "optionValues10",
			label: "Option Values",
			dependencies: [
				{
					id: "optionLabel9",
				},
				{
					id: "optionValues9",
				},
			],
		},
	];

	let schema4selectorS: { counter: number; schema: string }[];

	let parsedStyle: { [x: string]: string };
	//  let componentStyleToSet: string = "";
	let formStyleToSet: string = "";
	let tableStyleToSet: string = "";
	let formComponent: HTMLElement;
	const tableHeaders: TableComponent["headers"] = [
		{
			label: "Label",
			key: "label",
		},
		{
			label: "type",
			key: "type",
		},
		{
			label: "options",
			key: "options",
			nosort: true,
		},
		{
			label: "params",
			key: "params",
			nosort: true,
		},
		{
			label: "required",
			key: "required",
		},
	];
	let tableRows: TableComponent["rows"];
	onMount(() => {
		addComponent({ repoName: "@htmlbricks/hb-form", version: pkg.version });
		addComponent({ repoName: "@htmlbricks/hb-table", version: pkg.version });
		formComponent = component.shadowRoot.getElementById("schema") as HTMLElement;
		console.log("formComponent", formComponent);
	});
	$: {
		if (!id) id = "";
		if (style) {
			parsedStyle = parseStyle(style);
			formStyleToSet = getChildStyleToPass(parsedStyle, formStyleSetup?.vars);
			tableStyleToSet = getChildStyleToPass(parsedStyle, tableStyleSetup?.vars);
		}
		if (typeof debug === "string" && (debug === "true" || debug === "yes" || debug === "")) debug = true;
		else if (debug !== true) debug = false;
		if (!schema4selectorS) schema4selectorS = [{ counter: 0, schema: JSON.stringify(schema4selector) }];
		const newTableRows: TableComponent["rows"] = [];
		for (const sc of outputSchema) {
			newTableRows.push({
				_id: sc.label,
				label: sc.label,
				type: sc.type,
				params: sc.params,
				required: sc.required,
				// options: sc.options ? sc.options.map((o) => o.label).join(", ") : "",
			});
		}
		tableRows = newTableRows;
	}

	function dispatchCustomEvent() {
		dispatch("event", { test: true });
	}
	// function changeItemSchema(customEvent: any) {
	// 	console.log("changeItemSchema", customEvent);
	// 	if (customEvent._id === "type" && (customEvent.type === "select" || customEvent.value === "radio")) {
	// 		///
	// 	}
	// }

	function addSchema(e: any) {
		console.log("addSchema", e);
		let added = false;
		switch (e.type) {
			case "checkbox":
			case "textarea":
			case "number":
			case "email":
			case "text":
				if (outputSchema.find((f) => f.label === e.label)) {
					// replace previous outputScheme
					outputSchema = outputSchema.map((f) => {
						if (f.label === e.label) {
							return {
								id: f.id,
								type: e.type,
								label: e.label,
								required: e.required,
								placeholder: e.placeholder,
								params: e.params,
							};
						} else return f;
					});
				} else {
					// add new outputSchema
					outputSchema = [
						...outputSchema,
						{
							id: outputSchema.length.toString(),
							type: e.type,
							label: e.label,
							required: e.required,
							placeholder: e.placeholder,
							params: e.params,
						},
					];
				}
				added = true;

				break;
			case "select":
				if (outputSchema.find((f) => f.label === e.label)) {
					// replace previous outputScheme
					outputSchema = outputSchema.map((f) => {
						if (f.label === e.label) {
							return {
								id: f.id,
								type: e.type,
								label: e.label,
								required: e.required,
								placeholder: e.placeholder,
								params: e.params,
							};
						} else return f;
					});
				} else {
					// add new outputSchema
					outputSchema = [
						...outputSchema,
						{
							id: outputSchema.length.toString(),
							type: e.type,
							label: e.label,
							required: e.required,
							placeholder: e.placeholder,
							params: e.params,
						},
					];
				}
				added = true;
				break;
		}
		if (added) {
			schema4selectorS = [...schema4selectorS, { counter: schema4selectorS.length, schema: JSON.stringify(schema4selector) }];
			console.info("schema4selectorS", schema4selectorS);

			// console.log("reset form");
			// const formComponent=`<hb-form schema="${JSON.stringify(schemaSelectedString)}"`;

			// c.innerHTML=formComponent
		}
	}
	function removeSchema(id: string) {
		outputSchema = outputSchema.filter((e) => e.id !== id);
		schema4selectorS = schema4selectorS.filter((e) => e.counter !== schema4selectorS.length - 1);
	}
</script>

TO BE DONE
<br />
<br />

<!-- {#each outputSchema as sch (sch.id)}
	<div>
		{sch.label} added

		<button
			on:click={() => {
				removeSchema(sch.id);
			}}>remove</button
		>
	</div>
{/each} -->

<hb-table id="table_specs" style={tableStyleToSet} disablepagination="yes" headers={JSON.stringify(tableHeaders)} rows={JSON.stringify(tableRows)} />
{#if !outputSchema?.length}
	empty
{/if}
{#each schema4selectorS as sc (sc.counter)}
	{#if sc.counter === schema4selectorS.length - 1}
		<hb-form
			class="mainform"
			style={formStyleToSet}
			id="schema{sc.counter}"
			on:submit={(e) => {
				addSchema(e.detail);
			}}
			schema={sc.schema}
		/>
	{/if}
{/each}
{#if debug}
	<h2 style="margin:60px;text-align:center;color:blue">output</h2>
	{#if outputSchema?.length}
		<hb-form hide_submit="yes" schema={JSON.stringify(outputSchema)} style={formStyleToSet} />
	{:else}
		...no output
	{/if}
{/if}

<style lang="scss">
	@import "../styles/webcomponent.scss";
	// @import "../styles/bootstrap.scss";
</style>
