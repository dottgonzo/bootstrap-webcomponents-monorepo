import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup, ComponentSetup } from "@htmlbricks/hb-jsutils/main";
import type { Component } from "../app/types/webcomponent.type";

export const storybookArgs = {
	img: { control: { type: "text" } },
	url: { control: { type: "text" } },
	badge: { control: { type: "text" } },
	title: { control: { type: "text" } },
	subtitle: { control: { type: "text" } },
	text: { control: { type: "text" } },
	rating: { control: { type: "number" } },
	"rating-scale": { control: { type: "number" } },
	reviews: { control: { type: "text" } },
	"reviews-url": { control: { type: "text" } },
	price: { control: { type: "text" } },
	"regular-price": { control: { type: "text" } },
	footer: { control: { type: "text" } },
};

const cssVars: CssVar[] = [];
export const cssParts: CssPart[] = [];
export const htmlSlots: HtmlSlot[] = [
	{ name: "badge", description: "badge" },
	{ name: "title", description: "title" },
	{ name: "subtitle", description: "subtitle" },
	{ name: "text", description: "text" },
	{ name: "reviews", description: "reviews" },
	{ name: "price", description: "price" },
	{ name: "footer", description: "footer" },
	{ name: "regular-price", description: "regular-price" },
];
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
		"rating-scale": 0,
		reviews: "",
		"reviews-url": "",
		price: "",
		"regular-price": "",
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
	name: "hb-searchbar",
	category: "basic",
	tags: ["basic"],
	size: {},
	iifePath: "release/release.js",
	repoName: "@htmlbricks/hb-searchbar",
	version: null,
};
