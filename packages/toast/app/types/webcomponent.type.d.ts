export type Component = {
	id?: string;
	style?: string;
	show: "yes" | "no";
	title: string;
	img: string;
	small: string;
	content: string;
};

export type Events = {
	toastShow: { id: string; show: boolean };
	// toastConfirm: { id: string; confirm: boolean };
};
