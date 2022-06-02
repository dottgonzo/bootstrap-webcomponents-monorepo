export type Component = {
	id?: string;
	style?: string;
	header?: {
		icon?: string;
		label: string;
		badge?: string;
	};
	body?: {
		noborder?: boolean;
	};
	// placeholder?: { type: "text" | "img" | "loading" | "text_placeholder"; content?: string };
};

export type Events = {};
