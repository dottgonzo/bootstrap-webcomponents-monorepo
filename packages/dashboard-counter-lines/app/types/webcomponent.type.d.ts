export type Line = {
	text: string;
	value: string;
	link?: { type: "tab" | "page" | "event"; uri: string };
	index?: number;
	icon?: string;
};

export type Component = {
	id?: string;
	style?: string;
	lines?: Line[];
};

export type Events = {
	counterClick: { key: string };
};
