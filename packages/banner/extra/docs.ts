import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup, ComponentSetup } from "@htmlbricks/hb-jsutils/main";
import type { Component } from "../app/types/webcomponent.type";

export const storybookArgs = {
	logouri: { control: { type: "text" } },
	title: { control: { type: "text" } },
	description: { control: { type: "text" } },
};

const cssVars: CssVar[] = [];
export const cssParts: CssPart[] = [];
export const htmlSlots: HtmlSlot[] = [];
export const i18nLanguages: i18nLang[] = [];

export const styleSetup: StyleSetup = {
	vars: cssVars,
	parts: cssParts,
};

const examples: Component[] = [
	{
		title: "ciao",
		description: "desc",
		logouri: "https://upload.wikimedia.org/wikipedia/commons/8/80/Wikipedia-logo-v2.svg",
	},
];
export const componentSetup: ComponentSetup & { examples: Component[] } = {
	definitions: null,
	storybookArgs,
	styleSetup,
	htmlSlots,
	i18n: i18nLanguages,
	examples,
	name: "hb-banner",
	category: "basic",
	tags: ["basic"],
	size: {},
	iifePath: "release/release.js",
	repoName: "@htmlbricks/hb-banner",
	version: null,
};
