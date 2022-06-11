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
		payments?: { companies: { company: string }[] };
		date?: Date;
		socialNetworks?: { company: string }[];
		storage?: { durate?: number };
		analytics?: { companies: { company: string }[] };
	};
};

export type Events = {
	event: { test: boolean };
};
