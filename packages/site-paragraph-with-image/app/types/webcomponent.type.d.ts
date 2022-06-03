export type Component = {
	id?: string;
	style?: string;
	img: { src: string; alt?: string };
	text_side?: "left" | "right";
	text: { title?: string; body?: string; link?: { label: string; src?: string; key?: string; bgColor?: string; textColor?: string } };
};

export type Events = {
	elClick: { key: string };
};
