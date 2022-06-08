export type FormSchemaEntry = {
	/**
	 * This will be both the key of the object when submitting the form's data,
	 * and also the id in the DOM.
	 */
	id: string;

	/**
	 * The descriptive label that will show alongside the form control.
	 */
	label?: string;

	/**
	 * Optional default value.
	 */
	value?: number;

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

export type Component = {
	id?: string;
	style?: string;
	set_value?: boolean;
	set_valid?: boolean;
	show_validation?: "yes" | "no";
	schemaentry: FormSchemaEntry;
};

export type Events = { setValue: { value: string }; setValid: { valid: boolean } };
