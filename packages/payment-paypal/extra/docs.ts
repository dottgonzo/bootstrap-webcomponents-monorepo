import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup, ComponentSetup } from "@htmlbricks/hb-jsutils/main";
import type { Component } from "../app/types/webcomponent.type";

export const storybookArgs = {
	// payByCard: { action: "payByCard" },
	paymentCompleted: { action: "paymentCompleted" },
	paypalid: { control: { type: "string" } },
	currency: { control: { type: "string" } },
};

const cssVars: CssVar[] = [
	{
		name: "--hb-checkout-border",
		defaultValue: "0.5px solid rgba(197, 197, 197, 0.808)",
		description: "",
		valueType: "string",
	},
];
export const cssParts: CssPart[] = [{ name: "btn", description: "paypal button css" }];
export const htmlSlots: HtmlSlot[] = [];
export const i18nLanguages: i18nLang[] = [];

export const styleSetup: StyleSetup = {
	vars: cssVars,
	parts: cssParts,
};

const examples: Component[] = [
	{
		currency: "EUR",
		total: 40,
		paypalid: "test",
	},
];
export const componentSetup: ComponentSetup & { examples: Component[] } = {
	definitions: null,
	storybookArgs,
	styleSetup,
	author: null,
	contributors: [],
	owner: null,
	htmlSlots,
	i18n: i18nLanguages,
	examples,
	screenshots: [],
	licenses: [{ type: "Apache-2.0", path: "LICENSE.md", cost: 0, currency: "EUR" }],
	readmePath: "README.md",
	name: "hb-payment-paypal",
	category: "payment",
	tags: ["payment"],
	size: {},
	iifePath: "release/release.js",
	repoName: "@htmlbricks/hb-payment-paypal",
	version: null,
};
