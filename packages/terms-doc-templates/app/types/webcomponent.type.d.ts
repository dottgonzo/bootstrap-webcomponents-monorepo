export type IParagraphList = { key: string; content: string; index?: number };

export type IParagraph = { key: string; content: string; list?: IParagraphList[]; index: number };

export type IDoc = {
	id: string;
	title: string;
	chapters: IChapter[];
	int: { key: string; flag: string };
};

export type IChapter = {
	title: string;
	key: string;
	index: number;
	paragraphs: IParagraph[];
};

export interface ITPrivacy {
	id: "italian-terms-privacy";
	site: { name: string; url: string; privacyPolicyUri: string; cookiePolicyUri: string };
	company: { name: string; address: string };
	privacyAdmin: { name: string; email: string };
	collectedData: { scopes: { label: "string" }[]; dataTypes: { label: "string" }[]; contactModule?: { data: { label: "string" }[] } };
	payments?: { companies: { company: string }[] };
	date?: Date;
	socialNetworks?: { company: string }[];
	storage?: { durate?: string };
	analytics?: { companies: { company: string }[] };
}
export type Component = {
	id?: string;
	style?: string;
	i18nlang?: string;
	data: ITPrivacy;
};

export type Events = {
	event: { test: boolean };
};
