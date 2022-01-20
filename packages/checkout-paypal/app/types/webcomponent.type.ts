export interface IShipment {
	price: number;
	selected?: boolean;
	standard?: boolean;
	arriveDate: Date;
	available: boolean;
	id: string;
	label: string;
	currency: string;
}

export interface IUser {
	fullName: string;
	addressWithNumber: string;
	city: string;
	zip: string;
	nationality: string;
}
