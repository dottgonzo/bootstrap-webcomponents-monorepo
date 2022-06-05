export type Component = {
	id?: string;
	style?: string;

	action: string;
	method: "GET" | "POST";
	formkey: string;
	subjectkey: string;
	contentkey: string;
	recaptchasitekey: string;
};

export type Events = {
	"sent-mail": any;
	"sent-mail-error": any;
};
