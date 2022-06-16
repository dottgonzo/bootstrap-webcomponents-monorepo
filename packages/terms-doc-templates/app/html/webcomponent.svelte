<svelte:options tag="hb-terms-doc-templates" />

<script lang="ts">
	import { get_current_component, onDestroy, onMount } from "svelte/internal";

	import { createEventDispatcher } from "svelte";
	import parseStyle from "style-to-object";
	import { addComponent, getChildStyleToPass, LanguageTranslator } from "@htmlbricks/hb-jsutils/main";
	// import GDPR from "@app/html/GDPR.svelte";
	// import ItPolicy from "@app/html/ItPolicy.svelte.bk";
	import itPrivacyContent from "@app/functions/privacyItContent";

	import type { Component, IDoc, ITPrivacy } from "@app/types/webcomponent.type";
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
	export let italian_privacy_policy: Component["italian_privacy_policy"];

	let parsedStyle: { [x: string]: string };
	//  let componentStyleToSet: string = "";
	let translator: LanguageTranslator;

	let doc: IDoc;

	$: {
		if (!id) id = "";
		if (style) {
			parsedStyle = parseStyle(style);
			// componentStyleToSet = getChildStyleToPass(parsedStyle, componentStyleSetup?.vars);
		}

		if (!translator) {
			translator = new LanguageTranslator({ dictionary, lang: i18nlang });
		} else if (translator && i18nlang && translator.lang && translator.lang !== i18nlang) {
			translator = new LanguageTranslator({ dictionary, lang: i18nlang });
		}
		if (italian_privacy_policy && typeof italian_privacy_policy === "string") {
			doc = itPrivacyContent(JSON.parse(italian_privacy_policy));
		}
	}
</script>

{#if doc?.title && doc.chapters?.length}
	<h1>{doc.title}</h1>
	{#each doc.chapters.filter((f) => f.key) as chapter (chapter.key)}
		{#if chapter.paragraphs?.length}
			<h2>{chapter.index}. {chapter.title}</h2>
			{#each chapter.paragraphs.filter((f) => f.key) as paragraph (paragraph.key)}
				<p>
					{paragraph.content}
					{#if paragraph.list?.length}
						<ul>
							{#each paragraph.list.filter((f) => f.key) as listItem (listItem.key)}
								<li>{listItem.content}</li>
							{/each}
						</ul>
					{/if}
				</p>
			{/each}
		{/if}
	{/each}
{:else}
	invalid doc params
{/if}

<style lang="scss">
	@import "../styles/webcomponent.scss";
	// @import "../styles/bootstrap.scss";
</style>
