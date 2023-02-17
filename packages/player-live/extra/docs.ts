import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup, ComponentSetup } from "wc-js-utils/main";
import type { Component } from "../app/types/webcomponent.type";

export const storybookArgs = {
	// width: { control: { type: "text" } },
	// height: { control: { type: "text" } },
	media_type: {
		options: ["", "webrtc", "hls", "auto"],
		control: { type: "select" }, // Automatically inferred when 'options' is defined
	},
	no_controls: { control: { type: "boolean" } },
	mediauri: { control: { type: "text" } },
	forcecover: { control: { type: "text" } },
	replacewithtext: { control: { type: "object" } },
	liveStatus: { action: "liveStatusEvent" },
	htmlVideoInit: { action: "htmlVideoInitEvent" },
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

const mediauri = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8";
const replacewithtext1 = {
	title: "title",
};
const replacewithtext2 = {
	title: "title",
	subtitle: "subtitle",
};
const replacewithtext3 = {
	title: "title",
	subtitle: "subtitle",
	text: "text",
};

const examples: { name: string; description?: string; data: Component }[] = [
	{
		name: "default",
		data: {
			mediauri: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
		},
	},
	{
		name: "LiveVideoPlayerWithWidth",
		data: {
			mediauri,
		},
	},
	{
		name: "LiveVideoPlayerWithHeight",
		data: {
			mediauri,
		},
	},
	{
		name: "LiveVideoPlayerWithoutUri",
		data: {
			mediauri: "",
		},
	},
	{
		name: "LiveVideoPlayerWithText3",
		data: {
			mediauri,
			replacewithtext: replacewithtext3,
			forcecover: "yes",
		},
	},
	{
		name: "LiveVideoPlayerWithText2",
		data: {
			mediauri,
			replacewithtext: replacewithtext2,
			forcecover: "yes",
		},
	},
	{
		name: "LiveVideoPlayerWithText1",
		data: {
			mediauri,
			replacewithtext: replacewithtext1,
			forcecover: "yes",
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
	name: "hb-player-live",
	category: "basic",
	tags: ["basic"],
	size: {},
	iifePath: "release/release.js",
	repoName: "@htmlbricks/hb-player-live",
	version: null as any,
};
