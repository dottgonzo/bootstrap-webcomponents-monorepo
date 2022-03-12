import type { CssPart, CssVar, HtmlSlot } from "../../jsutils/main";

export const storybookArgs = {
	schema: { control: { type: "array" } },
	submit: { action: "submit" },
	submitted: { control: { type: "boolean" } },
	showvalidation: { control: { type: "boolean" } },
};
