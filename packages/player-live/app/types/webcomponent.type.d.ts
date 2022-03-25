export type Component = {
	mediauri: string;
	mediatype: string;
	id: string;
	forcecover: string;
	replacewithtext: {
		title: string;
		subtitle: string;
		text: string;
	};
};

export type Events = {
	liveStatus: { live: boolean };
};
