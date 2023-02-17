import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup, ComponentSetup } from "wc-js-utils/main";
import type { Component } from "../app/types/webcomponent.type";

export const storybookArgs = {
	companylogouri: { control: { type: "text" } },
	companytitle: { control: { type: "text" } },
	groups: { control: { type: "text" } },
	enablefooter: { control: { type: "boolean" } },
	offcanvasswitch: { action: "offcanvasswitchEvent" },
	pageChange: { action: "pageChangeEvent" },
	navpage: { control: { type: "text" } },
	navlinks: { control: { type: "array" } },
};

const cssVars: CssVar[] = [{ name: "--bs-primary", defaultValue: "#07689f", valueType: "color", theme: "bootstrap" }];
export const cssParts: CssPart[] = [
	{
		name: "header",
		description: "header",
	},
];
export const htmlSlots: HtmlSlot[] = [
	{
		name: "test",
		description: "test",
	},
	{
		name: "header",
		description: "header",
	},

	{
		name: "footer",
		description: "footer",
	},
];
export const i18nLanguages: i18nLang[] = [];

export const styleSetup: StyleSetup = {
	vars: cssVars,
	parts: cssParts,
};

const navlinks1b: Component["navlinks"] = [
	{
		label: "Settings",
		key: "settings",
		icon: "gear",
		group: "admin",
	},
	{
		label: "Users",
		key: "users",
		icon: "people-fill",
		group: "admin",
	},
	{
		label: "Stats",
		key: "stats",
		icon: "graph-up",
		group: "stats",
	},
];
const navlinks1: Component["navlinks"] = [
	{
		label: "Home",
		key: "home",
		icon: "house-door",
	},
	{
		label: "Dashboard",
		key: "dashboard",
		icon: "speedometer",
	},
	{
		label: "Settings",
		key: "settings",
		icon: "gear",
		group: "admin",
	},
	{
		label: "Users",
		key: "users",
		icon: "people-fill",
		group: "admin",
	},
	{
		label: "Stats",
		key: "stats",
		icon: "graph-up",
		group: "stats",
	},
];
const navlinks3: Component["navlinks"] = [
	{
		label: "Home",
		key: "home",
		icon: "house-door",
		badge: {
			text: "bbb",
		},
	},
	{
		label: "Dashboard",
		key: "dashboard",
		icon: "speedometer",
		badge: {
			text: "bbb",
		},
	},
	{
		label: "Settings",
		key: "settings",
		icon: "gear",
		group: "admin",
		badge: {
			text: "bbb",
		},
	},
	{
		label: "Settingsss",
		key: "settingsss",
		icon: "gear",
		group: "admin",
		subLinks: [
			{
				label: "Home",
				key: "home",
				icon: "house-door",
				badge: {
					text: "bbb",
				},
			},
			{
				label: "Dashboard",
				key: "dashboard",
				icon: "speedometer",
				badge: {
					text: "bbb",
				},
			},
		],
	},
	{
		label: "Users",
		key: "users",
		icon: "people-fill",
		group: "admin",
		badge: {
			text: "uuuuu",
		},
	},
	{
		label: "Stats",
		key: "stats",
		icon: "graph-up",
		group: "stats",
		badge: {
			text: "bbb",
		},
	},
];
const navlinks2: Component["navlinks"] = [
	{
		label: "Home",
		key: "home",
		icon: "house-door",
		badge: {
			text: "bbb",
		},
	},
	{
		label: "Dashboard",
		key: "dashboard",
		icon: "speedometer",
		badge: {
			text: "bbb",
		},
	},
	{
		label: "Settings",
		key: "settings",
		icon: "gear",
		group: "admin",
		badge: {
			text: "bbb",
		},
	},
	{
		label: "Users",
		key: "users",
		icon: "people-fill",
		group: "admin",
		badge: {
			text: "uuuuu",
		},
	},
	{
		label: "Stats",
		key: "stats",
		icon: "graph-up",
		group: "stats",
		badge: {
			text: "bbb",
		},
	},
];
const navlinks0: Component["navlinks"] = [
	{
		label: "Home",
		key: "home",
		icon: "house-door",
	},
	{
		label: "Dashboard",
		key: "dashboard",
		icon: "speedometer",
	},
	{
		label: "Settings",
		key: "settings",
		icon: "gear",
	},
	{
		label: "Users",
		key: "users",
		icon: "people-fill",
	},
	{
		label: "Stats",
		key: "stats",
		icon: "graph-up",
	},
];

const groups1: Component["groups"] = [
	{
		key: "stats",
		label: "statistiche",
	},
	{
		key: "admin",
		label: "amministrazione",
	},
];

const examples: { name: string; description?: string; data: Component }[] = [
	{
		name: "default",
		data: {
			navlinks: navlinks0,
		},
	},
	{
		name: "sidebarOnSettings",
		data: {
			navlinks: navlinks0,
			navpage: "settings",
		},
	},
	{
		name: "sidebarWithGroups",
		data: {
			navlinks: navlinks1b,
			groups: groups1,
		},
	},
	{
		name: "sidebarWithGroupsOnSettings",
		data: {
			navlinks: navlinks1,
			groups: groups1,
			navpage: "settings",
		},
	},
	{
		name: "sidebarWithAutoGroupsOnSettings",
		data: {
			navlinks: navlinks1,
			navpage: "settings",
		},
	},
	{
		name: "sidebarWithAutoGroupsOnSettingsAndBadge",
		data: {
			navlinks: navlinks2,
			navpage: "settings",
		},
	},

	{
		name: "sidebarWithFooter",
		data: {
			navlinks: navlinks2,
			navpage: "settings",
			enablefooter: true,
		},
	},

	{
		name: "sidebarMultilevel",
		data: {
			navlinks: navlinks3,
			navpage: "settings",
			enablefooter: true,
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
	name: "hb-sidebar-desktop",
	category: "layout",
	tags: ["layout"],
	size: {},
	iifePath: "release/release.js",
	repoName: "@htmlbricks/hb-sidebar-desktop",
	version: null as any,
};
