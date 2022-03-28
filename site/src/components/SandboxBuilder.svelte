<script lang="ts">
	import { addComponent, type ComponentSetup } from '@htmlbricks/hb-jsutils';
	import { onMount } from 'svelte';
	import dayjs from 'dayjs';

	export let name: string;
	export let version: string;
	export let meta: ComponentSetup;
	export let com: string;

	onMount(() => {
		if (name && version && meta?.repoName)
			addComponent({ repoName: meta.repoName, version, iifePath: meta.iifePath });
		if (name && version && meta?.definitions?.events?.definitions?.Events?.properties) {
			for (const eve of Object.keys(meta.definitions.events.definitions.Events.properties)) {
				const el = document.getElementById(`com-${name}`);
				el.addEventListener(eve, (e: any) => {
					let items = JSON.parse(localStorage.getItem('componentsEvents') || '[]');
					if (items.length > 1000) items.length = 1000;
					// remove older then 2 days
					items = items.filter((f) => f.unixtime > dayjs().subtract(2, 'days').valueOf());
					const unixtime = Date.now();
					items.push({
						name: eve,
						component: name,
						data: e.detail,
						_id: unixtime + '_' + items.length,
						unixtime,
						seq: items?.[0]?.seq ? items[0].seq + 1 : 1
					});
					items = items.sort((a, b) => b.seq - a.seq);
					localStorage.setItem('componentsEvents', JSON.stringify(items));
				});
			}
		}
	});
</script>

<div style="border:1px solid yellow">
	{@html com}
</div>
