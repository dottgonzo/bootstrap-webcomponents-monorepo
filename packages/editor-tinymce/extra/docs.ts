import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup, ComponentSetup } from "@htmlbricks/hb-jsutils/main";
import type { Component } from "../app/types/webcomponent.type";

export const storybookArgs = {
	key: { control: { type: "text" } },
	plugins: { control: { type: "text" } },
	toolbar: { control: { type: "text" } },
	images_upload_url: { control: { type: "text" } },
};

const cssVars: CssVar[] = [];
export const cssParts: CssPart[] = [];
export const htmlSlots: HtmlSlot[] = [];
export const i18nLanguages: i18nLang[] = [];

export const styleSetup: StyleSetup = {
	vars: cssVars,
	parts: cssParts,
};

const examples: Component[] = [{}];
export const componentSetup: ComponentSetup & { examples: Component[] } = {
	definitions: null,
	storybookArgs,
	styleSetup,
	htmlSlots,
	i18n: i18nLanguages,
	examples,
	screenshots: [],
	license: "Apache-2.0",
	name: "hb-editor-tinymce",
	category: "editor",
	tags: ["editor"],
	size: {},
	iifePath: "release/release.js",
	repoName: "@htmlbricks/hb-editor-tinymce",
	version: null,
};
