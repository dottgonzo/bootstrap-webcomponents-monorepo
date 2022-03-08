import { readable, writable } from 'svelte/store';

import bannerDefinition from '@htmlbricks/hb-banner/release/webcomponent.type.d.json';
import areaCodeDefinition from '@htmlbricks/hb-area-code/release/webcomponent.type.d.json';
import offcanvasDefinition from '@htmlbricks/hb-offcanvas/release/webcomponent.type.d.json';

import { storybookArgs as bannerStorybookArgs } from '@htmlbricks/hb-banner/release/docs';
import { storybookArgs as areaCodeStorybookArgs } from '@htmlbricks/hb-area-code/release/docs';
import { storybookArgs as offcanvasStorybookArgs } from '@htmlbricks/hb-offcanvas/release/docs';

const bannerExampleValues = {
	title: 'ciao',
	description: 'desc'
};
const areaCodeExampleValues = {
	content: 'desc'
};

const offcanvasExampleValues = {
	opened: true,
	id: 'BasicOffcanvasOnSettings',
	navlinks: [
		{
			label: 'Home',
			key: 'home',
			icon: 'house-door'
		},
		{
			label: 'Dashboard',
			key: 'dashboard',
			icon: 'speedometer'
		},
		{
			label: 'Settings',
			key: 'settings',
			icon: 'gear'
		},
		{
			label: 'Users',
			key: 'users',
			icon: 'people-fill'
		},
		{
			label: 'Stats',
			key: 'stats',
			icon: 'graph-up'
		}
	],
	navpage: 'settings'
};

export const allComponentsMetas = readable([
	{
		definition: bannerDefinition,
		storybookArgs: bannerStorybookArgs,
		name: 'banner',
		category: 'basic'
	},
	{
		definition: areaCodeDefinition,
		storybookArgs: areaCodeStorybookArgs,
		name: 'area-code',
		category: 'dev'
	},
	{
		definition: offcanvasDefinition,
		storybookArgs: offcanvasStorybookArgs,
		name: 'offcanvas',
		category: 'layout'
	}
]);

export const allComponentsExampleValues = writable({
	banner: bannerExampleValues,
	'area-code': areaCodeExampleValues,
	offcanvas: offcanvasExampleValues
});
