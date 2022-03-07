<script lang="ts">
	import ComponentManager from '../../components/ComponentManager.svelte';
	import { page } from '$app/stores';

	import { pageName } from '../../stores/app';
	let name: string;

	$: {
		name = $page.url?.href?.split('c=')?.[1]?.split('&')[0];
		pageName.set(name || 'docs');
	}
</script>

{#if name}
	<ComponentManager {name} />
{/if}
