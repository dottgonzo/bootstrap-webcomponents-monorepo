export type Component = {
	id?: string;
	style?: string;
	mediauri: string;
	forcecover?: string;
	replacewithtext?: {
		title: string;
		subtitle: string;
		text: string;
	};
};

export type Events = {
	liveStatus: { live: boolean };
};
