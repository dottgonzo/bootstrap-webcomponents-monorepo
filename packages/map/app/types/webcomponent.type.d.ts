export type Component = {
	id?: string;
	style?: string;
	zoom: number;
	center: number[];
	data: {
		marker?: { lngLat: number[]; icon?: { uri: string; scale?: number; anchor?: number[] }; id?: string; popupHtml?: string };
		point?: { lngLat: number[]; icon?: { uri: string; scale?: number; anchor?: number[] }; id?: string; popupHtml?: string };
		line?: { lngLat: number[]; icon?: { uri: string; scale?: number; anchor?: number[] }; id?: string; popupHtml?: string }[];
	}[];
	source: { type: string; url?: string };
	options: { centerFromGeometries?: boolean };
};

export type Events = {};
