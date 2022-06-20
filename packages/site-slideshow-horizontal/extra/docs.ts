import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup, ComponentSetup } from "@htmlbricks/hb-jsutils/main";
import type { Component } from "../app/types/webcomponent.type";

export const storybookArgs = {
	data: { control: { type: "object" } },
	// string: { control: { type: "text" } },
	// boolean: { control: { type: "object" } },
	// event: { action: "eventEvent" },
};

const cssVars: CssVar[] = [];
export const cssParts: CssPart[] = [{ name: "testpart", description: "test css part on 2 div tag" }];
export const htmlSlots: HtmlSlot[] = [{ name: "skelcontent", description: "test slot" }];
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
				{ href: "https://via.placeholder.com/300x200", caption: "HTMLbricks" },
				{ href: "https://via.placeholder.com/300x200", caption: "HTMLbricks2" },
				{ href: "https://via.placeholder.com/300x200", caption: "HTMLbricks3" },
				{ href: "https://via.placeholder.com/300x200", caption: "HTMLbricks4" },
				{ href: "https://via.placeholder.com/300x200", caption: "HTMLbricks5" },
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
	name: "hb-site-slideshow-horizontal",
	category: "site",
	tags: ["site"],
	size: {},
	iifePath: "release/release.js",
	repoName: "@htmlbricks/hb-site-slideshow-horizontal",
	version: null as any,
};
