export interface IItem {
	unit?: string;
	desc: string;
	unitaryPrice: number;
	taxPercentage: number;
	quantity?: number;
	discount?: {
		type: "gross" | "item";
		includeVat?: boolean;
	};
}
export interface ICompany {
	piva: string;
	name: string;
	address: string;
	email: string;
	phone: string;
	iban?: string;
}

export interface IHeaders {
	country?: "it" | "eu" | "us";
	serial: string;
	date?: Date;
	expirationDate?: Date;
	category?: "items" | "services";
	from: ICompany & { logo: string; shortName: string };
	to: ICompany;
}
