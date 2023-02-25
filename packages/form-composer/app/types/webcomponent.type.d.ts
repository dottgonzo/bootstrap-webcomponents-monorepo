export type TFormSchemaGeneretor4Prop = {
	conditional?: boolean;
	label: string;
	max?: number;
	min?: number;
	required?: boolean;
	placeholder?: string;
	type: "textarea" | "text" | "number" | "email" | "select" | "checkbox" | "radio" | "date" | "datetime" | "file" | "range";
	conditions?: { conditionlabel: string; conditionvalue: string }[];
	options?: { optionlabel: string; optionvalue: string }[];
};

export type Component = {
	id?: string;
	style?: string;

	debug?: boolean;
};

export type Events = {
	done: { schema: any; id: string };
};
