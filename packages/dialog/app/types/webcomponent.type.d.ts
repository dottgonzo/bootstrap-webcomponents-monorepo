export type Component = {
	id?: string;
	style?: string;
	show?: "yes" | "no";
	confirm_btn_class?: string;
	title?: string;
	backdrop?: boolean;
	ignoreBackdrop?: boolean;
	keyboard?: boolean;
	describedby?: string;
	labelledby?: string;
	content?: string;
	closelabel?: string;
	confirmlabel?: string;
	disable_confirm?: boolean;
	close_btn_class?: boolean;
};

export type Events = {
	modalConfirm: { id: string; confirm: boolean };
	modalShow: { id: string; show: true };
};
