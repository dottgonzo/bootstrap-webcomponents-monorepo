<script lang="ts">
	import ComponentManager from '../../components/ComponentManager.svelte';
	import { page } from '$app/stores';

	import { pageName } from '../../stores/app';
	let name: string;
	console.log('page', name);

	$: {
		name = $page.url?.search?.split('c=')?.[1]?.split('&')[0];
		pageName.set(name);
	}
</script>

<ComponentManager {name} />
