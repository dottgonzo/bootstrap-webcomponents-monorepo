import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup } from "@htmlbricks/hb-jsutils/main";

export const storybookArgs = {
	pagechange: { action: "pagechange" },
	offcanvasswitch: { action: "offcanvasswitchEvent" },
	contacts: { control: { type: "object" } },
	sidebar: { control: { type: "object" } },
	socials: { control: { type: "object" } },
	usermenu: { control: { type: "object" } },
	company: { control: { type: "object" } },
	navlinks: { control: { type: "array" } },
	pagename: { control: { type: "string" } },
	cookielaw: { control: { type: "boolean" } },
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
export const i18nLanguages: i18nLang[] = [];

export const styleSetup: StyleSetup = {
	vars: cssVars,
	parts: cssParts,
};

export const componentSetup = {
	storybookArgs,
	styleSetup,
	htmlSlots,
	i18n: i18nLanguages,
	examples: [],
	name: "",
	category: "",
	tags: [],
	size: {},
};
