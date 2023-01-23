import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup, ComponentSetup } from "@htmlbricks/hb-jsutils/main";
import type { Component } from "../app/types/webcomponent.type";

export const storybookArgs = {
	panels: { control: { type: "object" } },
	// string: { control: { type: "text" } },
	// boolean: { control: { type: "boolean" } },
	itemClick: { action: "itemClickEvent" },
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
			panels: [
				{
					id: "1",
					cards: [
						{
							id: "1",
							rows: [{ id: "1", text: "test", type: "line" }],
						},
					],
				},
			],
		},
	},
	{
		name: "empty",
		data: {
			panels: [],
		},
	},
	{
		name: "emptyRows",
		data: {
			panels: [
				{
					id: "1",
					cards: [
						{
							id: "1",
							rows: [],
						},
					],
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
	name: "hb-sidebar-cards-navigator",
	category: "layout",
	tags: ["layout"],
	size: {},
	iifePath: "release/release.js",
	repoName: "@htmlbricks/hb-sidebar-cards-navigator",
	version: null as any,
};
