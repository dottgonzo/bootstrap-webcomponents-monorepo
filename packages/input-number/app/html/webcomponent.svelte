<svelte:options tag="hb-input-number" />

<script lang="ts">
	import { get_current_component } from "svelte/internal";
	import { createEventDispatcher } from "svelte";
	import type { FormSchemaEntry } from "@app/types/webcomponent.type";
	export let set_value: boolean;
	export let set_valid: boolean;
	export let show_validation: "yes" | "no";

	export let schemaentry: FormSchemaEntry;

	let value: number;
	let valid = false;

	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();
	function dispatch(name: string, detail: any) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}
	let old_schemaentry_value: any;
	$: {
		if (typeof schemaentry === "string") {
			console.info("rendering schemaentry as string for hb-input-number");
			try {
				schemaentry = JSON.parse(schemaentry);
			} catch (err) {
				console.error("error parsing JSON for schemaentry hb-input-number", err);
			}
		}
		if (
			(schemaentry?.value || schemaentry?.value === 0 || (schemaentry?.value as any) === "") &&
			((!old_schemaentry_value && old_schemaentry_value !== 0 && old_schemaentry_value !== "") || old_schemaentry_value !== schemaentry?.value)
		) {
			console.info("insert new value");

			old_schemaentry_value = schemaentry.value;
			value = schemaentry.value;
		} else if (!value && value !== 0) {
			value = null;
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

		if (schemaentry) {
			if (schemaentry.required) {
				if (value || value === 0) {
					if (schemaentry.params?.min && !(value >= schemaentry.params.min)) {
						valid = false;
					} else if (schemaentry.params?.max && !(value <= schemaentry.params.max)) {
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

{#if (schemaentry?.params?.min || schemaentry?.params?.min === 0) && (schemaentry.params.max || schemaentry?.params?.max === 0)}
	<input
		bind:value
		type="number"
		class="form-control {show_validation === 'yes' && schemaentry?.required ? (valid ? 'is-valid' : 'is-invalid') : ''}"
		id={schemaentry?.id}
		required={schemaentry?.required}
		placeholder={schemaentry?.placeholder}
		readonly={schemaentry?.readonly}
		min={schemaentry.params.min}
		max={schemaentry.params.max}
	/>
{:else if schemaentry?.params?.min || schemaentry?.params?.min === 0}
	<input
		bind:value
		type="number"
		class="form-control {show_validation === 'yes' && schemaentry?.required ? (valid ? 'is-valid' : 'is-invalid') : ''}"
		id={schemaentry?.id}
		required={schemaentry?.required}
		placeholder={schemaentry?.placeholder}
		readonly={schemaentry?.readonly}
		min={schemaentry.params.min}
	/>
{:else if schemaentry?.params?.max || schemaentry?.params?.max === 0}
	<input
		bind:value
		type="number"
		class="form-control {show_validation === 'yes' && schemaentry?.required ? (valid ? 'is-valid' : 'is-invalid') : ''}"
		id={schemaentry?.id}
		required={schemaentry?.required}
		placeholder={schemaentry?.placeholder}
		readonly={schemaentry?.readonly}
		max={schemaentry.params.max}
	/>
{:else}
	<input
		bind:value
		type="number"
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
{/if}

{#if schemaentry?.validationTip && show_validation === "yes"}
	<div part="invalid-feedback" class="invalid-feedback mb-1">
		{schemaentry.validationTip}
	</div>
{/if}

<style lang="scss">
	@import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
</style>
