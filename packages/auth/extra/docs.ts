import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup, ComponentSetup } from "@htmlbricks/hb-jsutils/main";
import type { Component } from "../app/types/webcomponent.type";

export const storybookArgs = {
	type: {
		options: ["login", "register", "activate", "recover"],
		control: { type: "select" }, // Automatically inferred when 'options' is defined
	},
	enable_recover_password: { control: { type: "boolean" } },
	language: { control: { type: "text" } },
	disableregister: { control: { type: "boolean" } },
	logouri: { control: { type: "text" } },
	loginuri: { control: { type: "text" } },
	registeruri: { control: { type: "text" } },
	login: { action: "loginEvent" },
	register: { action: "registerEvent" },
	recoverOrActivate: { action: "recoverOrActivateEvent" },
	oauth2providers: { control: { type: "array" } },
	sessionkey: { control: { type: "text" } },
	redirectonlogin: { control: { type: "text" } },
	redirectoncreate: { control: { type: "text" } },
	activateuri: { control: { type: "text" } },
	recoveruri: { control: { type: "text" } },
	requestmethod: { control: { type: "text" } },
	appendqueryparams: { control: { type: "text" } },
	appendbodyparams: { control: { type: "text" } },
	passwordpattern: { control: { type: "text" } },
	recoverycode: { control: { type: "text" } },
	email: { control: { type: "text" } },
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

const examples: { name: string; description?: string; data: Component }[] = [
	{
		name: "login",
		data: {
			type: "login",
			logouri: "https://upload.wikimedia.org/wikipedia/commons/a/af/Free_Content_Logo.svg",
		},
	},
	{
		name: "register",
		data: {
			type: "register",
			logouri: "https://upload.wikimedia.org/wikipedia/commons/a/af/Free_Content_Logo.svg",
		},
	},
	{
		name: "activate",
		data: {
			type: "activate",
			recoverycode: "testcode",
			logouri: "https://upload.wikimedia.org/wikipedia/commons/a/af/Free_Content_Logo.svg",
		},
	},
	{
		name: "recover",
		data: {
			type: "recover",
			logouri: "https://upload.wikimedia.org/wikipedia/commons/a/af/Free_Content_Logo.svg",
		},
	},

	{
		name: "LoginEn",
		data: {
			type: "login",
			language: "en",
			disableregister: true,
		},
	},
	{
		name: "LoginOnly",
		data: {
			type: "login",
			language: "it",
			disableregister: true,
		},
	},
	{
		name: "LoginEnWithFetch",
		data: {
			type: "login",
			language: "en",
			loginuri: "https://kernel.free.beeceptor.com/login",
			registeruri: "https://kernel.free.beeceptor.com/register",
		},
	},
	{
		name: "LoginEnWithOauth",
		data: {
			type: "login",
			language: "en",
			loginuri: "https://kernel.free.beeceptor.com/login",
			registeruri: "https://kernel.free.beeceptor.com/register",
			oauth2providers: [
				{
					provider: "google",
					uri: "https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A//www.googleapis.com/auth/drive.metadata.readonly&include_granted_scopes=true&response_type=token&state=state_parameter_passthrough_value&redirect_uri=https%3A//oauth2.example.com/code&client_id=client_id",
				},
				{ provider: "facebook", uri: "" },
				{ provider: "twitter", uri: "" },
			],
		},
	},
	{
		name: "forgotpassword",
		data: {
			enable_recover_password: true,
			type: "forgotpassword",
			logouri: "https://upload.wikimedia.org/wikipedia/commons/a/af/Free_Content_Logo.svg",
		},
	},
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
	name: "hb-auth",
	category: "components",
	tags: ["components"],
	size: { layout: "fullscreen" },
	iifePath: "release/release.js",
	repoName: "@htmlbricks/hb-auth",
	version: null as any,
};
