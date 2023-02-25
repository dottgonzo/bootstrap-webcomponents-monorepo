<svelte:options tag="hb-input-array-objects" />

<script lang="ts">
	import { get_current_component } from "svelte/internal";
	import { createEventDispatcher } from "svelte";
	import type { TextSchemaEntry } from "@app/types/webcomponent.type";
	export let set_value: boolean;
	export let set_valid: boolean;
	export let show_validation: "yes" | "no";
	import { addComponent, getChildStyleToPass } from "wc-js-utils/main";

	import { styleSetup as formStyleSetup } from "../../node_modules/@htmlbricks/hb-form/release/docs";
	import { styleSetup as tableStyleSetup } from "../../node_modules/@htmlbricks/hb-table/release/docs";
	let formStyleToSet: string = "";
	let tableStyleToSet: string = "";

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
		if (style) {
			parsedStyle = parseStyle(style);
			formStyleToSet = getChildStyleToPass(parsedStyle, formStyleSetup?.vars);
			tableStyleToSet = getChildStyleToPass(parsedStyle, tableStyleSetup?.vars);
		}
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

		console.log(valid, value, "validinput");
		setTimeout(() => {
			if (set_value) dispatch("setValue", { value, id: schemaentry?.id });
			if (set_valid) dispatch("setValid", { valid, id: schemaentry?.id });
		}, 0);
	}
	addComponent({ repoName: "@htmlbricks/hb-form", version: pkg.version });
	addComponent({ repoName: "@htmlbricks/hb-table", version: pkg.version });
</script>

<!-- <input
	bind:value
	type="text"
	class="form-control {show_validation === 'yes' && schemaentry?.required ? (valid ? 'is-valid' : 'is-invalid') : ''}"
	id={schemaentry?.id}
	required={schemaentry?.required}
	placeholder={schemaentry?.placeholder}
	readonly={schemaentry?.readonly}
/> -->

<hb-form style={formStyleToSet} />

{#if schemaentry?.validationTip && show_validation === "yes"}
	<div part="invalid-feedback" class="invalid-feedback mb-1">
		{schemaentry.validationTip}
	</div>
{/if}

<style lang="scss">
	@import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
</style>
