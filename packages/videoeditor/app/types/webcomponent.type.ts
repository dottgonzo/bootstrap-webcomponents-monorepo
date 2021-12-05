export interface IDispatchValsEvent {
	minValue: number;
	maxValue: number;
	minPercent: number;
	maxPercent: number;
}

export interface ITrack extends IDispatchValsEvent {
	name: string;
}
