export type TSaveType = "pdf" | "json" | "png" | "svg" | "jpg";

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
	multipath?: IStroke[];
	type: "stroke" | "multiplestroke" | "eraser" | "move";
};
export type TSave = { type: TSaveType; draw: IStroke[]; id: string; draw_id: string; name: string; version: number };

export type Component = {
	id?: string;
	style?: string;
	load_draw?: TSave;
	save?: { name: string; type: "pdf" | "json" | "png" | "svg" | "jpg" };
	debug?: "yes" | "no";
};

export type Events = {
	event: { test: boolean };
};
