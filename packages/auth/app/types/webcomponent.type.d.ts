export type Component = {
	id?: string;
	style?: string;
	type?: "login" | "register" | "activate" | "recover" | "forgotpassword";

	language?: string;

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
		uri: string;
	}[];
	disableregister?: boolean;
	enable_recover_password?: boolean;
	passwordpattern?: string;
	recoverycode?: string;
};

export type Events = {
	login: { token?: string; email?: string; password?: string; rememberMe?: boolean };
	register: any & { requestSent: { email: string; password: string }; email: string; password: string };
	recoverOrActivate: { password: string; recoverycode: string; email: string }; // only one good..
	recoverPassword: { email: string };
};
