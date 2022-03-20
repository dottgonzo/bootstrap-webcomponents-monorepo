import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup } from "@htmlbricks/hb-jsutils/main";

export const storybookArgs = {
	navpage: { control: { type: "text" } },
	navlink: { control: { type: "object" } },
};

const cssVars: CssVar[] = [];
export const cssParts: CssPart[] = [{ name: "li", description: "list element" }];
export const htmlSlots: HtmlSlot[] = [];
export const i18nLanguages: i18nLang[] = [];

export const styleSetup: StyleSetup = {
	vars: cssVars,
	parts: cssParts,
	themes: ["bootstrap"],
};
