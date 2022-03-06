export const storybookArgs = {
	width: { control: { type: "range", min: 100, max: 2000, step: 25 } },
	height: { control: { type: "range", min: 100, max: 2000, step: 25 } },
	mediatype: { control: { type: "text" } },
	liveStatus: { action: "liveStatusEvent" },
};
