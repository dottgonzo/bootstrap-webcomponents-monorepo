<svelte:options tag="hb-input-datetime" />

<script lang="ts">
	import { get_current_component } from "svelte/internal";
	import { createEventDispatcher } from "svelte";
	import type { FormSchemaEntry } from "@app/types/webcomponent.type";
	import { addComponent, getChildStyleToPass } from "@htmlbricks/hb-jsutils/main";
	import { styleSetup as inputNumberStyleSetup } from "../../node_modules/@htmlbricks/hb-input-number/release/docs";
	import { styleSetup as inputDateStyleSetup } from "../../node_modules/@htmlbricks/hb-input-date/release/docs";
	import parseStyle from "style-to-object";
	import pkg from "../../package.json";

	export let style: string;
	export let set_value: boolean;
	export let set_valid: boolean;
	export let show_validation: "yes" | "no";

	export let schemaentry: FormSchemaEntry;
	let inputDateStyleToSet: string = "";
	let inputNumberStyleToSet: string = "";
	let parsedStyle: { [x: string]: string };

	let value: string;
	// let regex: RegExp | undefined;
	let valid = false;

	let value_date: string;
	let value_hours: number;
	let value_minutes: number;

	let schemaDate: FormSchemaEntry;
	let schemaHours: FormSchemaEntry;
	let schemaMinutes: FormSchemaEntry;

	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();
	function dispatch(name, detail) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}
	let old_schemaentry_value: any;
	let first_access = true;
	$: {
		if (style) {
			parsedStyle = parseStyle(style);
			inputDateStyleToSet = getChildStyleToPass(parsedStyle, inputDateStyleSetup?.vars);
			inputNumberStyleToSet = getChildStyleToPass(parsedStyle, inputNumberStyleSetup?.vars);
		}
		if (!show_validation) show_validation = "no";

		if (schemaentry && typeof schemaentry === "string") {
			schemaentry = JSON.parse(schemaentry as unknown as string);
		}
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

		if (schemaentry?.value && (old_schemaentry_value !== schemaentry?.value || first_access)) {
			console.info("computing values");
			first_access = false;
			let date: Date;
			try {
				date = new Date(schemaentry.value);
			} catch (err) {
				console.error("invalid input value on input-datetime", schemaentry.value);
			}
			if (date.valueOf() > 10000 && date.valueOf() < 10000000000) {
				value_date = date.toISOString().split("T")[0];
				value_hours = date.toISOString().split("T")[0];
				value_minutes = date.toISOString().split("T")[0];
				schemaDate = {
					type: "date",
					value: value_date,
					required: true,
					validation: {
						type: "date",
						required: true,
					},
				};
				schemaHours = {
					type: "number",
					value: value_hours,
					required: true,
					validation: {
						type: "date",
						required: true,
					},
					params: {
						min: 0,
						max: 23,
					},
				};
				schemaMinutes = {
					type: "number",
					value: value_minutes,
					required: true,
					validation: {
						type: "date",
						required: true,
					},
					params: {
						min: 0,
						max: 59,
					},
				};
			} else {
				console.error("invalid data value on input-datetime", value);
			}
		}
		if (value_date && (value_hours || value_hours === 0) && (value_minutes || value_minutes === 0)) {
			value = new Date(`${value_date} ${value_hours}:${value_minutes}`).toISOString();
			console.log("NOW", value_date, value_hours, value_minutes);
		} else {
			value = null;
			if (!schemaDate) {
				schemaDate = {
					type: "date",
					required: true,
				};
			}
			if (!schemaHours) {
				schemaHours = {
					type: "number",
					required: true,
					params: {
						min: 0,
						max: 23,
					},
					value: 0,
				};
			}

			if (!schemaMinutes) {
				schemaMinutes = {
					type: "number",
					required: true,
					params: {
						min: 0,
						max: 59,
					},
					value: 0,
				};
			}
		}
		old_schemaentry_value = schemaentry?.value;
		// regex = schemaentry?.validationRegex && new RegExp(schemaentry.validationRegex);

		if (schemaentry) {
			if (schemaentry.required) {
				if (value) {
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

		addComponent({ repoName: "@htmlbricks/hb-input-number", version: pkg.version });
		addComponent({ repoName: "@htmlbricks/hb-input-date", version: pkg.version });

		setTimeout(() => {
			if (set_value) dispatch("setValue", { value, id: schemaentry?.id });
			if (set_valid) dispatch("setValid", { valid, id: schemaentry?.id });
		}, 0);
	}
	function changeDate(e) {
		console.log("changeDate", e);
		value_date = e;
	}
	function changeHour(e) {
		console.log("changeHour", e);
		value_hours = e;
	}
	function changeMinutes(e) {
		console.log("changeMinutes", e);
		value_minutes = e;
	}
</script>

<div class="form-control">
	{#if schemaDate && schemaHours && schemaMinutes}
		<hb-input-date
			on:setValue={(e) => {
				if (e.detail?.value || e.detail.value === 0) changeDate(e.detail.value);
			}}
			schemaentry={JSON.stringify(schemaDate)}
			style={inputDateStyleToSet}
		/>
		<hb-input-number
			on:setValue={(e) => {
				if (e.detail?.value || e.detail.value === 0) changeHour(e.detail.value);
			}}
			schemaentry={JSON.stringify(schemaHours)}
			style={inputNumberStyleToSet}
		/>
		<hb-input-number
			on:setValue={(e) => {
				if (e.detail?.value) changeMinutes(e.detail.value);
			}}
			schemaentry={JSON.stringify(schemaMinutes)}
			style={inputNumberStyleToSet}
		/>
	{/if}
</div>
{#if schemaentry?.validationTip && show_validation === "yes"}
	<div part="invalid-feedback" class="invalid-feedback mb-1">
		{schemaentry.validationTip}
	</div>
{/if}

<style lang="scss">
	@import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";

	.form-control {
		display: flex;
	}
	hb-input-date {
		flex: 10;
	}
	hb-input-number {
		flex: 2;
	}
</style>
