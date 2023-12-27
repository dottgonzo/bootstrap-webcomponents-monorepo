<svelte:options tag="hb-input-checkbox" />

<script lang="ts">
	import { get_current_component } from "svelte/internal";
	import { createEventDispatcher } from "svelte";
	import type { FormSchemaEntry } from "@app/types/webcomponent.type";
	export let set_value: boolean;
	export let set_valid: boolean;
	export let show_validation: "yes" | "no";

	export let schemaentry: FormSchemaEntry;

	let value: boolean;
	let valid: boolean;

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
		value = value != null ? value : (schemaentry?.value as boolean);

		if (typeof value === "string") {
			if (value === "false" || value === "no") {
				value = false;
			} else {
				value = true;
			}
		}
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
		setTimeout(() => {
			if (set_value) dispatch("setValue", { value, id: schemaentry?.id });
			if (set_valid) dispatch("setValid", { valid, id: schemaentry?.id });
		}, 0);
	}
</script>

<div class="form-check">
	<input
		bind:checked={value}
		type="checkbox"
		class="form-check-input"
		id={schemaentry?.id}
		required={schemaentry?.required}
		readonly={schemaentry?.readonly}
	/>
	<label for={schemaentry?.id} class="form-check-label">{schemaentry?.label}{schemaentry?.required ? "*" : ""}</label>
</div>
{#if schemaentry?.validationTip && show_validation === "yes"}
	<div part="invalid-feedback" class="invalid-feedback mb-1">
		{schemaentry.validationTip}
	</div>
{/if}

<style lang="scss">
	@import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
</style>
