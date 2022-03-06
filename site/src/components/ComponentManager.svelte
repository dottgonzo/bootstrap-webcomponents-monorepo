<script lang="ts">
	import ControlTable from './controlTable.svelte';
	import PropsTable from './propsTable.svelte';

	export let name: string;
	export let args: any;
	export let storybookargs: any;
	export let definition: any;

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
