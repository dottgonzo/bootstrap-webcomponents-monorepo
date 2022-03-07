import type { FormSchema } from "../../../form/app/types/webcomponent.type";

export type Component = {
	steps: number;
	schemes: { schema: FormSchema; valid: boolean }[];
	step: number;
	submitstep: "yes" | "no";
};
