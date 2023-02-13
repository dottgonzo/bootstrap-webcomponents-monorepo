<svelte:options tag="hb-form-composer" />

<script lang="ts">
	import pkg from "../../package.json";

	import { get_current_component, onDestroy, onMount } from "svelte/internal";

	import { createEventDispatcher } from "svelte";
	import parseStyle from "style-to-object";
	import { addComponent, getChildStyleToPass } from "@htmlbricks/hb-jsutils/main";
	import type { Component } from "@app/types/webcomponent.type";
	import { styleSetup as formStyleSetup } from "../../node_modules/@htmlbricks/hb-form/release/docs";
	import type { Component as FormComponent } from "../../node_modules/@htmlbricks/hb-form/release/webcomponent.type";

	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();

	function dispatch(name: string, detail: any) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}

	export let id: string;
	export let style: string;
	export let debug: boolean;

	let outputSchema: FormComponent["schema"] = [];

	const schema4selector: FormComponent["schema"] = [
		{
			id: "name-row",
			type: "row",
			params: {
				columns: [
					{
						type: "text",
						placeholder: "Label...",
						id: "label",
						required: true,
						label: "Property Label",
						validationTip: "This field cannot be empty.",
					},
					{
						type: "select",
						placeholder: "Select something here...",
						id: "selectsomething",
						required: true,
						label: "Selection of something",
						validationTip: "This field cannot be empty.",
						params: {
							options: [
								{ label: "text", value: "text" },
								{ label: "textarea", value: "textarea" },
								{ label: "number", value: "number" },
								{ label: "select", value: "select" },
								{ label: "radio", value: "radio" },
							],
						},
					},
				],
			},
		},
	];

	let parsedStyle: { [x: string]: string };
	//  let componentStyleToSet: string = "";
	let formStyleToSet: string = "";
	onMount(() => {
		addComponent({ repoName: "@htmlbricks/hb-form", version: pkg.version });
	});
	$: {
		if (!id) id = "";
		if (style) {
			parsedStyle = parseStyle(style);
			formStyleToSet = getChildStyleToPass(parsedStyle, formStyleSetup?.vars);
		}
		if (typeof debug === "string" && (debug === "true" || debug === "yes" || debug === "")) debug = true;
		else debug = false;
	}

	function dispatchCustomEvent() {
		dispatch("event", { test: true });
	}
</script>

TO BE DONE
<br />
<br />
<hb-form schema={JSON.stringify(schema4selector)} />

{#if debug}
	<br />
	<br />
	output:
	<br />
	<br />
	{#if outputSchema?.length}
		<hb-form schema={JSON.stringify(outputSchema)} style={formStyleToSet} />
	{:else}
		no outputSchema?.length
	{/if}
{/if}

<style lang="scss">
	@import "../styles/webcomponent.scss";
	// @import "../styles/bootstrap.scss";
</style>
