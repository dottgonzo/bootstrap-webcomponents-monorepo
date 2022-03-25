export type Component = {
	id?: string;
	style?: string;
	paypalid: string;
	currency: "EUR" | "USD";
	total: number;
};

export type Events = {
	paymentCompleted: { method: "paypal"; total: number };
};
