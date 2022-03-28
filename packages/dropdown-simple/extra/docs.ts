import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup, ComponentSetup } from "@htmlbricks/hb-jsutils/main";
import { version } from "../package.json";
import type { Component } from "../app/types/webcomponent.type";

export const storybookArgs = {
	open: { control: { type: "boolean" } },
	list: { control: { type: "array" } },
	dropdownSwitch: { action: "dropdownSwitchEvent" },
	dropDownClick: { action: "dropDownClickEvent" },
};

const cssVars: CssVar[] = [];
export const cssParts: CssPart[] = [
	{ name: "dropdown", description: "" },
	{ name: "dropdownbutton", description: "" },
	{ name: "dropdowncontent", description: "" },
];
export const htmlSlots: HtmlSlot[] = [];
export const i18nLanguages: i18nLang[] = [];

export const styleSetup: StyleSetup = {
	vars: cssVars,
	parts: cssParts,
};

const examples: Component[] = [
	{
		list: [
			{
				key: "ciao",
				label: "bao",
			},
			{
				key: "ciao2",
				label: "bao2",
			},
			{
				key: "ciao3",
				label: "bao3",
				linkHref: "fefeef",
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
	name: "hb-dropdown-simple",
	category: "basic",
	tags: ["basic"],
	size: {},
	iifePath: "release/release.js",
	repoName: "@htmlbricks/hb-dropdown-simple",
	version,
};
