<script>
	import { goto } from '$app/navigation';

	import { addComponent } from '@htmlbricks/hb-jsutils';
	import { onMount } from 'svelte';
	import components from '../../components.json';

	const navlinks = () => {
		const arr = components.map((m) => {
			const navLink = {
				key: m.name,
				label: m.label || m.name
			};
			return navLink;
		});
		return arr;
	};

	onMount(() => {
		addComponent('layout', 'latest');
	});
	function pageChange(d) {
		goto('/components/' + d.page);
		console.log(d);
	}
</script>

<hb-layout
	navpage=""
	companytitle=""
	companylogouri=""
	cookielaw=""
	navlinks={JSON.stringify(navlinks())}
	on:pagechange={(e) => pageChange(e.detail)}
>
	<slot />
</hb-layout>
