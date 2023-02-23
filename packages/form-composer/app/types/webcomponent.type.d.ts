export type TFormSchemaGeneretor4Prop = {
	conditional?: boolean;
	label: string;
	max?: number;
	min?: number;
	required?: boolean;
	placeholder?: string;
	type: "textarea" | "text" | "number" | "email" | "select" | "checkbox" | "radio" | "date" | "datetime" | "file" | "range";
	depName?: string;
	depValues?: string;
	optionLabel1?: string;
	optionValue1?: string;
	optionLabel2?: string;
	optionValue2?: string;
	optionLabel3?: string;
	optionValue3?: string;
	optionLabel4?: string;
	optionValue4?: string;
	optionLabel5?: string;
	optionValue5?: string;
	optionLabel6?: string;
	optionValue6?: string;
	optionLabel7?: string;
	optionValue7?: string;
	optionLabel8?: string;
	optionValue8?: string;
	optionLabel9?: string;
	optionValue9?: string;
	optionLabel10?: string;
	optionValue10?: string;
};

export type Component = {
	id?: string;
	style?: string;

	debug?: boolean;
};

export type Events = {
	done: { schema: any; id: string };
};
