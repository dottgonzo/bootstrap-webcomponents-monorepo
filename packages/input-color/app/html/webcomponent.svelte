<svelte:options tag="hb-input-color" />

<script lang="ts">
	import { get_current_component, onMount } from "svelte/internal";
	import { createEventDispatcher } from "svelte";
	import type { TextSchemaEntry } from "@app/types/webcomponent.type";

	import AColorPicker from "a-color-picker";
	import debounce from "debounce";
	import htmlColors from "html-colors";
	import rgbHex from "rgb-hex";

	export let schemaentry: FormSchemaEntry;
	export let set_value: boolean;
	export let set_valid: boolean;
	export let show_validation: "yes" | "no";

	let value: string;
	let regex: RegExp | undefined;
	let valid = false;

	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();
	function dispatch(name: string, detail: any) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}
	// let showPicker: boolean;
	// function showColorPicker() {
	// 	showPicker = true;
	// }
	// let picker: ColorPicker;
	let colorVal = schemaentry?.value;
	function bootValue() {
		if (!value.startsWith("#") && htmlColors.hex(value)) value = htmlColors.hex(value);
		if ((value.startsWith("rgb") || (value.split(",").length >= 3 && value.split(",").length <= 4)) && rgbHex(value)) value = "#" + rgbHex(value);
		colorVal = value;
	}
	$: {
		if (!show_validation) show_validation = "no";
		// if (!showPicker) showPicker = false;
		if (schemaentry && typeof schemaentry === "string") {
			schemaentry = JSON.parse(schemaentry as unknown as string);
		} else if (!schemaentry) {
			schemaentry = null;
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
		if (value) bootValue();

		valid = !schemaentry?.required || (typeof value === "string" && value.length > 1) ? true : false;

		setTimeout(() => {
			if (set_value) dispatch("setValue", { value, id: schemaentry?.id });
			if (set_valid) dispatch("setValid", { valid, id: schemaentry?.id });
		}, 0);
	}

	function resetVal() {
		console.log("resetval", colorVal, value);
		value = colorVal;
	}
</script>

<input
	on:input={debounce(resetVal, 200)}
	bind:value={colorVal}
	type="color"
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
