export const storybookArgs = {
	size: { control: { type: "range", min: 1, max: 100 } },
	page: { control: { type: "number" } },
	resturi: { control: { type: "object" } },
	headers: { control: { type: "array" } },
	cards: { control: { type: "array" } },
	primarycolor: { control: { type: "color" } },
	pagechange: { action: "pagechangeEvent" },
	externalfilter: { control: { type: "boolean" } },
	textFilterVideos: { action: "textFilterVideosEvent" },
	dateFilterVideos: { action: "dateFilterVideosEvent" },
};
