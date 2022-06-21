import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup, ComponentSetup } from "@htmlbricks/hb-jsutils/main";
import type { Component } from "../app/types/webcomponent.type";

export const storybookArgs = {
	collection: { control: { type: "object" } },

	collectionItemClick: { collectionItemClick: "eventEvent" },
};

const cssVars: CssVar[] = [];
export const cssParts: CssPart[] = [{ name: "container" }, { name: "item" }, { name: "image" }, { name: "title" }, { name: "text" }];
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
			collection: [
				{
					title: "Title 1",
					text: "Text 1",
					link: { type: "tab", uri: "https://www.google.com" },
					image: "https://via.placeholder.com/300x200",
				},
				{
					title: "Title 2",
					text: "Text 2",
					link: { type: "tab", uri: "https://www.google.com" },
					image: "https://via.placeholder.com/300x200",
				},

				{
					title: "Title 3",
					text: "Text 3",
					link: { type: "tab", uri: "https://www.google.com" },
					image: "https://via.placeholder.com/300x200",
				},
				{
					title: "Title 4",
					text: "Text 4",
					link: { type: "tab", uri: "https://www.google.com" },
					image: "https://via.placeholder.com/300x200",
				},
				{
					title: "Title 5",
					text: "Text 5",
					link: { type: "tab", uri: "https://www.google.com" },
					image: "https://via.placeholder.com/300x200",
				},
				{
					title: "Title 6",
					text: "Text 6",
					link: { type: "tab", uri: "https://www.google.com" },
					image: "https://via.placeholder.com/300x200",
				},
				{
					title: "Title 7",
					text: "Text 7",
					link: { type: "tab", uri: "https://www.google.com" },
					image: "https://via.placeholder.com/300x200",
				},
				{
					title: "Title 8",
					text: "Text 8",
					link: { type: "tab", uri: "https://www.google.com" },
					image: "https://via.placeholder.com/300x200",
				},
			],
		},
	},
	{
		name: "default2",
		data: {
			collection: [
				{
					title: "Title 1",
					text: "Text 1",
					link: { type: "tab", uri: "https://www.google.com" },
					image: "https://via.placeholder.com/300x200",
				},
				{
					title: "Title 2",
					text: "Text 2",
					link: { type: "tab", uri: "https://www.google.com" },
					image: "https://via.placeholder.com/300x200",
				},

				{
					title: "Title 3",
					text: "Text 3",
					link: { type: "tab", uri: "https://www.google.com" },
					image: "https://via.placeholder.com/300x200",
				},
				{
					title: "Title 4",
					text: "Text 4",
					link: { type: "tab", uri: "https://www.google.com" },
					image: "https://via.placeholder.com/300x200",
				},
				{
					title: "Title 5",
					text: "Text 5",
					link: { type: "tab", uri: "https://www.google.com" },
					image: "https://via.placeholder.com/300x200",
				},
				{
					title: "Title 6",
					text: "Text 6",
					link: { type: "tab", uri: "https://www.google.com" },
					image: "https://via.placeholder.com/300x200",
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
	name: "hb-vertical-img-txt-archive",
	category: "archives",
	tags: ["archives"],
	size: {},
	iifePath: "release/release.js",
	repoName: "@htmlbricks/hb-vertical-img-txt-archive",
	version: null as any,
};
