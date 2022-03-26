<script lang="ts">
	import SchemeTable from './SchemeTable.svelte';
	export let definition: any;
</script>

{#each Object.keys(definition.definitions).filter((f) => !['Events', 'Component'].includes(f)) as def (def)}
	<div style="margin-top:20px">
		<h4>{def}</h4>
		<SchemeTable definition={definition.definitions[def]} />
	</div>
{/each}
