<svelte:options tag="hb-terms-doc-templates" />

<script lang="ts">
	import { get_current_component, onDestroy, onMount } from "svelte/internal";
	import pkg from "../../package.json";

	import { createEventDispatcher } from "svelte";
	import parseStyle from "style-to-object";
	import { addComponent, getChildStyleToPass, LanguageTranslator } from "wc-js-utils/main";
	// import GDPR from "@app/html/GDPR.svelte";
	// import ItPolicy from "@app/html/ItPolicy.svelte.bk";
	import itPrivacyContent from "@app/functions/privacyItContent";
	import itCookieContent from "@app/functions/cookieItContent";
	import enCookieContent from "@app/functions/cookieEnContent";
	import { styleSetup as tableStyleSetup } from "@htmlbricks/hb-table/release/docs";

	import type { Component, IDoc, ITPrivacy } from "@app/types/webcomponent.type";
	import { dictionary } from "@app/functions/i18n";
	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();

	function dispatch(name: string, detail: any) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}

	export let id: string;
	export let style: string;
	export let i18nlang: string;
	export let data: Component["data"];

	let parsedStyle: { [x: string]: string };
	let tableStyleToSet: string = "";
	let translator: LanguageTranslator;

	let doc: IDoc;

	$: {
		if (!id) id = "";
		if (style) {
			parsedStyle = parseStyle(style);
			tableStyleToSet = getChildStyleToPass(parsedStyle, tableStyleSetup?.vars);
		}

		if (!translator) {
			translator = new LanguageTranslator({ dictionary, lang: i18nlang });
		} else if (translator && i18nlang && translator.lang && translator.lang !== i18nlang) {
			translator = new LanguageTranslator({ dictionary, lang: i18nlang });
		}

		if (data && typeof data === "string") {
			try {
				const json: Component["data"] = JSON.parse(data);
				switch (json.id) {
					case "privacy-doc-italian":
						doc = itPrivacyContent(json);
						break;
					case "cookie-doc-italian":
						doc = itCookieContent(json);
						break;
					case "cookie-doc-english":
						doc = enCookieContent(json);
						break;
					case "cookie-doc":
						doc = itCookieContent(json);
						break;
				}
			} catch (err) {
				console.error("parsing data", err);
			}
		}
	}
	addComponent({ repoName: "@htmlbricks/hb-table", version: pkg.version });
</script>

{#if doc?.title && doc.chapters?.length}
	<h1 part="h1">{doc.title}</h1>
	{#each doc.chapters.filter((f) => f.key) as chapter (chapter.key)}
		{#if chapter.paragraphs?.length}
			<h2 part="h2">{chapter.index}. {chapter.title}</h2>
			{#each chapter.paragraphs.filter((f) => f.key) as paragraph (paragraph.key)}
				{#if paragraph.title}
					<h3>{paragraph.title}</h3>
				{/if}
				{#if paragraph.content}
					<p part="p">
						{paragraph.content}
					</p>
				{/if}
				{#if paragraph.list?.length}
					<ul part="ul">
						{#each paragraph.list.filter((f) => f.key) as listItem (listItem.key)}
							<li part="li">{listItem.content}</li>
						{/each}
					</ul>
				{/if}
				{#if paragraph.table?.headers && paragraph.table.rows?.length}
					<hb-table
						disablepagination="yes"
						size="1000"
						style={tableStyleToSet}
						headers={JSON.stringify(paragraph.table.headers)}
						rows={JSON.stringify(paragraph.table.rows)}
					/>
				{/if}
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
