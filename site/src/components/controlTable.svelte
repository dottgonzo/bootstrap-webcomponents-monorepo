<script lang="ts">
	export let definition: any;
	export let storybookargs: any;
	export let args: any;
</script>

{#if definition?.definitions?.Component?.properties}
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
					{#if storybookargs[prop]?.control?.options}
						<select bind:value={args[prop]}>
							{#each storybookargs[prop].control.options as opt (opt)}
								<option value={opt}>{opt}</option>
							{/each}
						</select>
					{:else if storybookargs[prop]?.control?.type === 'text'}
						<input type="text" bind:value={args[prop]} />
					{:else if storybookargs[prop]?.control?.type === 'boolean'}
						<select
							on:change={(c) => {
								const val = c.target['value'];
								args[prop] = val === 'yes' ? true : false;
								console.log('changeme', val);
							}}
							value={args[prop] ? 'yes' : 'no'}
						>
							<option value="yes">yes</option>
							<option value="no">no</option>
						</select>
					{:else if ['object', 'array'].includes(storybookargs[prop]?.control?.type)}
						<input
							type="text"
							on:input={(c) => {
								const val = c.target['value'];
								args[prop] = JSON.parse(val);

								console.log('changemew', c);
							}}
							value={JSON.stringify(args[prop])}
						/>
					{/if}
				</td>
			</tr>
		{/each}
	</table>
{/if}
