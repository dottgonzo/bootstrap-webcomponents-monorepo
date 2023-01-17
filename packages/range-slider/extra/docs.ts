import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup, ComponentSetup } from "@htmlbricks/hb-jsutils/main";
import type { Component } from "../app/types/webcomponent.type";

export const storybookArgs = {
	withbubbles: { control: { type: "boolean" } },
	min: { control: { type: "number" } },
	max: { control: { type: "number" } },
	minval: { control: { type: "number" } },
	maxval: { control: { type: "number" } },
	position_value: { control: { type: "number" } },
	changeRangeValues: { action: "changeRangeValuesEvent" },
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
		data: {},
	},
	{
		name: "withBubbles",
		data: {
			withbubbles: true,
		},
	},
	{
		name: "withValues",
		data: {
			withbubbles: true,
			minval: 20,
			maxval: 60,
		},
	},
	{
		name: "withPositionValue",
		data: {
			withbubbles: true,
			minval: 13,
			maxval: 20,
			max: 25,
			min: 10,
			position_value: 17,
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
	name: "hb-range-slider",
	category: "basic",
	tags: ["basic"],
	size: {},
	iifePath: "release/release.js",
	repoName: "@htmlbricks/hb-range-slider",
	version: null as any,
};
