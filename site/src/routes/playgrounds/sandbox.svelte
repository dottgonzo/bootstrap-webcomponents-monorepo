<script lang="ts">
	import { addComponent } from '@htmlbricks/hb-jsutils';
	import { allComponentsMetas } from '../../stores/components';

	import { page } from '$app/stores';
	import { componentsVersion, pageName } from '../../stores/app';
	import { onMount } from 'svelte';
	import dayjs from 'dayjs';
	let name: string;

	let args: any;

	let com: string;
	let meta;
	$: {
		name = $page.url?.href?.split('c=')?.[1]?.split('&')[0];
		const paramsBase64 = $page.url?.href?.split('p=')?.[1]?.split('&')[0];
		const htmlSlot64 = $page.url?.href?.split('s=')?.[1]?.split('&')[0];
		// const lang = $page.url?.href?.split('i18n=')?.[1]?.split('&')[0];
		pageName.set(name || 'docs');
		if (name) {
			let htmlSlots: { name: string; content: string }[];
			if (htmlSlot64) htmlSlots = JSON.parse(decodeURIComponent(htmlSlot64));
			args = paramsBase64 ? JSON.parse(decodeURIComponent(paramsBase64)) : {};
			meta = $allComponentsMetas?.find((f) => f.name === name);

			com = `<hb-${name} id="com-${name}"`;
			// if (lang && !args?.['i18nlang'] && meta?.i18n?.length) {
			// 	com += ` i18nlang="${lang}"`;
			// }
			if (args) {
				for (const k of Object.keys(args)) {
					switch (typeof args[k]) {
						case 'number':
						case 'string':
							if (args[k]) com += ` ${k}="${args[k]}"`;
							break;
						case 'boolean':
							com += ` ${k}="${args[k] ? 'yes' : 'no'}"`;
							break;
						case 'object':
							com += ` ${k}='${JSON.stringify(args[k])}'`;
							break;
					}
				}
			}

			com += ` >`;
			if (htmlSlots && htmlSlots.length) {
				for (const sl of htmlSlots) {
					com += `<div slot="${sl.name}">${sl.content}</div>`;
				}
			}

			com += `</hb-${name}>`;
		}
	}
	onMount(() => {
		if (name) addComponent(name, $componentsVersion);
		console.log('ss', $allComponentsMetas, name);
		if (meta?.definition?.definitions?.Events?.properties) {
			for (const eve of Object.keys(meta.definition.definitions.Events.properties)) {
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
