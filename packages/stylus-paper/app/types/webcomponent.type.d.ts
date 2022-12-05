export type EventDraw = {
	type: "point" | "line" | "rect" | "circle" | "ellipse" | "text" | "image" | "clear";
};

export type TPath = [number, number, number][];
export type IStroke = {
	color: string;
	path: TPath;
	id: string;
	end: Date;
	start: Date;
	pathData: string;
	min: [number, number];
	max: [number, number];
};
export type TDraw = IStroke[];

export type Component = {
	id?: string;
	style?: string;
	background_color?: string;
	pen_color?: string;
};

export type Events = {
	draw: EventDraw;
	beginStroke: { date: Date };
	startStroke: { id: string; start: Date; min: [number, number]; max: [number, number] };
	endStroke: { id: string; start: Date; end: Date; min: [number, number]; max: [number, number] };
};
