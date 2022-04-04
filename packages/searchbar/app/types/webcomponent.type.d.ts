export type Component = {
	id?: string;
	style?: string;

	action: string;
	method: "GET" | "POST";
	"action-query-key": string;
	"result-items-path": string;
	"result-item-title-key": string;
	"result-item-link-key": string;
};

export type Events = {
	"search-result-items": any[];
};
