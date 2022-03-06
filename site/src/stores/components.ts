import { readable } from 'svelte/store';

import bannerDefinition from '@htmlbricks/hb-banner/release/webcomponent.type.d.json';
import { storybookArgs as bannerStorybookArgs } from '@htmlbricks/hb-banner/release/docs';
import areaCodeDefinition from '@htmlbricks/hb-area-code/release/webcomponent.type.d.json';
import { storybookArgs as areaCodeStorybookArgs } from '@htmlbricks/hb-area-code/release/docs';

export const allComponents = readable([
	{
		definition: bannerDefinition,
		storybookArgs: bannerStorybookArgs,
		name: 'banner'
	},
	{
		definition: areaCodeDefinition,
		storybookArgs: areaCodeStorybookArgs,
		name: 'area-code'
	}
]);
