export interface IData {
	href: string;
	caption?: string;
}
export type Component = {
	data: IData[];
	index?: number;
	timer?: number;
};

export type Events = {
	changeSlide: { index: number };
	onHover: { index: number; hover: boolean };
};
