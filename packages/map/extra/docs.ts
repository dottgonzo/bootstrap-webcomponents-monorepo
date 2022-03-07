export const storybookArgs = {
	options: { control: { type: "object" } },
	center: { control: { type: "array" } },
	data: { control: { type: "array" } },
	zoom: { control: { type: "number" } },
	source: { control: { type: "object" } },
	pointClickCoordinates: { action: "pointClickCoordinates" },
	markerClick: { action: "markerClick" },
};
