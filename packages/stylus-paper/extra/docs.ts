import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup, ComponentSetup } from "@htmlbricks/hb-jsutils/main";
import type { Component } from "../app/types/webcomponent.type";

export const storybookArgs = {
	background_color: { control: { type: "text" } },
	pen_color: { control: { type: "text" } },
	draw: { action: "drawEvent" },
	startStroke: { action: "startStrokeEvent" },
	beginStroke: { action: "beginStrokeEvent" },
	endStroke: { action: "endStrokeEvent" },
};

const cssVars: CssVar[] = [];
export const cssParts: CssPart[] = [];
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
			background_color: "rgb(200,200,200)",
			pen_color: "rgb(100,100,100)",
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
	name: "hb-stylus-paper",
	category: "dev",
	tags: ["dev"],
	size: {},
	iifePath: "release/release.js",
	repoName: "@htmlbricks/hb-stylus-paper",
	version: null as any,
};
