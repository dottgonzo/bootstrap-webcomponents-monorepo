import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup, ComponentSetup } from "@htmlbricks/hb-jsutils/main";
import type { Component } from "../app/types/webcomponent.type";

export const storybookArgs = {
	messages: { control: { type: "object" } },
	authors: { control: { type: "object" } },
	options: { control: { type: "object" } },
	message: { control: { type: "object" } },
	sendMessage: { action: "sendMessageEvent" },
};

const cssVars: CssVar[] = [];
export const cssParts: CssPart[] = [{ name: "testpart", description: "test css part on 2 div tag" }];
export const htmlSlots: HtmlSlot[] = [{ name: "skelcontent", description: "test slot" }];
export const i18nLanguages: i18nLang[] = [];

export const styleSetup: StyleSetup = {
	vars: cssVars,
	parts: cssParts,
};

const defaultExampleMessages: Component["messages"] = [
	{
		id: "1",
		text: "Hello",
		timestamp: new Date(Date.now() - 36_000),
		type: "text",
		status: "sent",
		authorId: "1",
	},
	{
		id: "2",
		text: "Hi",
		timestamp: new Date(Date.now()),
		type: "text",
		status: "received",
		authorId: "2",
	},
];
const moreExampleMessages: Component["messages"] = [
	...defaultExampleMessages,
	{
		id: "3",
		text: "How are you?",
		timestamp: new Date(Date.now()),
		type: "text",
		status: "received",
		authorId: "2",
	},
	{
		id: "4",
		text: "I'm fine, thanks",
		timestamp: new Date(Date.now()),
		type: "text",
		status: "sent",
		authorId: "1",
	},
	{
		id: "5",

		text: "What about you?",
		timestamp: new Date(Date.now()),
		type: "text",
		status: "received",
		authorId: "2",
	},
	{
		id: "6",
		text: "I'm fine too, thanks for asking",
		timestamp: new Date(Date.now()),
		type: "text",
		status: "sent",
		authorId: "1",
	},
	{
		id: "7",
		text: "You're welcome",
		timestamp: new Date(Date.now()),
		type: "text",
		status: "received",
		authorId: "2",
	},
	{
		id: "8",
		text: "Bye",
		timestamp: new Date(Date.now()),
		type: "text",
		status: "sent",
		authorId: "1",
	},
	{
		id: "9",
		text: "Bye",
		timestamp: new Date(Date.now()),
		type: "text",
		status: "received",
		authorId: "2",
	},
	{
		id: "10",
		text: "See you later",
		timestamp: new Date(Date.now()),
		type: "text",
		status: "sent",
		authorId: "1",
	},
	{
		id: "11",
		text: "See you later",
		timestamp: new Date(Date.now()),
		type: "text",
		status: "received",
		authorId: "2",
	},
	{
		id: "12",
		text: "Bye",
		timestamp: new Date(Date.now()),
		type: "text",
		status: "sent",
		authorId: "1",
	},
	{
		id: "13",
		text: "Bye",
		timestamp: new Date(Date.now()),
		type: "text",
		status: "received",
		authorId: "2",
	},
];
const defaultExampleAuthors: Component["authors"] = [
	{
		id: "1",
		name: "John",
		avatar: "https://i.pravatar.cc/300?img=1",
		status: "online",
		me: true,
	},
	{
		id: "2",
		name: "Mary",
		avatar: "https://i.pravatar.cc/300?img=2",
		status: "online",
	},
];

const examples: { name: string; description?: string; data: Component }[] = [
	{
		name: "default",
		data: {
			messages: defaultExampleMessages,
			authors: defaultExampleAuthors,
		},
	},
	{
		name: "withAMessage",
		data: {
			message: { text: 'This is a message from the "message" property' },
			messages: defaultExampleMessages,
			authors: defaultExampleAuthors,
		},
	},
	{
		name: "moreMessages",
		data: {
			messages: moreExampleMessages,
			authors: defaultExampleAuthors,
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
	name: "hb-messages-box",
	category: "basic",
	tags: ["basic"],
	size: {},
	iifePath: "release/release.js",
	repoName: "@htmlbricks/hb-messages-box",
	version: null as any,
};
