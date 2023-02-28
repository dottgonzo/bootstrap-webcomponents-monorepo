export type TFormSchemaGeneretor4Prop = {
	conditional?: boolean;
	label: string;
	max?: number;
	min?: number;
	required?: boolean;
	placeholder?: string;
	type: "textarea" | "text" | "number" | "email" | "select" | "checkbox" | "radio" | "date" | "datetime" | "file" | "range" | "default";
	conditions?: { conditionlabel: string; conditionvalue: string }[];
	options?: { optionlabel: string; optionvalue: string }[];
};

export type Component = {
	id?: string;
	style?: string;

	debug?: boolean;
	output_schema?: any[];
};

export type Events = {
	done: { schema: any; id: string };
};
