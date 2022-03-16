<script lang="ts">
	import type { CssVar } from '@htmlbricks/hb-jsutils/main';
	import { pageName } from '../stores/app';

	export let vars: CssVar[];
</script>

<table style="width:100%">
	<tr>
		<th>Css Var Name</th>
		<th>Css Var Default Value</th>
		<th>Css Var Description</th>
		<th>Css Var Theme</th>
	</tr>

	{#each vars as v (v.name)}
		<tr>
			<td>{v.name}</td>
			<td>
				<hb-input-text
					schemaentry={JSON.stringify({
						value: v.defaultValue?.toString() || '',
						label: v.name,
						id: `css_${$pageName}_${v.name}`
					})}
				/>
			</td>
			<td>{v.description}</td>
			<td>{v.theme || ''}</td>
		</tr>
	{/each}
</table>
