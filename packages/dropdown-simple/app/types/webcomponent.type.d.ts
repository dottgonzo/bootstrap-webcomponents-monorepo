export interface IDropDownMenuListItem {
	key: string;
	label: string;
	badge?: number;
	group?: string;
	linkHref?: string;
}

export type Component = {
	id?: string;
	style?: string;
	position?: "left" | "right";
	list: IDropDownMenuListItem[];
	open?: "yes" | "no";
};

export type Events = {
	dropdownSwitch: { open: boolean; id: string };
	dropDownClick: { key: string };
};
