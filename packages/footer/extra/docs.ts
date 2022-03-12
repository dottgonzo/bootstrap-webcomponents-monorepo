import type { CssPart, CssVar, HtmlSlot } from "@htmlbricks/hb-jsutils/main";

export const storybookArgs = {
	smallrow: { control: { type: "object" } },
	columns: { control: { type: "array" } },
	policies: { control: { type: "array" } },
	companyname: { control: { type: "text" } },
	companylogouri: { control: { type: "text" } },
	brandandcontacts: { control: { type: "object" } },
	footerbottom: { control: { type: "object" } },
	copyrighttext: { control: { type: "object" } },
	socials: { control: { type: "object" } },
	contacts: { control: { type: "object" } },
	company: { control: { type: "object" } },
	footerclick: { action: "footerClickEvent" },
};

export const cssVars: CssVar[] = [];
export const cssParts: CssPart[] = [];
export const htmlSlots: HtmlSlot[] = [];
