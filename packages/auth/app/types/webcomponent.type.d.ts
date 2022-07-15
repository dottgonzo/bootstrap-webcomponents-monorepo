export type Component = {
	id?: string;
	style?: string;
	type?: "login" | "register" | "activate" | "recover" | "forgotpassword" | "mailrecoverinfo" | "otp" | "2fa_code" | "2fa_config";
	email?: string;
	i18nlang?: string;

	sessionkey?: string;

	redirectonlogin?: string;
	redirectoncreate?: string;
	loginuri?: string;
	registeruri?: string;
	activateuri?: string;
	recoveruri?: string;
	requestmethod?: string;
	appendqueryparams?: string;
	appendbodyparams?: string;
	logouri?: string;
	oauth2providers?: {
		provider: string;
		url?: string;
		params?: {
			scope?: string
			client_id: string
			redirect_url: string
		}
	}[];
	disableregister?: boolean;
	enable_recover_password?: boolean;
	passwordpattern?: string;
	recoverycode?: string;
	disablelocal?: boolean
};

export type Events = {
	login: { token?: string; email?: string; password?: string; rememberMe?: boolean };
	register: any & { requestSent: { email: string; password: string }; email: string; password: string };
	recoverOrActivate: { password: string; recoverycode: string; email: string }; // only one good..
	recoverPassword: { email: string };
	oauthFlowInit: { token?: string; provider: string, tmpCode?: string, redirect_uri?: string };
};
