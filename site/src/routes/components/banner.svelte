<script lang="ts">
	import { onMount } from 'svelte';
	import { addComponent } from '@htmlbricks/hb-jsutils';

	import { pageName } from '../../stores/app';

	import ComponentManager from '../../components/ComponentManager.svelte';

	const pageComponent = 'banner';
	import definition from '@htmlbricks/hb-banner/release/webcomponent.type.d.json';
	import { storybookArgs as storybookargs } from '@htmlbricks/hb-banner/release/docs';
	pageName.set(pageComponent);

	onMount(() => {
		addComponent(pageComponent, 'latest');
	});
	console.log(definition.definitions.Component.properties, storybookargs);

	let args = {
		title: 'ciao',
		description: 'desc'
	};
</script>

<ComponentManager name={pageComponent} {args} {definition} {storybookargs} />
