export type Component = {
	id?: string;
	style?: string;

	action: string;
	method: "POST";
	"from-key": string;
	"subject-key": string;
	"content-key": string;
	"recaptcha-site-key": string;
};

export type Events = {
	"sent-mail": any;
	"sent-mail-error": any;
};
