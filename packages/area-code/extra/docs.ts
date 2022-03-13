import type { CssPart, CssVar, HtmlSlot } from "@htmlbricks/hb-jsutils/main";

export const storybookArgs = {
	content: { control: { type: "text" } },
	clipboardCopyText: { action: "clipboardCopyTextEvent" },
};

export const cssVars: CssVar[] = [];
export const cssParts: CssPart[] = [{ name: "content", description: "the code html tag" }];
export const htmlSlots: HtmlSlot[] = [];
