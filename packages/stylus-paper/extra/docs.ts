import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup, ComponentSetup } from "@htmlbricks/hb-jsutils/main";
import type { Component } from "../app/types/webcomponent.type";

export const storybookArgs = {
	background_color: { control: { type: "text" } },
	pen_color: { control: { type: "text" } },
	pen_opacity: { control: { type: "range", min: 0, max: 1, step: 0.1 } },
	debug: {
		options: ["yes", "no"],
		control: { type: "select" }, // Automatically inferred when 'options' is defined
	},
	save_as: { control: { type: "object" } },
	options: { control: { type: "object" } },
	goto: { control: { type: "number" } },
	mode: {
		options: ["eraser", "draw", "select"],
		control: { type: "radio" }, // Automatically inferred when 'options' is defined
	},
	load_draw: { control: { type: "object" } },
	startStroke: { action: "startStrokeEvent" },
	beginStroke: { action: "beginStrokeEvent" },
	endStroke: { action: "endStrokeEvent" },
	selection: { action: "selectionEvent" },
	historyIndex: { action: "historyIndexEvent" },
	save: { action: "saveEvent" },
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
			mode: "draw",
		},
	},
	{
		name: "withPressure",
		data: {
			options: {
				simulatePressure: false,
			},
			mode: "draw",
		},
	},
	{
		name: "withSimulatePressure",
		data: {
			options: {
				simulatePressure: true,
			},
			mode: "draw",
		},
	},
	{
		name: "ThinBrushOnBackground",
		data: {
			background_color: "rgb(200,200,200)",
			pen_color: "rgb(100,100,100)",
			options: {
				size: 2,
				thinning: 0.7,
				smoothing: 0.5,
				streamline: 0.5,
			},
			mode: "draw",
		},
	},
	{
		name: "BigBrushColor",
		data: {
			pen_color: "rgb(100,100,100)",
			options: {
				size: 16,
				thinning: 0.7,
				smoothing: 0.5,
				streamline: 0.5,
			},
			mode: "draw",
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
	category: "input",
	tags: ["draw", "input", "stylus", "paper"],
	size: { layout: "fullscreen" },
	iifePath: "release/release.js",
	repoName: "@htmlbricks/hb-stylus-paper",
	version: null as any,
};
