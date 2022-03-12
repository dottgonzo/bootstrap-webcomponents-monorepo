import type { CssPart, CssVar, HtmlSlot } from "@htmlbricks/hb-jsutils/main";

export const storybookArgs = {
	pagechange: { action: "pagechange" },
	offcanvasswitch: { action: "offcanvasswitchEvent" },
	contacts: { control: { type: "object" } },
	sidebar: { control: { type: "object" } },
	socials: { control: { type: "object" } },
	usermenu: { control: { type: "object" } },
	company: { control: { type: "object" } },
	navlinks: { control: { type: "array" } },
	pagename: { control: { type: "string" } },
	cookielaw: { control: { type: "boolean" } },
};

export const cssVars: CssVar[] = [];
export const cssParts: CssPart[] = [
	{ name: "footer", description: "" },
	{ name: "container", description: "" },
	{ name: "navbar", description: "" },
	{ name: "page", description: "" },
];
export const htmlSlots: HtmlSlot[] = [
	{ name: "nav-left-slot", description: "" },
	{ name: "nav-center-slot", description: "" },
	{ name: "nav-right-slot", description: "" },
	{ name: "page", description: "" },
	{ name: "nav-header-slot", description: "" },
];
