export type Component = {
	zoom: number;
	center: number[];
	data: {
		marker?: { lngLat: number[]; icon?: { uri: string; scale?: number; anchor?: number[] }; id?: string; popupHtml?: string };
		point?: { lngLat: number[]; icon?: { uri: string; scale?: number; anchor?: number[] }; id?: string; popupHtml?: string };
		line?: { lngLat: number[]; icon?: { uri: string; scale?: number; anchor?: number[] }; id?: string; popupHtml?: string }[];
	}[];
	source: { type: string; url?: string };
	options: { centerFromGeometries?: string };
};
