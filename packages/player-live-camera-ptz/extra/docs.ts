import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup, ComponentSetup } from "@htmlbricks/hb-jsutils/main";
import type { Component } from "../app/types/webcomponent.type";

export const storybookArgs = {
	presets: { control: { type: "object" } },
	live_uri: { control: { type: "text" } },
	current_preset: { control: { type: "text" } },
	// height: { control: { type: "text" } },
	zoomAction: { action: "zoomActionEvent" },
	goToHome: { action: "goToHomeEvent" },
	sendJoystickPosition: { action: "sendJoystickPositionEvent" },
	sendDirection: { action: "sendDirectionEvent" },
	addSceneAsPreset: { action: "addSceneAsPresetEvent" },
	changePreset: { action: "changePresetEvent" },
	sendRect: { action: "sendRectEvent" },
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

const examples: { name: string; description?: string; data: Component }[] = [
	{
		name: "default",
		data: {
			live_uri: "",
		},
	},

	{
		name: "withPresets",
		data: {
			live_uri: "",

			presets: [
				{
					name: "Preset 1",
					id: "preset1",
				},
				{
					name: "Preset 2",
					id: "preset2",
				},
			],
		},
	},
	{
		name: "withPresetSelected",
		data: {
			live_uri: "",

			presets: [
				{
					name: "Preset 1",
					id: "preset1",
				},
				{
					name: "Preset 2",
					id: "preset2",
				},
			],
			current_preset: "preset1",
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
	name: "hb-player-live-camera-ptz",
	category: "basic",
	tags: ["basic"],
	size: {},
	iifePath: "release/release.js",
	repoName: "@htmlbricks/hb-player-live-camera-ptz",
	version: null as any,
};
