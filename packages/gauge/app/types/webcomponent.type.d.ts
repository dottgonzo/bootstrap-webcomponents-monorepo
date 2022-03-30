export type IGauge = {
	value: number;
	min: number;
	max: number;
};

export type Component = {
	id?: string;
	style?: string;
	options: IGauge;
};

export type Events = {};
