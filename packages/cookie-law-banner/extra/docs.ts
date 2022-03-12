import type { CssPart, CssVar, HtmlSlot } from "../../jsutils/main";

export const storybookArgs = {
	allowdecline: { control: { type: "boolean" } },
	language: { control: { type: "text" } },
	cookielawuri4more: { control: { type: "text" } },
	capabilities: { control: { type: "object" } },
	acceptCookieLaw: { action: "acceptCookieLawEvent" },
};
