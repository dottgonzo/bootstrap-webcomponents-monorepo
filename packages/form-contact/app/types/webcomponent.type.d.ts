export type Component = {
	id?: string;
	style?: string;

	informations?: {
		name?: { required?: boolean; label?: string; value?: string; placeholder?: string };
		email?: { required?: boolean; label?: string; value?: string; placeholder?: string };
		phone?: { required?: boolean; label?: string; value?: string; placeholder?: string };
		message?: { required?: boolean; label?: string; value?: string; placeholder?: string };
		subject?: { required?: boolean; label?: string; value?: string; placeholder?: string };
	};
};

export type Events = {};
