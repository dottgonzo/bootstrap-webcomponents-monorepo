<script lang="ts">
	import { page } from '$app/stores';
	import { pageName } from '../../stores/app';
	import SandboxBuilder from '../../components/SandboxBuilder.svelte';
	let name: string;
	let cssVars: { name: string; value: string }[];
	let cssParts: { name: string; content: string }[];

	let args: any;
	let version: string;
	let com: string;
	let meta;
	let lastLoadId = 'none';

	async function loadMeta(name: string, version: string) {
		meta = null;
		try {
			const pageraw = await fetch(
				`https://cdn.jsdelivr.net/npm/@htmlbricks/${name}@${version}/release/manifest.json`
			);
			meta = await pageraw.json();
			console.log(meta);
		} catch (err) {
			console.warn(`failed to fetch manifest for ${$pageName}`);
		}
	}
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

			const tmpLoadId = name + '_' + version;
			if (name && !meta && tmpLoadId !== lastLoadId && version) {
				meta = null;
				loadMeta(name, version).catch(console.error);
				lastLoadId = tmpLoadId;
			}

			if (meta) {
				com = '';
				if (cssParts?.length) {
					com += '<sty' + 'le>';
					for (const p of cssParts) {
						com += `${$pageName}::part(${p.name}){${p.content}}`;
					}
					com += '</sty' + 'le>';
				}

				com += `<${name} id="com-${name}"`;
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

				com += `</${name}>`;
			}
		}
	}
</script>

{#if meta}
	<SandboxBuilder {meta} {name} {version} {com} />
{/if}
