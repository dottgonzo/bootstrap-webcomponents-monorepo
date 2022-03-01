export interface ICard {
	videoSrc: string;
	title?: string;
	description?: string;
	time?: Date;
	pageUri?: string;
	_id: string;
	provider?: "youtube";
	dateformat?: string;
}

export type Component = {
	cards: string;
	size: number;
	page: number;
	pages: number;
	linkLabel: string;
	dateformat: string;
	primarycolor: string;
	filter: string;
	id: string;
	externalfilter: string;
	disabletextfilter: string;
	initialdate: Date;
	lastdate: Date;
};
