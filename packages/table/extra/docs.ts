import type { CssPart, CssVar, HtmlSlot, i18nLang, StyleSetup, ComponentSetup } from "@htmlbricks/hb-jsutils/main";
import type { Component } from "../app/types/webcomponent.type";

export const storybookArgs = {
	size: { control: { type: "range", min: 1, max: 100 } },
	page: { control: { type: "number" } },

	enableselect: { control: { type: "boolean" } },
	selectrow: { control: { type: "boolean" } },
	disablepagination: { control: { type: "boolean" } },
	rows: { control: { type: "array" } },
	headers: { control: { type: "array" } },
	actions: { control: { type: "array" } },
	selectactions: { control: { type: "array" } },
	pageChange: { action: "pagechangeEvent" },
	tableaction: { action: "tableactionEvent" },
	tableCustomActionClick: { action: "tableCustomActionClickEvent" },
	cellclick: { action: "cellclickEvent" },
	actiononselected: { action: "actiononselectedEvent" },
	clickonrow: { action: "clickonrowEvent" },
	confirmActionModal: { action: "confirmActionModalEvent" },
	showConfirmModal: { action: "showConfirmModal" },
	externalfilter: { control: { type: "boolean" } },
	pages: { control: { type: "number" } },
};

const cssVars: CssVar[] = [
	{ name: "--bs-primary", valueType: "color", theme: "bootstrap", defaultValue: "#07689f" },
	{ name: "--bs-secondary", valueType: "color", theme: "bootstrap", defaultValue: "#c9d6df" },
	{ name: "--bs-success", valueType: "color", theme: "bootstrap", defaultValue: "#11d3bc" },
	{ name: "--bs-info", valueType: "color", theme: "bootstrap", defaultValue: "#a2d5f2" },
	{ name: "--bs-warning", valueType: "color", theme: "bootstrap", defaultValue: "#ffc107" },
	{ name: "--bs-danger", valueType: "color", theme: "bootstrap", defaultValue: "#f67280" },
];
export const cssParts: CssPart[] = [];
export const htmlSlots: HtmlSlot[] = [];
export const i18nLanguages: i18nLang[] = [];

export const styleSetup: StyleSetup = {
	vars: cssVars,
	parts: cssParts,
};
const rows: Component["rows"] = [
	{
		title: "bau",
		videoSrc: "https://comapi.be-on.tv/v1/public/records/61043eedb50af916a6429fdc/video",
		time: "2021-08-06T22:46:30.565Z",
		_id: "bau",
		status: "closed",
	},
	{
		title: "bb1",
		videoSrc: "https://comapi.be-on.tv/v1/public/records/61043eedb50af916a6429fdc/video",
		time: "2021-08-06T22:46:31.565Z",
		description: "ffff2",
		_id: "bb1",
		status: "closed",
	},
	{
		title: "bb2",
		time: "2021-08-02T22:46:32.565Z",
		_id: "bb2",
		status: "active",
	},
	{
		title: "ss",
		time: "2021-08-06T22:46:34.565Z",
		description: "fffffff",
		testnested: { nested: "dddd" },
		_id: "ss",
		status: "active",
	},
	{
		title: "bb4",
		time: "2021-08-06T22:46:34.565Z",
		_id: "bb4",
		status: "active",
	},
	{
		title: "aa5",
		time: "2021-08-06T22:46:34.565Z",
		_id: "aa5",
		status: "active",
	},
	{
		title: "bb6",
		time: "2021-08-06T22:46:34.565Z",
		_id: "bb6",
		status: "active",
	},
	{
		title: "bb7",
		time: "2021-08-06T22:46:34.565Z",
		_id: "bb7",
		status: "active",
	},
	{
		title: "bb8",
		time: "2021-08-06T22:46:34.565Z",
		_id: "bb8",
		status: "active",
	},
	{
		title: "bb9",
		time: "2021-08-06T22:46:33.565Z",
		_id: "bb9",
		status: "active",
	},

	{
		title: "bb10",
		time: "2021-08-06T22:46:34.565Z",
		_id: "bb10",
		status: "active",
	},
	{
		title: "bb11",
		time: "2021-08-06T22:46:34.565Z",
		_id: "bb11",
		status: "active",
	},
	{
		title: "bb12",
		time: "2021-08-06T22:46:34.565Z",
		videoSrc: "https://comapi.be-on.tv/v1/public/records/61043eedb50af916a6429fdc/video",
		_id: "bb12",
		status: "active",
	},
	{
		title: "bb13",
		time: "2021-08-07T22:46:39.565Z",
		_id: "bb13",
		status: "active",
	},
];

const rowsWithActions: Component["rows"] = [
	{
		title: "bau",
		_actions: [
			{
				name: "activate",
				type: "icon",
				iconOrText: "ticket-fill",
				confirm: {
					confirmLabel: "conferma",
					title: "confermi?",
					content: "contenuto dialog1",
				},
			},
			{
				name: "activate2",
				type: "icon",
				iconOrText: "ticket-fill",
				confirm: {
					confirmLabel: "conferma",
					title: "confermi?",
					content: "contenuto dialog2",
				},
			},
		],
		videoSrc: "https://comapi.be-on.tv/v1/public/records/61043eedb50af916a6429fdc/video",
		time: "2021-08-06T22:46:30.565Z",
		_id: "bau",
		status: "closed",
	},
	{
		title: "bb1",
		videoSrc: "https://comapi.be-on.tv/v1/public/records/61043eedb50af916a6429fdc/video",
		time: "2021-08-06T22:46:31.565Z",
		description: "ffff2",
		_id: "bb1",
		status: "closed",
		_actions: [
			{
				name: "activate",
				type: "icon",
				iconOrText: "ticket-fill",
				confirm: {
					confirmLabel: "conferma",
					title: "confermi?",
					content: "content3",
				},
			},
			{
				name: "activate2",
				type: "icon",
				iconOrText: "ticket-fill",
				confirm: {
					confirmLabel: "conferma",
					title: "confermi?",
					content: "content4",
				},
			},
		],
	},
	{
		title: "bb2",
		time: "2021-08-02T22:46:32.565Z",
		_id: "bb2",
		status: "active",
		_actions: [
			{
				name: "activate",
				type: "icon",
				iconOrText: "ticket-fill",
				confirm: {
					confirmLabel: "conferma",
					title: "confermi?",
					content: "",
				},
			},
			{
				name: "activate2",
				type: "icon",
				iconOrText: "ticket-fill",
				confirm: {
					confirmLabel: "conferma",
					title: "confermi?",
					content: "",
				},
			},
		],
	},
];

const basicHeaders: Component["headers"] = [
	{
		label: "title",
		key: "title",
		search: true,
	},
	{
		label: "description",
		key: "description",
	},
	{
		label: "nested",
		key: "testnested.nested",
	},
	{
		label: "data",
		key: "time",
		type: "datetime",
		format: "DD MMMM YYYY",
	},
];

const basicHeadersWithActions: Component["headers"] = [
	{
		label: "title",
		key: "title",
		search: true,
	},
	{
		label: "description",
		key: "description",
	},
	{
		label: "nested",
		key: "testnested.nested",
	},
	{
		label: "data",
		key: "time",
		type: "datetime",
		format: "DD MMMM YYYY",
	},

	{
		label: "modifiche",
		key: "mod",
		type: "actions",
		nosort: true,
	},
];
const headersWithMoreSearch: Component["headers"] = [
	{
		label: "title",
		key: "title",
		search: true,
	},

	{
		label: "clickable",
		key: "description",
		search: true,
		click: true,
	},
	{
		label: "nested",
		key: "testnested.nested",
	},
	{
		label: "data",
		key: "time",
		type: "datetime",
		format: "DD MMMM YYYY",
	},
	{
		label: "stato",
		key: "status",
		type: "enum",
		select: ["active", "closed"],
		search: true,
	},
];
const headersWithNestedLabel: Component["headers"] = [
	{
		label: "title",
		key: "title",
		search: true,
	},
	{
		label: "description",
		key: "description",
		search: true,
	},
	{
		label: "nested",
		key: "testnested.nested",
		search: true,
	},
	{
		label: "data",
		key: "time",
		type: "datetime",
		format: "DD MMMM YYYY",
	},
];
const headersWithAllSearches: Component["headers"] = [
	{
		label: "title",
		key: "title",
		search: true,
	},
	{
		label: "description",
		key: "description",
		search: true,
	},
	{
		label: "nested",
		key: "testnested.nested",
		search: true,
	},
	{
		label: "data",
		key: "time",
		type: "datetime",
		format: "DD MMMM YYYY",
		search: true,
	},
];
const headersWithDateOnly: Component["headers"] = [
	{
		label: "title",
		key: "title",
	},
	{
		label: "description",
		key: "description",
		click: true,
	},
	{
		label: "nested",
		key: "testnested.nested",
	},
	{
		label: "data",
		key: "time",
		type: "datetime",
		format: "DD MMMM YYYY",
		search: true,
	},
];

const actions: Component["actions"] = [
	{
		name: "testaction",
		type: "text",
		iconOrText: "string",
	},
	{
		name: "testaction2",
		type: "icon",
		iconOrText: "github",
	},
];

const selections = [
	{
		name: "testaction",
		type: "text",
		iconOrText: "string",
	},
	{
		name: "testaction2",
		type: "icon",
		iconOrText: "github",
	},
];
const examples: { name: string; description?: string; data: Component }[] = [
	{
		name: "BasicTableWithClick",
		data: {
			headers: basicHeaders,
			rows,
			selectrow: "yes",
		},
	},
	{
		name: "BasicTableWithMoreSearchAndSelect",
		data: {
			headers: headersWithMoreSearch,
			selectactions: selections,
			rows,
			enableselect: "yes",
		},
	},
	{
		name: "BasicTableWithSearchOnNestedField",
		data: {
			headers: headersWithNestedLabel,
			rows,
		},
	},
	{
		name: "BasicTableWithSearchOnAllFields",
		data: {
			headers: headersWithAllSearches,
			rows,
			selectrow: "yes",
		},
	},
	{
		name: "BasicTableWithDate",
		data: {
			headers: headersWithDateOnly,
			rows,
		},
	},
	{
		name: "BasicTableWithActions",
		data: {
			headers: headersWithAllSearches,
			rows,
			actions,
		},
	},
	{
		name: "BasicTableWithActionsAndSelect",
		data: {
			headers: headersWithAllSearches,
			rows,
			actions,
			selectactions: selections,
		},
	},

	{
		name: "BasicTableWithActionsConfirmAndForm",
		data: {
			headers: basicHeadersWithActions,
			rows: rowsWithActions,
			actions,
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
	name: "hb-table",
	category: "table",
	tags: ["table"],
	size: {},
	iifePath: "release/release.js",
	repoName: "@htmlbricks/hb-table",
	version: null as any,
};
