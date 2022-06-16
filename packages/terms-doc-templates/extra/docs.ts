import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup, ComponentSetup } from "@htmlbricks/hb-jsutils/main";
import type { Component } from "../app/types/webcomponent.type";

export const storybookArgs = {
	data: { control: { type: "object" } },
	i18nlang: { control: { type: "text" } },

	event: { action: "eventEvent" },
};

const cssVars: CssVar[] = [];
export const cssParts: CssPart[] = [{ name: "testpart", description: "test css part on 2 div tag" }];
export const htmlSlots: HtmlSlot[] = [{ name: "skelcontent", description: "test slot" }];
export const i18nLanguages: i18nLang[] = [
	{ lang: "it", language: "italian" },
	{ lang: "en", language: "english" },
];
export const styleSetup: StyleSetup = {
	vars: cssVars,
	parts: cssParts,
};

const examples: { name: string; description?: string; data: Component }[] = [
	// {
	// 	name: "gdpr",
	// 	data: {
	// 		config: {
	// 			site: {
	// 				name: "demo.freewebcomponents.com",
	// 				url: "https://demo.freewebcomponents.com",
	// 			},
	// 			company: {
	// 				name: "FWC Inc.",
	// 			},
	// 		},
	// 	},
	// },
	{
		name: "italian",
		data: {
			data: {
				collectedData: { dataTypes: [], scopes: [] },
				id: "italian-terms-privacy",
				site: {
					name: "demo.freewebcomponents.com",
					url: "https://demo.freewebcomponents.com",
					privacyPolicyUri: "https://demo.freewebcomponents.com/privacy_policy",
					cookiePolicyUri: "https://demo.freewebcomponents.com/cookie_law",
				},
				company: {
					name: "FWC Inc.",
					address: "Acacia Avenue, 666",
				},
				privacyAdmin: { name: "testownerprivacy", email: "ownprivacy.own" },

				date: new Date("2020-01-01"),
			},
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
	name: "hb-terms-doc-templates",
	category: "docs",
	tags: ["docs"],
	size: {},
	iifePath: "release/release.js",
	repoName: "@htmlbricks/hb-terms-doc-templates",
	version: null as any,
};
