<svelte:options tag="hb-form-composer" />

<script lang="ts">
	import pkg from "../../package.json";

	import { get_current_component, onMount } from "svelte/internal";

	import { createEventDispatcher } from "svelte";
	import parseStyle from "style-to-object";
	import { addComponent, getChildStyleToPass } from "wc-js-utils/main";
	import type { Component, TFormSchemaGeneretor4Prop, Events } from "@app/types/webcomponent.type";
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
			id: "first-row",
			type: "row",
			params: {
				columns: [
					{
						type: "checkbox",
						placeholder: "Required...",
						id: "required",
						label: "Is Required?",
					},
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
								{ label: "file", value: "file" },
								{ label: "date", value: "date" },
								{ label: "datetime", value: "datetime" },
								{ label: "color", value: "color" },
							],
						},
					},
				],
			},
		},

		{
			id: "dep-row",
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
						type: "text",
						placeholder: "Conditional property...",
						id: "depName",
						label: "Conditional property",
						dependencies: [
							{
								id: "conditional",
							},
						],
					},
					{
						type: "text",
						placeholder: "Conditional values (separated by comma)...",
						id: "depValues",
						label: "Conditional values",
						dependencies: [
							{
								id: "conditional",
							},
						],
					},
				],
			},
		},
		{
			id: "length-row",
			type: "row",
			params: {
				columns: [
					{
						type: "number",
						placeholder: "Min Length...",
						id: "min",
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
						id: "max",
						label: "Max Length",
						dependencies: [
							{
								id: "type",
								values: ["text", "textarea"],
							},
						],
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
								values: ["number", "date", "datetime"],
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
								values: ["number", "date", "datetime"],
							},
						],
					},
				],
			},
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
			placeholder: "Option Value",
			id: "optionValue1",
			label: "Option Value",
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
					id: "optionValue1",
				},
			],
		},
		{
			type: "text",
			placeholder: "Option Value",
			id: "optionValue2",
			label: "Option Value",
			dependencies: [
				{
					id: "optionLabel1",
				},
				{
					id: "optionValue1",
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
					id: "optionValue2",
				},
			],
		},
		{
			type: "text",
			placeholder: "Option Value",
			id: "optionValue3",
			label: "Option Value",
			dependencies: [
				{
					id: "optionLabel2",
				},
				{
					id: "optionValue2",
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
					id: "optionValue3",
				},
			],
		},
		{
			type: "text",
			placeholder: "Option Value",
			id: "optionValue4",
			label: "Option Value",
			dependencies: [
				{
					id: "optionLabel3",
				},
				{
					id: "optionValue3",
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
					id: "optionValue4",
				},
			],
		},
		{
			type: "text",
			placeholder: "Option Value",
			id: "optionValue5",
			label: "Option Value",
			dependencies: [
				{
					id: "optionLabel4",
				},
				{
					id: "optionValue4",
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
					id: "optionValue5",
				},
			],
		},
		{
			type: "text",
			placeholder: "Option Value",
			id: "optionValue6",
			label: "Option Value",
			dependencies: [
				{
					id: "optionLabel5",
				},
				{
					id: "optionValue5",
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
					id: "optionValue6",
				},
			],
		},
		{
			type: "text",
			placeholder: "Option Value",
			id: "optionValue7",
			label: "Option Value",
			dependencies: [
				{
					id: "optionLabel6",
				},
				{
					id: "optionValue6",
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
					id: "optionValue7",
				},
			],
		},
		{
			type: "text",
			placeholder: "Option Value",
			id: "optionValue8",
			label: "Option Value",
			dependencies: [
				{
					id: "optionLabel7",
				},
				{
					id: "optionValue7",
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
					id: "optionValue8",
				},
			],
		},
		{
			type: "text",
			placeholder: "Option Value",
			id: "optionValue9",
			label: "Option Value",
			dependencies: [
				{
					id: "optionLabel8",
				},
				{
					id: "optionValue8",
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
					id: "optionValue9",
				},
			],
		},
		{
			type: "text",
			placeholder: "Option Value",
			id: "optionValue10",
			label: "Option Value",
			dependencies: [
				{
					id: "optionLabel9",
				},
				{
					id: "optionValue9",
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
	const tableActions: TableComponent["actions"] = [
		{
			name: "delete",
			type: "icon",
			iconOrText: "x-octagon-fill",
		},
		// {
		// 	name: "edit",
		// 	type: "icon",
		// 	iconOrText: "pencil-square",
		// },
	];
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
		let dep: { id: string; values?: string[] };
		let params: { min?: number; max?: number; min?: number; max?: number; options?: { label: string; value?: String }[] } = {};
		if (e.depName) {
			dep = {
				id: e.depName,
			};
			if (e.depValues) dep.values = e.depValues.replace(", ", ",").replace(" ,", ",").split(",");
		}
		const dependencies = dep ? [dep] : undefined;

		if (e.type === "text" || e.type === "textarea") {
			if (e.min) params.min = e.min;
			if (e.max) params.max = e.max;
		}
		if (e.type === "number" || e.type === "datetime" || e.type === "date") {
			if (e.min) params.min = e.min;
			if (e.max) params.max = e.max;
		}
		if (e.type === "select" || e.type === "radio") {
			const options: FormComponent["schema"][0]["params"]["options"] = [];

			if (e.optionLabel1) {
				options.push({
					label: e.optionLabel1,
					value: e.optionValue1,
				});
			}
			if (e.optionLabel2) {
				options.push({
					label: e.optionLabel2,
					value: e.optionValue2,
				});
			}
			if (e.optionLabel3) {
				options.push({
					label: e.optionLabel3,
					value: e.optionValue3,
				});
			}
			if (e.optionLabel4) {
				options.push({
					label: e.optionLabel4,
					value: e.optionValue4,
				});
			}
			if (e.optionLabel5) {
				options.push({
					label: e.optionLabel5,
					value: e.optionValue5,
				});
			}
			if (e.optionLabel6) {
				options.push({
					label: e.optionLabel6,
					value: e.optionValue6,
				});
			}
			if (e.optionLabel7) {
				options.push({
					label: e.optionLabel7,
					value: e.optionValue7,
				});
			}
			if (e.optionLabel8) {
				options.push({
					label: e.optionLabel8,
					value: e.optionValue8,
				});
			}
			if (e.optionLabel9) {
				options.push({
					label: e.optionLabel9,
					value: e.optionValue9,
				});
			}
			if (e.optionLabel10) {
				options.push({
					label: e.optionLabel10,
					value: e.optionValue10,
				});
			}

			params.options = options;
		}

		const newFormSchema: FormComponent["schema"][0] = {
			id: e.label,
			type: e.type,
			label: e.label,
			required: e.required,
			placeholder: e.placeholder,
			dependencies,
			params,
		};

		if (outputSchema.find((f) => f.label === e.label)) {
			// replace previous outputScheme
			outputSchema = outputSchema.map((f) => {
				if (f.label === e.label) {
					return newFormSchema;
				} else return f;
			});
		} else {
			// add new outputSchema
			outputSchema = [...outputSchema, newFormSchema];
		}

		schema4selectorS = [...schema4selectorS, { counter: schema4selectorS.length, schema: JSON.stringify(schema4selector) }];
		console.info("schema4selectorS", schema4selectorS);

		// console.log("reset form");
		// const formComponent=`<hb-form schema="${JSON.stringify(schemaSelectedString)}"`;

		// c.innerHTML=formComponent
	}
	function removeSchema(label: string) {
		console.log(label, outputSchema);
		outputSchema = outputSchema.filter((e) => e.label !== label);
		schema4selectorS = schema4selectorS.filter((e) => e.counter !== schema4selectorS.length - 1);
	}
	function dispatchDone() {
		const toDispatch: Events["done"] = { schema: outputSchema, id };
		dispatch("done", toDispatch);
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

<hb-table
	id="table_specs"
	style={tableStyleToSet}
	disablepagination="yes"
	actions={JSON.stringify(tableActions)}
	headers={JSON.stringify(tableHeaders)}
	rows={JSON.stringify(tableRows)}
	on:tableaction={(e) => {
		removeSchema(e.detail.itemId);
	}}
/>
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
		>
			<span slot="submit_button"><button type="button" class="btn btn-info">add Property</button></span>
			<span slot="other_buttons"><button type="button" class="btn btn-primary" on:click={() => dispatchDone()}>done</button></span></hb-form
		>
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
	@import "../styles/bootstrap.scss";
</style>
