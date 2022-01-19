export interface IShipment {
	price: number;
	selected?: boolean;
	standard?: boolean;
	durationInSeconds: number;
	available: boolean;
	id: string;
	label: string;
}

export interface IUser {
	fullName: string;
	fullAddress: string;
}
