<script lang="ts">
	import { goto } from '$app/navigation';
	import type { INavLink } from '@htmlbricks/hb-offcanvas/release/webcomponent.type';
	import { addComponent } from '@htmlbricks/hb-jsutils';
	import { onMount } from 'svelte';
	import components from '../../components.json';
	import { pageName } from '../../stores/app';

	const navlinks = (): INavLink[] => {
		const home: INavLink = {
			key: 'main',
			label: 'home',
			group: 'Site'
		};

		const arr: INavLink[] = [home];

		components.categories.forEach((g) => {
			const subLinks: INavLink[] = [];
			g.components.forEach((c) => {
				const navLink: INavLink = {
					key: c.name,
					label: c.label || c.name
				};
				subLinks.push(navLink);
			});
			const navLink: INavLink = {
				key: g.name,
				label: g.label || g.name,
				group: 'components',
				subLinks
			};
			arr.push(navLink);
		});
		return arr;
	};

	onMount(() => {
		addComponent('layout', 'latest');
		addComponent('area-code', 'latest');
	});
	function pageChange(d) {
		goto('/components/' + d.page);
		console.log(d);
	}
</script>

<hb-layout
	pagename={$pageName}
	companytitle=""
	companylogouri=""
	cookielaw=""
	navlinks={JSON.stringify(navlinks())}
	on:pagechange={(e) => pageChange(e.detail)}
>
	<div style="margin:auto;max-width:1000px" slot="page">
		<slot />
	</div>
</hb-layout>
