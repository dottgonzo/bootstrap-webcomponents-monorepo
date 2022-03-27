import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup, ComponentSetup } from "@htmlbricks/hb-jsutils/main";

export const storybookArgs = {
	shipments: { control: { type: "array" } },
	user: { control: { type: "object" } },
	payment: { control: { type: "object" } },
	paymentCompleted: { action: "paymentCompleted" },
	saveUser: { action: "saveUser" },
	// saveShipment: { action: "saveShipment" },
	gateways: { control: { type: "array" } },
	completed: { control: { type: "radio" }, options: ["yes", "no"] },
};

const cssVars: CssVar[] = [
	{ name: "--hb-checkout-border", description: "", defaultValue: "0.5px solid rgba(197, 197, 197, 0.808)", valueType: "string" },
	{ name: "--bs-primary", valueType: "color", theme: "bootstrap", defaultValue: "#07689f" },
	{ name: "--bs-secondary", valueType: "color", theme: "bootstrap", defaultValue: "#c9d6df" },
	{ name: "--bs-success", valueType: "color", theme: "bootstrap", defaultValue: "#11d3bc" },
	{ name: "--bs-info", valueType: "color", theme: "bootstrap", defaultValue: "#a2d5f2" },
	{ name: "--bs-warning", valueType: "color", theme: "bootstrap", defaultValue: "#ffc107" },
	{ name: "--bs-danger", valueType: "color", theme: "bootstrap", defaultValue: "#f67280" },
];
export const cssParts: CssPart[] = [];
export const htmlSlots: HtmlSlot[] = [];
export const i18nLanguages: i18nLang[] = [];

export const styleSetup: StyleSetup = {
	vars: cssVars,
	parts: cssParts,
};

export const componentSetup: ComponentSetup = {
	definitions: null,
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
