export type TSaveType = "pdf" | "json" | "png" | "svg" | "jpg";
export type TInsertType = "png" | "svg" | "jpg";

export type TSave = { type: TSaveType; draw: IStroke[]; id: string; draw_id: string; name: string; version: number };

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

export type Component = {
	id?: string;
	style?: string;
	background_color?: string;
	pen_color?: string;
	pen_opacity?: number;
	options?: Partial<TPerfectFreeHandOptions>;
	goto?: number;
	mode: "eraser" | "draw" | "select";
	debug?: "yes" | "no";
	load_draw?: TSave;
	save_as?: { name: string; type: TSaveType };
	insert_object?: { name: string; type: TInsertType };
};

export type Events = {
	beginStroke: { date: Date; id: string; draw_id: string };
	startStroke: { id: string; start: Date; stroke_id: string; index: number; draw_id: string };
	endStroke: {
		id: string;
		stroke_id: string;
		start: Date;
		end: Date;
		min: [number, number];
		max: [number, number];
		pathData: string;
		pen_color: string;
		index: number;
		draw_id: string;
	};
	selection: {
		minX: number;
		minY: number;
		maxX: number;
		maxY: number;
		strokes: IStroke[];
		id: string;
		draw_id: string;
	};
	historyIndex: { index: number; id: string; draw_id: string };
	save: TSave;
};
