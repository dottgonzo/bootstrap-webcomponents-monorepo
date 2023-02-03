export type Component = {
	id?: string;
	style?: string;

	type?: "dpad" | "joystick";
};

export type Events = {
	sendDirection: { direction: "up" | "right" | "down" | "left" };
};
