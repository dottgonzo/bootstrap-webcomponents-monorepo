import type { CssPart, CssVar, HtmlSlot, i18nLang } from "@htmlbricks/hb-jsutils/main";

export const storybookArgs = {
	_testInnerHtml: { control: { disable: true } },
	pagetitle: { control: { type: "text" } },
	companybrandname: { control: { type: "text" } },
	companylogouri: { control: { type: "text" } },
	noburger: { control: { type: "boolean" } },
	navmenuswitch: { action: "navmenuswitchEvent" },
	userClick: { action: "userClickEvent" },
	usermenu: { control: { type: "object" } },
};
