import type { CssPart, CssVar, HtmlSlot, i18nLang } from "@htmlbricks/hb-jsutils/main";

export const storybookArgs = {
	// payByCard: { action: "payByCard" },
	paymentCompleted: { action: "paymentCompleted" },
	paypalid: { control: { type: "string" } },
	currency: { control: { type: "string" } },
};

export const cssVars: CssVar[] = [
	{
		name: "--hb-checkout-border",
		defaultValue: "0.5px solid rgba(197, 197, 197, 0.808)",
		description: "",
		valueType: "string",
	},
];
export const cssParts: CssPart[] = [{ name: "btn", description: "paypal button css" }];
export const htmlSlots: HtmlSlot[] = [];
export const i18nLanguages: i18nLang[] = [];
