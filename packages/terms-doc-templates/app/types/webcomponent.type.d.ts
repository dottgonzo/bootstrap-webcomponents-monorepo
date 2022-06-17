export type ITableHeaders = [
	{ key: "name"; label: string },
	{ key: "service"; label: string },
	{ key: "porpose"; label: string },
	{ key: "details"; label: string },
];

export interface IRow {
	_id: string;
	name: string;
	service: string;
	porpose: string;
	details: string;
}

export type IParagraphList = { key: string; content: string; index?: number };
export type IParagraphTable = {
	headers: ITableHeaders;
	rows: IRow[];
};
export type IParagraph = { key: string; content: string; list?: IParagraphList[]; index: number; table?: IParagraphTable; title?: string };

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
export type CookieRow = {
	third?: { company: string; termUri?: string };
	name: string;
	purpose: string;
	service: string;
	storage: "persistent" | "session";
	durate: number;
	type: "technical" | "authentication" | "preferences" | "statistics" | "advertising" | "analytics" | "third-party";
};
export interface ITPrivacy {
	id: "privacy-doc-italian";
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
export type CookieContent = {
	id: "cookie-doc-italian" | "cookie-doc-english" | "cookie-doc";
	site: { name: string; url: string; privacyPolicyUri: string; cookiePolicyUri: string };
	company: { name: string; address: string };
	date?: Date;
	language?: string;
	cookies: CookieRow[];
};

export type Component = {
	id?: string;
	style?: string;
	i18nlang?: string;
	data: ITPrivacy | CookieContent;
};

export type Events = {
	event: { test: boolean };
};
