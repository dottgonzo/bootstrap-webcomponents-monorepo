export type Component = {
	id?: string;
	style?: string;
	data: any;
};

export type Events = {
	chartClick: { label?: string; value?: any };
};
