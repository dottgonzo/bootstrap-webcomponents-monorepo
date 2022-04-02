import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup, ComponentSetup } from "@htmlbricks/hb-jsutils/main";
import type { Component } from "../app/types/webcomponent.type";

export const storybookArgs = {
	printer: { control: { type: "text" } },
	headers: { control: { type: "object" } },
	items: { control: { type: "array" } },
};

const cssVars: CssVar[] = [
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
		headers: {
			serial: "seriale1",
			from: {
				piva: "piva",
				name: "companyfrom",
				address: "address",
				email: "email",
				phone: "phone",
				logo: "https://upload.wikimedia.org/wikipedia/commons/a/af/Free_Content_Logo.svg",
				shortName: "Acme SpA",
			},
			to: {
				piva: "to iva",
				name: "to name",
				address: "to address",
				email: "to@email.com",
				phone: "tototo",
			},
		},
		items: [
			{
				unitaryPrice: 2,
				taxPercentage: 3,
				desc: "testitem",
			},
			{
				unitaryPrice: 5,
				taxPercentage: 7,
				desc: "testitem2",
			},
		],
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
	licenses: [{ type: "Apache-2.0", path: "LICENSE.md", cost: 0, currency: "EUR" }],
	readmePath: "README.md",
	name: "hb-page-invoice",
	category: "page",
	tags: ["page"],
	size: {},
	iifePath: "release/release.js",
	repoName: "@htmlbricks/hb-page-invoice",
	version: null,
};
