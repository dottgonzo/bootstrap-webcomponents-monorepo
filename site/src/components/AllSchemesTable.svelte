<script lang="ts">
	import SchemeTable from './SchemeTable.svelte';
	export let definition: any;
</script>

{#if definition?.definitions && Object.keys(definition.definitions)?.filter((f) => !['Events', 'Component']?.includes(f))?.length}
	<h2 style="padding-top:20px;margin-top:40px;border-top:1px solid grey">Schemes</h2>

	{#each Object.keys(definition.definitions).filter((f) => !['Events', 'Component'].includes(f)) as def (def)}
		<div style="margin-top:20px">
			<h4>{def}</h4>
			<SchemeTable definition={definition.definitions[def]} />
		</div>
	{/each}
{/if}
