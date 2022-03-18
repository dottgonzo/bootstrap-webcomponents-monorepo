<script lang="ts">
	import type { CssVar } from '@htmlbricks/hb-jsutils/main';
	import { pageName } from '../stores/app';
	import { cssVarsValues } from '../stores/events';

	export let vars: CssVar[];

	function setCssVar(detail, name: string) {
		let copy = $cssVarsValues;

		const existentChange = copy?.find((f) => f.component === $pageName && f.name === name);
		if (detail.value) {
			if (existentChange && existentChange.value !== detail.value) {
				existentChange.value = detail.value;
				cssVarsValues.set(copy);
			} else if (!existentChange) {
				copy.push({ name, component: $pageName, value: detail.value });
				cssVarsValues.set(copy);
			}
		} else if (!detail.value && existentChange) {
			const changeIndex = copy.findIndex((f) => f.component === $pageName && f.name === name);
			copy.splice(changeIndex);
			cssVarsValues.set(copy);
		}
	}
</script>

<table style="width:100%">
	<tr>
		<th>Css Var Name</th>
		<th>Css Var Default Value</th>
		<th>Css Var Type</th>
		<th>Css Var Description</th>
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
					on:setValue={(e) => {
						setCssVar(e.detail, v.name);
					}}
				/>
			</td>
			<td>{v.valueType || ''}</td>
			<td>{v.description || ''}</td>
		</tr>
	{/each}
</table>
