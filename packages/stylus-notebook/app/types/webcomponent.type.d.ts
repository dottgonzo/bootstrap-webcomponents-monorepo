export type TPath = [number, number, number][];
export type IStroke = {
	actionIndex: number;
	visible: boolean;
	color?: string;
	path?: TPath;
	id: string;
	pathData?: string;
	min?: [number, number];
	max?: [number, number];
	erasedAtIndex?: number;
	opacity?: number;
	selected?: boolean;
	type: "stroke" | "eraser";
};

export type Component = {
	id?: string;
	style?: string;
	load_draw?: { time: Date; draw: IStroke[]; draw_id: string };
	save?: { name: string; type: "pdf" | "json" | "png" | "svg" | "jpg" };
	debug?: "yes" | "no";
};

export type Events = {
	event: { test: boolean };
};
