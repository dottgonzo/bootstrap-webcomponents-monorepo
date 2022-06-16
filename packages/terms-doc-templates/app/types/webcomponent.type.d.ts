export type IParagraphList = { key: string; content: string };

export type IParagraph = { key: string; content: string; list?: IParagraphList[] };

export type IDoc = {
	title: string;
	chapters: IChapter[];
	language: string;
};

export type IChapter = {
	title: string;
	key: string;
	index?: number;
	paragraphs: IParagraph[];
};
export interface ITPrivacy extends Component["config"] {
	site: { name: string; url: string; privacyPolicyUri: string; cookiePolicyUri: string };
	company: { name: string; address: string };
	privacyAdmin: { name: string; email: string };
}
export type Component = {
	id?: string;
	style?: string;
	i18nlang?: string;

	config: {
		law?: "italian" | "GDPR";
		site: { name: string; url: string; privacyPolicyUri?: string; cookiePolicyUri?: string };
		company: { name: string; address?: string };
		privacyAdmin?: { name: string; email: string };
		collectedData?: string[];
		payments?: { companies: { company: string }[] };
		date?: Date;
		socialNetworks?: { company: string }[];
		storage?: { durate?: number };
		analytics?: { companies: { company: string }[] };
	};
};

export type Events = {
	event: { test: boolean };
};
