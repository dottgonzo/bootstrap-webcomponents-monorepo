import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup, ComponentSetup } from "wc-js-utils/main";
import { title } from "process";
import type { Component } from "../app/types/webcomponent.type";

export const storybookArgs = {
	paragraphs: { control: { type: "object" } },
	img: { control: { type: "text" } },
	paragraphPressed: { action: "paragraphPressed" },
};

const cssVars: CssVar[] = [];
export const cssParts: CssPart[] = [{ name: "testpart", description: "test css part on 2 div tag" }];
export const htmlSlots: HtmlSlot[] = [{ name: "skelcontent", description: "test slot" }];
export const i18nLanguages: i18nLang[] = [];

export const styleSetup: StyleSetup = {
	vars: cssVars,
	parts: cssParts,
};
const baseTxt = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eu consectetur consectetur, nisi nisl consectetur nisi, euismod nisl nisi euismod nisi. Donec euismod, nisl eu consectetur consectetur, nisi nisl consectetur nisi, euismod nisl nisi euismod nisi. Donec euismod, nisl eu consectetur consectetur, nisi nisl consectetur nisi, euismod nisl nisi euismod nisi. Donec euismod, nisl eu consectetur consectetur, nisi nisl consectetur nisi, euismod nisl nisi euismod nisi. Donec euismod, nisl eu consectetur consectetur, nisi nisl consectetur nisi, euismod nisl nisi euismod nisi. Donec euismod, nisl eu consectetur consectetur, nisi nisl consectetur nisi, euismod nisl nisi euismod nisi. Donec euismod, nisl eu consectetur consectetur, nisi nisl consectetur nisi, euismod nisl nisi euismod nisi. Donec euismod, nisl eu consectetur consectetur, nisi nisl consectetur nisi, euismod nisl nisi euismod nisi. Donec euismod, nisl eu consectetur consectetur, nisi nisl consectetur nisi, euismod nisl nisi euismod nisi. Donec euismod, nisl eu consectetur consectetur, nisi nisl consectetur nisi, euismod nisl nisi euismod nisi. Donec euismod, nisl `;
const examples: { name: string; description?: string; data: Component }[] = [
	{
		name: "default2",
		data: {
			img: "https://via.placeholder.com/300x200",
			paragraphs: [
				{
					text: baseTxt,
					title: "Title",
					icon: "globe",
					link: "https://www.google.com",
				},
				{
					text: baseTxt,
					title: "Title2",
					icon: "globe",
					link: "https://www.google.com",
				},
			],
		},
	},
	{
		name: "default4",
		data: {
			img: "https://via.placeholder.com/300x200",
			paragraphs: [
				{
					text: baseTxt,
					title: "Title",
					icon: "globe",
					link: "https://www.google.com",
				},
				{
					text: baseTxt,
					title: "Title2",
					icon: "globe",
					link: "https://www.google.com",
				},
				{
					text: baseTxt,
					title: "Title",
					icon: "globe",
					link: "https://www.google.com",
				},
				{
					text: baseTxt,
					title: "Title2",
					icon: "globe",
					link: "https://www.google.com",
				},
			],
		},
	},
	{
		name: "default6",
		data: {
			img: "https://via.placeholder.com/300x500",
			paragraphs: [
				{
					text: baseTxt,
					title: "Title",
					icon: "globe",
					key: "aaaaa",
				},
				{
					text: baseTxt,
					title: "Title2",
					icon: "globe",
					key: "aaaaa",
				},
				{
					text: baseTxt,
					title: "Title",
					icon: "globe",
					key: "aaaaa",
				},
				{
					text: baseTxt,
					title: "Title2",
					icon: "globe",
					key: "aaaaa",
				},
				{
					text: baseTxt,
					title: "Title",
					icon: "globe",
					key: "aaaaa",
				},
				{
					text: baseTxt,
					title: "Title2",
					icon: "globe",
					key: "aaaaa",
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
	name: "hb-paragraps-around-image",
	category: "site",
	tags: ["site"],
	size: {},
	iifePath: "release/release.js",
	repoName: "@htmlbricks/hb-paragraps-around-image",
	version: null as any,
};
