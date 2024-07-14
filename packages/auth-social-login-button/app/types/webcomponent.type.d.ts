type IProvider = "facebook" | "google" | "gitlab" | "github";

export type Component = {
	id?: string;
	style?: string;
	social_auth_server_url?: string;
	auth_cookie_name?: string;
	provider: {
		url?: string;
		name: IProvider;
		params?: {
			redirect_url: string;
			client_id: string;
			scope: string;
		};
	};
};

export type Events = {
	oauthFlowSuccess: { token: string };
	oauthFlowInit: { token?: string; provider: IProvider; tmpCode?: string; redirect_uri?: string };
	oauthFlowCustom: { provider: IProvider };
};
