export const storybookArgs = {
	opened: { control: { type: "boolean" } },
	companylogouri: { control: { type: "text" } },
	companytitle: { control: { type: "text" } },
	enablefooter: { control: { type: "boolean" } },
	pageclick: { action: "pageclickEvent" },
	offcanvasswitch: { action: "offcanvasswitchEvent" },
	pagechange: { action: "pagechangeEvent" },
	type: { control: { options: ["autohide", "small", "open"] } },
	navpage: { control: { type: "text" } },
	navlinks: { control: { type: "array" } },
};
