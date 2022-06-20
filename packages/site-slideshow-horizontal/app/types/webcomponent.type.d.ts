export type Data = {
	href: string;
	caption?: string;
	index?: number;
};

export type Component = {
	id?: string;
	style?: string;
	data: Data[];
};

export type Events = {
	// event: { test: boolean };
};
