export type INavLink = {
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
};
