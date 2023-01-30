export type CardRowBase = {
	id: string;
	switchToPanelId?: string;
};

export interface CardRowLine extends CardRowBase {
	bootstrapIcon?: string;
	text: string;
	type: "line";
	badge?: {
		text: string;
		class?: string;
		classcolor?: string;
	};
}
export interface CardRowCustomLine extends CardRowBase {
	iconUrl?: string;
	bootstrapIcon?: string;
	title: string;
	subtitle?: string;
	type: "customLine";
}

export type CardRow = CardRowLine | CardRowCustomLine;

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
