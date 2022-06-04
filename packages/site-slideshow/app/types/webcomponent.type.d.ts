export type Component = {
	data: { href: string; caption?: string; index?: number }[];
	index?: number;
	timer?: number;
};

export type Events = {
	changeSlide: { index: number };
	onHover: { index: number; hover: boolean };
};
