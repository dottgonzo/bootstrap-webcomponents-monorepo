import { writable, type Writable } from 'svelte/store';

export const useCustomTheme: Writable<boolean> = writable(false);
export const useCustomThemeGlobally: Writable<boolean> = writable(false);

export const bootstrapThemeCssVars: Writable<{ name: string; value: string }[]> = writable([
	{
		name: '--bs-primary',
		value: '#07689f'
	},
	{
		name: '--bs-secondary',
		value: '#c9d6df'
	},
	{
		name: '--bs-success',
		value: '#11d3bc'
	},
	{
		name: '--bs-danger',
		value: '#f67280'
	},
	{
		name: '--bs-info',
		value: '#a2d5f2'
	},
	{
		name: '--bs-warning',
		value: '#ff7e67'
	},
	{
		name: '--bs-light',
		value: '#fafafa'
	},
	{
		name: '--bs-dark',
		value: '#4e4e4e'
	}
]);
