export interface ICard {
	videoSrc: string;
	title?: string;
	description?: string;
	time?: Date;
	pageUri?: string;
	_id?: string;
	provider?: "youtube";
	dateformat?: string;
}

export type Component = {
	id?: string;
	style?: string;
	cards: ICard[];
	size?: number;
	page?: number;
	pages?: number;
	linkLabel?: string;
	dateformat?: string;
	primarycolor?: string;
	filter?: string;
	externalfilter?: string;
	disabletextfilter?: string;
	initialdate?: Date;
	lastdate?: Date;
};

export type Events = {};
