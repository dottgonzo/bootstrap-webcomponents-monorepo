import type { FormSchema } from "../../../form/app/types/webcomponent.type";

export const formCreditCardSchema: FormSchema = [
	{
		type: "text",
		placeholder: "Insert your full Name name here...",
		id: "fullName",
		required: true,
		label: "Full Name",
		validationTip: "This field cannot be empty.",
	},
	{
		type: "text",
		placeholder: "Insert your Credit Card Number here...",
		id: "cardNumber",
		required: true,
		label: "Card Number",
		validationTip: "This field cannot be empty.",
	},
	{
		id: "name-row2",
		type: "row",
		params: {
			columns: [
				{
					type: "text",
					placeholder: "Insert card CVV here...",
					id: "CVV",
					required: true,
					label: "CVV",
					validationTip: "This field cannot be empty.",
				},
				{
					type: "text",
					placeholder: "Insert card expiration here...",
					id: "expiration",
					required: true,
					label: "Scadenza",
					validationTip: "This field cannot be empty.",
				},
			],
		},
	},
];
