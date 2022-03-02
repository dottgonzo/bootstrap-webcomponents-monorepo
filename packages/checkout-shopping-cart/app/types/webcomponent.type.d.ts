export interface IShopItem {
	id: string;
	unit?: string;
	name: string;
	unitaryPrice: number;
	taxPercentage: number;
	quantity?: number;
}
export interface IShoppingPayment {
	countryCode: "IT" | "US" | "EU";
	currencySymbol?: "€" | "$";
	shipmentFee?: number;
	items: IShopItem[];
}

export type Component = {
	payment: IShoppingPayment;
	completed: "yes" | "no";
};
