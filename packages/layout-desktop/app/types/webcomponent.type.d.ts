import type { IContacts, ISocials, ICompany, IColumn, IPolicies } from "../../../footer/app/types/webcomponent.type";
import type { IUserMenu } from "../../../navbar/app/types/webcomponent.type";
import type { INavLink } from "../../../sidenav-link/app/types/webcomponent.type";

export type Component = {
	id?: string;
	style?: string;
	socials?: ISocials;
	contacts?: IContacts;
	company?: ICompany;
	navlinks?: INavLink[];
	pagename?: string;
	page_title?: string;
	usermenu?: IUserMenu;
	cookielaw?: string;
	columns?: IColumn[];
	onescreen?: boolean;
	cookielawuri4more?: string;
	cookielawallowdecline?: boolean;
	cookielawlanguage?: string;
	sidebar?: { title?: string; logo?: string; type?: string };
	footer?: { type?: "auto" | "small" | "regular" | "large"; disable_expanding_small?: boolean };
	policies?: IPolicies[];
};

export type Events = {
	offcanvasswitch: { isOpen: boolean };
	pageChange: { page: string };
	navbarDropDownClick: { key: string };
	footerClick: { elClick: string };
	layoutStatus: { width: number; size: "large" | "small" };
	avbarSlotClick: { side: "left" | "right" | "center" };};
