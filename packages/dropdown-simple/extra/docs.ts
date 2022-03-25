import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup } from "@htmlbricks/hb-jsutils/main";

export const storybookArgs = {
	open: { control: { type: "boolean" } },
	list: { control: { type: "array" } },
	dropdownSwitch: { action: "dropdownSwitchEvent" },
	dropDownClick: { action: "dropDownClickEvent" },
};

const cssVars: CssVar[] = [];
export const cssParts: CssPart[] = [
	{ name: "dropdown", description: "" },
	{ name: "dropdownbutton", description: "" },
	{ name: "dropdowncontent", description: "" },
];
export const htmlSlots: HtmlSlot[] = [];
export const i18nLanguages: i18nLang[] = [];

export const styleSetup: StyleSetup = {
	vars: cssVars,
	parts: cssParts,
};
