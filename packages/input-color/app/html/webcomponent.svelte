<svelte:options tag="hb-input-color" />

<script lang="ts">
	import { get_current_component, onMount } from "svelte/internal";
	import { createEventDispatcher } from "svelte";
	import type { TextSchemaEntry } from "@app/types/webcomponent.type";
	export let setvalue: boolean;
	export let setvalid: boolean;
	export let showvalidation: "yes" | "no";
	import AColorPicker from "a-color-picker";
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
	let showPicker: boolean;
	function showColorPicker() {
		showPicker = true;
	}
	let picker: ColorPicker;

	$: {
		if (!showvalidation) showvalidation = "no";
		if (!showPicker) showPicker = false;
		if (schemaentry && typeof schemaentry === "string") {
			schemaentry = JSON.parse(schemaentry as unknown as string);
		} else if (!schemaentry) {
			schemaentry = null;
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

		// regex = schemaentry?.validationRegex && new RegExp(schemaentry.validationRegex);
		valid = !schemaentry?.required || (typeof value === "string" && value.length > 1) ? true : false;
		// ? (!schemaentry?.required || value != null) &&
		// //   (regex ? regex.test(value) : true) &&
		//   (value == null || (value.length >= (schemaentry.params?.minlength ?? 1) && value.length <= (schemaentry.params?.maxlength ?? Infinity)))
		// : false;

		// valid = schemaentry
		// 	? !schemaentry?.required ||
		// 	  (value &&
		// 			value.length >= (schemaentry.params?.minlength ?? 0) &&
		// 			value.length <= (schemaentry.params?.maxlength ?? Infinity) &&
		// 			(regex ? regex.test(value) : true))
		// 	: false;

		console.log(valid, value, "validinput");
		setTimeout(() => {
			if (setvalue) dispatch("setValue", { value, id: schemaentry?.id });
			if (setvalid) dispatch("setValid", { valid, id: schemaentry?.id });
		}, 0);
	}
	let pickerEl: HTMLElement;
	// function mountPicker() {
	// 	if (schemaentry?.id && !pickerEl) {
	// 		pickerEl = component.shadowRoot.getElementById(schemaentry.id);
	// 	}
	// }
	onMount(() => {
		pickerEl = component.shadowRoot.getElementById("picker2");
		console.log(pickerEl);
		AColorPicker.createPicker(pickerEl, {});
	});
</script>

<span id="picker2" />

{#if !showPicker}66
{/if}
<span id="picker">
	<input
		bind:value
		type="text"
		class="form-control {showvalidation === 'yes' && schemaentry?.required ? (valid ? 'is-valid' : 'is-invalid') : ''}"
		id={schemaentry?.id}
		required={schemaentry?.required}
		placeholder={schemaentry?.placeholder}
		readonly={schemaentry?.readonly}
	/>
</span>
{#if schemaentry?.validationTip && showvalidation === "yes"}
	<div part="invalid-feedback" class="invalid-feedback mb-1">
		{schemaentry.validationTip}
	</div>
{/if}

<style lang="scss">
	@import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
</style>
