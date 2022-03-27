import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup } from "@htmlbricks/hb-jsutils/main";

export const storybookArgs = {
	size: { control: { type: "range", min: 1, max: 100 } },
	page: { control: { type: "number" } },

	enableselect: { control: { type: "boolean" } },
	selectrow: { control: { type: "boolean" } },
	disablepagination: { control: { type: "boolean" } },
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
	externalfilter: { control: { type: "boolean" } },
	pages: { control: { type: "number" } },
};

const cssVars: CssVar[] = [
	{ name: "--bs-primary", valueType: "color", theme: "bootstrap", defaultValue: "#07689f" },
	{ name: "--bs-secondary", valueType: "color", theme: "bootstrap", defaultValue: "#c9d6df" },
	{ name: "--bs-success", valueType: "color", theme: "bootstrap", defaultValue: "#11d3bc" },
	{ name: "--bs-info", valueType: "color", theme: "bootstrap", defaultValue: "#a2d5f2" },
	{ name: "--bs-warning", valueType: "color", theme: "bootstrap", defaultValue: "#ffc107" },
	{ name: "--bs-danger", valueType: "color", theme: "bootstrap", defaultValue: "#f67280" },
];
export const cssParts: CssPart[] = [];
export const htmlSlots: HtmlSlot[] = [];
export const i18nLanguages: i18nLang[] = [];

export const styleSetup: StyleSetup = {
	vars: cssVars,
	parts: cssParts,
};
