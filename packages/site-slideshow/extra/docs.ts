import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup, ComponentSetup } from "@htmlbricks/hb-jsutils/main";
import type { Component } from "../app/types/webcomponent.type";

export const storybookArgs = {
	data: { control: { type: "object" } },
	index: { control: { type: "number" } },
	timer: { control: { type: "number" } },
	changeSlide: { action: "changeSlide" },
	onHover: { action: "onHover" },
};

const cssVars: CssVar[] = [];
export const cssParts: CssPart[] = [
	{ name: "dot", description: "dots" },
	{ name: "caption_container", description: "caption content" },
	{ name: "caption_content", description: "caption content" },
	{ name: "cover_on_images", description: "cover_on_images" },
];
export const htmlSlots: HtmlSlot[] = [
	{ name: "overlay", description: "overlay" },
	{ name: "prev", description: "previous" },
	{ name: "next", description: "next" },
	{ name: "cover_on_images", description: "cover_on_images" },
];
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
				{
					href: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Free_high-resolution_pictures_you_can_use_on_your_personal_and_commercial_projects._%2814355732205%29.jpg/800px-Free_high-resolution_pictures_you_can_use_on_your_personal_and_commercial_projects._%2814355732205%29.jpg",
					caption: "Street",
				},
				{
					href: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Relief_World_Map_by_maps-for-free.jpg/783px-Relief_World_Map_by_maps-for-free.jpg",
					caption: "Earth",
				},
				{
					href: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Thomisus_onustus_with_Apis_mellifera.jpg/800px-Thomisus_onustus_with_Apis_mellifera.jpg",
					caption: "Bee",
				},
			],
			index: 0,
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
	name: "hb-site-slideshow",
	category: "site",
	tags: ["site"],
	size: { layout: "fullscreen" },
	iifePath: "release/release.js",
	repoName: "@htmlbricks/hb-site-slideshow",
	version: null,
};
