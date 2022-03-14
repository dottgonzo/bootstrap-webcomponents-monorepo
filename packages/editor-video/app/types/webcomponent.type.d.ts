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
	src: string;
	form: string;
	track: ITrack;
};

export type Events = {};
