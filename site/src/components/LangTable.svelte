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

{#each $allComponentsMetas[$pageName].i18nLanguages as l (l.lang)}
	<div>{l.lang}</div>
{/each}
