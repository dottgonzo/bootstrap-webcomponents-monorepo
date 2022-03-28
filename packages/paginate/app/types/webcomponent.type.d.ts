export type Component = {
	id?: string;
	style?: string;
	pages: number;
	page: number;
};

export type Events = {
	pageChange: { page: number; pages: number };
};
