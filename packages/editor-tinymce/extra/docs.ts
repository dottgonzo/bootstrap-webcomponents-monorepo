import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup } from "@htmlbricks/hb-jsutils/main";

export const storybookArgs = {
	key: { control: { type: "text" } },
	plugins: { control: { type: "text" } },
	toolbar: { control: { type: "text" } },
	images_upload_url: { control: { type: "text" } },
};

export const cssVars: CssVar[] = [];
export const cssParts: CssPart[] = [];
export const htmlSlots: HtmlSlot[] = [];
export const i18nLanguages: i18nLang[] = [];

export const styleSetup: StyleSetup = {
	vars: cssVars,
	parts: cssParts,
	themes: [],
};
