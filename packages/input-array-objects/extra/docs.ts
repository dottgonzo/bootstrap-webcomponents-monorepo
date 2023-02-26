import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup, ComponentSetup } from "wc-js-utils/main";
import type { Component } from "../app/types/webcomponent.type";

export const storybookArgs = {
	schemaentry: { control: { type: "object" } },
	show_validation: { control: { type: "boolean" } },
	set_valid: { control: { type: "boolean" } },
	set_value: { control: { type: "boolean" } },
	setValid: { action: "setValid" },
	setValue: { action: "setValue" },
};

const cssVars: CssVar[] = [
	{ name: "--bs-primary", valueType: "color", theme: "bootstrap", defaultValue: "#07689f" },
	{ name: "--bs-secondary", valueType: "color", theme: "bootstrap", defaultValue: "#c9d6df" },
	{ name: "--bs-success", valueType: "color", theme: "bootstrap", defaultValue: "#11d3bc" },
	{ name: "--bs-info", valueType: "color", theme: "bootstrap", defaultValue: "#a2d5f2" },
	{ name: "--bs-warning", valueType: "color", theme: "bootstrap", defaultValue: "#ffc107" },
	{ name: "--bs-danger", valueType: "color", theme: "bootstrap", defaultValue: "#f67280" },
];
export const cssParts: CssPart[] = [{ name: "properties-container", description: "properties container" }];
export const htmlSlots: HtmlSlot[] = [{ name: "add-object-label", description: "add property label" }];
export const i18nLanguages: i18nLang[] = [];

export const styleSetup: StyleSetup = {
	vars: cssVars,
	parts: cssParts,
};
const schema1 = [
	{
		id: "name-row",
		type: "row",
		params: {
			columns: [
				{
					type: "text",
					placeholder: "Insert your first name here...",
					id: "firstNamee",
					required: true,
					label: "First Namee",
					validationTip: "This field cannot be empty.",
				},
				{
					type: "text",
					placeholder: "Insert your last name here...",
					id: "lastName",
					label: "Last Nam3e",
					validationTip: "This field cannot be empty.",
				},
			],
		},
	},
];
const examples: { name: string; description?: string; data: Component }[] = [
	{
		name: "default",
		data: {
			schemaentry: {
				placeholder: "Insert your last name here...",
				id: "lastName",
				validationTip: "This field cannot be empty.",
				params: {
					schema: schema1,
				},
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
	name: "hb-input-array-objects",
	category: "input",
	tags: ["input"],
	size: {},
	iifePath: "release/release.js",
	repoName: "@htmlbricks/hb-input-array-objects",
	version: null as any,
};
