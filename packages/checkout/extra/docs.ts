import type { CssPart, CssVar, HtmlSlot } from "@htmlbricks/hb-jsutils/main";

export const storybookArgs = {
	shipments: { control: { type: "array" } },
	user: { control: { type: "object" } },
	payment: { control: { type: "object" } },
	paymentCompleted: { action: "paymentCompleted" },
	saveUser: { action: "saveUser" },
	saveShipment: { action: "saveShipment" },
	gateways: { control: { type: "array" } },
	setGateway: { action: "setGateway" },
	completed: { control: { type: "radio" }, options: ["yes", "no"] },
};
