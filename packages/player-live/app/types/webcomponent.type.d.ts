export type Component = {
	id?: string;
	style?: string;
	mediauri: string;
	forcecover?: string;
	media_type?: "hls" | "webrtc" | "auto" | "whep";
	replacewithtext?: {
		title: string;
		subtitle?: string;
		text?: string;
	};
	no_controls?: boolean;
};

export type Events = {
	liveStatus: { live: boolean; id: string };
	htmlVideoInit: { video: any; id: string };
};
