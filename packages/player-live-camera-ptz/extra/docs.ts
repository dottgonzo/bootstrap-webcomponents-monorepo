import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup, ComponentSetup } from "@htmlbricks/hb-jsutils/main";
import type { Component } from "../app/types/webcomponent.type";

export const storybookArgs = {
	presets: { control: { type: "object" } },
	live_uri: { control: { type: "text" } },
	// height: { control: { type: "text" } },
	zoomAction: { action: "zoomActionEvent" },
	goToHome: { action: "goToHomeEvent" },
	sendJoystickPosition: { action: "sendJoystickPositionEvent" },
	sendDirection: { action: "sendDirectionEvent" },
	addSceneAsPreset: { action: "addSceneAsPresetEvent" },
	changePreset: { action: "changePresetEvent" },
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
			live_uri: "",
		},
	},

	{
		name: "withPresets",
		data: {
			live_uri: "wss://testenv-installatori.movia.biz/vvwebrtc/vdeo_52089/ws",

			presets: [
				{
					label: "Preset 1",
					id: "preset1",
				},
				{
					label: "Preset 2",
					id: "preset2",
				},
			],
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
