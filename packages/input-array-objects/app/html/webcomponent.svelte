<svelte:options tag="hb-input-array-objects" />

<script lang="ts">
	import { get_current_component } from "svelte/internal";
	import { createEventDispatcher } from "svelte";
	import type { TextSchemaEntry } from "@app/types/webcomponent.type";
	export let set_value: boolean;
	export let set_valid: boolean;
	export let show_validation: "yes" | "no";

	export let schemaentry: FormSchemaEntry;

	let value: string;
	let regex: RegExp | undefined;
	let valid = false;

	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();
	function dispatch(name: string, detail: any) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}

	$: {
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

		value = value != null ? value : (schemaentry?.value as string);

		regex = schemaentry?.validationRegex && new RegExp(schemaentry.validationRegex);

		if (schemaentry) {
			if (schemaentry.required) {
				if (value) {
					if (regex && !regex.test(value)) {
						valid = false;
					} else if (schemaentry.params?.min && !(value.length >= schemaentry.params.min)) {
						valid = false;
					} else if (schemaentry.params?.max && !(value.length <= schemaentry.params.max)) {
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

		// valid =
		// 	schemaentry && !schemaentry?.required
		// 		? true
		// 		: schemaentry &&
		// 		  value != null &&
		// 		  (regex ? regex.test(value) : true) &&
		// 		  (!schemaentry?.params ||
		// 				(value.length >= (schemaentry.params?.min ?? 1) && value.length <= (schemaentry.params?.max ?? Infinity)));

		// valid = schemaentry
		// 	? !schemaentry?.required ||
		// 	  (value &&
		// 			value.length >= (schemaentry.params?.min ?? 0) &&
		// 			value.length <= (schemaentry.params?.max ?? Infinity) &&
		// 			(regex ? regex.test(value) : true))
		// 	: false;

		console.log(valid, value, "validinput");
		setTimeout(() => {
			if (set_value) dispatch("setValue", { value, id: schemaentry?.id });
			if (set_valid) dispatch("setValid", { valid, id: schemaentry?.id });
		}, 0);
	}
</script>

<input
	bind:value
	type="text"
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
