export type Component = {
	id?: string;
	style?: string;
	load_draw?: { time: Date; draw: TDraw; draw_id: string };
	save?: { name: string; type: "pdf" | "json" | "png" | "svg" | "jpg" };
	debug?: "yes" | "no";
};

export type Events = {
	event: { test: boolean };
};
