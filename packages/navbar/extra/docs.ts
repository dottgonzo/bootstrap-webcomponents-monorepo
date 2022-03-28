import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup, ComponentSetup } from "@htmlbricks/hb-jsutils/main";
import type { Component } from "../app/types/webcomponent.type";

export const storybookArgs = {
	_testInnerHtml: { control: { disable: true } },
	pagetitle: { control: { type: "text" } },
	companybrandname: { control: { type: "text" } },
	companylogouri: { control: { type: "text" } },
	noburger: { control: { type: "boolean" } },
	navmenuswitch: { action: "navmenuswitchEvent" },
	userClick: { action: "userClickEvent" },
	usermenu: { control: { type: "object" } },
};

const cssVars: CssVar[] = [];
export const cssParts: CssPart[] = [
	{ name: "left-slot", description: "" },
	{ name: "center-slot", description: "" },
	{ name: "right-slot", description: "" },
];
export const htmlSlots: HtmlSlot[] = [
	{ name: "left-slot", description: "" },
	{ name: "right-slot", description: "" },
	{ name: "center-slot", description: "" },
	{ name: "brand", description: "" },
];
export const i18nLanguages: i18nLang[] = [];

export const styleSetup: StyleSetup = {
	vars: cssVars,
	parts: cssParts,
};

const examples: Component[] = [
	{
		companybrandname: "testbrand2",
		companylogouri: "",
	},
];
export const componentSetup: ComponentSetup & { examples: Component[] } = {
	definitions: null,
	storybookArgs,
	styleSetup,
	htmlSlots,
	i18n: i18nLanguages,
	examples,
	name: "hb-navbar",
	category: "layout",
	tags: ["layout"],
	size: {},
	iifePath: "release/release.js",
	repoName: "@htmlbricks/hb-navbar",
};
