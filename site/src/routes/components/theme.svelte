<script lang="ts">
	import { pageName } from '../../stores/app';
	import { defaultBootstrapThemeCssVars } from '../../stores/themes';
	import { globalCssVarsValues } from '../../stores/events';
	pageName.set('theme');
	function setCssThemeVar(detail, name: string) {
		const value = detail?.value;
		const copy = $globalCssVarsValues;

		const existentChange = copy?.find((f) => f.name === name);
		if (value) {
			if (existentChange && existentChange.value !== value) {
				existentChange.value = value;
				globalCssVarsValues.set(copy);
			} else if (!existentChange) {
				copy.push({ name, value: value });
				globalCssVarsValues.set(copy);
			}
		} else if (!value && existentChange) {
			const changeIndex = copy.findIndex((f) => f.name === name);
			copy.splice(changeIndex, 1);
			globalCssVarsValues.set(copy);
		}
	}
</script>

<div class="container">
	<div>bootstrap theme vars</div>

	<table style="width:100%">
		<tr>
			<th>Name</th>
			<th>Value</th>
			<th>Type</th>
		</tr>

		{#each $defaultBootstrapThemeCssVars.sort((a, b) => (b.rank || 1) - (a.rank || 1)) as bv (bv.name)}
			<tr>
				<td>{bv.name}</td>
				<td>
					{#if bv.type === 'color'}
						<hb-input-color
							schemaentry={JSON.stringify({
								value: bv.value?.toString() || '',
								label: bv.name,
								id: `gcss_${$pageName}_${bv.name}`
							})}
							on:setValue={(e) => {
								setCssThemeVar(e.detail, bv.name);
							}}
						/>
					{:else if bv.type === 'string'}
						<hb-input-text
							schemaentry={JSON.stringify({
								value: bv.value?.toString() || '',
								label: bv.name,
								id: `gcss_${$pageName}_${bv.name}`
							})}
							on:setValue={(e) => {
								setCssThemeVar(e.detail, bv.name);
							}}
						/>
					{/if}
				</td>
				<td>{bv.type}</td>
			</tr>
		{/each}
	</table>
</div>
