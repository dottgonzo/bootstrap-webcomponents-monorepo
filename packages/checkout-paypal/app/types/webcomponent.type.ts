export interface IShipment {
	price: number;
	selected?: boolean;
	standard?: boolean;
	durationInSeconds: number;
	available: boolean;
}

export interface IUser {
	fullName: string;
	fullAddress: string;
}
