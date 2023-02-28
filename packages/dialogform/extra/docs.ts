import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup, ComponentSetup } from "wc-js-utils/main";
import type { Component } from "../app/types/webcomponent.type";

export const storybookArgs = {
	schema: { control: { type: "object" } },
	show: { control: { type: "boolean" } },
	dialogformclasses: { control: { type: "text" } },
	title: { control: { type: "text" } },
	backdrop: { control: { type: "boolean" } },
	ignoreBackdrop: { control: { type: "text" } },
	keyboard: { control: { type: "boolean" } },
	describedby: { control: { type: "text" } },
	labelledby: { control: { type: "text" } },
	content: { control: { type: "text" } },
	closelabel: { control: { type: "text" } },
	confirmlabel: { control: { type: "text" } },
	modalShow: { action: "modalShow" },
	modalFormConfirm: { action: "modalFormConfirm" },
	modalFormCancel: { action: "modalFormCancel" },
};

const cssVars: CssVar[] = [
	{ name: "--bs-primary", valueType: "color", theme: "bootstrap", defaultValue: "#07689f" },
	{ name: "--bs-secondary", valueType: "color", theme: "bootstrap", defaultValue: "#c9d6df" },
	{ name: "--bs-success", valueType: "color", theme: "bootstrap", defaultValue: "#11d3bc" },
	{ name: "--bs-info", valueType: "color", theme: "bootstrap", defaultValue: "#a2d5f2" },
	{ name: "--bs-warning", valueType: "color", theme: "bootstrap", defaultValue: "#ffc107" },
	{ name: "--bs-danger", valueType: "color", theme: "bootstrap", defaultValue: "#f67280" },
];
export const cssParts: CssPart[] = [];
export const htmlSlots: HtmlSlot[] = [
	{ name: "form-header" },
	{ name: "form-footer" },
	{ name: "header" },
	{ name: "modal-footer" },
	{ name: "footer" },
	{ name: "close-button-label" },
	{ name: "confirm-button-label" },
];
export const i18nLanguages: i18nLang[] = [];

export const styleSetup: StyleSetup = {
	vars: cssVars,
	parts: cssParts,
};
const preferences = [
	{
		type: "text",
		placeholder: "Inserisci titolo di default",
		id: "defaultTitle",
		required: true,

		label: "Titolo di default",
		value: "titolotest",
		params: {
			min: 8,
			max: 120,
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
const examples: { name: string; description?: string; data: Component }[] = [
	{
		name: "default",
		data: {
			schema: preferences,
		},
	},
	{
		name: "default2",
		data: {
			schema: preferences,
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
	name: "hb-dialogform",
	category: "form",
	tags: ["form"],
	size: {},
	iifePath: "release/release.js",
	repoName: "@htmlbricks/hb-dialogform",
	version: null as any,
};
