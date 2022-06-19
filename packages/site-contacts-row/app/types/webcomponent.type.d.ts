export type Address = {
	address: string;
	latLng?: number[];
	link?: string;
	name?: string;
};
export type Phone = {
	name?: string;
	number: string;
};
export type Email = {
	label?: string;
	address: string;
	name?: string;
};
export type Website = {
	label?: string;
	url: string;
	name?: string;
};
export type Component = {
	id?: string;
	style?: string;
	availability?: { icon?: string; times: string[]; title?: string; appointment?: boolean };
	addresses?: { icon?: string; addresses: Address[]; title?: string };
	phones?: { icon?: string; phones: Phone[]; title?: string };
	emails?: { icon?: string; emails: Email[]; title?: string };
	websites?: { icon?: string; websites: Website[]; title?: string };
	model?: "big" | "small";
};

export type Events = {
	event: { test: boolean };
};
