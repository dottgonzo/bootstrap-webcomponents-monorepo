export type Component = {
	id?: string;
	style?: string;
	info: { topic?: string; title: string; text: string }[];
	topics?: { key: string; label: string; icon: string; catchAll?: boolean }[];
	filter?: string;
};

export type Events = {
	event: { test: boolean };
};
