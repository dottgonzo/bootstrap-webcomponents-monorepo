export interface IPhone {
	number: string;
	callOnClick?: boolean;
}
export interface IAddress {
	mapUri?: string;
	latLang?: number[];
	address: string;
	shortAddress?: string;
}
export interface IEmail {
	mailLink?: boolean;
	address: string;
}

export interface IConfig {
	icon?: { fill?: boolean };
	text?: boolean;
	dispatcher?: boolean;
}

export interface ISite {
	label?: string;
	uri?: string;
	open?: boolean;
}

export interface ISocial {
	label?: string;
	pageUri?: string;
	name: string;
}

export type Component = {
	phone: IPhone;
	address: IAddress;
	email: IEmail;
	site: ISite;
	social: ISocial;
	config: IConfig;
};
