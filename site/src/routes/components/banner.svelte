<script lang="ts">
	import { pageName } from '../../stores/app';

	import ComponentManager from '../../components/ComponentManager.svelte';

	const name = 'banner';

	pageName.set(name);

	let args = {
		title: 'ciao',
		description: 'desc'
	};
</script>

<ComponentManager {name} {args} />
