import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup, ComponentSetup } from "@htmlbricks/hb-jsutils/main";
import type { Component } from "../app/types/webcomponent.type";

export const storybookArgs = {
	action: { control: { type: "text" } },
	method: { control: { type: "radio" }, options: ["GET", "POST"] },
	"action-query-key": { control: { type: "text" } },
	"result-items-path": { control: { type: "text" } },
	"result-item-title-key": { control: { type: "text" } },
	"result-item-link-key": { control: { type: "text" } },
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

const examples: Component[] = [
	{ action: "", method: "GET", "action-query-key": "", "result-items-path": "", "result-item-title-key": "", "result-item-link-key": "" },
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
	name: "hb-searchbar",
	category: "basic",
	tags: ["basic"],
	size: {},
	iifePath: "release/release.js",
	repoName: "@htmlbricks/hb-searchbar",
	version: null,
};
