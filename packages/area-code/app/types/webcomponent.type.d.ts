export type Component = {
	id?: string;
	style?: string;
	content: string;
};

export type Events = {
	clipboardCopyText: { text: string };
};
