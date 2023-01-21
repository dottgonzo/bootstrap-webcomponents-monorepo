import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup, ComponentSetup } from "@htmlbricks/hb-jsutils/main";
import type { Component } from "../app/types/webcomponent.type";

export const storybookArgs = {
	chats: { control: { type: "object" } },
	selected: { action: "selectedEvent" },
};

const cssVars: CssVar[] = [
	{
		name: "--hb-topics-card-selected-background-color",
		description: "Selected background color",
		defaultValue: "#e9ecef",
		valueType: "color",
	},
	{
		name: "--hb-topics-card-hover-background-color",
		description: "Hover background color",
		defaultValue: "#f5f5f5",
		valueType: "color",
	},
	{
		name: "--hb-topics-card-size",
		description: "Topic card size",
		defaultValue: "calc(1vw + 1vh + 12px)",
		valueType: "htmlsize",
	},
	{
		name: "--hb-topics-card-padding",
		description: "Topic card padding",
		defaultValue: "4px",
		valueType: "htmlsize",
	},
];
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
			chats: [
				{
					chat_id: "ciao0",
					counter: 0,
					text: "Hello 0",
					title: "Hello0",
					time: new Date(),
					img_uri: "https://www.w3schools.com/howto/img_avatar.png",
				},
				{
					chat_id: "ciao1",
					counter: 0,
					text: "Hello 1",
					title: "Hello1",
					time: new Date(),
					img_uri: "https://www.w3schools.com/howto/img_avatar.png",
				},
				{
					chat_id: "ciao2",
					counter: 0,
					text: "Hello 2",
					title: "Hello2",
					time: new Date(),
					img_uri: "https://www.w3schools.com/howto/img_avatar.png",
				},
			],
		},
	},
	{
		name: "selected",
		data: {
			chats: [
				{
					chat_id: "ciao0",
					counter: 0,
					text: "Hello 0",
					title: "Hello0",
					time: new Date(),
					img_uri: "https://www.w3schools.com/howto/img_avatar.png",
				},
				{
					chat_id: "ciao1",
					counter: 0,
					text: "Hello 1",
					title: "Hello1",
					time: new Date(),
					img_uri: "https://www.w3schools.com/howto/img_avatar.png",
					_selected: true,
				},
				{
					chat_id: "ciao2",
					counter: 0,
					text: "Hello 2",
					title: "Hello2",
					time: new Date(),
					img_uri: "https://www.w3schools.com/howto/img_avatar.png",
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
	name: "hb-messages-topics-card",
	category: "messages",
	tags: ["messages"],
	size: {},
	iifePath: "release/release.js",
	repoName: "@htmlbricks/hb-messages-topics-card",
	version: null as any,
};
