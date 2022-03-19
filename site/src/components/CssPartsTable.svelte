<script lang="ts">
	import type { CssPart } from '@htmlbricks/hb-jsutils/main';
	import { cssPartsContents, type CssPartsContent } from '../stores/events';
	import { pageName } from '../stores/app';

	export let parts: CssPart[];
	function setPartVal(detail, name: string) {
		const val = detail?.value;
		console.log('setPart', val, name);
		const partsContents = $cssPartsContents;
		const partsContensExists = $cssPartsContents.find(
			(f) => f.component === $pageName && f.name === name
		);
		if (val) {
			if (partsContensExists && partsContensExists.content !== val) {
				partsContensExists.content = val;
				cssPartsContents.set(partsContents);
			} else if (!partsContensExists) {
				partsContents.push({ name, component: $pageName, content: val });
				cssPartsContents.set(partsContents);
			}
		} else if (partsContensExists && !val) {
			const partsContensExistsIndex = $cssPartsContents.findIndex(
				(f) => f.component === $pageName && f.name === name
			);
			partsContents.splice(partsContensExistsIndex, 1);
			cssPartsContents.set(partsContents);
		}
	}
</script>

<table style="width:100%">
	<tr>
		<th>Css Part Name</th>
		<th>Css Part Content</th>
		<th>Css Part Description</th>
	</tr>

	{#each parts as part (part.name)}
		<tr>
			<td>{part.name}</td>
			<td
				><hb-input-area
					schemaentry={JSON.stringify({
						id: 'inputareapart' + part.name,
						value: $cssPartsContents.find((f) => f.component === $pageName && f.name === part.name)
							? $cssPartsContents.find((f) => f.component === $pageName && f.name === part.name)
							: ''
					})}
					on:setValue={(e) => setPartVal(e.detail, part.name)}
				/></td
			>
			<td>{part.description || ''}</td>
		</tr>
	{/each}
</table>
