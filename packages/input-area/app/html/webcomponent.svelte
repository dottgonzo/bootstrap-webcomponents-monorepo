<svelte:options tag="hb-input-area" />

<script lang="ts">
	import { get_current_component } from "svelte/internal";
	import { createEventDispatcher } from "svelte";
	import type { FormSchemaEntry } from "@app/types/webcomponent.type";
	export let setvalue: boolean;
	export let setvalid: boolean;
	export let showvalidation: "yes" | "no";

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

		value = value != null ? value : (schemaentry?.value as string);

		regex = schemaentry?.validationRegex && new RegExp(schemaentry.validationRegex);
		if (schemaentry) {
			if (schemaentry.required) {
				if (value) {
					if (regex && !regex.test(value)) {
						valid = false;
					} else if (schemaentry.params.minlength && !(value.length >= schemaentry.params.minlength)) {
						valid = false;
					} else if (schemaentry.params.maxlength && !(value.length <= schemaentry.params.maxlength)) {
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
			if (setvalue) dispatch("setValue", { value, id: schemaentry?.id });
			if (setvalid) dispatch("setValid", { valid, id: schemaentry?.id });
		}, 0);
	}
</script>

<textarea
	bind:value
	class="form-control {showvalidation === 'yes' && schemaentry?.required ? (valid ? 'is-valid' : 'is-invalid') : ''}"
	id={schemaentry?.id}
	required={schemaentry?.required}
	placeholder={schemaentry?.placeholder}
	readonly={schemaentry?.readonly}
	rows={schemaentry?.params?.rows}
/>
{#if schemaentry?.validationTip && showvalidation === "yes"}
	<div part="invalid-feedback" class="invalid-feedback mb-1">
		{schemaentry.validationTip}
	</div>
{/if}

<style lang="scss">
	@import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
</style>
