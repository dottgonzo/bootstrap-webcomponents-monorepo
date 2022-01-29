export interface IShopItem {
	unit?: string;
	name: string;
	unitaryPrice: number;
	taxPercentage: number;
	quantity?: number;
}
export interface IPayment {
	countryCode: "IT" | "US" | "EU";
	currencySymbol?: "€" | "$";
	shipmentFee?: number;
}
