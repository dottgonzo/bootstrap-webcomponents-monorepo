export type Fetch = {
	headers?: { [x: string]: string };
	data: any;
	method?: string;
	url: string;
};

export type Component = {
	id?: string;
	style?: string;
	upload_id?: string;
	fetch_data: Fetch;
};

export type Events = {
	downloadError: { downloaded: boolean; id: string; error: Error };
	downloadComplete: { downloaded: boolean; id: string };
};
