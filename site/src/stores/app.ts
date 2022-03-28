import { readable, writable, type Readable, type Writable } from 'svelte/store';
import type allComponentsList from '@htmlbricks/hb-bundle/release/list.json';

export const pageName: Writable<string> = writable('');
export const componentsVersion: Readable<string> = readable('0.9.3');
export const debugVersion: Writable<string> = writable(null);

export const homePage: Readable<string> = readable('/components/comparison');

export const lang: Writable<string> = writable('');

export const componentsList: Writable<typeof allComponentsList> = writable(null);
