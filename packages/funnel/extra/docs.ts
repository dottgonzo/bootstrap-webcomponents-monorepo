import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup, ComponentSetup } from "@htmlbricks/hb-jsutils/main";
import type { Component } from "../app/types/webcomponent.type";

export const storybookArgs = {
	submitstep: {
		options: ["no", "yes"],
		control: { type: "select" },
	},
	update: { action: "updateEvent" },
	submit: { action: "submitEvent" },

	schemes: { control: { type: "array" } },
};

const cssVars: CssVar[] = [
	{ name: "--bs-primary", valueType: "color", theme: "bootstrap", defaultValue: "#07689f" },
	{ name: "--bs-secondary", valueType: "color", theme: "bootstrap", defaultValue: "#c9d6df" },
	{ name: "--bs-success", valueType: "color", theme: "bootstrap", defaultValue: "#11d3bc" },
	{ name: "--bs-info", valueType: "color", theme: "bootstrap", defaultValue: "#a2d5f2" },
	{ name: "--bs-warning", valueType: "color", theme: "bootstrap", defaultValue: "#ffc107" },
	{ name: "--bs-danger", valueType: "color", theme: "bootstrap", defaultValue: "#f67280" },
];
export const cssParts: CssPart[] = [{ name: "invalid-feedback", description: "" }];
export const htmlSlots: HtmlSlot[] = [];
export const i18nLanguages: i18nLang[] = [];

export const styleSetup: StyleSetup = {
	vars: cssVars,
	parts: cssParts,
};
const preferences: Component["schemes"][0] = [
	{
		type: "text",
		placeholder: "Inserisci titolo di default",
		id: "defaultTitle",
		required: true,

		label: "Titolo di default",
		value: "numtest",
		params: {
			minlength: 8,
			maxlength: 120,
		},
	},
	{
		type: "number",
		id: "age",
		required: true,
		label: "Age",
		value: 9,
		params: {
			min: 8,
			max: 120,
		},
		validationTip: "Min 8, Max 120",
	},
];
const preferences2: Component["schemes"][0] = [
	{
		type: "text",
		placeholder: "Inserisci titolo di default2",
		id: "defaultTitle2",
		required: true,

		label: "Titolo di default2",
		value: "ntest2",
		params: {
			minlength: 8,
			maxlength: 120,
		},
	},
	{
		type: "number",
		id: "age2",
		required: true,
		label: "Age2",
		value: 20,
		params: {
			min: 8,
			max: 120,
		},
		validationTip: "Min 8, Max 120",
	},
];
const examples: Component[] = [
	{
		schemes: [preferences, preferences2],
	},
];
export const componentSetup: ComponentSetup & { examples: Component[] } = {
	definitions: null,
	storybookArgs,
	styleSetup,
	htmlSlots,
	i18n: i18nLanguages,
	examples,
	screenshots: [],
	licenses: [{ type: "Apache-2.0", path: "LICENSE.md", cost: 0, currency: "EUR" }],
	readmePath: "README.md",
	name: "hb-funnel",
	category: "form",
	tags: ["form"],
	size: {},
	iifePath: "release/release.js",
	repoName: "@htmlbricks/hb-funnel",
	version: null,
};
