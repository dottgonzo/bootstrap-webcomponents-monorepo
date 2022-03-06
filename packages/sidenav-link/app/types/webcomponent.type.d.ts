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
	navlink: INavLink;
	navpage: string;
};
