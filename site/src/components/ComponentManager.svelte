<script lang="ts">
	import ControlTable from './controlTable.svelte';
	import PropsTable from './propsTable.svelte';
	import { allComponents } from '../stores/components';

	export let name: string;
	export let args: any;

	const storybookargs = $allComponents.find((f) => f.name === name).storybookArgs;
	const definition = $allComponents.find((f) => f.name === name).definition;

	let com: string;

	$: {
		com = '<hb-' + name;
		for (const k of Object.keys(args)) {
			switch (typeof args[k]) {
				case 'string':
					if (args[k]) com += ` ${k}="${args[k]}"`;
					break;
			}
		}

		com += ` />`;
	}
</script>

{@html com}

<ControlTable {definition} {storybookargs} bind:args />

<hb-area-code content={com} />

<PropsTable {definition} {storybookargs} />
