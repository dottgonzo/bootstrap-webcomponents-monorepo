import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup } from "@htmlbricks/hb-jsutils/main";

export const storybookArgs = {
	key: { control: { type: "text" } },
	plugins: { control: { type: "text" } },
	toolbar: { control: { type: "text" } },
	images_upload_url: { control: { type: "text" } },
};

const cssVars: CssVar[] = [];
export const cssParts: CssPart[] = [];
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
