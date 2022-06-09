import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup, ComponentSetup } from "@htmlbricks/hb-jsutils/main";
import type { Component } from "../app/types/webcomponent.type";

export const storybookArgs = {
	img: { control: { type: "object" } },
	text: { control: { type: "object" } },
	half_space: { control: { type: "boolean" } },
	text_side: {
		options: ["left", "right", ""],
		control: { type: "select" }, // Automatically inferred when 'options' is defined
	},
	elClick: { action: "elClick" },
};

const cssVars: CssVar[] = [];
export const cssParts: CssPart[] = [
	{ name: "mobile_text_content", description: "mobile_text_content" },
	{ name: "mobile_title", description: "mobile_title" },
	{ name: "mobile_text_body", description: "mobile_text_body" },
	{ name: "mobile_link_button", description: "mobile_link_button" },
	{ name: "mobile_image_content", description: "mobile_image_content" },
	{ name: "image_content", description: "image content" },
	{ name: "text_content", description: "text content" },
	{ name: "link_button", description: "link button" },
	{ name: "title", description: "title" },
	{ name: "text_body", description: "text body" },
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
			img: {
				src: "https://upload.wikimedia.org/wikipedia/en/thumb/4/4a/Commons-logo.svg/446px-Commons-logo.svg.png",
			},
			text: {
				title: "PragraphWithImage Regular",
				body: "lore ipsum dolor sit ame1t, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
				link: {
					label: "linkato",
				},
			},
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
	name: "hb-site-paragraph-with-image",
	category: "site",
	tags: ["site"],
	size: {},
	iifePath: "release/release.js",
	repoName: "@htmlbricks/hb-site-paragraph-with-image",
	version: null as any,
};
