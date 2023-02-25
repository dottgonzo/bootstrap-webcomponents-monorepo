export type TextSchemaEntry = {
	/**
	 * This will be both the key of the object when submitting the form's data,
	 * and also the id in the DOM.
	 */
	id: string;

	/**
	 * Optional default value.
	 */
	value?: string | number | boolean;

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
	schemaentry: TextSchemaEntry;
};

export type Events = { setValue: { value: string }; setValid: { valid: boolean } };