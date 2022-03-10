<script lang="ts">
	import ControlTable from './controlTable.svelte';
	import PropsTable from './propsTable.svelte';
	import { allComponentsMetas } from '../stores/components';
	import { allComponentsExampleValues } from '../stores/components';
	import base64 from 'base-64';
	export let name: string;
	let args: string;

	let storybookargs: any;
	let definition: any;

	let com: string;

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
	}
</script>

<iframe
	style="width:100%;height:600px"
	title="component"
	src="/playgrounds/sandbox?c={name}&p={base64.encode(JSON.stringify(args))}"
/>

<!-- {@html com} -->

<ControlTable {definition} {storybookargs} bind:args />

<hb-area-code content={com} />

<PropsTable {definition} {storybookargs} />
