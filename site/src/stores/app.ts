import { readable, writable } from 'svelte/store';

export const pageName = writable('');
export const componentsVersion = readable('0.5.37');

export const lang = writable('');
