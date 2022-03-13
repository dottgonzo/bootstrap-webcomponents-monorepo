<script lang="ts">
	import { addComponent } from '@htmlbricks/hb-jsutils';
	import base64 from 'base-64';
	import { allComponentsMetas } from '../../stores/components';

	import { page } from '$app/stores';
	import { componentsVersion, pageName } from '../../stores/app';
	import { onMount } from 'svelte';
	let name: string;

	let args: any;

	let com: string;
	let meta;
	$: {
		name = $page.url?.href?.split('c=')?.[1]?.split('&')[0];
		const paramsBase64 = $page.url?.href?.split('p=')?.[1]?.split('&')[0];
		pageName.set(name || 'docs');
		if (name) {
			args = paramsBase64 ? JSON.parse(base64.decode(paramsBase64)) : {};

			com = `<hb-${name} id="com-${name}"`;
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

			com += ` />`;
			meta = $allComponentsMetas.find((f) => f.name === name);
		}
	}
	onMount(() => {
		if (name) addComponent(name, $componentsVersion);
		console.log('ss', $allComponentsMetas, name);
		if (meta?.definition?.definitions?.Events?.properties) {
			for (const eve of Object.keys(meta.definition.definitions.Events.properties)) {
				const el = document.getElementById(`com-${name}`);
				el.addEventListener(eve, (e: any) => {
					const items = JSON.parse(localStorage.getItem('componentsEvents') || '[]');
					const unixtime = Date.now();
					items.push({
						name: eve,
						component: name,
						data: e.detail,
						_id: unixtime + '_' + items.length,
						unixtime
					});
					localStorage.setItem('componentsEvents', JSON.stringify(items));
					console.log(e.detail);
				});
			}
		}
	});
</script>

{@html com}
