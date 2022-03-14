import type { IContacts, ISocials, ICompany, IColumn } from "../../../footer/app/types/webcomponent.type";
import type { IUserMenu } from "../../../navbar/app/types/webcomponent.type";
import type { INavLink } from "../../../sidenav-link/app/types/webcomponent.type";

export interface IPage {
	href: string;
	pageName: string;
}
export type Component = {
	socials: ISocials;
	contacts: IContacts;

	company: ICompany;
	navlinks: INavLink[];
	page: IPage;
	usermenu: IUserMenu;
	cookielaw: string;
	type: "login" | "register";
	columns: IColumn[];

	language: string;

	sessionkey: string;

	redirectonlogin: string;
	redirectoncreate: string;
	loginuri: string;
	registeruri: string;
	requestmethod: string;
	appendqueryparams: string;
	appendbodyparams: string;
	logouri: string;
	oauth2providers: string;

	passwordpattern: string;
	userpattern: string;
	usertype: "email" | "username";
	disableregister: boolean;
};

export type Events = {};
