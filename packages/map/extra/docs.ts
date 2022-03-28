import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup, ComponentSetup } from "@htmlbricks/hb-jsutils/main";
import { version } from "../package.json";
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

const examples: Component[] = [
	{
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
];
export const componentSetup: ComponentSetup & { examples: Component[] } = {
	definitions: null,
	storybookArgs,
	styleSetup,
	htmlSlots,
	i18n: i18nLanguages,
	examples,
	name: "hb-map",
	category: "graph",
	tags: ["graph"],
	size: {},
	iifePath: "release/release.js",
	repoName: "@htmlbricks/hb-map",
	version,
};
