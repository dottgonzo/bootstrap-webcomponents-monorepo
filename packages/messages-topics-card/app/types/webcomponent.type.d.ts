export type Component = {
	id?: string;
	style?: string;

	content?: {
		time: Date;
		title: string;
		text: string;
		img_uri: string;
		counter: number;
	};
	chat?: {
		is_group?: boolean;
		chat_name?: string;
		chat_img?: string;
		chat_id: string;
		last_message_author?: string;
		last_message_author_img?: string;
		last_message_time?: Date;
		last_message_text?: string;
		counter?: number;
	};
};

export type Events = {
	select: { id: string };
};
