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
	// let regex: RegExp | undefined;
	let valid = false;
	let min_date: Date;
	let max_date: Date;
	let value_date: Date;

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

		value = value != null ? value : (schemaentry?.value as string);
		if (value) {
			value_date = new Date(value);
		}

		// regex = schemaentry?.validationRegex && new RegExp(schemaentry.validationRegex);

		if (schemaentry?.params?.min) {
			min_date = new Date(schemaentry.params.min);
		}
		if (schemaentry?.params?.max) {
			max_date = new Date(schemaentry.params.max);
		}

		if (schemaentry) {
			if (schemaentry.required) {
				if (value) {
					if (min_date && !(value_date.valueOf() >= min_date.valueOf())) {
						valid = false;
					} else if (max_date && !(value_date.valueOf() <= max_date.valueOf())) {
						valid = false;
					} else {
						valid = true;
					}
				} else {
					valid = false;
				}
			} else {
				valid = true;
			}
		} else {
			valid = false;
		}

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
	on:keypress={(e) => {
		if (e.key === "Enter") {
			// Cancel the default action, if needed
			e.preventDefault();
			// Trigger the button element with a click
			dispatch("clickEnter", { value, valid, id: schemaentry?.id });
		}
	}}
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
