import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup, ComponentSetup } from "@htmlbricks/hb-jsutils/main";
import type { Component } from "../app/types/webcomponent.type";

export const storybookArgs = {
	options: { control: { type: "object" } },
	center: { control: { type: "array" } },
	data: { control: { type: "array" } },
	zoom: { control: { type: "number" } },
	source: { control: { type: "object" } },
	pointClickCoordinates: { action: "pointClickCoordinates" },
	markerClick: { action: "markerClick" },
};

const cssVars: CssVar[] = [];
export const cssParts: CssPart[] = [];
export const htmlSlots: HtmlSlot[] = [];
export const i18nLanguages: i18nLang[] = [];

export const styleSetup: StyleSetup = {
	vars: cssVars,
	parts: cssParts,
};

const examples: { name: string; description?: string; data: Component }[] = [
	{
		name: "default",
		data: {
			center: [10, 10],
			zoom: 9,
			source: { type: "osm" },
			options: { centerFromGeometries: true },
			data: [
				{
					marker: {
						lngLat: [10.1, 10],
						icon: {
							uri: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Visual_Studio_Code_Insiders_1.36_icon.svg",
							scale: 0.15,
							anchor: [0.5, 0.1],
						},
						popupHtml: "<p>You clicked here:</p><code>ciao</code>",
					},
				},
				{
					marker: {
						lngLat: [10, 10],
						popupHtml: "<p>You clicked here:</p><code>ciao</code>",
					},
				},
				{
					marker: {
						lngLat: [10.3, 10],
					},
				},
			],
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
	name: "hb-map",
	category: "graph",
	tags: ["graph"],
	size: {},
	iifePath: "release/release.js",
	repoName: "@htmlbricks/hb-map",
	version: null as any,
};
