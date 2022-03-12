export type Component = {
	pages: number;
	page: number;
};

export type Events = {
	pagechange: { page: number; pages: number };
};
