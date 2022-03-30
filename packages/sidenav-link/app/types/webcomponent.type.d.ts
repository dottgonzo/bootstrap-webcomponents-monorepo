export interface INavLink {
	key: string;
	icon?: string;
	group?: string;
	label: string;
	badge?: {
		text: string;
		class?: string;
		classcolor?: string;
	};
	subLinks?: INavLink[];
	active?: boolean;
	open?: boolean;
}

export type Component = {
	id?: string;
	style?: string;
	navlink: INavLink;
	navpage?: string;
};

export type Events = {
	pageChange: { page: string };
};
