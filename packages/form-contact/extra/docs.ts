import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup, ComponentSetup } from "@htmlbricks/hb-jsutils/main";
import type { Component } from "../app/types/webcomponent.type";

export const storybookArgs = {
	informations: { control: { type: "object" } },
	privacy_policy: { control: { type: "object" } },
	captcha: { control: { type: "object" } },
	formContactSubmit: { action: "formContactSubmit" },
	formContactSubmitWithCaptcha: { action: "formContactSubmitWithCaptcha" },
};

const cssVars: CssVar[] = [
	{ name: "--bs-primary", valueType: "color", theme: "bootstrap", defaultValue: "#07689f" },
	{ name: "--bs-secondary", valueType: "color", theme: "bootstrap", defaultValue: "#c9d6df" },
	{ name: "--bs-success", valueType: "color", theme: "bootstrap", defaultValue: "#11d3bc" },
	{ name: "--bs-info", valueType: "color", theme: "bootstrap", defaultValue: "#a2d5f2" },
	{ name: "--bs-warning", valueType: "color", theme: "bootstrap", defaultValue: "#ffc107" },
	{ name: "--bs-danger", valueType: "color", theme: "bootstrap", defaultValue: "#f67280" },
];

export const cssParts: CssPart[] = [{ name: "container", description: "" }];
export const htmlSlots: HtmlSlot[] = [];
export const i18nLanguages: i18nLang[] = [];

export const styleSetup: StyleSetup = {
	vars: cssVars,
	parts: cssParts,
};

const examples: { name: string; description?: string; data: Component }[] = [
	{
		name: "FormContact1",
		data: {
			informations: { email: { required: true }, message: {} },
			privacy_policy: { input: "accettalo", required: true },
		},
	},
	{
		name: "FormContact2",
		data: {
			informations: { message: {} },
		},
	},
	{
		name: "FormContact3",
		data: {
			informations: { name: {}, message: {} },
		},
	},
	{
		name: "FormContactWithCaptcha",
		data: {
			informations: { email: { required: true }, message: {} },
			privacy_policy: { input: "accettalo", required: true },
			captcha: {
				type: "googlev_recaptchav2_invisible",
				siteKey: "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI",
			},
		},
	},
];
export const componentSetup: ComponentSetup & { examples: { name: string; description?: string; data: Component }[] } = {
	definitions: null,
	storybookArgs,
	styleSetup,
	author: null,
	contributors: [],
	owner: null,
	htmlSlots,
	i18n: i18nLanguages,
	examples,
	screenshots: [],
	licenses: [{ type: "Apache-2.0", path: "LICENSE.md", cost: 0, currency: "EUR" }],
	readmePath: "README.md",
	name: "hb-form-contact",
	category: "site",
	tags: ["site", "form"],
	size: {},
	iifePath: "release/release.js",
	repoName: "@htmlbricks/hb-form-contact",
	version: null,
};
