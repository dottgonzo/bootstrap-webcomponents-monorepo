import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup } from "@htmlbricks/hb-jsutils/main";

export const storybookArgs = {
	size: { control: { type: "range", min: 1, max: 100 } },
	page: { control: { type: "number" } },
	primarycolor: {
		control: { type: "color" },
	},

	enableselect: { control: { type: "boolean" } },
	selectrow: { control: { type: "boolean" } },
	rows: { control: { type: "array" } },
	headers: { control: { type: "array" } },
	actions: { control: { type: "array" } },
	selectactions: { control: { type: "array" } },
	pagechange: { action: "pagechangeEvent" },
	tableaction: { action: "tableactionEvent" },
	tableCustomActionClick: { action: "tableCustomActionClickEvent" },
	cellclick: { action: "cellclickEvent" },
	actiononselected: { action: "actiononselectedEvent" },
	clickonrow: { action: "clickonrowEvent" },
	confirmActionModal: { action: "confirmActionModalEvent" },
	showConfirmModal: { action: "showConfirmModal" },
};

const cssVars: CssVar[] = [];
export const cssParts: CssPart[] = [];
export const htmlSlots: HtmlSlot[] = [];
export const i18nLanguages: i18nLang[] = [];

export const styleSetup: StyleSetup = {
	vars: cssVars,
	parts: cssParts,
};
