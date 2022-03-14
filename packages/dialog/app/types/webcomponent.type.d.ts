export type Component = {
	show?: "yes" | "no";
	dialogclasses?: string;
	title: string;
	backdrop?: boolean;
	ignoreBackdrop?: boolean;
	keyboard?: boolean;
	describedby?: string;
	labelledby?: string;
	content: string;
	closelabel?: string;
	confirmlabel?: string;
};

export type Events = {};
