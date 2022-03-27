import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup } from "@htmlbricks/hb-jsutils/main";

export const storybookArgs = {
	allowdecline: { control: { type: "boolean" } },
	i18nlang: { control: { type: "text" } },
	cookielawuri4more: { control: { type: "text" } },
	capabilities: { control: { type: "object" } },
	acceptCookieLaw: { action: "acceptCookieLawEvent" },
};

const cssVars: CssVar[] = [];
export const cssParts: CssPart[] = [];
export const htmlSlots: HtmlSlot[] = [
	{ name: "title", description: "" },
	{ name: "text", description: "" },
];
export const i18nLanguages: i18nLang[] = [
	{ lang: "it", language: "italian" },
	{ lang: "en", language: "english" },
];
export const styleSetup: StyleSetup = {
	vars: cssVars,
	parts: cssParts,
};

export const componentSetup = {
	storybookArgs,
	styleSetup,
	htmlSlots,
	i18n: i18nLanguages,
	examples: [],
};
