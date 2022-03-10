<script lang="ts">
	import { addComponent } from '@htmlbricks/hb-jsutils';
	import base64 from 'base-64';

	import { page } from '$app/stores';
	import { componentsVersion, pageName } from '../../stores/app';
	import { onMount } from 'svelte';
	let name: string;

	let args: any;

	let com: string;
	$: {
		name = $page.url?.href?.split('c=')?.[1]?.split('&')[0];
		const paramsBase64 = $page.url?.href?.split('p=')?.[1]?.split('&')[0];
		pageName.set(name || 'docs');

		args = paramsBase64 ? JSON.parse(base64.decode(paramsBase64)) : {};

		com = '<hb-' + name;
		if (args) {
			for (const k of Object.keys(args)) {
				switch (typeof args[k]) {
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
	}
	onMount(() => {
		if (name) addComponent(name, $componentsVersion);
	});
</script>

{@html com}
