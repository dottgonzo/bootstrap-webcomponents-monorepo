import type { INavLink } from "../../../sidenav-link/app/types/webcomponent.type";

export type Component = {
	id?: string;
	style?: string;
	navlinks?: INavLink[];
	navpage?: string;
	groups?: { key: string; label: string }[];
	companylogouri?: string;
	companytitle?: string;
	enablefooter?: boolean;
	cookielawallowdecline?: "yes" | "no" | null | "" | undefined;
	cookielawlanguage?: string;
	cookielawuri4more?: string;
	onescreen?: "yes" | "no" | null | "" | undefined;
};

export type Events = {
	pageChange: { page: string };
};
