import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup, ComponentSetup } from "@htmlbricks/hb-jsutils/main";
import { version } from "../package.json";
import type { Component } from "../app/types/webcomponent.type";
import dayjs from "dayjs";

export const storybookArgs = {
	events: { control: { type: "object" } },
	date: { control: { type: "text" } },
	selected: { control: { type: "text" } },
	calendarEventClick: { action: "calendarEventClickEvent" },
	changeCalendarDate: { action: "changeCalendarDateEvent" },
	changeSelectedDate: { action: "changeSelectedDateEvent" },
};

const cssVars: CssVar[] = [
	{ name: "--bs-primary", valueType: "color", theme: "bootstrap", defaultValue: "#07689f" },
	{ name: "--bs-secondary", valueType: "color", theme: "bootstrap", defaultValue: "#c9d6df" },
	{ name: "--bs-success", valueType: "color", theme: "bootstrap", defaultValue: "#11d3bc" },
];

const cssParts: CssPart[] = [
	{
		name: "calendar-header",
	},
	{ name: "calendar-current-time-header" },
	{ name: "cell" },
];
export const htmlSlots: HtmlSlot[] = [];
export const i18nLanguages: i18nLang[] = [];

export const styleSetup: StyleSetup = {
	vars: cssVars,
	parts: cssParts,
};
const events: Component["events"] = [
	{
		date: new Date(),
		id: "test",
		label: "thetest",
	},
	{
		date: dayjs().startOf("month").subtract(1, "day").toDate(),
		id: "test2",
		label: "thetest start",
	},
];
const examples: Component[] = [{ events }];
export const componentSetup: ComponentSetup & { examples: Component[] } = {
	definitions: null,
	storybookArgs,
	styleSetup,
	htmlSlots,
	i18n: i18nLanguages,
	examples,
	name: "hb-calendar-events",
	category: "components",
	tags: ["components"],
	size: {},
	iifePath: "release/release.js",
	repoName: "@htmlbricks/hb-calendar-events",
	version,
};
