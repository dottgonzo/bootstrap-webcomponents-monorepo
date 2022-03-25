import type { IContacts, ISocials, ICompany, IColumn } from "../../../footer/app/types/webcomponent.type";
import type { IUserMenu } from "../../../navbar/app/types/webcomponent.type";
import type { INavLink } from "../../../sidenav-link/app/types/webcomponent.type";

export type Component = {
	socials?: ISocials;
	contacts?: IContacts;
	company?: ICompany;
	navlinks?: INavLink[];
	pagename?: string;
	usermenu?: IUserMenu;
	cookielaw?: string;
	columns?: IColumn[];
	onescreen?: "yes";
	cookielawuri4more?: string;
	cookielawallowdecline?: string;
	cookielawlanguage?: string;
	sidebar?: { title?: string; logo?: string; type?: string };
};

export type Events = {
	offcanvasswitch: { isOpen: boolean };
	pagechange: { page: string };
	userClick: { key: string };
	footerClick: { elClick: string };
};
