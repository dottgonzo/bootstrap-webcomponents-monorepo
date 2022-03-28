import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup, ComponentSetup } from "@htmlbricks/hb-jsutils/main";
import type { Component } from "../app/types/webcomponent.type";

export const storybookArgs = {
	schema: { control: { type: "array" } },
	submit: { action: "submit" },
	submitted: { control: { type: "boolean" } },
	showvalidation: { control: { type: "boolean" } },
	setvalid: { control: { type: "boolean" } },
	setvalue: { control: { type: "boolean" } },
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
const schema: Component["schema"] = [
	{
		id: "name-row",
		type: "row",
		params: {
			columns: [
				{
					type: "text",
					placeholder: "Insert your first name here...",
					id: "firstName",
					required: true,
					label: "First Name",
					validationTip: "This field cannot be empty.",
				},
				{
					type: "text",
					placeholder: "Insert your last name here...",
					id: "lastName",
					required: true,
					label: "Last Name",
					validationTip: "This field cannot be empty.",
				},
				{
					type: "text",
					placeholder: "Insert your last namez here...",
					id: "lastNamez",
					label: "Last Namez",
					validationTip: "This field cannot be emptyz.",
				},
				{
					type: "select",
					placeholder: "Select something here...",
					id: "selectsomething",
					required: true,
					label: "Selection of something",
					validationTip: "This field cannot be empty.",
					params: {
						options: [
							{ label: "", value: "" },
							{ label: "testlabel", value: "testvalue" },
						],
					},
				},
				{
					type: "radio",
					placeholder: "radio something here...",
					id: "radiosomething",
					required: true,
					label: "Selection of something",
					validationTip: "This field cannot be empty.",
					params: {
						options: [
							{ label: "radio", value: "radio" },
							{ label: "radio2", value: "radi2o" },
							{ label: "radio3", value: "radio2" },
							{ label: "testlabel", value: "testvalue" },
						],
					},
				},
			],
		},
	},
	{
		type: "number",
		id: "age",
		required: true,
		label: "Age",
		params: {
			min: 8,
			max: 120,
		},
		validationTip: "Min 8, Max 120",
	},
	{
		type: "text",
		placeholder: "Insert your last name here...",
		id: "lastName2",
		required: true,
		label: "Last Name",
		validationTip: "This field cannot be empty.",
	},
	{
		type: "textarea",
		placeholder: "Insert your last name22 here...",
		id: "lastName22",
		required: true,
		label: "Last Name2",
		validationTip: "This field cannot be empty2.",
	},
];
const examples: Component[] = [
	{
		schema,
	},
];
export const componentSetup: ComponentSetup & { examples: Component[] } = {
	definitions: null,
	storybookArgs,
	styleSetup,
	htmlSlots,
	i18n: i18nLanguages,
	examples,
	name: "hb-form",
	category: "form",
	tags: ["form"],
	size: {},
	iifePath: "release/release.js",
	repoName: "@htmlbricks/hb-form",
	version: null,
	dependencies: [],
};
