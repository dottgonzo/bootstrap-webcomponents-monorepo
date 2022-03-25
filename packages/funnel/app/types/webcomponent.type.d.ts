import type { FormSchema } from "../../../form/app/types/webcomponent.type";

export type Component = {
	id?: string;
	style?: string;
	steps: number;
	schemes: { schema: FormSchema; valid: boolean }[];
	step: number;
	submitstep: "yes" | "no";
};

export type Events = {};
