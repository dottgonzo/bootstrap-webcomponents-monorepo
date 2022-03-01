import type { IPayment as CartPayment, IShopItem } from "../../../checkout-shopping-cart/app/types/webcomponent.type";
import type { IShipment, IUser, IGateway, IPayment as CheckoutPayment } from "../../../checkout/app/types/webcomponent.type";

export type Component = {
	shipments: IShipment[];
	user: IUser;
	payment: CartPayment & CheckoutPayment;
	gateways: IGateway[];
	completed: "yes" | "no";
};
