<script lang="ts">
	export let definition: any;
	export let storybookargs: any;
	export let args: any;
</script>

<table style="width:100%">
	<tr>
		<th>Prop Name</th>
		<th>value</th>
		<th>controls</th>
	</tr>

	{#each Object.keys(definition.definitions.Component.properties) as prop (prop)}
		<tr>
			<td>{prop}</td>
			<td>
				{#if storybookargs[prop]?.control?.type === 'text'}
					<input type="text" bind:value={args[prop]} />
				{:else if storybookargs[prop]?.control?.type === 'boolean'}
					bool
				{/if}
			</td>
		</tr>
	{/each}
</table>
