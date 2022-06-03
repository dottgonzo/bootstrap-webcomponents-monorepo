import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup, ComponentSetup } from "@htmlbricks/hb-jsutils/main";
import type { Component } from "../app/types/webcomponent.type";

export const storybookArgs = {
	type: {
		options: ["login", "register"],
		control: { type: "select" }, // Automatically inferred when 'options' is defined
	},
	language: { control: { type: "text" } },
	logouri: { control: { type: "text" } },
	loginuri: { control: { type: "text" } },
	registeruri: { control: { type: "text" } },
	login: { action: "loginEvent" },
	register: { action: "registerEvent" },
	contacts: { control: { type: "object" } },
	company: { control: { type: "object" } },
	socials: { control: { type: "object" } },
	oauth2providers: { control: { type: "array" } },
	footer: { control: { type: "object" } },
	page_title: { control: { type: "string" } },
	appendbodyparams: { control: { type: "text" } },
	appendqueryparams: { control: { type: "text" } },
	cookielaw: { control: { type: "text" } },
	disableregister: { control: { type: "text" } },

	page: { control: { type: "text" } },
	passwordpattern: { control: { type: "text" } },
	redirectoncreate: { control: { type: "text" } },
	redirectonlogin: { control: { type: "text" } },
	requestmethod: { control: { type: "text" } },
	sessionkey: { control: { type: "text" } },
	usermenu: { control: { type: "text" } },
	userpattern: { control: { type: "text" } },
	usertype: { control: { type: "text" } },
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
const company1: Component["company"] = {
	logoUri: "https://upload.wikimedia.org/wikipedia/commons/8/80/Wikipedia-logo-v2.svg",
	siteName: "testsite",
	companyName: "testcompany S.R.L.",
	registration: { text: "copyright" },
	description: `testo e descrizione di esempio dell applicazione`,
	vatNumber: "aa - ffffff",
	fiscalCode: "f4f5f6fff",
};
const examples: Component[] = [
	{
		type: "login",
		company: company1,
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
	name: "hb-page-loginregister",
	category: "page",
	tags: ["page"],
	size: { layout: "fullscreen" },
	iifePath: "release/release.js",
	repoName: "@htmlbricks/hb-page-loginregister",
	version: null,
};
