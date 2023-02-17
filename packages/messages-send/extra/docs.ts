import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup, ComponentSetup } from "wc-js-utils/main";
import type { Component } from "../app/types/webcomponent.type";

export const storybookArgs = {
	text: { control: { type: "text" } },
	sendMessage: { action: "sendMessageEvent" },
};

const cssVars: CssVar[] = [];
export const cssParts: CssPart[] = [{ name: "testpart", description: "test css part on 2 div tag" }];
export const htmlSlots: HtmlSlot[] = [{ name: "skelcontent", description: "test slot" }];
export const i18nLanguages: i18nLang[] = [];

export const styleSetup: StyleSetup = {
	vars: cssVars,
	parts: cssParts,
};

const examples: { name: string; description?: string; data: Component }[] = [
	{
		name: "default",
		data: {},
	},
	{
		name: "withAMessage",
		data: {
			text: 'This is a message from the "message" property',
		},
	},
	{
		name: "withABigMessage",
		data: {
			text: "Lorem ipsum dolor sit amet. Et nisi sapiente est nesciunt consequatur 33 omnis laboriosam in ratione suscipit qui minima repellat aut rerum voluptatem ut mollitia laboriosam. Nam ipsam alias in tempore fugiat in sint minus a quisquam ratione ut recusandae quisquam sit aperiam dolorem 33 voluptate consequatur. Et mollitia velit sit voluptatibus voluptate non autem repellendus sed magnam recusandae et galisum repellat. Et dolores provident ut dolor fuga sed eligendi amet. Ex quia saepe et quidem accusamus qui minus voluptatem in aliquid facere sed blanditiis quibusdam et minus Quis! Qui accusamus perspiciatis aut error minima est dolorem molestiae ut iste debitis rem dolores magni cum doloribus facilis et provident architecto. Qui accusamus dignissimos qui repellendus consequatur ut galisum iusto aut modi numquam. Ex architecto iure non rerum eius sit eius quasi et tempore eveniet ut consequuntur quae. Eos Quis voluptates est corporis cumque aut maiores alias eum quos voluptas sit quis totam quo alias cumque!",
		},
	},
];
export const componentSetup: ComponentSetup & { examples: { name: string; description?: string; data: Component }[] } = {
	definitions: null as any,
	storybookArgs,
	styleSetup,
	author: null as any,
	contributors: [],
	owner: null as any,
	htmlSlots,
	i18n: i18nLanguages,
	examples,
	screenshots: [],
	licenses: [{ type: "Apache-2.0", path: "LICENSE.md", cost: 0, currency: "EUR" }],
	readmePath: "README.md",
	name: "hb-messages-send",
	category: "messages",
	tags: ["messages"],
	size: {},
	iifePath: "release/release.js",
	repoName: "@htmlbricks/hb-messages-send",
	version: null as any,
};
