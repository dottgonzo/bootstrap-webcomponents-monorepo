import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup } from "@htmlbricks/hb-jsutils/main";

export const storybookArgs = {
	width: { control: { type: "range", min: 100, max: 2000, step: 25 } },
	height: { control: { type: "range", min: 100, max: 2000, step: 25 } },
	mediatype: { control: { type: "text" } },
	liveStatus: { action: "liveStatusEvent" },
};

const cssVars: CssVar[] = [];
export const cssParts: CssPart[] = [];
export const htmlSlots: HtmlSlot[] = [];
export const i18nLanguages: i18nLang[] = [];

export const styleSetup: StyleSetup = {
	vars: cssVars,
	parts: cssParts,
	themes: ["bootstrap"],
};
