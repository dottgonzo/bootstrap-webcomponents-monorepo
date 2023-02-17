import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup, ComponentSetup } from "wc-js-utils/main";
import type { Component } from "../app/types/webcomponent.type";

export const storybookArgs = {
	info: { control: { type: "object" } },
	topics: { control: { type: "object" } },
	filter: { control: { type: "text" } },
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
			info: [
				{
					topic: "test",
					title: "test title",
					text: 'text <a href="ss">ddd</a>text',
				},
				{
					topic: "test2",
					title: "test title2",
					text: 'text <a href="ss">ddd</a>text',
				},
				{
					topic: "test3",
					title: "test title3",
					text: 'text <a href="ss">ddd</a>text',
				},
			],
			topics: [
				{
					key: "test",
					label: "test label",
					icon: "globe",
				},
				{
					key: "test2",
					label: "test2 label",
					icon: "asterisk",
				},
				{
					key: "test3",
					label: "test3 label",
					icon: "globe",
				},

				{
					key: "test4",
					label: "test4 label",
					icon: "globe",
					catchAll: true,
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
	name: "hb-faq-component",
	category: "components",
	tags: ["components"],
	size: {},
	iifePath: "release/release.js",
	repoName: "@htmlbricks/hb-faq-component",
	version: null as any,
};
