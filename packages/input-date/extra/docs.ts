import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup, ComponentSetup } from "wc-js-utils/main";
import type { Component } from "../app/types/webcomponent.type";

export const storybookArgs = {
	schemaentry: { control: { type: "object" } },
	show_validation: { control: { type: "boolean" } },
	set_valid: { control: { type: "boolean" } },
	set_value: { control: { type: "boolean" } },
	setValid: { action: "setValid" },
	setValue: { action: "setValue" },
	clickEnter: { action: "clickEnter" },
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

const examples: { name: string; description?: string; data: Component }[] = [
	{
		name: "default",
		data: {
			schemaentry: {
				placeholder: "Insert your last name here...",
				id: "lastName",
				required: true,
				label: "Last Name",
				validationTip: "This field cannot be empty.",
			},
		},
	},
	{
		name: "from27Febb2022",
		data: {
			schemaentry: {
				placeholder: "Insert your last name here...",
				id: "lastName",
				required: true,
				label: "Last Name",
				validationTip: "This field cannot be empty.",
				params: {
					min: "2023-02-27T08:00:32.009Z",
				},
			},
		},
	},
	{
		name: "to27Febb2022",
		data: {
			schemaentry: {
				placeholder: "Insert your last name here...",
				id: "lastName",
				required: true,
				label: "Last Name",
				validationTip: "This field cannot be empty.",
				params: {
					max: "2023-02-27T08:00:32.009Z",
				},
			},
		},
	},
	{
		name: "in27Febb2022",
		data: {
			schemaentry: {
				placeholder: "Insert your last name here...",
				id: "lastName",
				required: true,
				label: "Last Name",
				validationTip: "This field cannot be empty.",
				params: {
					min: "2023-02-27T00:00:00.000Z",
					max: "2023-02-27T23:59:59.999Z",
				},
			},
		},
	},
	{
		name: "date27Febb2023",
		data: {
			schemaentry: {
				placeholder: "Insert your last name here...",
				id: "lastName",
				required: true,
				label: "Last Name",
				validationTip: "This field cannot be empty.",
				value: "1984-02-27",
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
	name: "hb-input-date",
	category: "input",
	tags: ["input"],
	size: {},
	iifePath: "release/release.js",
	repoName: "@htmlbricks/hb-input-date",
	version: null as any,
};
