export type TPreset = {
	label?: string;
	id: string;
};

export type Component = {
	id?: string;
	style?: string;

	live_uri: string;
	presets?: TPreset[];
};

export type Events = {
	zoomAction: { direction: "in" | "out"; id: string };
	goToHome: { id: string };
	addAsPreset: { id: string };
	changePreset: TPreset & { playerId: string };
	sendJoystickPosition: { x: number; y: number; cardinalDirection: CardinalDirection; id: string; joyId: string };
	sendDirection: { direction: "up" | "right" | "down" | "left"; id: string; joyId: string };
};
