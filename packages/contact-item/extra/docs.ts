import type { CssPart, CssVar, HtmlSlot } from "../../jsutils/main";

export const storybookArgs = {
	id: { control: { disable: true } },
	phone: { control: { type: "object" } },
	address: { control: { type: "object" } },
	email: { control: { type: "object" } },
	site: { control: { type: "object" } },
	config: { control: { type: "object" } },
	contactclick: { action: "contactClickEvent" },
};
