export type Component = {
	id?: string;
	style?: string;
	min?: number;
	max?: number;
	minval?: number;
	maxval?: number;
	position_value?: number;
	withbubbles?: boolean;
};

export type Events = {
	changeRangeValues: { status: { minValue: number; maxValue: number; minPercent: number; maxPercent: number; positionPercent: number } };
};
