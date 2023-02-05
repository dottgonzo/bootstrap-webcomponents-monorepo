export type TPreset = {
	name?: string;
	id: string;
	number?: number;
};
export type TMovementSettings = {
	speed: number;
	precision: number;
};

export type Component = {
	id?: string;
	style?: string;

	live_uri: string;
	presets?: TPreset[];
	position?: "top" | "right-bottom" | "left-bottom" | "bottom" | "right-top" | "left-top";
	current_preset?: string;
	configuration?: {
		joystick?: boolean;
		presets?: boolean;
		addPreset?: boolean;
		switchPreset?: boolean;
		deletePreset?: boolean;
		home?: boolean;
		zoom?: {
			in?: boolean;
			out?: boolean;
		};
		pan?: boolean;
		tilt?: boolean;
		clickToCenter?: boolean;
		settings?: boolean;
	};
};
export type CardinalDirection = "C" | "N" | "S" | "NE" | "SE" | "NW" | "SW" | "NO" | "SO" | "W" | "O";

export type Events = {
	zoomAction: { movementSettings: TMovementSettings; direction: "in" | "out"; id: string };
	goToHome: { movementSettings: TMovementSettings; id: string };
	addSceneAsPreset: { id: string };
	changePreset: TPreset & { playerId: string; movementSettings: TMovementSettings };
	deletePreset: TPreset & { playerId: string };
	sendJoystickPosition: { movementSettings: TMovementSettings; x: number; y: number; cardinalDirection: CardinalDirection; id: string; joyId: string };
	sendDirection: { movementSettings: TMovementSettings; direction: "up" | "right" | "down" | "left"; id: string; joyId: string };
};
