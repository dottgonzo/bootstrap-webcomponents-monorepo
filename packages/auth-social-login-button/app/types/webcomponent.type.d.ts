type IProvider = 'facebook' | 'google' | 'gitlab' | 'github'

export type Component = {
	id?: string;
	style?: string;
	provider: {
		url?: string;
		name: IProvider
		params?: {
			redirect_url: string
			client_id: string
			scope: string
		}
	}
};

export type Events = {

	oauthFlowInit: { token?: string; provider: IProvider, tmpCode?: string, redirect_uri?: string };
	oauthFlowCustom: { provider: IProvider };
};
