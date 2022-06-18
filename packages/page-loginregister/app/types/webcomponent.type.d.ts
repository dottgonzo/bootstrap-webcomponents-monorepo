import type { IContacts, ISocials, ICompany, IColumn, IPolicies } from "../../../footer/app/types/webcomponent.type";
import type { IUserMenu } from "../../../navbar/app/types/webcomponent.type";
import type { INavLink } from "../../../sidenav-link/app/types/webcomponent.type";

export interface IPage {
	href: string;
	pageName: string;
}
export type Component = {
	id?: string;
	style?: string;
	socials?: ISocials;
	contacts?: IContacts;
	footer?: { type?: "auto" | "small" | "regular" | "large"; disable_expanding_small?: boolean };
	page_title?: string;

	company: ICompany;
	page?: IPage;
	usermenu?: IUserMenu;
	cookielaw?: string;
	type?: "login" | "register";
	columns?: IColumn[];

	language?: string;

	sessionkey?: string;

	redirectonlogin?: string;
	redirectoncreate?: string;
	loginuri?: string;
	registeruri?: string;
	requestmethod?: string;
	appendqueryparams?: string;
	appendbodyparams?: string;
	logouri?: string;
	oauth2providers?: string;

	passwordpattern?: string;
	userpattern?: string;
	usertype?: "email" | "username";
	disableregister?: boolean;
	policies?: IPolicies[];
};

export type Events = {
	navbarSlotClick: { side: "left" | "right" | "center" };

	navbarDropDownClick: { key: string };
	login: { token?: string; email?: string; password?: string; rememberMe?: boolean };
	register: any & { requestSent: { email: string; password: string }; email: string; password: string };
	recoverOrActivate: { password: string; recoverycode: string; email: string }; // only one good..
};
