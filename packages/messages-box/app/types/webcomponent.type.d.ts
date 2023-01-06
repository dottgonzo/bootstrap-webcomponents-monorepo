// type that is used to define a chat message
export type TMessage = {
	id: string;
	text: string;
	timestamp: Date;
	type: "text" | "image" | "video" | "audio" | "file";
	status?: "pending" | "sent" | "received" | "read";
	system?: boolean;
	reply?: boolean;
	quotedMessageId?: string;
	authorId?: string;
	uri?: string;
};

// type that is used to define a chat partecipant
export type TAuthor = {
	id: string;
	name: string;
	avatar?: string;
	status: "online" | "offline" | "away" | "busy";
	me?: boolean;
};

export type TMessageSend = {
	text?: string;
	file?: File;
};

export type Component = {
	id?: string;
	style?: string;
	messages: TMessage[];
	authors: TAuthor[];
	options?: {};
	message?: TMessageSend;
};

export type Events = {
	sendMessage: { text?: string; id: string; file?: File };
};
