<script lang="ts">
	export let definition: any;
	export let storybookargs: any;
</script>

<table style="width:100%">
	<tr>
		<th>Prop Name</th>
		<th>type</th>
		<th>required</th>
		<th>default value</th>
	</tr>

	{#each Object.keys(definition.definitions.Component.properties) as prop (prop)}
		<tr>
			<td>{prop}</td>
			<td>{definition.definitions.Component.properties[prop].type}</td>
			<td>{definition.definitions.Component.required?.includes(prop) ? 'true' : 'false'}</td>
			<td>{storybookargs[prop]?.defaultValue || ''}</td>
		</tr>
	{/each}
</table>
