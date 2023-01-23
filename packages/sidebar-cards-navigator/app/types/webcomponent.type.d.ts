export type CardBase = {
	id: string;
	_selected?: boolean;
};

export interface CardRowLine extends CardBase {
	iconUrl?: string;
	bootstrapIcon?: string;
	text: string;
	type: "line";
}
export interface CardRowCustomLine extends CardBase {
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
export type Component = {
	id?: string;
	style?: string;
	cards?: CardNavigator[];
};
export type CardRowSelected = {
	card: CardNavigatorRowSelected;
	row: CardRow;
	id: string;
};
export type Events = {
	event: { itemClick: CardRowSelected };
};
