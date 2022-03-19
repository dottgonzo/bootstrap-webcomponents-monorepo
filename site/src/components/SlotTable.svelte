<script lang="ts">
	import type { HtmlSlot } from '@htmlbricks/hb-jsutils/main';
	import { htmlSlotsContents, type HtmlSlotsContent } from '../stores/events';
	import { pageName } from '../stores/app';
	export let slots: HtmlSlot[];

	function updateSlot(name: string, val: string) {
		if (val && val.length) {
			const newContent: HtmlSlotsContent = {
				component: $pageName,
				content: val,
				name: name
			};
			if (!$htmlSlotsContents.length) {
				htmlSlotsContents.set([newContent]);
			} else if (!$htmlSlotsContents.find((f) => f.component === $pageName && f.name === name)) {
				const previous = $htmlSlotsContents;

				previous.push(newContent);
				htmlSlotsContents.set(previous);
			} else if ($htmlSlotsContents.find((f) => f.component === $pageName && f.name === name)) {
				const previous = $htmlSlotsContents;
				previous.find((f) => f.component === $pageName && f.name === name).content = val;

				htmlSlotsContents.set(previous);
			}
		} else if ($htmlSlotsContents.find((f) => f.component === $pageName && f.name === name)) {
			const previous = $htmlSlotsContents;
			const toRemove = previous.findIndex((f) => f.component === $pageName && f.name === name);
			previous.splice(toRemove, 1);
			htmlSlotsContents.set(previous);
		}
	}
</script>

<table style="width:100%">
	<tr>
		<th>Slot Name</th>
		<th>Slot Content</th>
		<th>Slot Description</th>
	</tr>

	{#each slots as s (s.name)}
		<tr>
			<td>{s.name}</td>
			<td>
				<hb-input-text
					schemaentry={JSON.stringify({
						id: $pageName + '_' + s.name,
						value:
							$htmlSlotsContents.find((f) => f.component === s.name && f.name === s.name)
								?.content || ''
					})}
					on:setValue={(e) => {
						updateSlot(s.name, e.detail.value);
					}}
				/>
			</td>
			<td>{s.description || ''}</td>
		</tr>
	{/each}
</table>
