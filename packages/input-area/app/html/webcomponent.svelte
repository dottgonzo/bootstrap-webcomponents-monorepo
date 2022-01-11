<svelte:options tag="hb-input-area" />

<script lang="ts">
	import { get_current_component } from "svelte/internal";
	import { createEventDispatcher } from "svelte";
	import type { FormSchemaEntry } from "@app/types/webcomponent.type";
	export let setvalue: boolean;
	export let setvalid: boolean;

	export let schemaentry: FormSchemaEntry;

	let value: string;
	let regex: RegExp | undefined;
	let valid = false;

	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();
	function dispatch(name, detail) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}

	$: {
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

		value = value != null ? value : (schemaentry?.value as string);

		regex = schemaentry?.validationRegex && new RegExp(schemaentry.validationRegex);
		valid = schemaentry
			? (!schemaentry?.required || value != null) &&
			  (regex ? regex.test(value) : true) &&
			  (value == null || (value.length >= (schemaentry.params?.minlength ?? 1) && value.length <= (schemaentry.params?.maxlength ?? Infinity)))
			: false;
		setTimeout(() => {
			if (setvalue) dispatch("setValue", { value, id: schemaentry?.id });
			if (setvalid) dispatch("setValid", { valid, id: schemaentry?.id });
		}, 0);
	}
</script>

<textarea
	bind:value
	class="form-control {schemaentry?.required ? (valid ? 'is-valid' : 'is-invalid') : ''}"
	id={schemaentry?.id}
	required={schemaentry?.required}
	placeholder={schemaentry?.placeholder}
	readonly={schemaentry?.readonly}
	rows={schemaentry?.params?.rows}
/>
{#if schemaentry?.validationTip}
	<div part="invalid-feedback" class="invalid-feedback mb-1">
		{schemaentry.validationTip}
	</div>
{/if}

<style lang="scss">
	@import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
</style>
