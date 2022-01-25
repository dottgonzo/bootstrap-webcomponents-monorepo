export type IShipment = {
	price: number;
	selected?: boolean;
	standard?: boolean;
	arriveDate: Date;
	available: boolean;
	id: string;
	label: string;
	currency: string;
};

export type IUser = {
	fullName: string;
	addressWithNumber?: string;
	city?: string;
	zip?: string;
	nationality?: string;
	fixed?: boolean;
};
export type IGateway = {
	id: "google" | "paypal";
	label: string;
	default?: boolean;
	selected?: boolean;
	fixedPrice?: number;
	currency?: "€" | "$";
	percentagePrice?: number;
	cardImage?: string;
};
