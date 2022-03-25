export interface IDropDownMenuListItem {
	key: string;
	label: string;
	badge?: number;
	group?: string;
	linkHref?: string;
}

export type Component = {
	position: "left" | "right";
	list: IDropDownMenuListItem[];
	open: boolean;
};

export type Events = {
	dropdownSwitch: { open: boolean; id: string };
	dropDownClick: { key: string };
};
