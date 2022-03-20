import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup } from "@htmlbricks/hb-jsutils/main";

export const storybookArgs = {
	src: { control: { type: "text" } },
	form: { control: { type: "array" } },
	track: { control: { type: "object" } },
	changeTrackValues: { action: "changeTrackValuesEvent" },
	dispatchTrack: { action: "dispatchTrackEvent" },
};

const cssVars: CssVar[] = [];
export const cssParts: CssPart[] = [];
export const htmlSlots: HtmlSlot[] = [];
export const i18nLanguages: i18nLang[] = [];

export const styleSetup: StyleSetup = {
	vars: cssVars,
	parts: cssParts,
};
