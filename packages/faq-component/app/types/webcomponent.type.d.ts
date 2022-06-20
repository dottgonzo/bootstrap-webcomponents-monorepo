export type Component = {
	id?: string;
	style?: string;
	info: { topic?: string; title: string; text: string }[];
	topics?: { key: string; label: string; icon: string; catchAll?: boolean; index?: number }[];
	filter?: string;
};

export type Events = {};
