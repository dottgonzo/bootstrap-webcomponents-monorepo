export type FormSchemaEntry = {
	/**
	 * This will be both the key of the object when submitting the form's data,
	 * and also the id in the DOM.
	 */
	id: string;

	/**
	 * Identifies the component type that will be used,
	 * available default ones are:
	 *  - text
	 *  - number
	 *  - email
	 *  - select
	 * 	- radio
	 *  - checkbox
	 *  - textarea
	 */
	type: string;

	/**
	 * The descriptive label that will show alongside the form control.
	 */
	label?: string;

	/**
	 * Optional default value.
	 */
	value?: string | number | boolean;

	/**
	 * This form control will show only if these dependencies are satisfied.
	 */
	dependencies?: {
		id: string;
		values?: any[];
	}[];

	readonly?: boolean;

	/**
	 * This doesn't matter if the dependencies requirements aren't met.
	 */
	required?: boolean;

	validationRegex?: string;
	/**
	 * Shows if value is not valid.
	 */
	validationTip?: string;

	placeholder?: string;

	/**
	 * Other parameters that may be specific to a certain kind of form control.
	 */
	params?: Record<string, any>;
};

export type IComponentName =
	| "hb-input-select"
	| "hb-input-date"
	| "hb-input-datetime"
	| "hb-input-text"
	| "hb-input-file"
	| "hb-input-number"
	| "hb-input-email"
	| "hb-input-area"
	| "hb-input-checkbox"
	| "hb-input-color"
	| "hb-input-radio"
	| "hb-input-captcha-google-v2";

export interface ISchemaOption {
	labelIsHandledByComponent?: boolean;
	row?: boolean;
}
export interface IComponent {
	options?: ISchemaOption;
	component?: IComponentName;
}
export interface IRegisterComponent {
	[k: string]: IComponent;
}
export interface IControl {
	entry: FormSchemaEntry;
	component?: IComponentName;
	options?: ISchemaOption;
	columns?: any;
}

export type FormSchema = FormSchemaEntry[];

export type FormRendererProps = {
	schema: FormSchema;
};

export type Component = {
	id?: string;
	style?: string;
	schema: FormSchema;

	values?: Record<string, string | number | boolean>;

	isInvalid?: boolean;
	submitted?: "yes" | "no" | null;
	getvals?: "yes" | "no" | null;
	show_validation?: "yes" | "no";

	hide_submit?: boolean;
};

export type Events = {
	submit: { _valid: boolean; values: Record<string, string | number | boolean> };
	getValues: { _valid: boolean; values: Record<string, string | number | boolean> };
	change: { _valid: boolean; _id: string; values: Record<string, string | number | boolean> };
};
