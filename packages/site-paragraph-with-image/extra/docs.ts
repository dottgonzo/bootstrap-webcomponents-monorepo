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

const examples: Component[] = [
	{
		img: {
			src: "..",
		},
		text: {},
	},
];
export const componentSetup: ComponentSetup & { examples: Component[] } = {
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
	name: "hb-site-paragraph-with-image",
	category: "site",
	tags: ["site"],
	size: {},
	iifePath: "release/release.js",
	repoName: "@htmlbricks/hb-site-paragraph-with-image",
	version: null,
};
