export type Component = {
	id?: string;
	style?: string;
	api_key?: string;
};

export type Events = { googleRecaptchaV2Response: { response: string } };
