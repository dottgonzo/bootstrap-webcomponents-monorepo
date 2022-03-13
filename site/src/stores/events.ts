import { writable, type Writable } from 'svelte/store';

export const events: Writable<
	{ component: string; name: string; data: JSON; unixtime: number; _id: string; seq: number }[]
> = writable([]);
