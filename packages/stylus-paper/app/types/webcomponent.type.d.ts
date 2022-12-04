export type EventDraw = {
	type: "point" | "line" | "rect" | "circle" | "ellipse" | "text" | "image" | "clear";
};

export type Component = {
	id?: string;
	style?: string;
	background_color?: string;
	pen_color?: string;
};

export type Events = {
	draw: EventDraw;
	beginStroke: { date: Date };
	startStroke: { stroke_id: string; stroke_start: Date };
	endStroke: { stroke_id: string; stroke_start: Date; stroke_end: Date };
};
