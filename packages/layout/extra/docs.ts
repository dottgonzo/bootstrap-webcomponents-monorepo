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
export const cssParts: CssPart[] = [];
export const htmlSlots: HtmlSlot[] = [];
