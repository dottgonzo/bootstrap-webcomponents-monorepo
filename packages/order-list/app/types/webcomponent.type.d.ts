import type { IPayment, IShopItem } from "../../../checkout-shopping-cart/app/types/webcomponent.type";

interface IOrderItem extends IShopItem {
	image: string;
}

export interface OrderPayment extends IPayment {
	orderNumber: string;
	items: IOrderItem[];
}

export type Component = {
	payment: IPayment;
};
