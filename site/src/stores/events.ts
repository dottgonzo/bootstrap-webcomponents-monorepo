import { writable, type Writable } from 'svelte/store';

export type HtmlSlotsContent = { component: string; name: string; content: string };

export type ComponentEvent = {
	component: string;
	name: string;
	data: JSON;
	unixtime: number;
	_id: string;
	seq: number;
};

export const events: Writable<ComponentEvent[]> = writable([]);

export const htmlSlotsContents: Writable<HtmlSlotsContent[]> = writable([]);
