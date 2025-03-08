<svelte:options tag="hb-input-array-objects" />

<script lang="ts">
	import { get_current_component } from "svelte/internal";
	import { createEventDispatcher } from "svelte";
	import type { FormSchemaEntry } from "@app/types/webcomponent.type";
	export let set_value: boolean;
	export let set_valid: boolean;
	export let show_validation: "yes" | "no";
	import { addComponent, getChildStyleToPass } from "wc-js-utils/main";
	import type { Component as TableComponent, Events as TableEvents } from "@htmlbricks/hb-table/release/webcomponent.type";
	import parseStyle from "style-to-object";

	import pkg from "../../package.json";

	import { styleSetup as formStyleSetup } from "@htmlbricks/hb-form/release/docs";
	import { styleSetup as tableStyleSetup } from "@htmlbricks/hb-table/release/docs";
	import type { FormSchema } from "@htmlbricks/hb-form/app/types/webcomponent.type";
	let formStyleToSet: string = "";
	let tableStyleToSet: string = "";

	export let schemaentry: FormSchemaEntry;
	export let style: string;

	let value: any[];
	let valid = false;

	let tableHeaders: TableComponent["headers"] = [];
	let tableRows: TableComponent["rows"] = [];
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
	let arrayOfResults: { schema: FormSchema; id: string }[] = [];

	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();
	function dispatch(name: string, detail: any) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}
	let parsedStyle: { [x: string]: string };

	$: {
		if (style) {
			parsedStyle = parseStyle(style);
			formStyleToSet = getChildStyleToPass(parsedStyle, formStyleSetup?.vars);
			tableStyleToSet = getChildStyleToPass(parsedStyle, tableStyleSetup?.vars);
		}
		if (typeof schemaentry === "string") {
			try {
				schemaentry = JSON.parse(schemaentry);
			} catch (err) {
				console.error("error parsing JSON for schemaentry hb-input-array-objects", err);
			}
		}

		if (!show_validation) show_validation = "no";

		if (!set_value && (set_value as unknown as string) === "no") {
			set_value = false;
		} else {
			set_value = true;
		}
		if (!set_valid && (set_valid as unknown as string) === "no") {
			set_valid = false;
		} else {
			set_valid = true;
		}

		value = value != null ? value : schemaentry?.value && typeof schemaentry?.value === "object" ? schemaentry?.value : [];

		if (schemaentry) {
			if (schemaentry.params?.schema?.length) {
				const schemaRow: FormSchema = schemaentry.params.schema;
				const newSchema = { schema: schemaRow, id: Date.now().toString() };
				arrayOfResults = [newSchema];
				const newTableHeaders = [];
				for (const s of schemaRow) {
					if (s.type === "row") {
						for (const ss of s.params.columns) {
							newTableHeaders.push({
								key: ss.id,
								label: ss.label,
								// width: s.width,
							});
						}
					} else {
						newTableHeaders.push({
							key: s.id,
							label: s.label,
							// width: s.width,
						});
					}
				}
				tableHeaders = newTableHeaders;
			}

			if (schemaentry.required) {
				if (value?.length && typeof value === "object") {
					valid = true;
				} else {
					valid = false;
				}
			} else {
				valid = true;
			}
		} else {
			valid = false;
		}

		if (!arrayOfResults?.length) {
			arrayOfResults = [];
		}

		console.log(valid, value, "validinput4arrayobjects");
		setTimeout(() => {
			if (set_value) dispatch("setValue", { value, id: schemaentry?.id });
			if (set_valid) dispatch("setValid", { valid, id: schemaentry?.id });
		}, 0);
	}

	function addSchema(detail: any) {
		console.log(detail);
		const newDate = Date.now().toString();
		const newSchema = { schema: schemaentry.params.schema, id: newDate };
		arrayOfResults = [...arrayOfResults, newSchema];
		const newRows = JSON.parse(JSON.stringify(tableRows));
		const newObj = { _id: newDate };
		for (const r of Object.keys(detail)) {
			newObj[r] = detail[r];
		}
		detail._objId = newDate;
		value = [...JSON.parse(JSON.stringify(value)), detail];
		newRows.push(newObj);
		tableRows = newRows;
	}
	function onTableAction(detail: { action: "delete"; itemId: string }) {
		console.log(detail, "detail");
		console.log(value, arrayOfResults, "value1");

		arrayOfResults = JSON.parse(JSON.stringify(arrayOfResults.filter((f) => f.id !== detail.itemId)));
		console.log(value, arrayOfResults, "value2");

		tableRows = JSON.parse(JSON.stringify(tableRows.filter((f) => f._id !== detail.itemId)));
		value = JSON.parse(JSON.stringify(value.filter((f) => f._objId !== detail.itemId)));
	}

	addComponent({ repoName: "@htmlbricks/hb-form", version: pkg.version });
	addComponent({ repoName: "@htmlbricks/hb-table", version: pkg.version });
</script>

<!-- <input
	bind:value
	type="text"
	class="form-control {show_validation === 'yes' && schemaentry?.required ? (valid ? 'is-valid' : 'is-invalid') : ''}"
	id={schemaentry?.id}
	required={schemaentry?.required}
	placeholder={schemaentry?.placeholder}
	readonly={schemaentry?.readonly}
/> -->

{#each arrayOfResults as sch (sch.id)}
	{#if sch.id === arrayOfResults[arrayOfResults.length - 1].id}
		<div part="properties-container" class="properties-container">
			<hb-table
				disablepagination="yes"
				style={tableStyleToSet}
				actions={JSON.stringify(tableActions)}
				headers={JSON.stringify(tableHeaders)}
				rows={JSON.stringify(tableRows)}
				on:tableaction={(e) => {
					onTableAction(e.detail);
				}}
			/>

			<hb-form
				style={formStyleToSet}
				schema={JSON.stringify(sch.schema)}
				on:submit={(e) => {
					addSchema(e.detail);
				}}
			>
				<span class="slotted-submit" slot="submit_button"
					><button type="button" class="btn btn-info"
						><slot name="add-object-label">{schemaentry?.params?.addPropertyLabel ? schemaentry.params.addPropertyLabel : "add Property"}</slot
						></button
					></span
				>
			</hb-form>
		</div>
	{/if}
{/each}

{#if schemaentry?.validationTip && show_validation === "yes"}
	<div part="invalid-feedback" class="invalid-feedback mb-1">
		{schemaentry.validationTip}
	</div>
{/if}

<style lang="scss">
	@import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
</style>
