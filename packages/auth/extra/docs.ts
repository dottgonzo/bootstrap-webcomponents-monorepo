import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup } from "@htmlbricks/hb-jsutils/main";

export const storybookArgs = {
	type: {
		options: ["login", "register", "activate", "recover"],
		control: { type: "select" }, // Automatically inferred when 'options' is defined
	},
	language: { control: { type: "string" } },
	disableregister: { control: { type: "boolean" } },
	logouri: { control: { type: "string" } },
	loginuri: { control: { type: "string" } },
	registeruri: { control: { type: "string" } },
	login: { action: "loginEvent" },
	register: { action: "registerEvent" },
	recoverOrActivate: { action: "recoverOrActivateEvent" },
	oauth2providers: { control: { type: "array" } },
	sessionkey: { control: { type: "string" } },
	redirectonlogin: { control: { type: "string" } },
	redirectoncreate: { control: { type: "string" } },
	activateuri: { control: { type: "string" } },
	recoveruri: { control: { type: "string" } },
	requestmethod: { control: { type: "string" } },
	appendqueryparams: { control: { type: "string" } },
	appendbodyparams: { control: { type: "string" } },
	passwordpattern: { control: { type: "string" } },
	recoverycode: { control: { type: "string" } },
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
export const htmlSlots: HtmlSlot[] = [
	{
		name: "header",
		description: "",
	},
];
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
