import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup, ComponentSetup } from "wc-js-utils/main";
import type { Component } from "../app/types/webcomponent.type";

export const storybookArgs = {
	data: { control: { type: "object" } },
	type: { control: { type: "text" } },
	// boolean: { control: { type: "object" } },
	slideClick: { action: "slideClickEvent" },
};

const cssVars: CssVar[] = [];
export const cssParts: CssPart[] = [
	{ name: "video_sub_title", description: "video_sub_title" },
	{ name: "video_sub_title", description: "video_sub_title" },
	{ name: "caption_content", description: "caption_content" },
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
		data: {
			data: [
				{ href: "https://via.placeholder.com/300x200/FFFFFF", caption: "HTMLbricks" },
				{ href: "https://via.placeholder.com/300x200/0000FF", caption: "HTMLbricks2", externalLink: "https://docs.htmlbricks.borgo.studio" },
				{ href: "https://via.placeholder.com/300x200/00FFFF", caption: "HTMLbricks3", link: "https://docs.htmlbricks.borgo.studio" },
				{ href: "https://via.placeholder.com/300x200/a94949", caption: "HTMLbricks4", key: "htmlbricks" },
				{ href: "https://via.placeholder.com/300x200/49a962", caption: "HTMLbricks5" },
				{ href: "https://via.placeholder.com/300x200/49a9a0", caption: "HTMLbricks6" },
				{ href: "https://via.placeholder.com/300x200/49a94c", caption: "HTMLbricks7" },
				{ href: "https://via.placeholder.com/300x200/6549a9", caption: "HTMLbricks8" },
				{ href: "https://via.placeholder.com/300x200/a94999", caption: "HTMLbricks9" },
				{ href: "https://via.placeholder.com/300x200/a99d49", caption: "HTMLbricks10" },
				{ href: "https://via.placeholder.com/300x200/6949a9", caption: "HTMLbricks11" },
			],
		},
	},
	{
		name: "videos",
		data: {
			data: [
				{ href: "https://via.placeholder.com/300x200/FFFFFF", caption: "HTMLbricks", duration: "33 seconds" },
				{
					href: "https://via.placeholder.com/300x200/0000FF",
					caption: "HTMLbricks2",
					duration: "00:33",
					externalLink: "https://docs.htmlbricks.borgo.studio",
				},
				{ href: "https://via.placeholder.com/300x200/00FFFF", caption: "HTMLbricks3", link: "https://docs.htmlbricks.borgo.studio" },
				{ href: "https://via.placeholder.com/300x200/a94949", caption: "HTMLbricks4", key: "htmlbricks" },
				{ href: "https://via.placeholder.com/300x200/49a962", caption: "HTMLbricks5" },
				{ href: "https://via.placeholder.com/300x200/49a9a0", caption: "HTMLbricks6" },
				{ href: "https://via.placeholder.com/300x200/49a94c", caption: "HTMLbricks7" },
				{ href: "https://via.placeholder.com/300x200/6549a9", caption: "HTMLbricks8" },
				{ href: "https://via.placeholder.com/300x200/a94999", caption: "HTMLbricks9" },
				{ href: "https://via.placeholder.com/300x200/a99d49", caption: "HTMLbricks10" },
				{ href: "https://via.placeholder.com/300x200/6949a9", caption: "HTMLbricks11" },
			],
			type: "videos",
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
	name: "hb-site-slideshow-horizontal",
	category: "archives",
	tags: ["archives"],
	size: {},
	iifePath: "release/release.js",
	repoName: "@htmlbricks/hb-site-slideshow-horizontal",
	version: null as any,
};
