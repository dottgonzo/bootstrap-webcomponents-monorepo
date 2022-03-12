import type { CssPart, CssVar, HtmlSlot } from "@htmlbricks/hb-jsutils/main";

export const storybookArgs = {
	opened: { control: { type: "boolean" } },
	companylogouri: { control: { type: "text" } },
	companytitle: { control: { type: "text" } },
	groups: { control: { type: "text" } },
	enablefooter: { control: { type: "boolean" } },
	pageclick: { action: "pageclickEvent" },
	offcanvasswitch: { action: "offcanvasswitchEvent" },
	pagechange: { action: "pagechangeEvent" },
	type: { control: { options: ["autohide", "small", "open"] } },
	navpage: { control: { type: "text" } },
	navlinks: { control: { type: "array" } },
};

export const cssVars: CssVar[] = [];
export const cssParts: CssPart[] = [
	{
		name: "header",
		description: "header",
	},
];
export const htmlSlots: HtmlSlot[] = [
	{
		name: "test",
		description: "test",
	},
	{
		name: "header",
		description: "header",
	},

	{
		name: "footer",
		description: "footer",
	},
];
