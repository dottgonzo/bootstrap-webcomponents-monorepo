export type Component = {
	data: { href: string; caption?: string; index?: number }[];
	index?: number;
};

export type Events = {
	changeSlide: { index: number };
};
