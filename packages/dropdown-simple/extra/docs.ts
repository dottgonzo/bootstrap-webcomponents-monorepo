import type { CssPart, CssVar, HtmlSlot } from "@htmlbricks/hb-jsutils/main";

export const storybookArgs = {
	open: { control: { type: "boolean" } },
	list: { control: { type: "array" } },
	dropdownSwitch: { action: "dropdownSwitchEvent" },
	dropDownClick: { action: "dropDownClickEvent" },
};
