import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup } from "@htmlbricks/hb-jsutils/main";

export const storybookArgs = {
	size: { control: { type: "range", min: 1, max: 100 } },
	page: { control: { type: "number" } },
	resturi: { control: { type: "object" } },
	headers: { control: { type: "array" } },
	cards: { control: { type: "array" } },
	primarycolor: { control: { type: "color" } },
	pagechange: { action: "pagechangeEvent" },
	externalfilter: { control: { type: "boolean" } },
	textFilterVideos: { action: "textFilterVideosEvent" },
	dateFilterVideos: { action: "dateFilterVideosEvent" },
};

const cssVars: CssVar[] = [];
export const cssParts: CssPart[] = [];
export const htmlSlots: HtmlSlot[] = [];
export const i18nLanguages: i18nLang[] = [];

export const styleSetup: StyleSetup = {
	vars: cssVars,
	parts: cssParts,
};
