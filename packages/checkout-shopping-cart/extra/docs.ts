import type { CssPart, CssVar, HtmlSlot, i18nLang } from "@htmlbricks/hb-jsutils/main";

export const storybookArgs = {
	payment: { control: { type: "object" } },
	completed: { control: { type: "radio" }, options: ["yes", "no"] },
};

export const cssVars: CssVar[] = [
	{ name: "--hb-checkout-border", description: "", defaultValue: "0.5px solid rgba(197, 197, 197, 0.808)", valueType: "string" },
];
export const cssParts: CssPart[] = [];
export const htmlSlots: HtmlSlot[] = [];
export const i18nLanguages: i18nLang[] = [];
