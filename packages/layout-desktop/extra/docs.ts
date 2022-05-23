import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup, ComponentSetup } from "@htmlbricks/hb-jsutils/main";
import type { Component } from "../app/types/webcomponent.type";

export const storybookArgs = {
	pageChange: { action: "pageChange" },
	offcanvasswitch: { action: "offcanvasswitchEvent" },
	layoutStatus: { action: "layoutStatus" },
	footerClick: { action: "footerClick" },
	userClick: { action: "userClick" },
	contacts: { control: { type: "object" } },
	columns: { control: { type: "object" } },
	sidebar: { control: { type: "object" } },
	socials: { control: { type: "object" } },
	usermenu: { control: { type: "object" } },
	company: { control: { type: "object" } },
	navlinks: { control: { type: "array" } },
	pagename: { control: { type: "string" } },
	cookielawuri4more: { control: { type: "string" } },
	cookielawallowdecline: { control: { type: "boolean" } },
	cookielawlanguage: { control: { type: "string" } },
	cookielaw: { control: { type: "boolean" } },
	onescreen: { control: { type: "boolean" } },
};
const cssVars: CssVar[] = [
	{ name: "--bs-primary", valueType: "color", theme: "bootstrap", defaultValue: "#07689f" },
	{ name: "--bs-secondary", valueType: "color", theme: "bootstrap", defaultValue: "#c9d6df" },
	{ name: "--bs-success", valueType: "color", theme: "bootstrap", defaultValue: "#11d3bc" },
	{ name: "--bs-info", valueType: "color", theme: "bootstrap", defaultValue: "#a2d5f2" },
	{ name: "--bs-warning", valueType: "color", theme: "bootstrap", defaultValue: "#ffc107" },
	{ name: "--bs-danger", valueType: "color", theme: "bootstrap", defaultValue: "#f67280" },
];
export const cssParts: CssPart[] = [
	{ name: "footer", description: "" },
	{ name: "container", description: "" },
	{ name: "navbar", description: "" },
	{ name: "page", description: "" },
];
export const htmlSlots: HtmlSlot[] = [
	{ name: "nav-left-slot", description: "" },
	{ name: "nav-center-slot", description: "" },
	{ name: "nav-right-slot", description: "" },
	{ name: "page", description: "" },
	{ name: "nav-header-slot", description: "" },
];
export const i18nLanguages: i18nLang[] = [
	{ lang: "it", language: "italian" },
	{ lang: "en", language: "english" },
];
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
const navlinks: Component["navlinks"] = [
	{
		label: "Home",
		key: "home",
		icon: "house-door",
		badge: {
			text: "bbb",
		},
	},
	{
		label: "Dashboard",
		key: "dashboard",
		icon: "speedometer",
		badge: {
			text: "bbb",
		},
	},
	{
		label: "Settings",
		key: "settings",
		icon: "gear",
		group: "admin",
		badge: {
			text: "bbb",
		},
	},
	{
		label: "Users",
		key: "users",
		icon: "people-fill",
		group: "admin",
		badge: {
			text: "uuuuu",
		},
	},
	{
		label: "Stats",
		key: "stats",
		icon: "graph-up",
		group: "stats",
		badge: {
			text: "bbb",
		},
	},
];

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
const usermenu: Component["usermenu"] = {
	list: [
		{
			key: "list1",
			label: "list1",
		},
		{
			key: "list2",
			label: "list2",
		},
		{
			key: "list3",
			label: "list3",
			group: "list1",
			badge: 3,
		},
		{
			key: "list4",
			label: "list4",
			badge: 555,
		},
	],
	imgUri: "https://upload.wikimedia.org/wikipedia/commons/8/80/Wikipedia-logo-v2.svg",
};
const socials: Component["socials"] = {
	facebook: "fbbb",
	youtube: "yttttttt",
};
const sidebar: Component["sidebar"] = { title: "ciao" };

const examples: Component[] = [
	{
		company,
		contacts,
		socials,
		navlinks,
		usermenu,
		sidebar,
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
	name: "hb-layout-desktop",
	category: "layout",
	tags: ["layout"],
	size: {},
	iifePath: "release/release.js",
	repoName: "@htmlbricks/hb-layout-desktop",
	version: null,
};
