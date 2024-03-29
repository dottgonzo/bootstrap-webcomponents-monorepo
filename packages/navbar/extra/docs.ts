import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup, ComponentSetup } from "wc-js-utils/main";
import type { Component } from "../app/types/webcomponent.type";

export const storybookArgs = {
	_testInnerHtml: { control: { disable: true } },
	pagetitle: { control: { type: "text" } },
	companybrandname: { control: { type: "text" } },
	companylogouri: { control: { type: "text" } },
	noburger: { control: { type: "boolean" } },
	navmenuswitch: { action: "navmenuswitchEvent" },
	navbarDropDownClick: { action: "navbarDropDownClickEvent" },
	usermenu: { control: { type: "object" } },
	navbarSlotClick: { action: "navbarSlotClickEvent" },
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
	{ name: "nav-switcher", description: " button to switch context" },
	{ name: "brand", description: "" },
];
export const i18nLanguages: i18nLang[] = [];

export const styleSetup: StyleSetup = {
	vars: cssVars,
	parts: cssParts,
};

const examples: { name: string; description?: string; data: Component }[] = [
	{
		name: "default",
		data: {
			companybrandname: "testbrand2",
			companylogouri: "",
		},
	},
];
export const componentSetup: ComponentSetup & { examples: { name: string; description?: string; data: Component }[] } = {
	definitions: null as any,
	storybookArgs,
	styleSetup,
	author: null as any,
	contributors: [],
	owner: null as any,
	htmlSlots,
	i18n: i18nLanguages,
	examples,
	screenshots: [],
	licenses: [{ type: "Apache-2.0", path: "LICENSE.md", cost: 0, currency: "EUR" }],
	readmePath: "README.md",
	name: "hb-navbar",
	category: "layout",
	tags: ["layout"],
	size: { layout: "fullscreen" },
	iifePath: "release/release.js",
	repoName: "@htmlbricks/hb-navbar",
	version: null as any,
};
