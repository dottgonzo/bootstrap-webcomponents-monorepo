export type Component = {
	id?: string;
	style?: string;
	items: { type: "video" | "iframe" | "mediamtx-webrtc" | "mediamtx-webrtc-ptz"; id: string; uri: string }[];
};

export type Events = {
	itemClick: { itemId: string };
};
