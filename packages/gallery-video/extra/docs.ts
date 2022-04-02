import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup, ComponentSetup } from "@htmlbricks/hb-jsutils/main";
import type { Component } from "../app/types/webcomponent.type";

export const storybookArgs = {
	size: { control: { type: "range", min: 1, max: 100 } },
	page: { control: { type: "number" } },
	resturi: { control: { type: "object" } },
	headers: { control: { type: "array" } },
	cards: { control: { type: "array" } },
	primarycolor: { control: { type: "color" } },
	pageChange: { action: "pagechangeEvent" },
	externalfilter: { control: { type: "boolean" } },
	textFilterVideos: { action: "textFilterVideosEvent" },
	dateFilterVideos: { action: "dateFilterVideosEvent" },
};

const cssVars: CssVar[] = [];
export const cssParts: CssPart[] = [{ name: "container", description: "" }];
export const htmlSlots: HtmlSlot[] = [];
export const i18nLanguages: i18nLang[] = [];

export const styleSetup: StyleSetup = {
	vars: cssVars,
	parts: cssParts,
};
const cards: Component["cards"] = [
	{
		title: "bau",
		videoSrc: "https://comapi.be-on.tv/v1/public/records/61043eedb50af916a6429fdc/video",
		time: new Date("2021-08-06T22:46:30.565Z"),
	},
	{
		title: "bb1",
		videoSrc: "https://comapi.be-on.tv/v1/public/records/61043eedb50af916a6429fdc/video",
		time: new Date("2021-08-06T22:46:31.565Z"),
	},

	{
		title: "bb4",
		time: new Date("2021-08-06T22:46:34.565Z"),
		videoSrc: "https://www.youtube.com/embed/tgbNymZ7vqY",
		provider: "youtube",
	},

	{
		title: "bb12",
		time: new Date("2021-08-06T22:46:34.565Z"),
		videoSrc: "https://comapi.be-on.tv/v1/public/records/61043eedb50af916a6429fdc/video",
	},
];
const examples: Component[] = [
	{
		cards,
	},
];
export const componentSetup: ComponentSetup & { examples: Component[] } = {
	definitions: null,
	storybookArgs,
	styleSetup,
	htmlSlots,
	i18n: i18nLanguages,
	examples,
	screenshots: [],
	licenses: [{ type: "Apache-2.0", path: "LICENSE.md", cost: 0, currency: "EUR" }],
	readmePath: "README.md",
	name: "hb-gallery-video",
	category: "components",
	tags: ["components"],
	size: {},
	iifePath: "release/release.js",
	repoName: "@htmlbricks/hb-gallery-video",
	version: null,
};
