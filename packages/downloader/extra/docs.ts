import type { CssPart, CssVar, HtmlSlot, i18nLang } from "@htmlbricks/hb-jsutils/main";

export const storybookArgs = {
	uri: { control: { type: "text" } },
	targetfilename: { control: { type: "text" } },
	headers: { control: { type: "text" } },
	downloadid: { control: { type: "text" } },
};

export const cssVars: CssVar[] = [];
export const cssParts: CssPart[] = [];
export const htmlSlots: HtmlSlot[] = [];
export const i18nLanguages: i18nLang[] = [];
