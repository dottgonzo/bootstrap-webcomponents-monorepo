<svelte:options tag="hb-form-composer" />

<script lang="ts">
	import pkg from "../../package.json";

	import { get_current_component, onMount } from "svelte/internal";

	import { createEventDispatcher } from "svelte";
	import parseStyle from "style-to-object";
	import { addComponent, getChildStyleToPass } from "wc-js-utils/main";
	import type { Component, TFormSchemaGeneretor4Prop, Events } from "@app/types/webcomponent.type";
	import { styleSetup as formStyleSetup } from "@htmlbricks/hb-form/release/docs";
	import { styleSetup as tableStyleSetup } from "@htmlbricks/hb-table/release/docs";
	import { styleSetup as dialogformStyleSetup } from "@htmlbricks/hb-dialogform/release/docs";
	import type { Component as FormComponent, Events as FormEvents } from "@htmlbricks/hb-form/release/webcomponent.type";
	import type { Component as TableComponent, Events as TableEvents } from "@htmlbricks/hb-table/release/webcomponent.type";

	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();

	function dispatch(name: string, detail: any) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}

	export let id: string;
	export let style: string;
	export let debug: boolean;

	export let output_schema: FormComponent["schema"];

	const schema4selector: FormComponent["schema"] = [
		{
			id: "first-row",
			type: "row",
			params: {
				columns: [
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
						label: "Type",
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
								{ label: "file", value: "file" },
								{ label: "date", value: "date" },
								{ label: "datetime", value: "datetime" },
								{ label: "color", value: "color" },
								{ label: "range", value: "range" },
							],
						},
					},
				],
			},
		},

		{
			id: "conditionals-row",
			type: "row",
			params: {
				columns: [
					{
						type: "checkbox",
						placeholder: "Conditional...",
						id: "conditional",
						label: "Is Conditional?",
					},
					{
						type: "checkbox",
						placeholder: "Required...",
						id: "required",
						label: "Is Required?",
					},
				],
			},
		},

		{
			id: "size-row",
			type: "row",
			params: {
				columns: [
					{
						type: "number",
						placeholder: "Min...",
						id: "min",
						label: "Min",
						dependencies: [
							{
								id: "type",
								values: ["number", "date", "datetime", "text", "textarea", "range"],
							},
						],
					},
					{
						type: "number",
						placeholder: "Max...",
						id: "max",
						label: "Max",
						dependencies: [
							{
								id: "type",
								values: ["number", "date", "datetime", "text", "textarea", "range"],
							},
						],
					},
				],
			},
		},
		{
			type: "arrayobjects",
			label: "conditions",
			id: "conditions",
			params: {
				addPropertyLabel: "add condition",

				schema: [
					{
						id: "conditions-row",
						type: "row",
						params: {
							columns: [
								{
									type: "text",
									placeholder: "Condition Property name...",
									id: "conditionlabel",
									required: true,
									label: "Label",
									validationTip: "This field cannot be empty.",
								},
								{
									type: "text",
									placeholder: "Condition values (separated by comma)...",
									id: "conditionvalue",
									label: "Values",
									validationTip: "This field cannot be empty.",
								},
							],
						},
					},
				],
			},
			dependencies: [
				{
					id: "conditional",
				},
			],
		},
		{
			type: "arrayobjects",
			label: "options",
			placeholder: "Insert your last name here...",
			id: "options",
			validationTip: "This field cannot be empty.",
			params: {
				addPropertyLabel: "add option",

				schema: [
					{
						id: "options-row",
						type: "row",
						params: {
							columns: [
								{
									type: "text",
									placeholder: "Property name...",
									id: "optionlabel",
									required: true,
									label: "Label",
									validationTip: "This field cannot be empty.",
								},
								{
									type: "text",
									placeholder: "Value...",
									id: "optionvalue",
									label: "Value",
									required: true,
									validationTip: "This field cannot be empty.",
								},
							],
						},
					},
				],
			},
			dependencies: [
				{
					id: "type",
					values: ["select", "radio"],
				},
			],
		},
	];

	let schema4selectorS: { counter: number; schema: string }[];

	let parsedStyle: { [x: string]: string };
	//  let componentStyleToSet: string = "";
	let formStyleToSet: string = "";
	let dialogformStyleToSet: string = "";
	let tableStyleToSet: string = "";
	let formComponent: HTMLElement;
	// const tableActions: TableComponent["actions"] = [
	// 	// {
	// 	// 	name: "delete",
	// 	// 	type: "icon",
	// 	// 	iconOrText: "x-octagon-fill",
	// 	// },
	// 	// {
	// 	// 	name: "edit",
	// 	// 	type: "icon",
	// 	// 	iconOrText: "pencil-square",
	// 	// },
	// ];
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
			label: "params",
			key: "params",
			nosort: true,
		},
		{
			label: "dependencies",
			key: "dependencies",
		},
		{
			label: "required",
			key: "required",
		},
		{
			label: "value",
			key: "value",
		},
		{
			label: "modifiche",
			key: "mod",
			type: "actions",
			nosort: true,
		},
	];
	let tableRows: TableComponent["rows"];
	let addPropShow: boolean = false;
	onMount(() => {
		addComponent({ repoName: "@htmlbricks/hb-form", version: pkg.version });
		addComponent({ repoName: "@htmlbricks/hb-table", version: pkg.version });
		addComponent({ repoName: "@htmlbricks/hb-dialogform", version: pkg.version });
		formComponent = component.shadowRoot.getElementById("schema") as HTMLElement;
		console.log("formComponent", formComponent);
	});
	$: {
		if (!id) id = "";
		if (style) {
			parsedStyle = parseStyle(style);
			formStyleToSet = getChildStyleToPass(parsedStyle, formStyleSetup?.vars);
			tableStyleToSet = getChildStyleToPass(parsedStyle, tableStyleSetup?.vars);
			dialogformStyleToSet = getChildStyleToPass(parsedStyle, dialogformStyleSetup?.vars);
		}
		if (typeof output_schema === "string" && output_schema !== "") {
			try {
				console.log("parsing output_schema");

				output_schema = JSON.parse(output_schema);
			} catch (error) {
				console.error("error parsing output_schema", error);
			}
		}
		if (!output_schema) output_schema = [];
		if (typeof debug === "string" && (debug === "true" || debug === "yes" || debug === "")) debug = true;
		else if (debug !== true) debug = false;
		if (!schema4selectorS) schema4selectorS = [{ counter: 0, schema: JSON.stringify(schema4selector) }];
		const newTableRows: TableComponent["rows"] = [];
		for (const sc of output_schema) {
			let depsString: string;
			let paramsString: string;
			if (sc.params) {
				paramsString = JSON.stringify(sc.params);
			}
			if (sc.dependencies) {
				depsString = JSON.stringify(sc.dependencies);
			}
			newTableRows.push({
				_id: sc.label,
				label: sc.label,
				type: sc.type,
				params: paramsString,
				required: sc.required,
				dependencies: depsString,
				value: sc.value,
				_actions: [
					{
						name: "delete",
						type: "icon",
						iconOrText: "x-octagon-fill",
						disabled: sc.value ? true : false,
					},
					// {
					// 	name: "edit",
					// 	type: "icon",
					// 	iconOrText: "pencil-square",
					// },
				],
				// options: sc.options ? sc.options.map((o) => o.label).join(", ") : "",
			});
		}
		tableRows = newTableRows;
	}

	// function changeItemSchema(customEvent: any) {
	// 	console.log("changeItemSchema", customEvent);
	// 	if (customEvent._id === "type" && (customEvent.type === "select" || customEvent.value === "radio")) {
	// 		///
	// 	}
	// }

	function addSchema(e: TFormSchemaGeneretor4Prop) {
		console.log("addSchema", e);
		let params: { min?: number; max?: number; options?: { label: string; value?: String }[] } = {};
		let dep: { id: string; values?: string[] }[];
		if (e.conditions) {
			dep = e.conditions.map((c) => {
				return {
					id: c.conditionlabel,
					values: c.conditionvalue ? c.conditionvalue.replace(", ", ",").replace(" ,", ",").split(",") : undefined,
				};
			});
			// 	dep = {
			// 		id: e.depName,
			// 	};
			// 	if (e.depValues) dep.values = e.depValues.replace(", ", ",").replace(" ,", ",").split(",");
		}
		// const dependencies = dep ? [dep] : undefined;

		if (e.type === "text" || e.type === "textarea" || e.type === "number" || e.type === "datetime" || e.type === "date" || e.type === "range") {
			if (e.min) params.min = e.min;
			if (e.max) params.max = e.max;
		}

		if (e.type === "select" || (e.type === "radio" && e.options.length)) {
			params.options = [];

			for (const o of e.options) {
				params.options.push({ label: o.optionlabel, value: o.optionvalue });
			}
		}

		const newFormSchema: FormComponent["schema"][0] = {
			id: e.label,
			type: e.type,
			label: e.label,
			required: e.required,
			placeholder: e.placeholder,
			dependencies: dep,
		};
		if (Object.keys(params).length) {
			newFormSchema.params = params;
		}

		if (output_schema.find((f) => f.label === e.label)) {
			// replace previous outputScheme
			output_schema = output_schema.map((f) => {
				if (f.label === e.label) {
					return newFormSchema;
				} else return f;
			});
		} else {
			// add new output_schema
			output_schema = [...output_schema, newFormSchema];
		}

		schema4selectorS = [...schema4selectorS, { counter: schema4selectorS.length, schema: JSON.stringify(schema4selector) }];
		console.info("schema4selectorS", schema4selectorS);

		// console.log("reset form");
		// const formComponent=`<hb-form schema="${JSON.stringify(schemaSelectedString)}"`;

		// c.innerHTML=formComponent
	}
	function removeSchema(label: string) {
		console.log(label, output_schema);
		const thelabel = output_schema.find((e) => e.label === label);
		if (thelabel?.value) return console.warn("cannot remove default value");

		output_schema = output_schema.filter((e) => e.label !== label);
		schema4selectorS = schema4selectorS.filter((e) => e.counter !== schema4selectorS.length - 1);
	}
	function dispatchDone() {
		const toDispatch: Events["done"] = { schema: output_schema, id };
		dispatch("done", toDispatch);
	}
</script>

<!-- {#each output_schema as sch (sch.id)}
	<div>
		{sch.label} added

		<button
			on:click={() => {
				removeSchema(sch.id);
			}}>remove</button
		>
	</div>
{/each} -->

<hb-table
	id="table_specs"
	style={tableStyleToSet}
	disablepagination="yes"
	headers={JSON.stringify(tableHeaders)}
	rows={JSON.stringify(tableRows)}
	on:tableCustomActionClick={(e) => {
		if (e.detail.action === "delete") removeSchema(e.detail.itemId);
	}}
	on:addItem={(e) => {
		addPropShow = true;
	}}
	add_item="yes"
>
	<span slot="buttons-container"><button class="btn btn-outline-primary btn-sm" on:click={dispatchDone}>done</button></span>
</hb-table>

{#each schema4selectorS as sc (sc.counter)}
	{#if sc.counter === schema4selectorS.length - 1}
		<hb-dialogform
			title="Add property"
			on:modalFormConfirm={(e) => {
				console.log(e.detail);
				addSchema(e.detail);
				addPropShow = false;
			}}
			on:modalFormCancel={(e) => {
				console.log("cancelform");
				addPropShow = false;
			}}
			on:modalShow={(e) => {
				console.log("modalShow");
				addPropShow = e.detail.show;
			}}
			show={addPropShow ? "yes" : "no"}
			schema={sc.schema}
			style={dialogformStyleToSet}
		/>
	{/if}
{/each}
<!-- {#each schema4selectorS as sc (sc.counter)}
	{#if sc.counter === schema4selectorS.length - 1}
		<hb-form
			class="mainform"
			style={formStyleToSet}
			id="schema{sc.counter}"
			on:submit={(e) => {
				addSchema(e.detail);
			}}
			schema={sc.schema}
		>
			<span slot="submit_button"><button type="button" class="btn btn-info">add Property</button></span>
			<span slot="other_buttons"
				><button disabled={schema4selectorS.length < 2 ? true : false} type="button" class="btn btn-primary" on:click={() => dispatchDone()}
					>done</button
				></span
			></hb-form
		>
	{/if}
{/each} -->

{#if debug}
	<h2 style="margin:60px;text-align:center;color:blue">output</h2>
	{#if output_schema?.length}
		<hb-form hide_submit="yes" schema={JSON.stringify(output_schema)} style={formStyleToSet} />
	{:else}
		...no output
	{/if}
{/if}

<style lang="scss">
	@import "../styles/webcomponent.scss";
	@import "../styles/bootstrap.scss";
</style>
