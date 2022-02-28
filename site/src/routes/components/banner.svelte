<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { addComponent } from '@htmlbricks/hb-jsutils';

	import { pageName } from '../../stores/app';
	pageName.set('banner');

	onMount(() => {
		addComponent('banner', 'latest');
	});
</script>

<hb-banner title="tit" />
