<script lang="ts">
	import ControlTable from '../../components/ControlTable.svelte';
	import PropsTable from '../../components/PropsTable.svelte';
	import EventsTable from '../../components/EventsTable.svelte';
	import { allComponentsMetas } from '../../stores/components';
	import { allComponentsExampleValues } from '../../stores/components';
	import base64 from 'base-64';
	import { componentsVersion } from '../../stores/app';
	import { page } from '$app/stores';

	import { pageName } from '../../stores/app';
	let name: string;
	let storybookargs: any;
	let definition: any;

	let controlTab: 'props' | 'schemes' | 'events' | 'style' | 'slots' = 'props';

	let com: string;
	let cdnUri: string;
	let args: string;
	$: {
		name = $page.url?.href?.split('c=')?.[1]?.split('&')[0];
		pageName.set(name || 'docs');
		storybookargs = $allComponentsMetas.find((f) => f.name === name)?.storybookArgs;
		definition = $allComponentsMetas.find((f) => f.name === name)?.definition;
		args = $allComponentsExampleValues[name];
		com = '<hb-' + name;
		if (args) {
			for (const k of Object.keys(args)) {
				switch (typeof args[k]) {
					case 'string':
					case 'number':
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
		cdnUri = `<${'script'} src="https://cdn.jsdelivr.net/npm/@htmlbricks/hb-${name}@${$componentsVersion}/release/release.js"></${'script'}>`;
	}
</script>

{#if name}
	<div style="margin-top:40px; padding-right:0px" class="row">
		<div class="col-7">
			<div style="margin-top:40px"><hb-area-code content={cdnUri} /></div>

			<iframe
				style="width:100%;height:600px;margin-top:20px;border:1px solid yellow"
				title="component"
				src="/playgrounds/sandbox?c={name}&p={base64.encode(JSON.stringify(args))}"
			/>
			<div style="margin-top:20px"><hb-area-code content={com} /></div>
		</div>
		<div style="padding-right:0px" class="col-5">
			<ul class="nav nav-tabs">
				<li class="nav-item">
					<button
						class="nav-link {controlTab === 'props' ? 'active' : ''}"
						aria-current="page"
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
				<li class="nav-item {controlTab === 'events' ? 'active' : ''}">
					<button
						on:click={() => {
							controlTab = 'events';
						}}
						class="nav-link disabled">events</button
					>
				</li>
				<li class="nav-item {controlTab === 'style' ? 'active' : ''}">
					<button
						on:click={() => {
							controlTab = 'style';
						}}
						class="nav-link disabled">style</button
					>
				</li>
				<li class="nav-item {controlTab === 'slots' ? 'active' : ''}">
					<button
						on:click={() => {
							controlTab = 'slots';
						}}
						class="nav-link disabled">slots</button
					>
				</li>
			</ul>
			<div style="border-left: 1px solid #dee2e6;min-height:100%;padding:0px 20px 0px 20px">
				<div style="padding-top:20px">
					{#if controlTab === 'props'}
						<ControlTable {definition} {storybookargs} bind:args />
					{:else if controlTab === 'schemes'}
						<PropsTable {definition} {storybookargs} />
					{:else if controlTab === 'events'}
						<EventsTable />
					{/if}
				</div>
			</div>
			<!-- {@html com} -->
		</div>
	</div>
{/if}

<style lang="scss">
</style>
