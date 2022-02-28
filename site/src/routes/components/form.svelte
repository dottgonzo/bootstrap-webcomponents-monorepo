<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { addComponent } from '@htmlbricks/hb-jsutils';

	import { pageName } from '../../stores/app';
	pageName.set('form');

	onMount(() => {
		addComponent('form', 'latest');
	});
</script>

<hb-form />
