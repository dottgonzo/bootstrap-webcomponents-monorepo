<script lang="ts">
	import ControlTable from './controlTable.svelte';
	import PropsTable from './propsTable.svelte';
	import { allComponentsMetas } from '../stores/components';
	import { allComponentsExampleValues } from '../stores/components';

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
				}
			}
		}

		com += ` />`;
	}
</script>

{@html com}

<ControlTable {definition} {storybookargs} bind:args />

<hb-area-code content={com} />

<PropsTable {definition} {storybookargs} />
