import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup, ComponentSetup } from "@htmlbricks/hb-jsutils/main";
import type { Component } from "../app/types/webcomponent.type";
export const storybookArgs = {
	content: { control: { type: "text" } },
	clipboardCopyText: { action: "clipboardCopyTextEvent" },
};

const cssVars: CssVar[] = [
	{
		name: "--hb--area-code-background",
		defaultValue: "rgb(232 232 232 / 57%)",
		valueType: "color",
	},
];
export const cssParts: CssPart[] = [{ name: "content", description: "the code html tag" }];
export const htmlSlots: HtmlSlot[] = [];
export const i18nLanguages: i18nLang[] = [];

export const styleSetup: StyleSetup = {
	vars: cssVars,
	parts: cssParts,
};

const examples: Component[] = [
	{
		content: "desc",
	},
];
export const componentSetup: ComponentSetup & { examples: Component[] } = {
	definitions: null,
	storybookArgs,
	styleSetup,
	htmlSlots,
	i18n: i18nLanguages,
	examples,
	name: "hb-area-code",
	category: "dev",
	tags: ["dev"],
	size: {},
	iifePath: "release/release.js",
};
