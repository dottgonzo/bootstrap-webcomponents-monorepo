<script lang="ts">
	import type { CssVar } from '@htmlbricks/hb-jsutils/main';
	import { bootstrapThemeCssVars } from '../stores/themes';
	import { allComponentsMetas } from '../stores/components';
	import { pageName } from '../stores/app';
	import { cssVarsValues } from '../stores/events';
	import { styleSetup } from '@htmlbricks/hb-banner/release/docs';

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
			copy.splice(changeIndex, 1);
			cssVarsValues.set(copy);
		}
	}
</script>

{#if vars?.length}
	<div>variables</div>
	<table style="width:100%">
		<tr>
			<th>Name</th>
			<th>Value</th>
			<th>Type</th>
			<th>Description</th>
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
{/if}
{#if $allComponentsMetas.find((f) => f.name === $pageName && f.styleSetup?.themes?.includes?.('bootstrap'))}
	<div>bootstrap theme vars</div>

	<table style="width:100%">
		<tr>
			<th>Name</th>
			<th>Value</th>
			<th>Type</th>
		</tr>

		{#each $bootstrapThemeCssVars.sort((a, b) => (b.rank || 1) - (a.rank || 1)) as bv (bv.name)}
			<tr>
				<td>{bv.name}</td>
				<td>
					<hb-input-text
						schemaentry={JSON.stringify({
							value: bv.value?.toString() || '',
							label: bv.name,
							id: `b_css_${$pageName}_${bv.name}`
						})}
						on:setValue={(e) => {
							setCssVar(e.detail, bv.name);
						}}
					/>
				</td>
				<td>{bv.type}</td>
			</tr>
		{/each}
	</table>
{/if}
