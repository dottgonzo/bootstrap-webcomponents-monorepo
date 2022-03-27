import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup, ComponentSetup } from "@htmlbricks/hb-jsutils/main";

export const storybookArgs = {
	options: { control: { type: "object" } },
};

const cssVars: CssVar[] = [];
export const cssParts: CssPart[] = [{ name: "gauge", description: "" }];
export const htmlSlots: HtmlSlot[] = [];
export const i18nLanguages: i18nLang[] = [];

export const styleSetup: StyleSetup = {
	vars: cssVars,
	parts: cssParts,
};

export const componentSetup: ComponentSetup = {
	definitions: null,
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
