import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup, ComponentSetup } from "wc-js-utils/main";
import type { Component } from "../app/types/webcomponent.type";

export const storybookArgs = {
	addresses: { control: { type: "object" } },
	phones: { control: { type: "object" } },
	emails: { control: { type: "object" } },
	websites: { control: { type: "object" } },
	model: { control: { type: "text" } },
	availability: { control: { type: "object" } },
};

const cssVars: CssVar[] = [];
export const cssParts: CssPart[] = [];
export const htmlSlots: HtmlSlot[] = [];
export const i18nLanguages: i18nLang[] = [];

export const styleSetup: StyleSetup = {
	vars: cssVars,
	parts: cssParts,
};

const exampleData = {
	addresses: { addresses: [{ address: "Acacia Avenue 666, London UK", latLng: [0, 0], name: "office" }] },
	emails: { emails: [{ label: "email 1", address: "dev@dariocaruso.info", name: "dev" }] },
	phones: { phones: [{ number: "+666 666 666 666", name: "main" }] },
	websites: { websites: [{ label: "website 1 1", url: "https://docs.htmlbricks.kernel.online", name: "webcomponents" }] },
	availability: { times: ["8 - 20"], appointment: true },
};

const examples: { name: string; description?: string; data: Component }[] = [
	{
		name: "big",
		data: {
			model: "big",
			addresses: exampleData.addresses,
			emails: exampleData.emails,
			phones: exampleData.phones,
			websites: exampleData.websites,
			availability: exampleData.availability,
		},
	},
	{
		name: "small",
		data: {
			model: "small",
			addresses: exampleData.addresses,
			emails: exampleData.emails,
			phones: exampleData.phones,
			websites: exampleData.websites,
			availability: exampleData.availability,
		},
	},
	{
		name: "auto",
		data: {
			addresses: exampleData.addresses,
			emails: exampleData.emails,
			phones: exampleData.phones,
			websites: exampleData.websites,
			availability: exampleData.availability,
		},
	},
	{
		name: "auto2",
		data: {
			addresses: exampleData.addresses,
			emails: exampleData.emails,
		},
	},
	{
		name: "auto3",
		data: {
			addresses: exampleData.addresses,
			emails: exampleData.emails,
			phones: exampleData.phones,
		},
	},
	{
		name: "auto4",
		data: {
			addresses: exampleData.addresses,
			emails: exampleData.emails,
			phones: exampleData.phones,
			websites: exampleData.websites,
		},
	},
	{
		name: "auto1",
		data: {
			addresses: exampleData.addresses,
		},
	},
	{
		name: "big2",
		data: {
			model: "big",

			addresses: exampleData.addresses,
			emails: exampleData.emails,
		},
	},
	{
		name: "big3",
		data: {
			model: "big",

			addresses: exampleData.addresses,
			emails: exampleData.emails,
			phones: exampleData.phones,
		},
	},
	{
		name: "big4",
		data: {
			model: "big",

			addresses: exampleData.addresses,
			emails: exampleData.emails,
			phones: exampleData.phones,
			websites: exampleData.websites,
		},
	},
	{
		name: "big1",
		data: {
			model: "big",

			addresses: exampleData.addresses,
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
	name: "hb-site-contacts-row",
	category: "site",
	tags: ["site"],
	size: {},
	iifePath: "release/release.js",
	repoName: "@htmlbricks/hb-site-contacts-row",
	version: null as any,
};
