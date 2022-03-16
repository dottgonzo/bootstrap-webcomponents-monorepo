<script lang="ts">
	import type { CssVar } from '@htmlbricks/hb-jsutils/main';

	export let vars: CssVar[];
</script>

<table style="width:100%">
	<tr>
		<th>Css Var Name</th>
		<th>Css Var Default Value</th>
		<th>Css Var Description</th>
		<th>Css Var Theme</th>
	</tr>

	{#each vars as c (c.name)}
		<tr>
			<td>{c.name}</td>
			<td>{c.defaultValue}</td>
			<td>{c.description}</td>
			<td>{c.theme || ''}</td>
		</tr>
	{/each}
</table>
