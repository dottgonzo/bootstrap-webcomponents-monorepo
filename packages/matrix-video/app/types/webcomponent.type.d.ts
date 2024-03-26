export type Component = {
	id?: string;
	style?: string;
	items: { type: "video" | "iframe" | "mediamtx-webrtc" | "mediamtx-webrtc-ptz"; id: string; uri: string; title?: string }[];
};

export type Events = {
	selectItem: { id?: string; selected: boolean };
};
