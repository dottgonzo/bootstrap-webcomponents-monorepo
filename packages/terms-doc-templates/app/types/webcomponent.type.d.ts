export type Component = {
	id?: string;
	style?: string;
	i18nlang?: string;

	config: {
		law?: "italian" | "GDPR";
		site: { name: string; url: string; privacyPolicyUri?: string; cookiePolicyUri?: string };
		company: { name: string; address?: string };
		privacyAdmin?: { name: string; email: string };
		collectedData?: string[];
		withPayments?: {};
		date?: string;
	};
};

export type Events = {
	event: { test: boolean };
};
