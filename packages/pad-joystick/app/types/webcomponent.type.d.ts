export type Component = {
	id?: string;
	style?: string;

	pad_or_joystick?: "dpad" | "joystick";
	joystick_parameters?: {
		internalFillColor?: string;
		internalLineWidth?: number;
		internalStrokeColor?: string;
		externalLineWidth?: number;
		externalStrokeColor?: string;
	};
};

export type CardinalDirection = "C" | "N" | "S" | "NE" | "SE" | "NW" | "SW" | "NO" | "SO" | "W" | "O";

export type Events = {
	sendDirection: { direction: "up" | "right" | "down" | "left"; id: string };
	sendJoystickPosition: { x: number; y: number; cardinalDirection: CardinalDirection; id: string };
};
