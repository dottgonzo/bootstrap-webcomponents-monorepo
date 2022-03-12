import type { CssPart, CssVar, HtmlSlot } from "../../jsutils/main";

export const storybookArgs = {
	products: { control: { type: "array" } },
	options: { control: { type: "object" } },
	headers: { control: { type: "array" } },
	purchaseClick: { action: "pagechangeEvent" },
};
