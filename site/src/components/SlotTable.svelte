<script lang="ts">
	import type { HtmlSlot } from '@htmlbricks/hb-jsutils/main';

	export let slots: HtmlSlot[];
</script>

<table style="width:100%">
	<tr>
		<th>Slot Name</th>
		<th>Slot Description</th>
	</tr>

	{#each slots as s (s.name)}
		<tr>
			<td>{s.name}</td>
			<td>{s.description}</td>
		</tr>
	{/each}
</table>
