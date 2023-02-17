import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup, ComponentSetup } from "wc-js-utils/main";
import type { Component } from "../app/types/webcomponent.type";

export const storybookArgs = {
	lines: { control: { type: "object" } },

	counterClick: { action: "counterClickEvent" },
};

const cssVars: CssVar[] = [
	{ name: "--bs-primary", valueType: "color", theme: "bootstrap", defaultValue: "#07689f" },
	{ name: "--bs-secondary", valueType: "color", theme: "bootstrap", defaultValue: "#c9d6df" },
	{ name: "--bs-success", valueType: "color", theme: "bootstrap", defaultValue: "#11d3bc" },
	{ name: "--bs-info", valueType: "color", theme: "bootstrap", defaultValue: "#a2d5f2" },
	{ name: "--bs-warning", valueType: "color", theme: "bootstrap", defaultValue: "#ffc107" },
	{ name: "--bs-danger", valueType: "color", theme: "bootstrap", defaultValue: "#f67280" },
];
export const cssParts: CssPart[] = [{ name: "item" }, { name: "icon" }, { name: "text" }, { name: "value" }];
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
			lines: [
				{
					text: "Lorem ipsum dolor sit amet",
					value: "10",
					icon: "globe",
				},
				{
					text: "consectetur adipiscing elit",
					value: "33",
					icon: "save",
				},
				{
					text: "sed do eiusmod tempor incididunt",
					value: "44",
					icon: "clock",
				},
			],
		},
	},
	{
		name: "default2",
		data: {
			lines: [
				{
					text: "Lorem ipsum dolor sit amet",
					value: "10",
					link: { type: "tab", uri: "https://www.google.com" },
					icon: "pencil",
				},
			],
		},
	},
	{
		name: "default3",
		data: {
			lines: [
				{
					text: "Lorem ipsum dolor sit amet",
					value: "10",
					link: { type: "page", uri: "https://www.google.com" },
					icon: "window",
				},
			],
		},
	},
	{
		name: "default4",
		data: {
			lines: [
				{
					text: "Lorem ipsum dolor sit amet",
					value: "10",
					link: { type: "event", uri: "lorem" },
				},
			],
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
	name: "hb-dashboard-counter-lines",
	category: "dashboard",
	tags: ["dashboard"],
	size: {},
	iifePath: "release/release.js",
	repoName: "@htmlbricks/hb-dashboard-counter-lines",
	version: null as any,
};
