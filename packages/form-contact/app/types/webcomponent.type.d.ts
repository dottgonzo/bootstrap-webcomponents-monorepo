export type Component = {
	id?: string;
	style?: string;
	captcha?: {
		type: "googlev_recaptchav2" | "googlev_recaptchav3";
	};
	privacy_policy?: {
		input: string;
		link?: string;
		policyId?: string;
		required?: boolean;
	};
	informations?: {
		name?: { required?: boolean; label?: string; value?: string; placeholder?: string };
		email?: { required?: boolean; label?: string; value?: string; placeholder?: string };
		phone?: { required?: boolean; label?: string; value?: string; placeholder?: string };
		message?: { required?: boolean; label?: string; value?: string; placeholder?: string };
		subject?: { required?: boolean; label?: string; value?: string; placeholder?: string };
	};
};

export type Events = {};
