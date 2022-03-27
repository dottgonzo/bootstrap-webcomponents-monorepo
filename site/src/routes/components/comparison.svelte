<script lang="ts">
	import { goto } from '$app/navigation';

	import { page } from '$app/stores';
	import { styleSetup } from '@htmlbricks/hb-banner/release/docs';

	import { pageName } from '../../stores/app';
	import { allComponentsMetas } from '../../stores/components';
	pageName.set('comparison');
</script>

<div class="container">
	<table style="width:100%">
		<tr>
			<th>Tag</th>
			<th>Props</th>
			<th>Events</th>
			<th>Css Template Vars</th>
			<th>Css Custom Vars</th>
			<th>Css Parts</th>
			<th>Html Slots</th>
			<th>Languages</th>
		</tr>

		{#each $allComponentsMetas as c (c.name)}
			<tr>
				<td
					><button
						class="btn btn-link"
						on:click={() => {
							goto('/components/doc?c=' + c.name.replace('hb-', ''));
						}}>hb-{c.name}</button
					></td
				>

				<td
					>{c.definitions.component.definitions?.Component?.properties
						? Object.keys(c.definitions.component.definitions.Component.properties).length
						: 0}</td
				>
				<td
					>{c.definitions.component.definitions?.Events?.properties
						? Object.keys(c.definitions.component.definitions.Events.properties).length
						: 0}</td
				>
				<td>{c.styleSetup?.vars?.filter((f) => f.theme)?.length || 0}</td>
				<td>{c.styleSetup?.vars?.filter((f) => !f.theme)?.length || 0}</td>
				<td>{c.styleSetup?.parts?.length || 0}</td>
				<td>{c.htmlSlots?.length || 0}</td>
				<td>{c.i18n?.length || 0}</td>
			</tr>
		{/each}
	</table>
</div>
