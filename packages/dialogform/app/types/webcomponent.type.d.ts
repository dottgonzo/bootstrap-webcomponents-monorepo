import type { Component as FormComponent } from "../../node_modules/@htmlbricks/hb-form/release/webcomponent.type";

export type Component = {
	id?: string;
	style?: string;
	show?: "yes" | "no";
	dialogclasses?: string;
	title?: string;
	backdrop?: boolean;
	ignoreBackdrop?: boolean;
	keyboard?: boolean;
	describedby?: string;
	labelledby?: string;
	content?: string;
	closelabel?: string;
	confirmlabel?: string;
	schema: FormComponent["schema"];
};

export type Events = {
	modalFormConfirm: { [key: string]: any };
	modalShow: { id: string; show: true };
	modalFormCancel: { id: string; error?: string };
};
