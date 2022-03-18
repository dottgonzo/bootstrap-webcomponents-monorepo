<script lang="ts">
	import ControlTable from '../../components/ControlTable.svelte';
	import PropsTable from '../../components/PropsTable.svelte';
	import SlotTable from '../../components/SlotTable.svelte';
	import InfoTable from '../../components/InfoTable.svelte';
	import InstallTable from '../../components/InstallTable.svelte';
	import I18nTable from '../../components/LangTable.svelte';
	import CssPartsTable from '../../components/CssPartsTable.svelte';
	import CssVarsTable from '../../components/CssVarsTable.svelte';
	import EventsTable from '../../components/EventsTable.svelte';
	import { allComponentsMetas } from '../../stores/components';
	import { allComponentsExampleValues } from '../../stores/examples';
	import { componentsVersion, lang } from '../../stores/app';
	import { events, htmlSlotsContents, cssVarsValues, cssPartsContents } from '../../stores/events';
	import { page } from '$app/stores';

	import type { HtmlSlot, StyleSetup, i18nLang } from '@htmlbricks/hb-jsutils/main';

	import { pageName } from '../../stores/app';
	import { bootstrapThemeCssVars } from '../../stores/themes';
	let name: string;
	let storybookargs: any;
	let definition: any;

	let styleSetup: StyleSetup;
	let htmlSlots: HtmlSlot[];
	let i18nLangs: i18nLang[];

	let controlTab: 'props' | 'schemes' | 'events' | 'style' | 'slots' | 'install' | 'i18n' | 'info';

	let com: string;
	let cdnUri: string;
	let args: string;
	let lastName: string;
	let i18nlang: string;
	let allCssVars: { name: string; value: string }[];
	$: {
		name = $page.url?.href?.split('c=')?.[1]?.split('&')[0];
		if (!lastName || lastName !== name) {
			lastName = name;
			controlTab = 'info';
		}
		pageName.set(name || 'docs');
		const meta = $allComponentsMetas.find((f) => f.name === name);
		storybookargs = meta?.storybookArgs;
		definition = meta?.definition;

		styleSetup = meta?.styleSetup;
		htmlSlots = meta?.htmlSlots;
		i18nLangs = meta?.i18n;

		args = $allComponentsExampleValues[name];

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
		if (
			styleSetup.vars &&
			styleSetup.vars.filter((f) => typeof f.defaultValue !== 'undefined').length
		) {
			com += ` style="`;
			for (const css of styleSetup.vars.filter((f) => typeof f.defaultValue !== 'undefined')) {
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

		com += `</hb-${name}>`;

		com += ` />`;
		cdnUri = `<${'script'} id="hb-${name}-script" src="https://cdn.jsdelivr.net/npm/@htmlbricks/hb-${name}@${$componentsVersion}/release/release.js"></${'script'}>`;

		allCssVars = $cssVarsValues
			.filter((f) => f.component === name)
			?.map((m) => {
				return { name: m.name, value: m.value };
			});
		if (meta.styleSetup.themes.includes('bootstrap')) allCssVars.concat($bootstrapThemeCssVars);
	}
</script>

{#if name && args}
	<div style="margin-top:40px; padding-right:0px" class="row">
		<div class="col-7">
			<div style="margin-top:40px">
				<div style="padding:10px;border:1px solid yellow;margin-top:20px">
					<iframe
						style="width:100%;height:600px"
						title="component"
						src="/playgrounds/sandbox?slots={$htmlSlotsContents.filter((f) => f.component === name)
							?.length
							? encodeURIComponent(
									JSON.stringify($htmlSlotsContents.filter((f) => f.component === name))
							  )
							: ''}&css={allCssVars.length
							? encodeURIComponent(JSON.stringify(allCssVars))
							: ''}&component={name}&params={encodeURIComponent(
							JSON.stringify(args)
						)}&parts={encodeURIComponent(
							JSON.stringify($cssPartsContents.filter((f) => f.component === name))
						)}"
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
						class="nav-link {styleSetup.vars?.length || styleSetup?.parts?.length
							? ''
							: 'disabled'} {controlTab === 'style' ? 'active' : ''}">style</button
					>
				</li>
				<li class="nav-item">
					<button
						on:click={() => {
							controlTab = 'slots';
						}}
						class="nav-link {htmlSlots?.length ? '' : 'disabled'} {controlTab === 'slots'
							? 'active'
							: ''}"
						>slots <span
							style={$htmlSlotsContents?.filter((f) => f.component === $pageName).length
								? 'color:red;'
								: ''}
							class="badge bg-secondary"
							>{$htmlSlotsContents?.filter((f) => f.component === $pageName).length ||
								0}/{htmlSlots?.length || 0}</span
						></button
					>
				</li>
				<li class="nav-item">
					<button
						on:click={() => {
							controlTab = 'i18n';
						}}
						class="nav-link {i18nLangs?.length ? '' : 'disabled'} {controlTab === 'i18n'
							? 'active'
							: ''}"
						>i18n

						<span
							style={$lang && i18nLangs?.length ? 'color:black;' : ''}
							class="badge bg-secondary">{$lang ? $lang : ''} | {i18nLangs?.length || 0}</span
						>
					</button>
				</li>
				<li class="nav-item">
					<button
						on:click={() => {
							controlTab = 'events';
						}}
						class="nav-link position-relative {definition?.definitions?.Events?.properties &&
						Object.keys(definition.definitions.Events.properties)?.length
							? ''
							: 'disabled'} {controlTab === 'events' ? 'active' : ''}"
						>events
						{#if $events?.filter((f) => f.component === name)?.length && definition?.definitions?.Events?.properties && Object.keys(definition.definitions.Events.properties)?.length}
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
					{#if controlTab === 'props'}
						<ControlTable {definition} {storybookargs} bind:args />
					{:else if controlTab === 'info'}
						<InfoTable />
					{:else if controlTab === 'install'}
						<InstallTable {com} cdn={cdnUri} />
					{:else if controlTab === 'schemes'}
						<PropsTable {definition} {storybookargs} />
					{:else if controlTab === 'events'}
						<EventsTable {definition} />
					{:else if controlTab === 'i18n'}
						<I18nTable bind:args />
					{:else if controlTab === 'slots'}
						<SlotTable slots={htmlSlots} />
					{:else if controlTab === 'style'}
						{#if styleSetup?.vars?.length}<CssVarsTable vars={styleSetup.vars} />{/if}
						{#if styleSetup?.parts?.length}<CssPartsTable parts={styleSetup.parts} />{/if}
					{/if}
				</div>
			</div>
			<!-- {@html com} -->
		</div>
	</div>
{/if}

<style lang="scss">
</style>
