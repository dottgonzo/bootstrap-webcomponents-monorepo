export type Data = {
	href: string;
	caption?: string;
	index?: number;
	externalLink?: string;
	link?: string;
	key?: string;
	isVideo?: boolean;
};

export type Component = {
	id?: string;
	style?: string;
	data: Data[];
};

export type Events = {
	slideClick: { key: string };
};
