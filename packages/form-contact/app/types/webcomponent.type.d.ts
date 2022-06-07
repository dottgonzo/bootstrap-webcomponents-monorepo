export type Component = {
	id?: string;
	style?: string;
	captcha?: {
		type: "googlev_recaptchav2_invisible" | "googlev_recaptchav3";
		siteKey: string;
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

export type Events = {
	formContactSubmit: { _valid: boolean; values: Record<string, string | number | boolean> };
	formContactSubmitWithCaptcha: { _valid: boolean; values: Record<string, string | number | boolean>; response: string };
};
