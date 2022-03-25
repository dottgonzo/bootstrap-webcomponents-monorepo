export type Header = {
	id: string;
	label: string;
};
export type Product = {
	characteristics: { [x: string]: string };
	id: string;
	model: string;
	description?: string;
	price: number;
	note?: string;

	promotion?: {
		originalPrice: number;
		type?: string;
		note?: string;
	};
	columnColor?: {
		headerBackground?: string;
		columnBackground?: string;

		purchaseButton?: string;
	};
};

export type Options = {
	currency?: string;
	preferredProductId?: string;
};

export type Component = {
	headers: Header[];
	products: Product[];
	options: Options;
};

export type Events = {
	purchaseClick: { id: string };
};
