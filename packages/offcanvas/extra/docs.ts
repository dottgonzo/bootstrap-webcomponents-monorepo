import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup, ComponentSetup } from "@htmlbricks/hb-jsutils/main";

export const storybookArgs = {
	opened: { control: { type: "boolean" } },
	companylogouri: { control: { type: "text" } },
	companytitle: { control: { type: "text" } },
	groups: { control: { type: "text" } },
	enablefooter: { control: { type: "boolean" } },
	offcanvasswitch: { action: "offcanvasswitchEvent" },
	pagechange: { action: "pagechangeEvent" },
	type: { control: { options: ["autohide", "small", "open"] } },
	navpage: { control: { type: "text" } },
	navlinks: { control: { type: "array" } },
};

const cssVars: CssVar[] = [{ name: "--bs-primary", defaultValue: "#07689f", valueType: "color", theme: "bootstrap" }];
export const cssParts: CssPart[] = [
	{
		name: "header",
		description: "header",
	},
];
export const htmlSlots: HtmlSlot[] = [
	{
		name: "test",
		description: "test",
	},
	{
		name: "header",
		description: "header",
	},

	{
		name: "footer",
		description: "footer",
	},
];
export const i18nLanguages: i18nLang[] = [];

export const styleSetup: StyleSetup = {
	vars: cssVars,
	parts: cssParts,
};

export const componentSetup: ComponentSetup = {
	definitions: null,
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
