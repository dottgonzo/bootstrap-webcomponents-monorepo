import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup, ComponentSetup } from "@htmlbricks/hb-jsutils/main";
import type { Component } from "../app/types/webcomponent.type";

export const storybookArgs = {
	changeRangeValues: { action: "changeRangeValuesEvent" },
	withbubbles: { control: { type: "boolean" } },
	min: { control: { type: "number" } },
	max: { control: { type: "number" } },
	minval: { control: { type: "number" } },
	maxval: { control: { type: "number" } },
};

const cssVars: CssVar[] = [];
export const cssParts: CssPart[] = [
	{ name: "inverse", description: "" },
	{ name: "the-range", description: "" },
	{ name: "the-thumb", description: "" },
	{ name: "sign", description: "" },
];
export const htmlSlots: HtmlSlot[] = [];
export const i18nLanguages: i18nLang[] = [];

export const styleSetup: StyleSetup = {
	vars: cssVars,
	parts: cssParts,
};

const examples: { name: string; description?: string; data: Component }[] = [
	{
		name: "default",
		data: {
			withbubbles: true,
			minval: 20,
			maxval: 60,
		},
	},
];
export const componentSetup: ComponentSetup & { examples: { name: string; description?: string; data: Component }[] } = {
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
	name: "hb-range-slider",
	category: "basic",
	tags: ["basic"],
	size: {},
	iifePath: "release/release.js",
	repoName: "@htmlbricks/hb-range-slider",
	version: null,
};
