export const storybookArgs = {
	type: {
		options: ["login", "register"],
		control: { type: "select" }, // Automatically inferred when 'options' is defined
	},
	language: { control: { type: "string" } },
	logouri: { control: { type: "string" } },
	loginuri: { control: { type: "string" } },
	registeruri: { control: { type: "string" } },
	login: { action: "loginEvent" },
	register: { action: "registerEvent" },
	contacts: { control: { type: "object" } },
	company: { control: { type: "object" } },
	socials: { control: { type: "object" } },
	oauth2providers: { control: { type: "array" } },
};
