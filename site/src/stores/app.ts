import { readable, writable, type Readable, type Writable } from 'svelte/store';

export const pageName: Writable<string> = writable('');
export const componentsVersion: Readable<string> = readable('0.7.9');

export const lang: Writable<string> = writable('');
