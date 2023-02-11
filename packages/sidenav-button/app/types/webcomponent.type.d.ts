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
}

export type Component = {
	id?: string;
	style?: string;
	navlink: INavLink;
	selected?: boolean;
	nav_type?: "switch" | "range" | "radio" | "checkbox" | "button";
};

export type Events = {
	pageChange: { page: string };
};
