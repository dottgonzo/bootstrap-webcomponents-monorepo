export type Component = {
	id?: string;
	style?: string;
	provider: {
		uri?: string;
		name: string
		params?: {
			redirect_url: string
			client_id: string
			scope: string
		}
	}
};

export type Events = {

	oauthFlowInit: { token?: string; provider: string, tmpCode?: string, redirect_uri?: string };
};
