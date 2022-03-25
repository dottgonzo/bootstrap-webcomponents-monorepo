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
	fixedPrice?: number;
	currency?: "€" | "$";
	percentagePrice?: number;
	// cardImage?: string;
	// paypal
	paypalid?: string;
	// google
	cardNetworks?: string[];
	gatewayId?: string;
	gatewayMerchantId?: string;
	merchantId?: string;
};

export type IPaymentType = "book" | "buy" | "checkout" | "donate" | "order" | "pay" | "plain" | "subscribe";

export type IPayment = {
	merchantName: string;
	total: number;
	currencyCode: string;
	countryCode: string;
	type?: IPaymentType;
	shipmentFee?: number;
};

export type Component = {
	id?: string;
	style?: string;
	shipments: IShipment[];
	user: IUser;
	gateways: IGateway[];
	payment: IPayment;
	completed: "yes" | "no";
};

export type Events = {
	paymentCompleted: { total: number; method: string; completed: true };
	saveUser: IUser;
	saveShipment: IShipment;
	completed: { control: { type: "radio" }; options: ["yes", "no"] };
};
