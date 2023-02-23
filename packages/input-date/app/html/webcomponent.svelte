<svelte:options tag="hb-input-date" />

<script lang="ts">
	import { get_current_component } from "svelte/internal";
	import { createEventDispatcher } from "svelte";
	import type { FormSchemaEntry } from "@app/types/webcomponent.type";
	export let set_value: boolean;
	export let set_valid: boolean;
	export let show_validation: "yes" | "no";

	export let schemaentry: FormSchemaEntry;

		let value: string;

	let value_date: string;
	// let value_hours: number;
	// let value_minutes: number;
	// let value_seconds: number;

	let schemaDate: FormSchemaEntry;
	// let schemaHours: FormSchemaEntry;
	// let schemaMinutes: FormSchemaEntry;
	// let schemaSeconds: FormSchemaEntry;
	// let regex: RegExp | undefined;
	let valid = false;

	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();
	function dispatch(name: string, detail: any) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}

	$: {
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
				console.info("converting date");
				value_date = date.toISOString().split("T")[0];
				// value_hours = date.toISOString().split("T")[0];
				// value_minutes = date.toISOString().split("T")[0];
				// value_seconds = date.toISOString().split("T")[0];
				schemaDate = {
					id: "date",
					type: "date",
					value: value_date,
					required: true,
				};
				schemaHours = {
					id: "hours",
					type: "number",
					value: value_hours,
					required: true,

					params: {
						min: 0,
						max: 23,
					},
				};
				schemaMinutes = {
					id: "minutes",
					type: "number",
					value: value_minutes,
					required: true,

					params: {
						min: 0,
						max: 59,
					},
				};
				schemaSeconds = {
					id: "seconds",
					type: "number",
					value: value_seconds,
					required: true,

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
			value = new Date(`${value_date} ${value_hours}:${value_minutes}:${value_seconds || 0}`).toISOString();
			console.log("NOW", value_date, value_hours, value_minutes);
		} else {
			console.log("reset to 0 datetime");
			value = null;
			if (!schemaDate) {
				schemaDate = {
					id: "date",

					type: "date",
					required: true,
				};
			}
			if (!schemaHours) {
				schemaHours = {
					id: "hours",

					type: "number",
					required: true,
					params: {
						min: 0,
						max: 23,
					},
					placeholder: "hours",
				};
			}

			if (!schemaMinutes) {
				schemaMinutes = {
					id: "minutes",

					type: "number",
					required: true,
					params: {
						min: 0,
						max: 59,
					},
					placeholder: "minutes",
				};
			}
			if (!schemaSeconds) {
				schemaSeconds = {
					id: "seconds",

					type: "number",
					required: true,
					params: {
						min: 0,
						max: 59,
					},
					placeholder: "seconds",
				};
			}
		}
		old_schemaentry_value = schemaentry?.value;
		// regex = schemaentry?.validationRegex && new RegExp(schemaentry.validationRegex);

		setTimeout(() => {
			if (set_value) dispatch("setValue", { value, id: schemaentry?.id });
			if (set_valid) dispatch("setValid", { valid, id: schemaentry?.id });
		}, 0);
	}
</script>

<input
	bind:value
	type="date"
	class="form-control {show_validation === 'yes' && schemaentry?.required ? (valid ? 'is-valid' : 'is-invalid') : ''}"
	id={schemaentry?.id}
	required={schemaentry?.required}
	placeholder={schemaentry?.placeholder}
	readonly={schemaentry?.readonly}
/>
{#if schemaentry?.validationTip && show_validation === "yes"}
	<div part="invalid-feedback" class="invalid-feedback mb-1">
		{schemaentry.validationTip}
	</div>
{/if}

<style lang="scss">
	@import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
</style>
