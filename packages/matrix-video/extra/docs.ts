import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup, ComponentSetup } from "wc-js-utils/main";
import type { Component } from "../app/types/webcomponent.type";

export const storybookArgs = {
	items: { control: { type: "object" } },
	hoverItem: { action: "hoverItemEvent" },
	clickItem: { action: "clickItemEvent" },
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
		name: "with2videos",
		data: {
			items: [
				{
					type: "mediamtx-webrtc",
					id: "1",
					uri: "https://vpn0.devicesmng.kernel.online/slave_10.33.88.212_fakeh264flux2",
				},
				{
					type: "iframe",
					id: "2",
					uri: "http://127.0.0.1:8889/test/",
				},
			],
		},
	},
	{
		name: "with3videos",
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
			],
		},
	},
	{
		name: "with4videos",
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
	{
		name: "with6videos",
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
				{
					type: "iframe",
					id: "5",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "6",
					uri: "http://127.0.0.1:8889/test/",
				},
			],
		},
	},
	{
		name: "with7videos",
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
				{
					type: "iframe",
					id: "5",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "6",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "7",
					uri: "http://127.0.0.1:8889/test/",
				},
			],
		},
	},
	{
		name: "with8videos",
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
				{
					type: "iframe",
					id: "5",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "6",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "7",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "8",
					uri: "http://127.0.0.1:8889/test/",
				},
			],
		},
	},
	{
		name: "with9videos",
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
				{
					type: "iframe",
					id: "5",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "6",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "7",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "8",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "9",
					uri: "http://127.0.0.1:8889/test/",
				},
			],
		},
	},
	{
		name: "with10videos",
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
				{
					type: "iframe",
					id: "5",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "6",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "7",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "8",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "9",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "10",
					uri: "http://127.0.0.1:8889/test/",
				},
			],
		},
	},
	{
		name: "with12videos",
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
				{
					type: "iframe",
					id: "5",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "6",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "7",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "8",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "9",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "10",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "11",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "12",
					uri: "http://127.0.0.1:8889/test/",
				},
			],
		},
	},

	{
		name: "with13videos",
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
				{
					type: "iframe",
					id: "5",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "6",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "7",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "8",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "9",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "10",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "11",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "12",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "13",
					uri: "http://127.0.0.1:8889/test/",
				},
			],
		},
	},

	{
		name: "with15videos",
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
				{
					type: "iframe",
					id: "5",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "6",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "7",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "8",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "9",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "10",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "11",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "12",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "13",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "14",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "15",
					uri: "http://127.0.0.1:8889/test/",
				},
			],
		},
	},

	{
		name: "with16videos",
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
				{
					type: "iframe",
					id: "5",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "6",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "7",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "8",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "9",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "10",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "11",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "12",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "13",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "14",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "15",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "16",
					uri: "http://127.0.0.1:8889/test/",
				},
			],
		},
	},

	{
		name: "with18videos",
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
				{
					type: "iframe",
					id: "5",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "6",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "7",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "8",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "9",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "10",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "11",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "12",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "13",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "14",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "15",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "16",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "17",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "18",
					uri: "http://127.0.0.1:8889/test/",
				},
			],
		},
	},

	{
		name: "with20videos",
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
				{
					type: "iframe",
					id: "5",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "6",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "7",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "8",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "9",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "10",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "11",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "12",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "13",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "14",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "15",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "16",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "17",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "18",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "19",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "20",
					uri: "http://127.0.0.1:8889/test/",
				},
			],
		},
	},

	{
		name: "with30videos",
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
				{
					type: "iframe",
					id: "5",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "6",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "7",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "8",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "9",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "10",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "11",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "12",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "13",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "14",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "15",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "16",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "17",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "18",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "19",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "20",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "21",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "22",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "23",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "24",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "25",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "26",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "27",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "28",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "29",
					uri: "http://127.0.0.1:8889/test/",
				},
				{
					type: "iframe",
					id: "30",
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
