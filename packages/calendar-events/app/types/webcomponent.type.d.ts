export interface IEvent {
	date: Date;
	label: string;
	id: string;
	link?: string;
	icon?: string;
	color?: string;
	details?: {
		author?: string;
		subject: string;
		text: string;
		end?: Date;
		avatarUrl?: string;
		imageUrl?: string;
	};
}
export type Component = {
	id?: string;
	style?: string;
	date?: Date;
	events?: IEvent[];
	selected?: Date;
	disable_header?: boolean;
};

export type Events = {
	calendarEventClick: { eventId: string };
	changeCalendarDate: { date: Date };
	changeSelectedDate: { selectedDate: Date };
};
