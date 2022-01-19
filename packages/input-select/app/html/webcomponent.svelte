<svelte:options tag="hb-input-select" />

<script lang="ts">
	import { get_current_component } from "svelte/internal";
	import { createEventDispatcher } from "svelte";
	import type { FormSchemaEntry } from "@app/types/webcomponent.type";
	export let setvalue: boolean;
	export let setvalid: boolean;

	export let schemaentry: FormSchemaEntry;
	export let showvalidation: "yes" | "no";

	let value: string;
	let options: { value: string; label?: string }[] = [];
	let valid: boolean;
	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();
	function dispatch(name, detail) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}

	$: {
		if (!showvalidation) showvalidation = "no";

		if (schemaentry && typeof schemaentry === "string") {
			schemaentry = JSON.parse(schemaentry as unknown as string);
		}
		if (!setvalue && (setvalue as unknown as string) === "no") {
			setvalue = false;
		} else {
			setvalue = true;
		}
		if (!setvalid && (setvalid as unknown as string) === "no") {
			setvalid = false;
		} else {
			setvalid = true;
		}

		options = schemaentry?.params?.options ?? [];
		value = value != null ? value : (schemaentry?.value as string);
		valid = !schemaentry?.required || value ? true : false;
		setTimeout(() => {
			if (setvalue) dispatch("setValue", { value, id: schemaentry?.id });
			if (setvalid) dispatch("setValid", { valid, id: schemaentry?.id });
		}, 0);
	}
</script>

<select
	bind:value
	class="form-control {showvalidation === 'yes' && schemaentry?.required ? (valid ? 'is-valid' : 'is-invalid') : ''}"
	id={schemaentry?.id}
	required={schemaentry?.required}
	readonly={schemaentry?.readonly}
>
	{#each options as option (option)}
		<option value={option.value} selected={value === option.value}>{option.label ?? option.value}</option>
	{/each}
</select>
{#if schemaentry?.validationTip && showvalidation === "yes"}
	<div part="invalid-feedback" class="invalid-feedback mb-1">
		{schemaentry.validationTip}
	</div>
{/if}

<style lang="scss">
	@import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
</style>
