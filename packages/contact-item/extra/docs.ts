import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup, ComponentSetup } from "@htmlbricks/hb-jsutils/main";

export const storybookArgs = {
	id: { control: { disable: true } },
	phone: { control: { type: "object" } },
	address: { control: { type: "object" } },
	email: { control: { type: "object" } },
	site: { control: { type: "object" } },
	config: { control: { type: "object" } },
	contactclick: { action: "contactClickEvent" },
};

const cssVars: CssVar[] = [];
export const cssParts: CssPart[] = [];
export const htmlSlots: HtmlSlot[] = [];
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
