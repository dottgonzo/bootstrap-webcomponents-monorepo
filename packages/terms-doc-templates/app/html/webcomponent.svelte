<svelte:options tag="hb-terms-doc-templates" />

<script lang="ts">
	import { get_current_component, onDestroy, onMount } from "svelte/internal";

	import { createEventDispatcher } from "svelte";
	import parseStyle from "style-to-object";
	import { addComponent, getChildStyleToPass, LanguageTranslator } from "@htmlbricks/hb-jsutils/main";
	import Term1 from "./term1.svelte";
	import type { Component } from "@app/types/webcomponent.type";
	import { dictionary } from "@app/functions/i18n";
	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();

	function dispatch(name, detail) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}

	export let id: string;
	export let style: string;
	export let i18nlang: string;

	export let config: Component["config"];

	let parsedStyle: { [x: string]: string };
	//  let componentStyleToSet: string = "";
	let translator: LanguageTranslator;

	$: {
		if (!id) id = "";
		if (style) {
			parsedStyle = parseStyle(style);
			// componentStyleToSet = getChildStyleToPass(parsedStyle, componentStyleSetup?.vars);
		}
		if (typeof config === "string") config = JSON.parse(config);
		if (!translator) {
			translator = new LanguageTranslator({ dictionary, lang: i18nlang });
		} else if (translator && i18nlang && translator.lang && translator.lang !== i18nlang) {
			translator = new LanguageTranslator({ dictionary, lang: i18nlang });
		}
	}
</script>

<Term1 site_name={config.site.name} site_url={config.site.url} company_name={config.company.name} />

<style lang="scss">
	@import "../styles/webcomponent.scss";
	// @import "../styles/bootstrap.scss";
</style>
