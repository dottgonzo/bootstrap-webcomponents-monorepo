interface IUserMenuListItem {
	key: string;
	label: string;
	badge?: number;
	group?: string;
}
export interface IUserMenu {
	imgUri: string;
	list?: IUserMenuListItem[];
}
export type Component = {
	id?: string;
	style?: string;
	companybrandname: string;
	companylogouri: string;
	pagetitle: string;
	switchopen: string;
	usermenu: IUserMenu;
	noburger: string;
};

export type Events = {
	userClick: { key: string };
	navmenuswitch: { isOpen: boolean };
};
