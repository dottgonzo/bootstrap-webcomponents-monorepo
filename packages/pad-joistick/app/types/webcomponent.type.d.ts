export type Component = {
	id?: string;
	style?: string;

	type?: "dpad" | "joystick";
};

export type CardinalDirection = "C" | "N" | "S" | "NE" | "SE" | "NW" | "SW" | "NO" | "SO" | "W" | "O";

export type Events = {
	sendDirection: { direction: "up" | "right" | "down" | "left"; id: string };
	sendJoystickPosition: { x: number; y: number; cardinalDirection: CardinalDirection; id: string };
};
