export type Component = {
	id?: string;
	style?: string;
	i18nlang?: string;

	config: { site: { name: string; url: string }; company: { name: string } };
};

export type Events = {
	event: { test: boolean };
};
