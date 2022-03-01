export type Component = {
	steps: number;
	schemes: { schema: FormSchema; valid: boolean }[];
	step: number;
	submitstep: "yes" | "no";
};
