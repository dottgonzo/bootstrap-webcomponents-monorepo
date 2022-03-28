<script lang="ts">
	import { goto } from '$app/navigation';

	import { pageName, componentsVersion, componentsList } from '../../stores/app';
	import type allComponentsMetas from '@htmlbricks/hb-bundle/release/bundle.json';

	pageName.set('comparison');
	let metas: typeof allComponentsMetas;
	async function fetchComponentInfo(repoName: string, version: string) {
		try {
			const pageraw = await fetch(
				`https://cdn.jsdelivr.net/npm/${repoName}@${version}/release/manifest.json`
			);
			const meta = await pageraw.json();
			return meta;
		} catch (err) {
			console.warn(`failed to fetch manifest for ${$pageName}`);
		}
	}

	async function fetchAll(version) {
		const allPromises = [];

		try {
			for (const l of $componentsList.packages.map((m) => m.repoName)) {
				allPromises.push(fetchComponentInfo(l, version));
			}

			const allProms = await Promise.all(allPromises);
			metas = { packages: allProms, version: version };
			console.log('loaded');
		} catch (err) {
			console.warn(`failed to fetch manifest for ${$pageName}`);
		}
	}
	fetchAll($componentsVersion).catch(console.error);
</script>

{#if metas?.packages?.length}
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

			{#each metas.packages as c (c.name)}
				<tr>
					<td
						><button
							class="btn btn-link"
							on:click={() => {
								goto('/components/doc?c=' + c.name.replace('hb-', ''));
							}}>{c.name}</button
						></td
					>

					<td
						>{c.definitions.component.definitions?.Component?.properties
							? Object.keys(c.definitions.component.definitions.Component.properties).length
							: 0}</td
					>
					<td
						>{c.definitions.events.definitions?.Events?.properties
							? Object.keys(c.definitions.events.definitions.Events.properties).length
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
{:else}
	loading
{/if}
