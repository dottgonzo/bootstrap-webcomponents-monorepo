export type Component = {
	id?: string;
	style?: string;
	img: { src: string; alt?: string };
	text: { title?: string; body?: string; link?: { label: string; src?: string; key?: string } };
};

export type Events = {
	elClick: { key: string };
};
