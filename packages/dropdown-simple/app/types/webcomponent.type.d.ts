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
