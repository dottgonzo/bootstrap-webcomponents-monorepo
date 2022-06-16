export type IParagraphList = { key: string; content: string; index?: number };

export type IParagraph = { key: string; content: string; list?: IParagraphList[]; index: number };

export type IDoc = {
	title: string;
	chapters: IChapter[];
	language: string;
};

export type IChapter = {
	title: string;
	key: string;
	index: number;
	paragraphs: IParagraph[];
};

export interface IData {
	law?: "italian" | "GDPR";
	site: { name: string; url: string; privacyPolicyUri?: string; cookiePolicyUri?: string };
	company: { name: string; address?: string };
	privacyAdmin?: { name: string; email: string };
	collectedData?: { scopes: { label: "string" }[]; dataTypes: { label: "string" }[]; contactModule?: { data: { label: "string" }[] } };
	payments?: { companies: { company: string }[] };
	date?: Date;
	socialNetworks?: { company: string }[];
	storage?: { durate?: string };
	analytics?: { companies: { company: string }[] };
}

export interface ITPrivacy extends IData {
	site: { name: string; url: string; privacyPolicyUri: string; cookiePolicyUri: string };
	company: { name: string; address: string };
	privacyAdmin: { name: string; email: string };
	collectedData: { scopes: { label: "string" }[]; dataTypes: { label: "string" }[]; contactModule?: { data: { label: "string" }[] } };
}
export type Component = {
	id?: string;
	style?: string;
	i18nlang?: string;

	config: IData;
};

export type Events = {
	event: { test: boolean };
};
