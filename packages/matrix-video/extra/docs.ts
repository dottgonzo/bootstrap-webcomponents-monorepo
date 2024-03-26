import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup, ComponentSetup } from "wc-js-utils/main";
import type { Component } from "../app/types/webcomponent.type";

export const storybookArgs = {
	items: { control: { type: "object" } },
	selectItem: { action: "selectItemEvent" },
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
			items: [
				{
					type: "iframe",
					id: "1",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "2",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "3",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "4",
					uri: "http://127.0.0.1:8889/test/",
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
	name: "hb-matrix-video",
	category: "components",
	tags: ["components"],
	size: {},
	iifePath: "release/release.js",
	repoName: "@htmlbricks/hb-matrix-video",
	version: null as any,
};
