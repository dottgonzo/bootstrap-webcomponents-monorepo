import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup, ComponentSetup } from "wc-js-utils/main";
import type { Component } from "../app/types/webcomponent.type";

export const storybookArgs = {
	videosrc: { control: { type: "text" } },
	title: { control: { type: "text" } },
	provider: { control: { type: "text" } },
	description: { control: { type: "text" } },
	time: { control: { type: "date" } },
	pageuri: { control: { type: "text" } },
	linklabel: { control: { type: "text" } },
	dateformat: { control: { type: "text" } },
};

const cssVars: CssVar[] = [];
export const cssParts: CssPart[] = [];
export const htmlSlots: HtmlSlot[] = [{ name: "card-footer", description: "" }];
export const i18nLanguages: i18nLang[] = [];

export const styleSetup: StyleSetup = {
	vars: cssVars,
	parts: cssParts,
};

const examples: { name: string; description?: string; data: Component }[] = [
	{
		name: "default",
		data: {
			videosrc: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
			title: "aa",
			description: "desc6",
			time: new Date("2021-08-15T18:55:22.135Z"),
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
	name: "hb-card-video",
	category: "components",
	tags: ["components"],
	size: {},
	iifePath: "release/release.js",
	repoName: "@htmlbricks/hb-card-video",
	version: null as any,
};
