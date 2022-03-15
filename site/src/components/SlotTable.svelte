<script lang="ts">
	import type { HtmlSlot } from '@htmlbricks/hb-jsutils/main';
	import { htmlSlotsContents, type HtmlSlotsContent } from '../stores/events';
	import { pageName } from '../stores/app';
	export let slots: HtmlSlot[];

	function updateSlot(name: string, s: any) {
		const val: string = s?.value;

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
			previous.splice(toRemove);
			htmlSlotsContents.set(previous);
		}
	}
</script>

<table style="width:100%">
	<tr>
		<th>Slot Name</th>
		<th>Slot Description</th>
		<th>Slot Content</th>
	</tr>

	{#each slots as s (s.name)}
		<tr>
			<td>{s.name}</td>
			<td>{s.description}</td>
			<td
				><input
					type="text"
					on:input={(e) => {
						updateSlot(s.name, e.target);
					}}
				/>{$htmlSlotsContents.find((f) => f.component === s.name && f.name === s.name)?.content ||
					''}</td
			>
		</tr>
	{/each}
</table>
