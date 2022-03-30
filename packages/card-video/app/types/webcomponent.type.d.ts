export type Component = {
	id?: string;
	style?: string;
	title?: string;
	description?: string;
	videosrc: string;
	provider?: "youtube" | "";
	pageuri?: string;
	linklabel?: string;
	time?: Date;
	dateformat?: string;
};

export type Events = {};
