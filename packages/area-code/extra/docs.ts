import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup } from "@htmlbricks/hb-jsutils/main";

export const storybookArgs = {
	content: { control: { type: "text" } },
	clipboardCopyText: { action: "clipboardCopyTextEvent" },
};

const cssVars: CssVar[] = [
	{
		name: "--hb--area-code-background",
		defaultValue: "rgb(232 232 232 / 57%)",
		valueType: "color",
	},
];
export const cssParts: CssPart[] = [{ name: "content", description: "the code html tag" }];
export const htmlSlots: HtmlSlot[] = [];
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
};
