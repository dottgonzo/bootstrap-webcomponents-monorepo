import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup, ComponentSetup } from "@htmlbricks/hb-jsutils/main";
import type { Component } from "../app/types/webcomponent.type";

export const storybookArgs = {
	navpage: { control: { type: "text" } },
	navlink: { control: { type: "object" } },
};

const cssVars: CssVar[] = [{ name: "--bs-primary", defaultValue: "#07689f", valueType: "color", theme: "bootstrap" }];
export const cssParts: CssPart[] = [{ name: "li", description: "list element" }];
export const htmlSlots: HtmlSlot[] = [];
export const i18nLanguages: i18nLang[] = [];

export const styleSetup: StyleSetup = {
	vars: cssVars,
	parts: cssParts,
};

const examples: Component[] = [
	{
		navpage: "home",
		navlink: {
			label: "Home",
			key: "home",
			icon: "house-door",
			badge: {
				text: "bbb",
			},
		},
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
	name: "hb-sidenav-link",
	category: "basic",
	tags: ["basic"],
	size: {},
	iifePath: "release/release.js",
	repoName: "@htmlbricks/hb-sidenav-link",
	version: null,
};
