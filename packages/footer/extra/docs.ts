import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup } from "@htmlbricks/hb-jsutils/main";

export const storybookArgs = {
	smallrow: { control: { type: "object" } },
	columns: { control: { type: "array" } },
	policies: { control: { type: "array" } },
	companyname: { control: { type: "text" } },
	companylogouri: { control: { type: "text" } },
	brandandcontacts: { control: { type: "object" } },
	footerbottom: { control: { type: "object" } },
	copyrighttext: { control: { type: "object" } },
	socials: { control: { type: "object" } },
	contacts: { control: { type: "object" } },
	company: { control: { type: "object" } },
	footerClick: { action: "footerClickEvent" },
};

const cssVars: CssVar[] = [];
export const cssParts: CssPart[] = [{ name: "column-cell-button-content", description: "" }];
export const htmlSlots: HtmlSlot[] = [
	{ name: "footerpolicy", description: "" },
	{ description: "", name: "footerheader" },
	{ description: "", name: "footercontent" },
	{ description: "", name: "footerbottom" },
];

export const i18nLanguages: i18nLang[] = [];

export const styleSetup: StyleSetup = {
	vars: cssVars,
	parts: cssParts,
};
