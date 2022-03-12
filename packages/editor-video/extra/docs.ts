import type { CssPart, CssVar, HtmlSlot } from "@htmlbricks/hb-jsutils/main";

export const storybookArgs = {
	src: { control: { type: "text" } },
	form: { control: { type: "array" } },
	track: { control: { type: "object" } },
	changeTrackValues: { action: "changeTrackValuesEvent" },
	dispatchTrack: { action: "dispatchTrackEvent" },
};
