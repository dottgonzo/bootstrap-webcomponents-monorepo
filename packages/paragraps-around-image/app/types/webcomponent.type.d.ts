export type Paragraphs = {
	index: number;
	title?: string;
	text: string;
	icon?: string;
	link?: string;
};

export type Component = {
	id?: string;
	style?: string;
	paragraphs: Paragraphs[];
	img: string;
};

export type Events = {
	event: { test: boolean };
};
