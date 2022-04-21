export type Component = {
	id?: string;
	style?: string;

	action: string;
	method: "GET" | "POST";
	"actionquerykey": string;
	"resultitemspath": string;
	"resultitemtitlekey": string;
	"resultitemlinkkey": string;
};

export type Events = {
	"search-result-items": any[];
};
