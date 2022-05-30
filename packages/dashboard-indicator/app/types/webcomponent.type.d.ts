export type Component = {
	id?: string;
	style?: string;
	number: number;
	label?: string;
	icon: string;
	link_label?: string;
};

export type Events = {
	dashboardIndicatorClick: { id: string };
};
