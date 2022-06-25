import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup, ComponentSetup } from "@htmlbricks/hb-jsutils/main";
import type { Component } from "../app/types/webcomponent.type";

export const storybookArgs = {
	disable_header: { control: { type: "boolean" } },
	events: { control: { type: "object" } },
	date: { control: { type: "text" } },
	selected: { control: { type: "text" } },
	calendarEventClick: { action: "calendarEventClickEvent" },
	changeCalendarDate: { action: "changeCalendarDateEvent" },
	changeSelectedDate: { action: "changeSelectedDateEvent" },
};

const cssVars: CssVar[] = [
	{ name: "--hb-calendar-selected", valueType: "color", theme: "bootstrap", defaultValue: "#07689f" },
	{ name: "--hb-calendar-hover", valueType: "color", theme: "bootstrap", defaultValue: "#c9d6df" },
	{ name: "--hb-calendar-today", valueType: "color", theme: "bootstrap", defaultValue: "#11d3bc" },
];

const cssParts: CssPart[] = [
	{
		name: "calendar-header",
	},
	{ name: "calendar-current-time-header" },
	{ name: "cell" },
];
export const htmlSlots: HtmlSlot[] = [
	{
		name: "header_month_icon_prev",
	},
	{
		name: "header_month_icon_next",
	},
	{ name: "header" },
	{ name: "calendar_month" },
];
export const i18nLanguages: i18nLang[] = [];

export const styleSetup: StyleSetup = {
	vars: cssVars,
	parts: cssParts,
};
const now = new Date();
const oneMonthMinusOneDaty = new Date(new Date().setDate(new Date(now.getFullYear(), now.getMonth(), 1).getDate() - 1));

const events: Component["events"] = [
	{
		date: now,
		id: "test",
		label: "thetest",
	},
	{
		date: oneMonthMinusOneDaty,
		id: "test2",
		label: "thetest start",
		color: "red",
	},
];
const examples: { name: string; description?: string; data: Component }[] = [
	{ name: "CalendarWithEvents", data: { events } },
	{ name: "TotallyEmpty", data: { events: [] } },
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
	name: "hb-calendar-appointments",
	category: "components",
	tags: ["components"],
	size: {},
	iifePath: "release/release.js",
	repoName: "@htmlbricks/hb-calendar-appointments",
	version: null as any,
};
