import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup } from "@htmlbricks/hb-jsutils/main";

export const storybookArgs = {
	show: { control: { type: "boolean" } },
	dialogclasses: { control: { type: "text" } },
	title: { control: { type: "text" } },
	backdrop: { control: { type: "boolean" } },
	ignoreBackdrop: { control: { type: "text" } },
	keyboard: { control: { type: "boolean" } },
	describedby: { control: { type: "text" } },
	labelledby: { control: { type: "text" } },
	content: { control: { type: "text" } },
	closelabel: { control: { type: "text" } },
	confirmlabel: { control: { type: "text" } },
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
