export type Component = {
	paypalid: string;
	currency: "EUR" | "USD";
	total: number;
};

export type Events = {
	paymentCompleted: { method: "paypal"; total: number };
};
