export type Component = {
	type: "login" | "register" | "activate" | "recover" | "forgetpassword";

	language: string;

	sessionkey: string;

	redirectonlogin: string;
	redirectoncreate: string;
	loginuri: string;
	registeruri: string;
	activateuri: string;
	recoveruri: string;
	requestmethod: string;
	appendqueryparams: string;
	appendbodyparams: string;
	logouri: string;
	oauth2providers: string;
	disableregister: boolean;

	passwordpattern: string;
	recoverycode: string;
};
