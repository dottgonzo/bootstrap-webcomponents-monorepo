export type Component = {
	id?: string;
	style?: string;
	addresses?: string[];
	phones?: string[];
	emails?: string[];
	websites?: string[];
};

export type Events = {
	event: { test: boolean };
};
