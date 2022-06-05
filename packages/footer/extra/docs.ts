import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup, ComponentSetup } from "@htmlbricks/hb-jsutils/main";
import type { Component } from "../app/types/webcomponent.type";

export const storybookArgs = {
	columns: { control: { type: "array" } },
	policies: { control: { type: "array" } },
	brandandcontacts: { control: { type: "object" } },
	disable_expanding_small: { control: { type: "boolean" } },
	socials: { control: { type: "object" } },
	contacts: { control: { type: "object" } },
	company: { control: { type: "object" } },
	type: { control: { type: "select", options: ["small", "regular", "large"] } },
	footerClick: { action: "footerClickEvent" },
};

const cssVars: CssVar[] = [];
export const cssParts: CssPart[] = [{ name: "column-cell-button-content", description: "" }];
export const htmlSlots: HtmlSlot[] = [
	{ name: "footerpolicy", description: "" },
	{ description: "", name: "footerheader" },
	{ description: "", name: "footercontent" },
	{ description: "", name: "footerbottom" },
];

export const i18nLanguages: i18nLang[] = [];

export const styleSetup: StyleSetup = {
	vars: cssVars,
	parts: cssParts,
};
const company: Component["company"] = {
	logoUri: "https://upload.wikimedia.org/wikipedia/commons/8/80/Wikipedia-logo-v2.svg",
	siteName: "testsite",
	companyName: "testcompany S.R.L.",
	description: `testo e descrizione di esempio dell applicazione`,
	vatNumber: "aa - ffffff",
	fiscalCode: "f4f5f6fff",
};
const contacts: Component["contacts"] = {
	sites: [
		{
			label: "dariocaruso.info",
			uri: "https://dariocaruso.info",
		},
	],
	phones: [
		{
			number: "6666666666666",
		},
	],
	addresses: [],
	emails: [],
};
const socials: Component["socials"] = {
	facebook: "fbbb",
	youtube: "yttttttt",
};
const columns: Component["columns"] = [
	{
		cells: [
			{
				label: "test",
				_id: "test",
			},
			{
				label: "test2",
				_id: "test2",
			},
			{
				label: "test3",
				_id: "test3",
			},
		],
		title: "stringtitle",
	},
];
const brandandcontacts: Component["brandandcontacts"] = {
	companyName: "bella",
	companyLogoUri: "",
};
const policies: Component["policies"] = [
	{
		label: "Privacy Policy",
		key: "privacypolicy",
	},
	{
		label: "Condizioni Generali",
		key: "generalcondition",
	},
	{
		label: "Cookie Policy",
		key: "cookiepolicy",
	},
];
const examples: { name: string; description?: string; data: Component }[] = [
	{
		name: "default",
		data: {
			company,
			brandandcontacts,
			columns,
			policies,
			contacts,
			socials,
		},
	},
];
export const componentSetup: ComponentSetup & { examples: { name: string; description?: string; data: Component }[] } = {
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
	name: "hb-footer",
	category: "layout",
	tags: ["layout"],
	size: { layout: "fullscreen" },
	iifePath: "release/release.js",
	repoName: "@htmlbricks/hb-footer",
	version: null,
};
