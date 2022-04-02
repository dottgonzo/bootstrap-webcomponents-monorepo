import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup, ComponentSetup } from "@htmlbricks/hb-jsutils/main";
import type { Component } from "../app/types/webcomponent.type";

export const storybookArgs = {
	products: { control: { type: "array" } },
	options: { control: { type: "object" } },
	headers: { control: { type: "array" } },
	purchaseClick: { action: "purchaseClickEvent" },
};

const cssVars: CssVar[] = [];
export const cssParts: CssPart[] = [
	{ name: "container", description: "" },
	{ name: "col", description: "" },
	{ name: "row", description: "" },
];
export const htmlSlots: HtmlSlot[] = [];
export const i18nLanguages: i18nLang[] = [];

export const styleSetup: StyleSetup = {
	vars: cssVars,
	parts: cssParts,
};

const examples: Component[] = [
	{
		headers: [
			{
				id: "char1",
				label: "labello",
			},
			{
				id: "char2",
				label: "labello2",
			},
			{
				id: "char3",
				label: "labello3",
			},
		],
		products: [
			{
				id: "prrr",
				price: 19,
				model: "starter",
				description: "weekly",
				note: "rotto",
				characteristics: {
					char1: "valid",
					char2: "disabled",
					char3: "blocked",
					char4: "valid",
				},
			},
			{
				id: "prrr2",
				price: 49,
				model: "professional",
				description: "weekly",
				note: "rotto",
				characteristics: {
					char1: "valid",
					char2: "disabled",
					char3: "blocked",
					char4: "valid",
				},
			},
			{
				id: "prrr3",
				price: 99,
				model: "advanced",
				description: "weekly",
				note: "rotto",
				characteristics: {
					char1: "valid",
					char2: "disabled",
					char3: "blocked",
					char4: "valid",
				},
			},
			{
				id: "prrr4",
				price: 199,
				model: "custom",
				description: "weekly",
				note: "rotto",

				characteristics: {
					char1: "valid",
					char2: "disabled",
					char3: "blocked",
					char4: "valid",
				},
			},
		],
		options: { currency: "€" },
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
	license: "Apache-2.0",
	name: "hb-product-comparison",
	category: "components",
	tags: ["components"],
	size: {},
	iifePath: "release/release.js",
	repoName: "@htmlbricks/hb-product-comparison",
	version: null,
};
