export type TPreset = {
	label?: string;
	id: string;
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
};

export type Events = {
	zoomAction: { movementSettings: TMovementSettings; direction: "in" | "out"; id: string };
	goToHome: { movementSettings: TMovementSettings; id: string };
	addSceneAsPreset: { id: string };
	changePreset: TPreset & { playerId: string; movementSettings: TMovementSettings };
	sendJoystickPosition: { movementSettings: TMovementSettings; x: number; y: number; cardinalDirection: CardinalDirection; id: string; joyId: string };
	sendDirection: { movementSettings: TMovementSettings; direction: "up" | "right" | "down" | "left"; id: string; joyId: string };
};
