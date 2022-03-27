<script lang="ts">
	import { pageName } from '../stores/app';
	import type { ComponentSetup } from '@htmlbricks/hb-jsutils';

	export let args: any;
	export let meta: ComponentSetup;
</script>

<hb-input-radio
	schemaentry={JSON.stringify({
		id: $pageName + '_lang_chooser',
		params: {
			options: (meta?.i18n || []).map((m) => {
				const o = {
					value: m.lang,
					label: m.lang
				};
				return o;
			})
		}
	})}
	on:setValue={(v) => {
		const val = v?.detail?.value;
		if (args?.i18nlang) {
			if (val) {
				args.i18nlang = val;
			} else {
				delete args.val;
			}
		} else if (val) {
			args.i18nlang = val;
		}
	}}
/>
