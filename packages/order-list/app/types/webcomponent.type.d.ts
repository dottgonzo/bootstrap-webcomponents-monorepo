import type { IPayment as CartPayment, IShopItem } from "../../../checkout-shopping-cart/app/types/webcomponent.type";

interface IOrderItem extends IShopItem {
	image: string;
}

export interface IPayment extends CartPayment {
	orderNumber: string;
	items: IOrderItem[];
}
