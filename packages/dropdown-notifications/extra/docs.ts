import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup, ComponentSetup } from "wc-js-utils/main";
import type { Component } from "../app/types/webcomponent.type";

export const storybookArgs = {
	uri: { control: { type: "text" } },
	clearurl: { control: { type: "text" } },
	viewurl: { control: { type: "text" } },
	align: { control: { type: "select" }, options: ["left", "right"] },
};

const cssVars: CssVar[] = [];
export const cssParts: CssPart[] = [];
export const htmlSlots: HtmlSlot[] = [{ name: "title", description: "" }];
export const i18nLanguages: i18nLang[] = [];

export const styleSetup: StyleSetup = {
	vars: cssVars,
	parts: cssParts,
};

const examples: { name: string; description?: string; data: Component }[] = [
	{
		name: "default",
		data: {
			clearurl: "",
			viewurl: "",
			align: "left",
		},
	},
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
	name: "hb-dropdown-notifications",
	category: "basic",
	tags: ["basic"],
	size: {},
	iifePath: "release/release.js",
	repoName: "@htmlbricks/hb-dropdown-notifications",
	version: null as any,
};
