import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup } from "@htmlbricks/hb-jsutils/main";

export const storybookArgs = {
	changeRangeValues: { action: "changeRangeValuesEvent" },
	withbubbles: { control: { type: "boolean" } },
	min: { control: { type: "number" } },
	max: { control: { type: "number" } },
	minval: { control: { type: "number" } },
	maxval: { control: { type: "number" } },
};

const cssVars: CssVar[] = [];
export const cssParts: CssPart[] = [
	{ name: "inverse", description: "" },
	{ name: "the-range", description: "" },
	{ name: "the-thumb", description: "" },
	{ name: "sign", description: "" },
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
};
