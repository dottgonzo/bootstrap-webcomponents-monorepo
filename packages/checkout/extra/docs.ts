import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup } from "@htmlbricks/hb-jsutils/main";

export const storybookArgs = {
	shipments: { control: { type: "array" } },
	user: { control: { type: "object" } },
	payment: { control: { type: "object" } },
	paymentCompleted: { action: "paymentCompleted" },
	saveUser: { action: "saveUser" },
	saveShipment: { action: "saveShipment" },
	gateways: { control: { type: "array" } },
	setGateway: { action: "setGateway" },
	completed: { control: { type: "radio" }, options: ["yes", "no"] },
};

const cssVars: CssVar[] = [
	{
		name: "--edit-color",
		defaultValue: "green",
		description: "",
		valueType: "color",
	},
	{
		name: "--paypal-button-color",
		defaultValue: "yellow",
		description: "",
		valueType: "color",
	},
	{
		name: "--hb-heckout-border",
		defaultValue: "0.5px solid rgba(197, 197, 197, 0.808)",
		description: "",
		valueType: "string",
	},

	{ name: "--bs-primary", valueType: "color", theme: "bootstrap", defaultValue: "#07689f" },
	{ name: "--bs-secondary", valueType: "color", theme: "bootstrap", defaultValue: "#c9d6df" },
	{ name: "--bs-success", valueType: "color", theme: "bootstrap", defaultValue: "#11d3bc" },
	{ name: "--bs-info", valueType: "color", theme: "bootstrap", defaultValue: "#a2d5f2" },
	{ name: "--bs-warning", valueType: "color", theme: "bootstrap", defaultValue: "#ffc107" },
	{ name: "--bs-danger", valueType: "color", theme: "bootstrap", defaultValue: "#f67280" },
];
export const cssParts: CssPart[] = [
	{
		name: "title",
	},
	{
		name: "subtitle",
	},
];
export const htmlSlots: HtmlSlot[] = [
	{
		name: "payment_terms",
	},
	{
		name: "payment_completed",
	},

	{
		name: "userinfo",
	},
	{
		name: "title",
	},
];
export const i18nLanguages: i18nLang[] = [];

export const styleSetup: StyleSetup = {
	vars: cssVars,
	parts: cssParts,
};

{
	storybookArgs,
	styleSetup,
	htmlSlots,
	i18n: i18nLanguages,
	examples: [],
	name: "",
	category: "",
	tags: [],
	size: {},
};
