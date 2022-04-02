import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup, ComponentSetup } from "@htmlbricks/hb-jsutils/main";
import type { Component } from "../app/types/webcomponent.type";

export const storybookArgs = {
	allowdecline: { control: { type: "boolean" } },
	i18nlang: { control: { type: "text" } },
	cookielawuri4more: { control: { type: "text" } },
	capabilities: { control: { type: "object" } },
	acceptCookieLaw: { action: "acceptCookieLawEvent" },
};

const cssVars: CssVar[] = [];
export const cssParts: CssPart[] = [];
export const htmlSlots: HtmlSlot[] = [
	{ name: "title", description: "" },
	{ name: "text", description: "" },
];
export const i18nLanguages: i18nLang[] = [
	{ lang: "it", language: "italian" },
	{ lang: "en", language: "english" },
];
export const styleSetup: StyleSetup = {
	vars: cssVars,
	parts: cssParts,
};

const examples: Component[] = [
	{
		allowdecline: "yes",
	},
];
export const componentSetup: ComponentSetup & { examples: Component[] } = {
	definitions: null,
	storybookArgs,
	styleSetup,
	author: null,
	contributors: [],
	owner: null,
	htmlSlots,
	i18n: i18nLanguages,
	examples,
	screenshots: [],
	licenses: [{ type: "Apache-2.0", path: "LICENSE.md", cost: 0, currency: "EUR" }],
	readmePath: "README.md",
	name: "hb-cookie-law-banner",
	category: "layout",
	tags: ["layout"],
	size: {},
	iifePath: "release/release.js",
	repoName: "@htmlbricks/hb-cookie-law-banner",
	version: null,
};
