export type Component = {
	id?: string;
	style?: string;

	time: string;
	title: string;
	text: string;
	img_uri: string;
	counter: number;
};

export type Events = {
	select: { id: string };
};
