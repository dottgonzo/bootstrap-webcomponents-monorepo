export type Component = {
	id?: string;
	style?: string;
	pages: number;
	page: number;
};

export type Events = {
	pagechange: { page: number; pages: number };
};
