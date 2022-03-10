<script lang="ts">
	import ControlTable from './ControlTable.svelte';
	import PropsTable from './PropsTable.svelte';
	import EventsTable from './EventsTable.svelte';
	import { allComponentsMetas } from '../stores/components';
	import { allComponentsExampleValues } from '../stores/components';
	import base64 from 'base-64';
	import { componentsVersion } from '../stores/app';
	export let name: string;
	let args: string;

	let storybookargs: any;
	let definition: any;

	let com: string;
	let cdnUri: string;

	$: {
		storybookargs = $allComponentsMetas.find((f) => f.name === name)?.storybookArgs;
		definition = $allComponentsMetas.find((f) => f.name === name)?.definition;
		args = $allComponentsExampleValues[name];
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
		cdnUri = `<${'script'} src="https://cdn.jsdelivr.net/npm/@htmlbricks/hb-${name}@${$componentsVersion}/release/release.js"></${'script'}>`;
	}
</script>

<div style="margin-top:20px"><hb-area-code content={cdnUri} /></div>

<iframe
	style="width:100%;height:600px;margin-top:20px"
	title="component"
	src="/playgrounds/sandbox?c={name}&p={base64.encode(JSON.stringify(args))}"
/>
<div style="margin-top:20px"><ControlTable {definition} {storybookargs} bind:args /></div>
<div style="margin-top:20px"><hb-area-code content={com} /></div>

<!-- {@html com} -->

<div style="margin-top:20px"><PropsTable {definition} {storybookargs} /></div>

<div style="margin-top:20px"><EventsTable {definition} {storybookargs} /></div>
