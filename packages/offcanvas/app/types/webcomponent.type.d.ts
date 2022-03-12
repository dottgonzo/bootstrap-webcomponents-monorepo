import type { INavLink } from "../../../sidenav-link/app/types/webcomponent.type";

export type Component = {
	opened?: boolean;
	navlinks?: INavLink[];
	navpage?: string;
	groups?: { key: string; label: string }[];
	companylogouri?: string;
	companytitle?: string;
	enablefooter?: boolean;
	type?: "open" | "autohide" | "small";
};

export type Events = {
	offcanvasswitch: { isOpen: boolean };
	pagechange: { page: string };
};
