export type Component = {
	id?: string;
	style?: string;
	text?: string;
};

export type Events = {
	sendMessage: { text?: string; id: string; file?: File };
};
