import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup, ComponentSetup } from "@htmlbricks/hb-jsutils/main";
import type { Component } from "../app/types/webcomponent.type";

export const storybookArgs = {
	action: { control: { type: "text" } },
	img: { control: { type: "text" } },
	url: { control: { type: "text" } },
	badge: { control: { type: "text" } },
	title: { control: { type: "text" } },
	subtitle: { control: { type: "text" } },
	text: { control: { type: "text" } },
	rating: { control: { type: "number" } },
	ratingScale: { control: { type: "number" } },
	reviews: { control: { type: "text" } },
	reviewsUrl: { control: { type: "text" } },
	price: { control: { type: "text" } },
	regularPrice: { control: { type: "text" } },
	footer: { control: { type: "text" } },
};

const cssVars: CssVar[] = [];
export const cssParts: CssPart[] = [];
export const htmlSlots: HtmlSlot[] = [];
export const i18nLanguages: i18nLang[] = [];

export const styleSetup: StyleSetup = {
	vars: cssVars,
	parts: cssParts,
};

const examples: Component[] = [
	{
		img: "",
		url: "",
		badge: "",
		title: "",
		subtitle: "",
		text: "",
		rating: 0,
		ratingScale: 0,
		reviews: "",
		reviewsUrl: "",
		price: "",
		regularPrice: "",
		footer: "",
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
	name: "hb-shop-item-row",
	category: "basic",
	tags: ["basic"],
	size: {},
	iifePath: "release/release.js",
	repoName: "@htmlbricks/hb-shop-item-row",
	version: null,
};
