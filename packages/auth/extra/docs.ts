import type { CssPart, CssVar, HtmlSlot } from "@htmlbricks/hb-jsutils/main";

export const storybookArgs = {
	type: {
		options: ["login", "register", "activate", "recover"],
		control: { type: "select" }, // Automatically inferred when 'options' is defined
	},
	language: { control: { type: "string" } },
	disableregister: { control: { type: "boolean" } },
	logouri: { control: { type: "string" } },
	loginuri: { control: { type: "string" } },
	registeruri: { control: { type: "string" } },
	login: { action: "loginEvent" },
	register: { action: "registerEvent" },
	recoverOrActivate: { action: "recoverOrActivateEvent" },
	oauth2providers: { control: { type: "array" } },
	sessionkey: { control: { type: "string" } },
	redirectonlogin: { control: { type: "string" } },
	redirectoncreate: { control: { type: "string" } },
	activateuri: { control: { type: "string" } },
	recoveruri: { control: { type: "string" } },
	requestmethod: { control: { type: "string" } },
	appendqueryparams: { control: { type: "string" } },
	appendbodyparams: { control: { type: "string" } },
	passwordpattern: { control: { type: "string" } },
	recoverycode: { control: { type: "string" } },
};

export const cssVars: CssVar[] = [];
export const cssParts: CssPart[] = [];
export const htmlSlots: HtmlSlot[] = [];
