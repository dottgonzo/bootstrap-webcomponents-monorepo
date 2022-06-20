<svelte:options tag="hb-input-file" />

<script lang="ts">
	import { get_current_component } from "svelte/internal";
	import { createEventDispatcher } from "svelte";
	import type { FormSchemaEntry } from "@app/types/webcomponent.type";
	export let set_value: boolean;
	export let set_valid: boolean;
	export let show_validation: "yes" | "no";

	export let schemaentry: FormSchemaEntry;
	let files: File[];
	let value: string;
	let valid = false;

	let loadedFile: { name: string; size: number; loaded?: boolean; content?: Buffer };
	let percentage: number;
	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();
	function dispatch(name, detail) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}
	function readFile(file: File) {
		loadedFile = { name: file.name, size: file.size, loaded: false };
		percentage = 0;
		try {
			console.log("reading file", file);
			const reader = new FileReader();
			reader.addEventListener("load", (event) => {
				const result = event.target.result;
				loadedFile = { percentage: 100, name: file.name, size: 0, loaded: true, content: result };
				console.log("reading file", "loaded", result);

				// Do something with result
			});

			reader.addEventListener("progress", (event) => {
				if (event.loaded && event.total) {
					const percent = (event.loaded / event.total) * 100;
					console.log(`Progress: ${Math.round(percent)}`);
					percentage = percent;
				}
			});
			reader.readAsDataURL(file);
		} catch (err) {
			console.error(err);
		}
	}
	$: {
		if (!show_validation) show_validation = "no";

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

		valid = schemaentry ? !schemaentry?.required || (value != null && loadedFile?.loaded) : false;

		if (files && files[0]?.name) {
			if (!loadedFile || files[0].name !== loadedFile.name) {
				readFile(files[0]);
			}
		}

		// valid = schemaentry
		// 	? !schemaentry?.required ||
		// 	  (value &&
		// 			value.length >= (schemaentry.params?.minLength ?? 0) &&
		// 			value.length <= (schemaentry.params?.maxLength ?? Infinity) &&
		// 			(regex ? regex.test(value) : true))
		// 	: false;

		console.log(valid, value, "validinput");
		setTimeout(() => {
			if (set_value) dispatch("setValue", { value: Object.assign({}, { content: loadedFile?.content }, { file: files?.[0] }), id: schemaentry?.id });
			if (set_valid) dispatch("setValid", { valid, id: schemaentry?.id });
		}, 0);
	}
</script>

<input
	bind:value
	bind:files
	type="file"
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
