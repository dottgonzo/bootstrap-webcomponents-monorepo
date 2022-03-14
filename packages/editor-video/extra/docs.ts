import type { CssPart, CssVar, HtmlSlot, i18nLang } from "@htmlbricks/hb-jsutils/main";

export const storybookArgs = {
	src: { control: { type: "text" } },
	form: { control: { type: "array" } },
	track: { control: { type: "object" } },
	changeTrackValues: { action: "changeTrackValuesEvent" },
	dispatchTrack: { action: "dispatchTrackEvent" },
};

export const cssVars: CssVar[] = [];
export const cssParts: CssPart[] = [];
export const htmlSlots: HtmlSlot[] = [];
export const i18nLanguages: i18nLang[] = [];
