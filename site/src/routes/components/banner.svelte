<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { addComponent } from '@htmlbricks/hb-jsutils';

	import { pageName } from '../../stores/app';
	import bannerDefinition from '@htmlbricks/hb-banner/release/webcomponent.type.d.json';
	import { storybookArgs } from '@htmlbricks/hb-banner/release/docs';

	import PropsTable from '../../components/propsTable.svelte';

	pageName.set('banner');

	onMount(() => {
		addComponent('banner', 'latest');
	});
	console.log(bannerDefinition.definitions.Component.properties, storybookArgs);
</script>

<hb-banner title="tit" />
<hb-area-code content={`<hb-banner title="tit" />`} />

<PropsTable name="banner" definition={bannerDefinition} />
