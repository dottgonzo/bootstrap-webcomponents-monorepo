export interface IShopItem {
	unit?: string;
	name: string;
	unitaryPrice: number;
	taxPercentage: number;
	quantity?: number;
}
export interface ICartHeaders {
	country?: "it" | "eu" | "us";
}
