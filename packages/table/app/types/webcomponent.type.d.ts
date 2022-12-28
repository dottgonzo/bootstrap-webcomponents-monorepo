import type { Component as FormComponent } from "../../node_modules/@htmlbricks/hb-form/release/webcomponent.type";

export interface IFilter {
	key: string;
	value?: string;
	type?: "datetime" | "string" | "enum" | "number";
	start?: Date;
	end?: Date;
}
export interface ITableHeader {
	label: string;
	key: string;
	type?: "datetime" | "string" | "enum" | "actions" | "number";
	format?: string;
	search?: boolean;
	click?: boolean;
	select?: string[];
	nosort?: boolean;
	sortBy?: "asc" | "desc" | "none";
	truncateAt?: number;
	copyTxt?: boolean;
}

export interface IRow {
	_id: string;
	_actions?: IActionButton[];
	[k: string]: string | IActionButton[] | any;
}

export interface IActionButton {
	name: string;
	type: "icon" | "text";
	iconOrText: string;
	btnClass?: string;
	disabled?: boolean;
	confirm?: {
		title: string;
		text?: string;
		confirmLabel: string;
		denyLabel?: string;
		content: string;
	};
	edit?: {
		title: string;
		text?: string;
		confirmLabel: string;
		denyLabel?: string;
		description?: string;
		schema: FormComponent["schema"];
	};
}

export type Component = {
	id?: string;
	style?: string;
	externalfilter?: boolean;
	rows: IRow[];
	size?: number;
	page?: number;
	pages?: number;
	headers: ITableHeader[];
	actions?: IActionButton[];
	selectactions?: any[];
	selectrow?: string;
	enableselect?: string;
	disablepagination?: string;
};

export type Events = {
	pageChange: { page: number; pages: number };
	removeFilter: { key: string };
	changeFilter: { filter: IFilter };
	tableCustomActionClick: { itemId: string; action: string };
	tableaction: { itemId: string; action: string };
	cellclick: { rowId: string; cellId: string };
	actiononselected: { key: string; selectedItems: string[] };
	clickonrow: { itemId: string };
	changeSort: {
		sortedBy: string;
		sortedDirection: string;
	};
	showConfirmModal: { action: string; detail: { id: string; show: boolean } };
	showConfirmModalForm: { action: string; detail: { id: string; show: boolean } };
	confirmActionModalForm: { action: string; id: string; confirm: boolean };
	confirmActionModal: { action: string; id: string; confirm: boolean };
};
