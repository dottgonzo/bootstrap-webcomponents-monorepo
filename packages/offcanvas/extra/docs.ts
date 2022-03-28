import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup, ComponentSetup } from "@htmlbricks/hb-jsutils/main";
import type { Component } from "../app/types/webcomponent.type";

export const storybookArgs = {
	opened: { control: { type: "boolean" } },
	companylogouri: { control: { type: "text" } },
	companytitle: { control: { type: "text" } },
	groups: { control: { type: "text" } },
	enablefooter: { control: { type: "boolean" } },
	offcanvasswitch: { action: "offcanvasswitchEvent" },
	pagechange: { action: "pagechangeEvent" },
	type: { options: ["autohide", "small", "open"], control: { type: "select" } },
	navpage: { control: { type: "text" } },
	navlinks: { control: { type: "array" } },
};

const cssVars: CssVar[] = [{ name: "--bs-primary", defaultValue: "#07689f", valueType: "color", theme: "bootstrap" }];
export const cssParts: CssPart[] = [
	{
		name: "header",
		description: "header",
	},
];
export const htmlSlots: HtmlSlot[] = [
	{
		name: "test",
		description: "test",
	},
	{
		name: "header",
		description: "header",
	},

	{
		name: "footer",
		description: "footer",
	},
];
export const i18nLanguages: i18nLang[] = [];

export const styleSetup: StyleSetup = {
	vars: cssVars,
	parts: cssParts,
};

const examples: Component[] = [
	{
		opened: true,
		navlinks: [
			{
				label: "Home",
				key: "home",
				icon: "house-door",
			},
			{
				label: "Dashboard",
				key: "dashboard",
				icon: "speedometer",
			},
			{
				label: "Settings",
				key: "settings",
				icon: "gear",
			},
			{
				label: "Users",
				key: "users",
				icon: "people-fill",
			},
			{
				label: "Stats",
				key: "stats",
				icon: "graph-up",
			},
		],
		navpage: "settings",
		companytitle: "acme corp",
	},
];
export const componentSetup: ComponentSetup & { examples: Component[] } = {
	definitions: null,
	storybookArgs,
	styleSetup,
	htmlSlots,
	i18n: i18nLanguages,
	examples,
	name: "hb-offcanvas",
	category: "layout",
	tags: ["layout"],
	size: {},
	iifePath: "release/release.js",
	repoName: "@htmlbricks/hb-offcanvas",
	version: null,
};
