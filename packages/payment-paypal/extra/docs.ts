import type { CssPart, CssVar, HtmlSlot } from "@htmlbricks/hb-jsutils/main";

export const storybookArgs = {
	payByCard: { action: "payByCard" },
	paymentCompleted: { action: "paymentCompleted" },
	paypalid: { control: { type: "string" } },
	currency: { control: { type: "string" } },
};
