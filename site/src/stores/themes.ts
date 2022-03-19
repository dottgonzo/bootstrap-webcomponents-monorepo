import { writable, type Writable } from 'svelte/store';

export const useCustomTheme: Writable<boolean> = writable(false);
export const useCustomThemeGlobally: Writable<boolean> = writable(false);

export const bootstrapThemeCssVars: Writable<{ name: string; value: string; rank?: number }[]> =
	writable([
		{
			name: '--bs-primary',
			value: '#07689f',
			rank: 100
		},
		{
			name: '--bs-secondary',
			value: '#c9d6df',
			rank: 100
		},
		{
			name: '--bs-success',
			value: '#11d3bc',
			rank: 100
		},
		{
			name: '--bs-danger',
			value: '#f67280',
			rank: 100
		},
		{
			name: '--bs-info',
			value: '#a2d5f2',
			rank: 100
		},
		{
			name: '--bs-warning',
			value: '#ff7e67',
			rank: 100
		},
		{
			name: '--bs-light',
			value: '#fafafa',
			rank: 100
		},
		{
			name: '--bs-dark',
			value: '#4e4e4e',
			rank: 100
		}
	]);
