import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup, ComponentSetup } from "@htmlbricks/hb-jsutils/main";
import { version } from "../package.json";
import type { Component } from "../app/types/webcomponent.type";

export const storybookArgs = {
	show: { control: { type: "boolean" } },
	dialogclasses: { control: { type: "text" } },
	title: { control: { type: "text" } },
	backdrop: { control: { type: "boolean" } },
	ignoreBackdrop: { control: { type: "text" } },
	keyboard: { control: { type: "boolean" } },
	describedby: { control: { type: "text" } },
	labelledby: { control: { type: "text" } },
	content: { control: { type: "text" } },
	closelabel: { control: { type: "text" } },
	confirmlabel: { control: { type: "text" } },
	modalShow: { action: "modalShow" },
	modalConfirm: { action: "modalConfirm" },
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

const examples: Component[] = [
	{
		show: "yes",
	},
];
export const componentSetup: ComponentSetup & { examples: Component[] } = {
	definitions: null,
	storybookArgs,
	styleSetup,
	htmlSlots,
	i18n: i18nLanguages,
	examples,
	name: "hb-dialog",
	category: "basic",
	tags: ["basic"],
	size: {},
	iifePath: "release/release.js",
	repoName: "@htmlbricks/hb-dialog",
	version,
};
