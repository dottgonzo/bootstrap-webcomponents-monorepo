export interface CardRow extends CardRowBase {
	key: string;
	bootstrapIcon?: string;
	text: string;
	subtext?: string;
	badge?: {
		text: string;
		class?: string;
		classcolor?: string;
	};
	value?: string | number | boolean;
	selected?: boolean;
	type?: "switch" | "range" | "radio" | "checkbox" | "button";

	switchToPanelId?: string;
}

export type CardNavigatorRowSelected = {
	sort?: number;
	id: string;
	title?: string;
	icon?: string;
};

export interface CardNavigator extends CardNavigatorRowSelected {
	rows: CardRow[];
}
export type PanelRowSelected = {
	id: string;
	title?: string;
	icon?: string;
	parentPanelId?: string;
	main?: boolean;
};

export interface Panel extends PanelRowSelected {
	cards: CardNavigator[];
}

export type Component = {
	id?: string;
	style?: string;
	panels?: Panel[];
};

export type CardRowSelected = {
	panel: PanelRowSelected;
	card: CardNavigatorRowSelected;
	row: CardRow;
	id: string;
};

export type Events = {
	event: { itemClick: CardRowSelected };
};
