import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup, ComponentSetup } from "wc-js-utils/main";
import type { Component } from "../app/types/webcomponent.type";

export const storybookArgs = {
	debug: { control: { type: "boolean" } },
	output_schema: { control: { type: "object" } },
	done: { action: "doneEvent" },
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
		data: {},
	},
	{
		name: "debug",
		data: {
			debug: true,
		},
	},
	{
		name: "debug-default",
		data: {
			debug: true,
			output_schema: [
				{
					id: "name",
					conditional: false,
					label: "Name",
					max: 100,
					min: 0,
					required: true,
					placeholder: "Enter your name",
					type: "text",
					value: "abbello",
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
	name: "hb-form-composer",
	category: "form",
	tags: ["form"],
	size: {},
	iifePath: "release/release.js",
	repoName: "@htmlbricks/hb-form-composer",
	version: null as any,
};
