<script lang="ts">
	import type { CssPart } from '@htmlbricks/hb-jsutils/main';

	export let parts: CssPart[];
</script>

<table style="width:100%">
	<tr>
		<th>Css Part Name</th>
		<th>Css Part Description</th>
	</tr>

	{#each parts as part (part.name)}
		<tr>
			<td>{part.name}</td>
			<td>{part.description}</td>
		</tr>
	{/each}
</table>
