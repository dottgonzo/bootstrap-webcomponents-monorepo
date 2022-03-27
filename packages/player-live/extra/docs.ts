import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup } from "@htmlbricks/hb-jsutils/main";

export const storybookArgs = {
	width: { control: { type: "range", min: 100, max: 2000, step: 25 } },
	height: { control: { type: "range", min: 100, max: 2000, step: 25 } },
	mediatype: { control: { type: "text" } },
	liveStatus: { action: "liveStatusEvent" },
};

const cssVars: CssVar[] = [];
export const cssParts: CssPart[] = [
	{ name: "container", description: "" },
	{ name: "replacewithtext", description: "" },
	{ name: "video", description: "" },
];
export const htmlSlots: HtmlSlot[] = [];
export const i18nLanguages: i18nLang[] = [];

export const styleSetup: StyleSetup = {
	vars: cssVars,
	parts: cssParts,
};

export const componentSetup = {
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
