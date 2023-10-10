import { TCARD } from "ts-jsoncard/types";

export type Component = {
	id?: string;
	style?: string;
	data: TCARD;
	options?: { b: number };
};

export type Events = {
	event: { test: boolean };
};
