import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup, ComponentSetup } from "wc-js-utils/main";
import type { Component } from "../app/types/webcomponent.type";
export const storybookArgs = {
	number: { control: { type: "number" } },
	label: { control: { type: "text" } },
	icon: { control: { type: "text" } },
	link_label: { control: { type: "text" } },
	dashboardIndicatorClick: { action: "dashboardIndicatorClickEvent" },
};

const cssVars: CssVar[] = [
	{
		name: "--hb--dashboard-indicator-background",
		defaultValue: "#5cb85c",
		valueType: "color",
	},
];
export const cssParts: CssPart[] = [];
export const htmlSlots: HtmlSlot[] = [];
export const i18nLanguages: i18nLang[] = [];

export const styleSetup: StyleSetup = {
	vars: cssVars,
	parts: cssParts,
};

const examples: { name: string; description?: string; data: Component }[] = [
	{ name: "default", data: { number: 10, label: "ritestamento", icon: "window", link_label: "testaggio" } },
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
	name: "hb-dashboard-indicator",
	category: "dashboard",
	tags: ["dashboard"],
	size: {},
	iifePath: "release/release.js",
	repoName: "@htmlbricks/hb-dashboard-indicator",
	version: null as any,
};
