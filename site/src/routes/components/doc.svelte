<script lang="ts">
	import AllSchemeTable from '../../components/AllSchemesTable.svelte';
	import ControlTable from '../../components/ControlTable.svelte';
	import PropsTable from '../../components/PropsTable.svelte';
	import SlotTable from '../../components/SlotTable.svelte';
	import InfoTable from '../../components/InfoTable.svelte';
	import InstallTable from '../../components/InstallTable.svelte';
	import I18nTable from '../../components/LangTable.svelte';
	import CssPartsTable from '../../components/CssPartsTable.svelte';
	import CssVarsTable from '../../components/CssVarsTable.svelte';
	import EventsTable from '../../components/EventsTable.svelte';
	import { componentsVersion, debugVersion, lang, componentsList } from '../../stores/app';
	import { events, htmlSlotsContents, cssVarsValues, cssPartsContents } from '../../stores/events';
	import { page } from '$app/stores';
	import compareVersions from 'compare-versions';
	import type { ComponentSetup } from '@htmlbricks/hb-jsutils';

	// import { getAbbreviatedPackument } from 'query-registry';

	import { pageName } from '../../stores/app';

	let name: string;

	let controlTab: 'props' | 'schemes' | 'events' | 'style' | 'slots' | 'install' | 'i18n' | 'info';

	let com: string;
	let cdnUri: string;
	let args: string;
	let lastName: string;
	let allCssVars: { name: string; value: string }[];
	let meta: ComponentSetup;

	let lastLoadId = 'none';

	async function loadMeta(repoName: string, version: string) {
		meta = null;
		try {
			const pageraw = await fetch(
				`https://cdn.jsdelivr.net/npm/${repoName}@${version}/release/manifest.json`
			);
			meta = await pageraw.json();
		} catch (err) {
			console.warn(`failed to fetch manifest for ${$pageName}`);
		}
	}
	let componentVersions: { name: string; versions: string[] };
	async function getComponentVersions(repoName: string) {
		try {
			const pageraw = await fetch(`https://registry.npmjs.cf/${repoName}`);
			const jsonfetched = await pageraw.json();

			const availableVersions = Object.keys(jsonfetched.versions).filter((f) =>
				compareVersions.compare(f, '0.9.1', '>')
			);

			componentVersions = {
				name,
				versions: availableVersions
			};
		} catch (err) {
			console.warn(`failed to fetch npm versions for ${$pageName}`);
		}
	}
	let shortMeta: Partial<ComponentSetup>;
	$: {
		name = $page.url?.href?.split('c=')?.[1]?.split('&')[0];
		if (!componentVersions || componentVersions.name !== name) {
			shortMeta = $componentsList.packages.find((f) => f.name === name);
			getComponentVersions(shortMeta.repoName).catch(console.error);
		}
		if ($page.url?.href?.split?.('version=')?.[1]?.split?.('&')?.[0]?.length) {
			debugVersion.set($page.url.href.split('version=')[1].split('&')[0]);
		} else {
			debugVersion.set($componentsVersion);
		}
		if (!lastName || lastName !== name) {
			lastName = name;
			controlTab = 'info';
		}
		pageName.set(name || 'docs');
		const tmpLoadId = name + '_' + $debugVersion;
		if (name && (!meta || tmpLoadId !== lastLoadId) && $debugVersion) {
			meta = null;
			loadMeta(shortMeta.repoName, $debugVersion).catch(console.error);
			lastLoadId = tmpLoadId;
		}

		// i18nLangs = meta?.i18n;
		if (meta) {
			args = meta.examples[0];

			com = '';
			if ($cssPartsContents.filter((f) => f.component === name)?.length) {
				com += '<sty' + 'le>';
				for (const p of $cssPartsContents.filter((f) => f.component === name)) {
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
			if (
				meta.styleSetup?.vars &&
				meta.styleSetup.vars.filter((f) => typeof f.defaultValue !== 'undefined').length
			) {
				com += ` style="`;
				for (const css of meta.styleSetup.vars.filter(
					(f) => typeof f.defaultValue !== 'undefined'
				)) {
					com += `${css.name}:${css.defaultValue};`;
				}
				com += `"`;
			}
			com += ` >`;
			if ($htmlSlotsContents.filter((f) => f.component === name)?.length) {
				for (const sl of $htmlSlotsContents.filter((f) => f.component === name)) {
					com += `<div slot="${sl.name}">${sl.content}</div>`;
				}
			}

			com += `</${name}>`;

			com += ` />`;
			cdnUri = `<${'script'} id="${name}-script" src="https://cdn.jsdelivr.net/npm/@htmlbricks/${name}@${$componentsVersion}/release/release.js"></${'script'}>`;

			allCssVars = $cssVarsValues
				.filter((f) => f.component === name)
				?.map((m) => {
					return { name: m.name, value: m.value };
				});
			// if (meta.styleSetup.themes.includes('bootstrap')) {
			// 	const toAdd = $globalCssVarsValues.filter(
			// 		(f) => !allCssVars.find((ff) => ff.name === f.name)
			// 	);

			// 	allCssVars.concat(toAdd);
			// }
		}
	}
	function setVersion(e: { detail: { value: string } }) {
		if (e?.detail?.value) {
			const ver = e.detail.value;
			if (compareVersions.validate(ver)) {
				if (ver !== $debugVersion) {
					if (ver === $componentsVersion && location.href.includes('version')) {
						location.href =
							location.href.split('&version=')[0] +
							(location.href.split('&version=')[1].split('&')?.[1] || '');
					} else if (location.href.includes('version')) {
						location.href =
							location.href.split('&version=')[0] +
							'&version=' +
							ver +
							(location.href.split('&version=')[1].split('&')?.[1] || '');
					} else {
						location.href = location.href + '&version=' + ver;
					}
				}
			}
		}
	}
</script>

<div class="container-fluid">
	{#if name && meta && args}
		<div style="margin-top:40px; padding-right:0px" class="row">
			<div class="col-7">
				<div>
					<h3 style="text-align:center">
						{$pageName} version
						{#if componentVersions?.versions?.length && Array.isArray(componentVersions.versions)}
							<hb-input-select
								style="width:150px;display:inline-block;"
								schemaentry={JSON.stringify({
									id: 'selectversion',
									params: {
										options: componentVersions?.versions.map((m) => {
											return {
												value: m,
												label: m + (m === $componentsVersion ? ' (latest)' : '')
											};
										})
									},
									value: $debugVersion
								})}
								on:setValue={setVersion}
							/>
						{:else}
							{$debugVersion}
						{/if}
					</h3>
					<div style="padding:10px;border:1px solid yellow;margin-top:20px">
						<iframe
							style="width:100%;height:600px"
							title="component"
							src="/playgrounds/sandbox?slots={$htmlSlotsContents.filter(
								(f) => f.component === name
							)?.length
								? encodeURIComponent(
										JSON.stringify($htmlSlotsContents.filter((f) => f.component === name))
								  )
								: ''}&css={allCssVars.length
								? encodeURIComponent(JSON.stringify(allCssVars))
								: ''}&component={name}&params={encodeURIComponent(
								JSON.stringify(args)
							)}&parts={encodeURIComponent(
								JSON.stringify($cssPartsContents.filter((f) => f.component === name))
							)}&version={$debugVersion}"
						/>
					</div>
				</div>
			</div>
			<div style="padding-right:0px" class="col-5">
				<ul class="nav nav-tabs">
					<li class="nav-item">
						<button
							class="nav-link {controlTab === 'info' ? 'active' : ''}"
							on:click={() => {
								controlTab = 'info';
							}}>info</button
						>
					</li>
					<li class="nav-item">
						<button
							class="nav-link {controlTab === 'install' ? 'active' : ''}"
							on:click={() => {
								controlTab = 'install';
							}}>install</button
						>
					</li>
					<li class="nav-item">
						<button
							class="nav-link {controlTab === 'props' ? 'active' : ''}"
							on:click={() => {
								controlTab = 'props';
							}}>props</button
						>
					</li>
					<li class="nav-item">
						<button
							class="nav-link {controlTab === 'schemes' ? 'active' : ''}"
							on:click={() => {
								controlTab = 'schemes';
							}}>schemes</button
						>
					</li>

					<li class="nav-item">
						<button
							on:click={() => {
								controlTab = 'style';
							}}
							class="nav-link {meta.styleSetup?.vars?.length || meta.styleSetup?.parts?.length
								? ''
								: 'disabled'} {controlTab === 'style' ? 'active' : ''}">style</button
						>
					</li>
					<li class="nav-item">
						<button
							on:click={() => {
								controlTab = 'slots';
							}}
							class="nav-link {meta.htmlSlots?.length ? '' : 'disabled'} {controlTab === 'slots'
								? 'active'
								: ''}"
							>slots <span
								style={$htmlSlotsContents?.filter((f) => f.component === $pageName).length
									? 'color:red;'
									: ''}
								class="badge bg-secondary"
								>{$htmlSlotsContents?.filter((f) => f.component === $pageName).length || 0}/{meta
									.htmlSlots?.length || 0}</span
							></button
						>
					</li>
					<li class="nav-item">
						<button
							on:click={() => {
								controlTab = 'i18n';
							}}
							class="nav-link {meta?.i18n?.length ? '' : 'disabled'} {controlTab === 'i18n'
								? 'active'
								: ''}"
							>i18n

							<span
								style={$lang && meta?.i18n?.length ? 'color:black;' : ''}
								class="badge bg-secondary">{$lang ? $lang : ''} | {meta?.i18n?.length || 0}</span
							>
						</button>
					</li>
					<li class="nav-item">
						<button
							on:click={() => {
								controlTab = 'events';
							}}
							class="nav-link position-relative {meta?.definitions?.events?.definitions?.Events
								?.properties &&
							Object.keys(meta.definitions.events.definitions.Events.properties)?.length
								? ''
								: 'disabled'} {controlTab === 'events' ? 'active' : ''}"
							>events
							{#if $events?.filter((f) => f.component === name)?.length && meta?.definitions?.events?.definitions?.Events?.properties && Object.keys(meta.definitions.events.definitions.Events.properties)?.length}
								<span
									class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
								>
									{#if !$events?.filter((f) => f.component === name)?.length}
										0
									{:else if $events?.filter((f) => f.component === name)?.length < 100}
										{$events?.filter((f) => f.component === name)?.length?.toString()}
									{:else}
										99+
									{/if}

									<span class="visually-hidden">unread messages</span>
								</span>
							{/if}
						</button>
					</li>
				</ul>
				<div style="border-left: 1px solid #dee2e6;min-height:100%;padding:0px 20px 0px 20px">
					<div style="padding-top:20px">
						{#if controlTab === 'props' && meta?.definitions?.component}
							<ControlTable
								definition={meta.definitions.component}
								storybookargs={meta.storybookArgs}
								bind:args
							/>
						{:else if controlTab === 'info'}
							<InfoTable />
						{:else if controlTab === 'install'}
							<InstallTable {com} cdn={cdnUri} />
						{:else if controlTab === 'schemes'}
							<PropsTable
								definition={meta.definitions.component}
								storybookargs={meta.storybookArgs}
							/>
							<AllSchemeTable definition={meta.definitions.component} />
						{:else if controlTab === 'events'}
							<EventsTable definition={meta.definitions.events} />
						{:else if controlTab === 'i18n'}
							<I18nTable {meta} bind:args />
						{:else if controlTab === 'slots'}
							<SlotTable slots={meta.htmlSlots} />
						{:else if controlTab === 'style'}
							{#if meta.styleSetup?.parts?.length}
								<div>
									<CssPartsTable parts={meta.styleSetup.parts} />
								</div>
							{/if}
							{#if meta.styleSetup?.vars?.length}
								<div>
									<CssVarsTable vars={meta.styleSetup.vars} />
								</div>
							{/if}
						{/if}
					</div>
				</div>
				<!-- {@html com} -->
			</div>
		</div>
	{:else}
		loading
	{/if}
</div>

<style lang="scss">
</style>
