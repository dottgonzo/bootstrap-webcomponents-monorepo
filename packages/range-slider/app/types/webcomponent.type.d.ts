export type dispatchValsEvent = {
	minValue: number;
	maxValue: number;
	minPercent: number;
	maxPercent: number;
};

export type Component = {
	min: number;
	max: number;
	minval: number;
	maxval: number;
	withbubbles: boolean;
};

export type Events = {
	changeRangeValues: { status: { minValue: number; maxValue: number; minPercent: number } };
};
