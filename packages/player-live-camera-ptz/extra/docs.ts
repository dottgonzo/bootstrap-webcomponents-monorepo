import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup, ComponentSetup } from "wc-js-utils/main";
import type { Component } from "../app/types/webcomponent.type";

export const storybookArgs = {
	presets: { control: { type: "object" } },
	live_uri: { control: { type: "text" } },
	media_type: {
		options: ["", "webrtc", "hls", "auto", "whep"],
		control: { type: "select" }, // Automatically inferred when 'options' is defined
	},
	current_preset: { control: { type: "text" } },
	is_home: { control: { type: "boolean" } },
	is_ptz_connected: { control: { type: "boolean" } },
	is_ptz_panel_opened: { control: { type: "boolean" } },

	initVideo: { action: "initVideoEvent" },
	panelMove: { action: "panelMoveEvent" },

	goToHome: { action: "goToHomeEvent" },
	goToSelectedArea: { action: "goToSelectedAreaEvent" },

	setPreset: { action: "setPresetEvent" },
	goToPreset: { action: "goToPresetEvent" },
	deletePreset: { action: "deletePresetEvent" },

	zoomAction: { action: "zoomActionEvent" },

	sendJoystickPosition: { action: "sendJoystickPositionEvent" },
	sendDirection: { action: "sendDirectionEvent" },
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
			is_ptz_connected: true,
			is_ptz_panel_opened: true,
			media_type: "auto",
		},
	},

	{
		name: "withPresets",
		data: {
			live_uri: "",
			is_ptz_connected: true,
			is_ptz_panel_opened: true,
			media_type: "auto",

			presets: [
				{
					name: "Preset 1",
					token: "preset1",
					x: 0,
					y: 0,
					z: 0,
				},
				{
					name: "Preset 2",
					token: "preset2",
					x: 0,
					y: 0,
					z: 0,
				},
			],
		},
	},
	{
		name: "withPresetSelected",
		data: {
			live_uri: "",
			media_type: "auto",

			is_ptz_connected: true,
			is_ptz_panel_opened: true,
			presets: [
				{
					name: "Preset 1",
					token: "preset1",
					x: 0,
					y: 0,
					z: 0,
				},
				{
					name: "Preset 2",
					token: "preset2",
					x: 0,
					y: 0,
					z: 0,
				},
			],
			current_preset: "preset1",
		},
	},
	{
		name: "withPanelClosed",
		data: {
			live_uri: "",
			media_type: "auto",
			is_ptz_connected: true,
			presets: [
				{
					name: "Preset 1",
					token: "preset1",
					x: 0,
					y: 0,
					z: 0,
				},
				{
					name: "Preset 2",
					token: "preset2",
					x: 0,
					y: 0,
					z: 0,
				},
			],
			current_preset: "preset1",
		},
	},
	{
		name: "disconnected",
		data: {
			media_type: "auto",
			live_uri: "",
			presets: [],
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
