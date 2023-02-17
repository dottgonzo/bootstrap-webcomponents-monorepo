import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup, ComponentSetup } from "wc-js-utils/main";
import type { Component } from "../app/types/webcomponent.type";

export const storybookArgs = {
	nav_type: { control: { type: "select", options: ["switch", "range", "radio", "checkbox", "button"] } },
	navlink: { control: { type: "object" } },
	selected: { control: { type: "boolean" } },
	pageChange: { action: "pageChangeEvent" },
};

const cssVars: CssVar[] = [{ name: "--bs-primary", defaultValue: "#07689f", valueType: "color", theme: "bootstrap" }];
export const cssParts: CssPart[] = [{ name: "li", description: "list element" }];
export const htmlSlots: HtmlSlot[] = [];
export const i18nLanguages: i18nLang[] = [];

export const styleSetup: StyleSetup = {
	vars: cssVars,
	parts: cssParts,
};

const examples: { name: string; description?: string; data: Component }[] = [
	{
		name: "default",
		data: {
			navlink: {
				text: "Home",
				key: "home",
				bootstrapIcon: "house-door",
				badge: {
					text: "bbb",
				},
			},
		},
	},
	{
		name: "selected",
		data: {
			navlink: {
				text: "Home",
				key: "home",
				bootstrapIcon: "house-door",
				badge: {
					text: "bbb",
				},
				selected: true,
			},
		},
	},
	{
		name: "switch",
		data: {
			navlink: {
				text: "Home",
				key: "home",
				bootstrapIcon: "house-door",
				value: true,
				type: "switch",
			},
		},
	},
	{
		name: "checkbox",
		data: {
			navlink: {
				text: "Home",
				key: "home",
				bootstrapIcon: "house-door",
				value: true,
				type: "checkbox",
			},
		},
	},
	{
		name: "radio",
		data: {
			navlink: {
				text: "Home",
				key: "home",
				bootstrapIcon: "house-door",
				value: false,
				type: "radio",
			},
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
	name: "hb-sidenav-button",
	category: "basic",
	tags: ["basic"],
	size: {},
	iifePath: "release/release.js",
	repoName: "@htmlbricks/hb-sidenav-button",
	version: null as any,
};
