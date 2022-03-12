import type { CssPart, CssVar, HtmlSlot } from "@htmlbricks/hb-jsutils/main";

export const storybookArgs = {
	events: { control: { type: "object" } },
	date: { control: { type: "text" } },
	selected: { control: { type: "text" } },
	calendarEventClick: { action: "calendarEventClickEvent" },
	changeCalendarDate: { action: "changeCalendarDateEvent" },
	changeSelectedDate: { action: "changeSelectedDateEvent" },
};
