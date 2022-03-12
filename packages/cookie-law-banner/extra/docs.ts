import type { CssPart, CssVar, HtmlSlot } from "@htmlbricks/hb-jsutils/main";

export const storybookArgs = {
	allowdecline: { control: { type: "boolean" } },
	language: { control: { type: "text" } },
	cookielawuri4more: { control: { type: "text" } },
	capabilities: { control: { type: "object" } },
	acceptCookieLaw: { action: "acceptCookieLawEvent" },
};
