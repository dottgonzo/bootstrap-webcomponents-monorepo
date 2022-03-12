import type { CssPart, CssVar, HtmlSlot } from "../../jsutils/main";

export const storybookArgs = {
	show: { control: { type: "boolean" } },
	small: { control: { type: "text" } },
	title: { control: { type: "text" } },
	img: { control: { type: "text" } },
	content: { control: { type: "text" } },
	toastShow: { action: "toastShow" },
	toastConfirm: { action: "toastConfirm" },
};
