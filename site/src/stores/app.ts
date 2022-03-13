import { readable, writable } from 'svelte/store';

export const pageName = writable('');
export const componentsVersion = readable('0.5.28');
