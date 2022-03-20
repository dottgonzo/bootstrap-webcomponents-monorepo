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
