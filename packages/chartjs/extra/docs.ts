import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup, ComponentSetup } from "@htmlbricks/hb-jsutils/main";
import type { Component } from "../app/types/webcomponent.type";

export const storybookArgs = {
	data: { control: { type: "object" } },
	chartClick: { action: "chartClick" },
};

const cssVars: CssVar[] = [];
export const cssParts: CssPart[] = [{ name: "container", description: "" }];
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
			data: {
				type: "line",
				data: {
					labels: ["January", "February", "March", "April", "May", "June"],
					datasets: [
						{
							label: "My First dataset",
							backgroundColor: "rgb(255, 99, 132)",
							borderColor: "rgb(255, 99, 132)",
							data: [0, 10, 5, 2, 20, 30, 45],
						},
					],
				},
				options: {},
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
	name: "hb-chartjs",
	category: "graph",
	tags: ["graph"],
	size: {},
	iifePath: "release/release.js",
	repoName: "@htmlbricks/hb-chartjs",
	version: null as any,
};
