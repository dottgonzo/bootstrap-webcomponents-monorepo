export interface IShopItem {
	id: string;
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
	items: IShopItem[];
}
