import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup, ComponentSetup } from "wc-js-utils/main";
import type { Component } from "../app/types/webcomponent.type";

export const storybookArgs = {
	action: { control: { type: "text" } },
	method: { control: { type: "select" }, options: ["GET", "POST"] },
	actionquerykey: { control: { type: "text" } },
	resultitemspath: { control: { type: "text" } },
	resultitemtitlekey: { control: { type: "text" } },
	resultitemlinkkey: { control: { type: "text" } },
	"search-result-items": { action: "search-result-items" },
};

const cssVars: CssVar[] = [];
export const cssParts: CssPart[] = [];
export const htmlSlots: HtmlSlot[] = [];
export const i18nLanguages: i18nLang[] = [];

export const styleSetup: StyleSetup = {
	vars: cssVars,
	parts: cssParts,
};

const examples: { name: string; description?: string; data: Component }[] = [
	{ name: "default", data: { action: "", method: "GET", actionquerykey: "", resultitemspath: "", resultitemtitlekey: "", resultitemlinkkey: "" } },
];
export const componentSetup: ComponentSetup & { examples: { name: string; description?: string; data: Component }[] } = {
	definitions: null as any,
	storybookArgs,
	styleSetup,
	author: null as any,
	contributors: [],
	owner: null as any,
	htmlSlots,
	i18n: i18nLanguages,
	examples,
	screenshots: [],
	licenses: [{ type: "Apache-2.0", path: "LICENSE.md", cost: 0, currency: "EUR" }],
	readmePath: "README.md",
	name: "hb-searchbar",
	category: "basic",
	tags: ["basic"],
	size: {},
	iifePath: "release/release.js",
	repoName: "@htmlbricks/hb-searchbar",
	version: null as any,
};
