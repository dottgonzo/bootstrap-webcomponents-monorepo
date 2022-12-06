export type EventDraw = {
	type: "point" | "line" | "rect" | "circle" | "ellipse" | "text" | "image" | "clear";
};
export type TPerfectFreeHandOptions = {
	size: number;
	thinning?: number;
	smoothing?: number;
	streamline?: number;
	easing?: any;
	start?: {
		taper: number;
		easing: any;
		cap: boolean;
	};
	end?: {
		taper: number;
		easing: any;
		cap: boolean;
	};
	simulatePressure?: boolean;
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
	options?: Partial<TPerfectFreeHandOptions>;
};

export type Events = {
	draw: EventDraw;
	beginStroke: { date: Date };
	startStroke: { id: string; start: Date };
	endStroke: { id: string; start: Date; end: Date; min: [number, number]; max: [number, number]; pathData: string; pen_color: string };
};
