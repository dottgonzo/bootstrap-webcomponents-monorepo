export interface IPhoneContact {
	label?: string;
	number: string;
	_id?: string;
}
export interface IAddressContact {
	googleMapUri?: string;
	address: string;
	shortAddress?: string;
	_id?: string;
}
export interface ISiteContact {
	label?: string;
	uri: string;
	open?: boolean;
	_id?: string;
}
export interface IEmailContact {
	label?: string;
	address: string;
	_id?: string;
}

export interface IColumn {
	_id?: string;
	cells: {
		label?: string;
		_id: string;
		phone?: IPhoneContact;
		address?: IAddressContact;
		email?: IEmailContact;
		site?: ISiteContact;
	}[];
	title?: string;
}
export interface IBrandAndContacts {
	companyName: string;
	companyLogoUri: string;
}

export interface IPolicies {
	label: string;
	key: string;
}

export interface ISocials {
	facebook?: string;
	gmail?: string;
	twitter?: string;
	github?: string;
	youtube?: string;
	twitch?: string;
	discord?: string;
}

export interface IContacts {
	phones?: IPhoneContact[];
	addresses?: IAddressContact[];
	emails?: IEmailContact[];
	sites?: ISiteContact[];
}

export interface ICompany {
	logoUri: string;
	siteName: string;
	companyName: string;
	registration?: { since?: number; text?: string };
	description: string;
	vatNumber?: string;
	fiscalCode?: string;
	since?: number;
}

export type Component = {
	id?: string;
	style?: string;
	company: ICompany;
	brandandcontacts: IBrandAndContacts;
	columns: IColumn[];
	socials: ISocials;
	contacts: IContacts;
	policies: IPolicies[];
	type?: "small" | "regular" | "large";
};

export type Events = {
	footerClick: { elClick: string };
};
