<script lang="ts">
	import { addComponent, type CssVar } from '@htmlbricks/hb-jsutils';
	import { allComponentsMetas } from '../../stores/components';
	import { page } from '$app/stores';
	import { pageName } from '../../stores/app';
	import { onMount } from 'svelte';
	import dayjs from 'dayjs';
	let name: string;
	let cssVars: { name: string; value: string }[];
	let cssParts: { name: string; content: string }[];

	let args: any;
	let version: string;
	let com: string;
	let meta;
	$: {
		name = $page.url?.href?.split('component=')?.[1]?.split('&')[0];
		version = $page.url?.href?.split('version=')?.[1]?.split('&')[0];
		const paramsBase64 = $page.url?.href?.split('params=')?.[1]?.split('&')[0];
		const htmlSlot64 = $page.url?.href?.split('slots=')?.[1]?.split('&')[0];
		const cssVars64 = $page.url?.href?.split('css=')?.[1]?.split('&')[0];
		const cssParts64 = $page.url?.href?.split('parts=')?.[1]?.split('&')[0];

		// const lang = $page.url?.href?.split('i18n=')?.[1]?.split('&')[0];
		pageName.set(name || 'docs');
		if (name) {
			let htmlSlots: { name: string; content: string }[];
			if (htmlSlot64) htmlSlots = JSON.parse(decodeURIComponent(htmlSlot64));
			if (cssVars64) cssVars = JSON.parse(decodeURIComponent(cssVars64));
			if (cssParts64) cssParts = JSON.parse(decodeURIComponent(cssParts64));
			args = paramsBase64 ? JSON.parse(decodeURIComponent(paramsBase64)) : {};
			meta = $allComponentsMetas?.find((f) => f.name === 'hb-' + name);

			com = '';
			if (cssParts?.length) {
				com += '<sty' + 'le>';
				for (const p of cssParts) {
					com += `hb-${$pageName}::part(${p.name}){${p.content}}`;
				}
				com += '</sty' + 'le>';
			}

			com += `<hb-${name} id="com-${name}"`;
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
			if (cssVars && cssVars.length) {
				com += ` style="`;
				for (const css of cssVars) {
					com += `${css.name}:${css.value};`;
				}
				com += `"`;
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
		if (name && version) addComponent(name, version);
		console.log('ss', $allComponentsMetas, name);
		if (name && version && meta?.definition?.definitions?.Events?.properties) {
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
