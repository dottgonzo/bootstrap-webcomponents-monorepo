import { readable, writable, type Readable, type Writable } from 'svelte/store';

export const pageName: Writable<string> = writable('');
export const componentsVersion: Writable<string> = writable('0.8.42');
export const homePage: Readable<string> = readable('/components/comparison');

export const lang: Writable<string> = writable('');
