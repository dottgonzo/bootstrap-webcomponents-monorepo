import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup, ComponentSetup } from "@htmlbricks/hb-jsutils/main";
import type { Component } from "../app/types/webcomponent.type";

export const storybookArgs = {
	smallrow: { control: { type: "object" } },
	columns: { control: { type: "array" } },
	policies: { control: { type: "array" } },
	companyname: { control: { type: "text" } },
	companylogouri: { control: { type: "text" } },
	brandandcontacts: { control: { type: "object" } },
	footerbottom: { control: { type: "object" } },
	copyrighttext: { control: { type: "object" } },
	socials: { control: { type: "object" } },
	contacts: { control: { type: "object" } },
	company: { control: { type: "object" } },
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
	registration: { text: "copyright" },
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
const examples: Component[] = [
	{
		company,
		brandandcontacts,
		columns,
		policies,
		contacts,
		socials,
	},
];
export const componentSetup: ComponentSetup & { examples: Component[] } = {
	definitions: null,
	storybookArgs,
	styleSetup,
	htmlSlots,
	i18n: i18nLanguages,
	examples,
	name: "hb-footer",
	category: "layout",
	tags: ["layout"],
	size: {},
};
