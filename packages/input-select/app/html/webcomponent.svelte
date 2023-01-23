<svelte:options tag="hb-input-select" />

<script lang="ts">
	import { get_current_component } from "svelte/internal";
	import { createEventDispatcher } from "svelte";
	import type { FormSchemaEntry } from "@app/types/webcomponent.type";
	export let set_value: boolean;
	export let set_valid: boolean;

	export let schemaentry: FormSchemaEntry;
	export let show_validation: "yes" | "no";

	let value: string;
	let options: { value: string; label?: string }[] = [];
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

		options = schemaentry?.params?.options ?? [];
		value = value != null ? value : (schemaentry?.value as string);
		valid = !schemaentry?.required || value ? true : false;
		setTimeout(() => {
			if (set_value) dispatch("setValue", { value, id: schemaentry?.id });
			if (set_valid) dispatch("setValid", { valid, id: schemaentry?.id });
		}, 0);
	}
</script>

<select
	bind:value
	class="form-control {show_validation === 'yes' && schemaentry?.required ? (valid ? 'is-valid' : 'is-invalid') : ''}"
	id={schemaentry?.id}
	required={schemaentry?.required}
	readonly={schemaentry?.readonly}
>
	{#each options as option (option)}
		<option value={option.value} selected={value === option.value}>{option.label ?? option.value}</option>
	{/each}
</select>
{#if schemaentry?.validationTip && show_validation === "yes"}
	<div part="invalid-feedback" class="invalid-feedback mb-1">
		{schemaentry.validationTip}
	</div>
{/if}

<style lang="scss">
	@import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
</style>
