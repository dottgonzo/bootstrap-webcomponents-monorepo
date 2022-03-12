import type { CssPart, CssVar, HtmlSlot } from "../../jsutils/main";

export const storybookArgs = {
	schemaentry: { control: { type: "object" } },
	showvalidation: { control: { type: "boolean" } },
};

export const cssVars: CssVar[] = [
	{
		defaultValue: "string",
		name: "string",
	},
];
export const cssParts: CssPart[] = [
	{
		name: "string",
		description: "string",
	},
];
export const htmlSlots: HtmlSlot[] = [
	{
		name: "string",
		description: "string",
	},
];
