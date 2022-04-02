import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup, ComponentSetup } from "@htmlbricks/hb-jsutils/main";
import type { Component } from "../app/types/webcomponent.type";

export const storybookArgs = {
	payment: { control: { type: "object" } },
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

const examples: Component[] = [
	{
		payment: {
			items: [
				{
					id: "efewf",
					unitaryPrice: 2,
					taxPercentage: 3,
					name: "testitem",
				},
				{
					id: "efewf4",
					unitaryPrice: 5,
					taxPercentage: 7,
					name: "testitem2",
				},
			],
			countryCode: "IT",
		},
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
	licenses: [{ type: "Apache-2.0", path: "/LICENSE.md", cost: 0, currency: "EUR" }],
	readmePath: "/README.md",
	name: "hb-checkout-shopping-cart",
	category: "payment",
	tags: ["payment"],
	size: {},
	iifePath: "release/release.js",
	repoName: "@htmlbricks/hb-checkout-shopping-cart",
	version: null,
};
