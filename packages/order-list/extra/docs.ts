import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup, ComponentSetup } from "@htmlbricks/hb-jsutils/main";
import type { Component } from "../app/types/webcomponent.type";

export const storybookArgs = {
	payment: { control: { type: "object" } },
};

const cssVars: CssVar[] = [];
export const cssParts: CssPart[] = [{ name: "item_image", description: "" }];
export const htmlSlots: HtmlSlot[] = [];
export const i18nLanguages: i18nLang[] = [];

export const styleSetup: StyleSetup = {
	vars: cssVars,
	parts: cssParts,
};

const examples: Component[] = [
	{
		payment: {
			orderNumber: "ssss",
			countryCode: "EU",

			items: [
				{
					id: "sss",
					unitaryPrice: 2,
					taxPercentage: 3,
					name: "testitem",
					image: "https://upload.wikimedia.org/wikipedia/commons/6/66/Walgreens_Obama_Merchandise.jpg",
				},
				{
					id: "aaa",
					unitaryPrice: 5,
					taxPercentage: 7,
					name: "testitem2",
					image: "https://upload.wikimedia.org/wikipedia/commons/4/49/Fredmeyer_edit_1.jpg",
				},
			] as unknown as any,
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
	name: "hb-order-list",
	category: "basic",
	tags: ["basic"],
	size: {},
	iifePath: "release/release.js",
	repoName: "@htmlbricks/hb-order-list",
	version: null,
};
