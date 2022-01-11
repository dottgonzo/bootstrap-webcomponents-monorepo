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
