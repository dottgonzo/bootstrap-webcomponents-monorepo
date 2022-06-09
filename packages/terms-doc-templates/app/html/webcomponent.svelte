<svelte:options tag="hb-terms-doc-templates" />

<script lang="ts">
	import { get_current_component, onDestroy, onMount } from "svelte/internal";

	import { createEventDispatcher } from "svelte";
	import parseStyle from "style-to-object";
	import { addComponent, getChildStyleToPass } from "@htmlbricks/hb-jsutils/main";

	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();

	function dispatch(name, detail) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}

	export let id: string;
	export let style: string;

	export let string: string;
	export let json: { a: 0 };
	export let boolean: boolean;

	let parsedStyle: { [x: string]: string };
	//  let componentStyleToSet: string = "";

	$: {
		if (!id) id = "";
		if (style) {
			parsedStyle = parseStyle(style);
			// componentStyleToSet = getChildStyleToPass(parsedStyle, componentStyleSetup?.vars);
		}
		if (!string) string = "";

		// json
		if (typeof json === "string") JSON.parse(json);

		// bolean
		if (boolean === ("" as unknown)) boolean = true;
		if (typeof boolean === "string") boolean = boolean === "no" || boolean === "false" ? false : true;
		if (!boolean) boolean = false;
	}

	onMount(() => {
		console.log(component.shadowRoot.getElementById("skeletontest"));
	});

	function dispatchCustomEvent() {
		dispatch("event", { test: true });
	}
</script>

<div part="testpart" on:click={() => dispatchCustomEvent()} id="skeletontest">{string}</div>
{#if json}<div>{json}</div>{/if}
<div part="testpart">{boolean}</div>
slot: <slot name="skelcontent" /> /endslot<br />
slot debug: {Object.keys($$slots)[0]}/endslot

<style lang="scss">
	@import "../styles/webcomponent.scss";
	@import "../styles/bootstrap.scss";
</style>
