export type Paragraphs = {
	title?: string;
	text: string;
	icon?: string;
	link?: string;
	key?: string;
};

export type Component = {
	id?: string;
	style?: string;
	paragraphs: Paragraphs[];
	img: string;
};

export type Events = {
	paragraphPressed: { key: string };
};
