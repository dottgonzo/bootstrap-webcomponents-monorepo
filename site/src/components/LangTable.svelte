<script lang="ts">
	import { i18nLanguages } from '@htmlbricks/hb-banner/release/docs';
	import { pageName } from '../stores/app';
	import { allComponentsMetas } from '../stores/components';

	// export let storybookargs: any;
	export let args: any;

	function updateArgs() {
		console.log(args);
	}
</script>

<!-- {#each $allComponentsMetas.find((f) => f.name === $pageName)?.i18n || [] as l (l.lang)}
	<div> -->
<hb-input-radio
	schemaentry={JSON.stringify({
		id: $pageName + '_lang_chooser',
		params: {
			options: ($allComponentsMetas.find((f) => f.name === $pageName)?.i18n || []).map((m) => {
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
<!-- </div>
{/each} -->
