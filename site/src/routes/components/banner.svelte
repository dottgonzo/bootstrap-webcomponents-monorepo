<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { addComponent } from '@htmlbricks/hb-jsutils';

	import { pageName } from '../../stores/app';
	import bannerDefinition from '@htmlbricks/hb-banner/release/webcomponent.type';
	pageName.set('banner');

	onMount(() => {
		addComponent('banner', 'latest');
		addComponent('table', 'latest');
	});
</script>

<hb-banner title="tit" />

<code>code</code>

<hb-table />
