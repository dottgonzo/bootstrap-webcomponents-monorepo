export type Component = {
	id?: string;
	style?: string;
	title?: string;
	percentage: number;
};

export type Events = {

	modalShow: { id: string; show: true };
};
