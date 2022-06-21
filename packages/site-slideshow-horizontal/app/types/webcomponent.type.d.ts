export type Data = {
	href: string;
	caption?: string;
	index?: number;
	externalLink?: string;
	link?: string;
	key?: string;
	duration?: string;
};

export type Component = {
	id?: string;
	style?: string;
	data: Data[];
	slide?: number;
	type?: "images" | "videos";
};

export type Events = {
	slideClick: { key: string };
};
