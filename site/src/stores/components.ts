import { readable, writable } from 'svelte/store';

import bannerDefinition from '@htmlbricks/hb-banner/release/webcomponent.type.d.json';
import { storybookArgs as bannerStorybookArgs } from '@htmlbricks/hb-banner/release/docs';
import areaCodeDefinition from '@htmlbricks/hb-area-code/release/webcomponent.type.d.json';
import { storybookArgs as areaCodeStorybookArgs } from '@htmlbricks/hb-area-code/release/docs';

const bannerExampleValues = {
	title: 'ciao',
	description: 'desc'
};
const areaCodeExampleValues = {
	content: 'desc'
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
	}
]);

export const allComponentsExampleValues = writable({
	banner: bannerExampleValues,
	'area-code': areaCodeExampleValues
});
