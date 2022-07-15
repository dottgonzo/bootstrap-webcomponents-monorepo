import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup, ComponentSetup } from "@htmlbricks/hb-jsutils/main";
import type { Component } from "../app/types/webcomponent.type";

export const storybookArgs = {

	provider: { control: { type: "object" } },
	oauthFlowInit: { action: "oauthFlowInitEvent" },
		oauthFlowCustom: { action: "oauthFlowCustomEvent" },


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
export const i18nLanguages: i18nLang[] = [
	{ lang: "it", language: "italian" },
	{ lang: "en", language: "english" },
];

export const styleSetup: StyleSetup = {
	vars: cssVars,
	parts: cssParts,
};

const examples: { name: string; description?: string; data: Component }[] = [
	{
		name: "facebook",
		data: {
			provider: {
				name: 'facebook',
			}
		},
	},
	{
		name: "gitlab",
		data: {
			provider: {
				name: 'gitlab',
			}
		},
	},
	{
		name: "github",
		data: {
			provider: {
				name: 'github',
			}
		},
	},
	{
		name: "google",
		data: {
			provider: {
				name: 'google',
			}
		},
	}
];
export const componentSetup: ComponentSetup & { examples: { name: string; description?: string; data: Component }[] } = {
	definitions: null as any,
	storybookArgs,
	styleSetup,
	author: null as any,
	contributors: [],
	owner: null as any,
	htmlSlots,
	i18n: i18nLanguages,
	examples,
	screenshots: [],
	licenses: [{ type: "Apache-2.0", path: "LICENSE.md", cost: 0, currency: "EUR" }],
	readmePath: "README.md",
	name: "hb-auth-social-login-button",
	category: "components",
	tags: ["components"],
	size: { layout: "fullscreen" },
	iifePath: "release/release.js",
	repoName: "@htmlbricks/hb-auth-social-login-button",
	version: null as any,
};
