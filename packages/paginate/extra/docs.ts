import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup } from "@htmlbricks/hb-jsutils/main";

export const storybookArgs = {
	page: { control: { type: "number" } },
	pages: { control: { type: "number" } },
	pagechange: { action: "pagechange" },
};

const cssVars: CssVar[] = [{ name: "--bs-primary", valueType: "color", theme: "bootstrap", defaultValue: "#07689f" }];
export const cssParts: CssPart[] = [];
export const htmlSlots: HtmlSlot[] = [];
export const i18nLanguages: i18nLang[] = [];

export const styleSetup: StyleSetup = {
	vars: cssVars,
	parts: cssParts,
};

{
	storybookArgs,
	styleSetup,
	htmlSlots,
	i18n: i18nLanguages,
	examples: [],
	name: "",
	category: "",
	tags: [],
	size: {},
};
