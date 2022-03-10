<script lang="ts">
	import { goto } from '$app/navigation';
	import type { INavLink } from '@htmlbricks/hb-sidenav-link/release/webcomponent.type';
	import { addComponent } from '@htmlbricks/hb-jsutils';
	import { onMount } from 'svelte';

	import { pageName } from '../../stores/app';
	import { allComponentsMetas } from '../../stores/components';

	const navlinks = (): INavLink[] => {
		const home: INavLink = {
			key: 'main',
			label: 'home',
			group: 'Site',
			active: false,
			icon: 'house-door'
		};
		const components: INavLink = {
			key: 'components',
			label: 'components',
			group: 'Site',
			active: false,
			icon: 'grid-3x3-gap'
		};
		const arr: INavLink[] = [home, components];
		let cats: string[] = [];

		$allComponentsMetas.forEach((f) => {
			if (!cats.includes(f.category)) cats.push(f.category);
		});

		cats.forEach((f) => {
			let catIcon;
			switch (f) {
				case 'basic':
					catIcon = 'puzzle';
					break;

				case 'dev':
					catIcon = 'code';
					break;
				case 'layout':
					catIcon = 'grid-1x2';
					break;
				case 'form':
					catIcon = 'input-cursor-text';

					break;
			}

			const subLinks: INavLink[] = $allComponentsMetas
				.filter((fi) => fi.category === f)
				.map((m) => {
					const navLink: INavLink = {
						key: m.name,
						label: m.name,
						active: false
					};
					return navLink;
				});

			const navLink: INavLink = {
				key: f,
				label: f,
				group: 'components',
				subLinks,
				active: false,
				icon: catIcon
			};
			arr.push(navLink);
		});

		// components.categories.forEach((g) => {
		// 	const subLinks: INavLink[] = [];
		// 	g.components.forEach((c) => {
		// 		const navLink: INavLink = {
		// 			key: c.name,
		// 			label: c.label || c.name,
		// 			active: false
		// 		};
		// 		subLinks.push(navLink);
		// 	});
		// 	const navLink: INavLink = {
		// 		key: g.name,
		// 		label: g.label || g.name,
		// 		group: 'components',
		// 		subLinks,
		// 		active: false
		// 	};
		// 	arr.push(navLink);
		// });
		return arr;
	};

	onMount(() => {
		addComponent('bundle', 'latest');
	});
	function pageChange(d) {
		goto('/components/doc?c=' + d.page);
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
