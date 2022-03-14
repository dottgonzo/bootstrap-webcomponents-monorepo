import type { IShoppingPayment, IShopItem } from "../../../checkout-shopping-cart/app/types/webcomponent.type";

interface IOrderItem extends IShopItem {
	image: string;
}

export interface OrderPayment extends IShoppingPayment {
	orderNumber: string;
	items: IOrderItem[];
}

export type Component = {
	payment: OrderPayment;
};

export type Events = {};
