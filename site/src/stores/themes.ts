import { writable, type Writable, readable, type Readable } from 'svelte/store';

export const useCustomTheme: Writable<boolean> = writable(false);
export const useCustomThemeGlobally: Writable<boolean> = writable(false);

export const defaultBootstrapThemeCssVars: Readable<
	{ name: string; value: string; rank?: number; type: 'string' | 'color' }[]
> = readable([
	{ name: '--bs-blue', value: '#0d6efd', type: 'color' },
	{ name: '--bs-indigo', value: '#6610f2', type: 'color' },
	{ name: '--bs-purple', value: '#6f42c1', type: 'color' },
	{ name: '--bs-pink', value: '#d63384', type: 'color' },
	{ name: '--bs-red', value: '#dc3545', type: 'color' },
	{ name: '--bs-orange', value: '#fd7e14', type: 'color' },
	{ name: '--bs-yellow', value: '#ffc107', type: 'color' },
	{ name: '--bs-green', value: '#198754', type: 'color' },
	{ name: '--bs-teal', value: '#20c997', type: 'color' },
	{ name: '--bs-cyan', value: '#0dcaf0', type: 'color' },
	{ name: '--bs-white', value: '#fff', type: 'color' },
	{ name: '--bs-gray', value: '#6c757d', type: 'color' },
	{ name: '--bs-gray-dark', value: '#343a40', type: 'color' },
	{ name: '--bs-gray-100', value: '#f8f9fa', type: 'color' },
	{ name: '--bs-gray-200', value: '#e9ecef', type: 'color' },
	{ name: '--bs-gray-300', value: '#dee2e6', type: 'color' },
	{ name: '--bs-gray-400', value: '#ced4da', type: 'color' },
	{ name: '--bs-gray-500', value: '#adb5bd', type: 'color' },
	{ name: '--bs-gray-600', value: '#6c757d', type: 'color' },
	{ name: '--bs-gray-700', value: '#495057', type: 'color' },
	{ name: '--bs-gray-800', value: '#343a40', type: 'color' },
	{ name: '--bs-gray-900', value: '#212529', type: 'color' },
	{ name: '--bs-primary', value: '#07689f', type: 'color', rank: 100 },
	{ name: '--bs-secondary', value: '#c9d6df', type: 'color', rank: 100 },
	{ name: '--bs-success', value: '#11d3bc', type: 'color', rank: 100 },
	{ name: '--bs-info', value: '#a2d5f2', type: 'color', rank: 100 },
	{ name: '--bs-warning', value: '#ff7e67', type: 'color', rank: 100 },
	{ name: '--bs-danger', value: '#f67280', type: 'color', rank: 100 },
	{ name: '--bs-light', value: '#fafafa', type: 'color', rank: 100 },
	{ name: '--bs-dark', value: '#4e4e4e', type: 'color', rank: 100 },
	{ name: '--bs-primary-rgb', value: '7, 104, 159', type: 'color' },
	{ name: '--bs-secondary-rgb', value: '201, 214, 223', type: 'color' },
	{ name: '--bs-success-rgb', value: '17, 211, 188', type: 'color' },
	{ name: '--bs-info-rgb', value: '162, 213, 242', type: 'color' },
	{ name: '--bs-warning-rgb', value: '255, 126, 103', type: 'color' },
	{ name: '--bs-danger-rgb', value: '246, 114, 128', type: 'color' },
	{ name: '--bs-light-rgb', value: '250, 250, 250', type: 'color' },
	{ name: '--bs-dark-rgb', value: '78, 78, 78', type: 'color' },
	{ name: '--bs-white-rgb', value: '255, 255, 255', type: 'color' },
	{ name: '--bs-black-rgb', value: '0, 0, 0', type: 'color' },
	{ name: '--bs-body-color-rgb', value: '33, 37, 41', type: 'color' },
	{ name: '--bs-body-bg-rgb', value: '255, 255, 255', type: 'color' },
	{
		name: '--bs-font-sans-serif',
		value:
			'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
		type: 'string'
	},
	{
		name: '--bs-font-monospace',
		value: 'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
		type: 'string'
	},
	{
		name: '--bs-gradient',
		value: 'linear-gradient(180deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0))',
		type: 'string'
	},
	{ name: '--bs-body-font-family', value: 'var(--bs-font-sans-serif)', type: 'string' },
	{ name: '--bs-body-font-size', value: '1rem', type: 'string' },
	{ name: '--bs-body-font-weight', value: '400', type: 'string' },
	{ name: '--bs-body-line-height', value: '1.5', type: 'string' },
	{ name: '--bs-body-color', value: '#212529', type: 'color' },
	{ name: '--bs-body-bg', value: '#fff', type: 'color' }
]);

// export const globalBootstrapThemeCssVars: Writable<
// 	{ name: string; value: string; rank?: number; type: 'string' | 'color' }[]
// > = writable([]);

// export const bootstrapThemeCssVars: Writable<
// 	{ name: string; value: string; rank?: number; type: 'string' | 'color' }[]
// > = writable([]);
