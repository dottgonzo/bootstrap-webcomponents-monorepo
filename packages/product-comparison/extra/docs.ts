import type { CssPart, CssVar, HtmlSlot } from "@htmlbricks/hb-jsutils/main";

export const storybookArgs = {
	products: { control: { type: "array" } },
	options: { control: { type: "object" } },
	headers: { control: { type: "array" } },
	purchaseClick: { action: "pagechangeEvent" },
};
