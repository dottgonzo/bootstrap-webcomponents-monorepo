export type Item = {
	title: string;
	subtitle?: string;
	text: string;
	link: { type: "tab" | "page" | "event"; uri: string };
	index?: number;
	image: string;
};

export type Component = {
	id?: string;
	style?: string;
	collection: Item[];
	size?: number;
};

export type Events = {
	collectionItemClick: { uri: string };
};
