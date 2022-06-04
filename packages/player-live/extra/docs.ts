import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup, ComponentSetup } from "@htmlbricks/hb-jsutils/main";
import type { Component } from "../app/types/webcomponent.type";

export const storybookArgs = {
	width: { control: { type: "range", min: 100, max: 2000, step: 25 } },
	height: { control: { type: "range", min: 100, max: 2000, step: 25 } },
	mediatype: { control: { type: "text" } },
	liveStatus: { action: "liveStatusEvent" },
};

const cssVars: CssVar[] = [];
export const cssParts: CssPart[] = [
	{ name: "container", description: "" },
	{ name: "replacewithtext", description: "" },
	{ name: "video", description: "" },
];
export const htmlSlots: HtmlSlot[] = [];
export const i18nLanguages: i18nLang[] = [];

export const styleSetup: StyleSetup = {
	vars: cssVars,
	parts: cssParts,
};

const examples: ComponentSetup["examples"] = [
	{
		name: "default",
		data: {
			mediauri: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
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
	name: "hb-player-live",
	category: "basic",
	tags: ["basic"],
	size: {},
	iifePath: "release/release.js",
	repoName: "@htmlbricks/hb-player-live",
	version: null,
};
