import type { CssPart, CssVar, HtmlSlot } from "../../jsutils/main";

export const storybookArgs = {
	submitstep: {
		options: ["no", "yes"],
		control: { type: "select" },
	},
	update: { action: "updateEvent" },
	submit: { action: "submitEvent" },

	schemes: { control: { type: "array" } },
};
