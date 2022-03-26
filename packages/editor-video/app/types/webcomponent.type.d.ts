export interface IDispatchValsEvent {
	minValue: number;
	maxValue: number;
	minPercent: number;
	maxPercent: number;
}

export interface ITrack {
	minValue: number;
	maxValue: number;
}

export type Component = {
	id?: string;
	style?: string;
	src: string;
	form?: string;
	track?: ITrack;
};

export type Events = {
	changeTrackValues: { minVaule: number; maxValue: number };
	dispatchTrack: { track: ITrack };
};
