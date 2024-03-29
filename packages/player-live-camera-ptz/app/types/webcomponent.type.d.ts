export type TPreset = {
	token: string;
	name: string;
	x: number;
	y: number;
	z: number;
};
export type TMovementSettings = {
	speed: number;
	precision: number;
};

export type Component = {
	id?: string;
	style?: string;

	is_ptz_connected?: boolean;
	is_ptz_panel_opened?: boolean;
	live_uri: string;
	media_type?: "hls" | "webrtc" | "auto" | "whep" | "";
	presets?: TPreset[];
	position?: "top" | "right-bottom" | "left-bottom" | "bottom" | "right-top" | "left-top";
	current_preset?: string;
	is_home?: boolean;
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
	panelMove: { id: string; opened: boolean };

	goToHome: { movementSettings: TMovementSettings; id: string; time: Date };
	goToSelectedArea: {
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

	setPreset: { id: string; time: Date };
	goToPreset: TPreset & { playerId: string; movementSettings: TMovementSettings; time: Date };
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
