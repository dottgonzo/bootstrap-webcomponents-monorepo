import type { CssPart, CssVar, HtmlSlot, i18nLang } from "@htmlbricks/hb-jsutils/main";

export const storybookArgs = {
	show: { control: { type: "boolean" } },
	small: { control: { type: "text" } },
	title: { control: { type: "text" } },
	img: { control: { type: "text" } },
	content: { control: { type: "text" } },
	toastShow: { action: "toastShow" },
	toastConfirm: { action: "toastConfirm" },
};

export const cssVars: CssVar[] = [];
export const cssParts: CssPart[] = [];
export const htmlSlots: HtmlSlot[] = [];
export const i18nLanguages: i18nLang[] = [];
