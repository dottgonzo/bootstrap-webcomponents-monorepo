export interface INavLink {
	key: string;
	icon?: string;
	text: string;
	subtext?: string;
	badge?: {
		text: string;
		class?: string;
		classcolor?: string;
	};
	value?: string | number | boolean;
	selected?: boolean;
	type?: "switch" | "range" | "radio" | "checkbox" | "button";
}

export type Component = {
	id?: string;
	style?: string;
	navlink: INavLink;
};

export type Events = {
	pageChange: { page: string };
};
