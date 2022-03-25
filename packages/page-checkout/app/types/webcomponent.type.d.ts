import type { IShoppingPayment, IShopItem } from "../../../checkout-shopping-cart/app/types/webcomponent.type";
import type { IShipment, IUser, IGateway, IPayment } from "../../../checkout/app/types/webcomponent.type";

export type Component = {
	id?: string;
	style?: string;
	shipments: IShipment[];
	user: IUser;
	payment: IShoppingPayment & IPayment;
	gateways: IGateway[];
	completed?: "yes" | "no";
};

export type Events = {
	saveUser: IUser;
	// saveShipment: { action: "saveShipment" };
	paymentCompleted: { total: number; method: string; completed: true };
};
