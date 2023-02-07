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
	initVideo: { id: string; time: Date; htmlVideoElement: any };

	goToHome: { movementSettings: TMovementSettings; id: string; time: Date };
	sendRect: {
		movementSettings: TMovementSettings;
		id: string;
		top: number;
		left: number;
		width: number;
		height: number;
		htmlVideoElementWidth: number;
		htmlVideoElementHeight: number;
		time: Date;
	};
	addSceneAsPreset: { id: string; time: Date };
	changePreset: TPreset & { playerId: string; movementSettings: TMovementSettings; time: Date };
	deletePreset: TPreset & { playerId: string; time: Date };
	zoomAction: { movementSettings: TMovementSettings; direction: "in" | "out"; id: string; time: Date };

	sendJoystickPosition: {
		movementSettings: TMovementSettings;
		x: number;
		y: number;
		cardinalDirection: CardinalDirection;
		id: string;
		joyId: string;
		time: Date;
	};
	sendDirection: { movementSettings: TMovementSettings; direction: "up" | "right" | "down" | "left"; id: string; joyId: string; time: Date };
};
