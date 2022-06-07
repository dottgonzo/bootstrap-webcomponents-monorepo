export type Component = {
	id?: string;
	style?: string;
	api_key?: string;
	get?: any;
};

export type Events = { googleRecaptchaV2Response: { response: string }; googleRecaptchaRendered: { render: true } };
