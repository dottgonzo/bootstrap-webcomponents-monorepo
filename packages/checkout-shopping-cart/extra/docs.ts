import type { CssPart, CssVar, HtmlSlot } from "@htmlbricks/hb-jsutils/main";

export const storybookArgs = {
	payment: { control: { type: "object" } },
	completed: { control: { type: "radio" }, options: ["yes", "no"] },
};
