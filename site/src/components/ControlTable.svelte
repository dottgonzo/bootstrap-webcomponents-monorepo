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
		</tr>

		{#each Object.keys(definition.definitions.Component.properties).filter((f) => !['style', 'id'].includes(f)) as prop (prop)}
			<tr>
				<td
					>{prop}{#if definition.definitions.Component?.required?.find((f) => f === prop)}<span
							style="color:red">*</span
						>{/if}
				</td>
				<td>
					{#if storybookargs[prop]?.control?.options}
						<!-- <select bind:value={args[prop]}>
							{#each storybookargs[prop].control.options as opt (opt)}
								<option value={opt}>{opt}</option>
							{/each}
						</select> -->

						<hb-input-select
							schemaentry={JSON.stringify({
								id: prop,
								value: args[prop],
								params: {
									options: storybookargs[prop].control.options.map((m) => {
										const v = {
											label: m,
											value: m
										};
										return v;
									})
								}
							})}
							on:setValue={(e) => {
								args[prop] = e.detail.value;
							}}
						/>
					{:else if storybookargs[prop]?.options}
						<!-- <select bind:value={args[prop]}>
							{#each storybookargs[prop].control.options as opt (opt)}
								<option value={opt}>{opt}</option>
							{/each}
						</select> -->

						<hb-input-radio
							schemaentry={JSON.stringify({
								id: prop + '_se',
								value: args[prop],
								params: {
									options: storybookargs[prop].options.map((m) => {
										const v = {
											label: m,
											value: m
										};
										return v;
									})
								}
							})}
							on:setValue={(e) => {
								args[prop] = e.detail.value;
							}}
						/>
					{:else if storybookargs[prop]?.control?.type === 'text' || storybookargs[prop]?.control?.type === 'string'}
						<hb-input-text
							schemaentry={JSON.stringify({
								id: prop,
								value: args[prop]
							})}
							on:setValue={(e) => {
								args[prop] = e.detail.value;
							}}
						/>
						<!-- {:else if storybookargs[prop]?.control?.type === 'radio'}
						<hb-input-radio
							schemaentry={JSON.stringify({
								id: '_radio' + prop,
								params: {
									options: storybookargs[prop].control.options.map((m) => {
										const opt = {
											value: m
										};
										return opt;
									})
								}
							})}
							on:setValue={(e) => {
								args[prop] = e.detail.value;
							}}
						/> -->
						<!-- <input type="text" bind:value={args[prop]} /> -->
					{:else if storybookargs[prop]?.control?.type === 'number'}
						<hb-input-number
							schemaentry={JSON.stringify({
								id: prop,
								value: Number(args[prop])
							})}
							on:setValue={(e) => {
								console.log('setvalue for c', e.detail);
								args[prop] = Number(e.detail.value);
							}}
						/>
						<!-- <input type="text" bind:value={args[prop]} /> -->
					{:else if storybookargs[prop]?.control?.type === 'date'}
						<!-- TODO: COMPLETE HERE -->
						<hb-input-date
							schemaentry={JSON.stringify({
								id: prop,
								value: args[prop]
							})}
							on:setValue={(e) => {
								console.log('setvalue for c', e.detail);
								// args[prop] = Number(e.detail.value);
							}}
						/>
						<!-- <input type="text" bind:value={args[prop]} /> -->
					{:else if storybookargs[prop]?.control?.type === 'boolean'}
						<hb-input-select
							schemaentry={JSON.stringify({
								id: prop,
								value: args[prop] && args[prop] !== 'no' ? 'yes' : 'no',
								params: {
									options: [
										{ label: 'yes', value: 'yes' },
										{ label: 'no', value: 'no' }
									]
								}
							})}
							on:setValue={(e) => {
								args[prop] = e.detail.value;
							}}
						/>

						<!-- <select
							on:change={(c) => {
								const val = c.target['value'];
								args[prop] = val === 'yes' ? true : false;
								console.log('changeme', val);
							}}
							value={args[prop] ? 'yes' : 'no'}
						>
							<option value="yes">yes</option>
							<option value="no">no</option>
						</select> -->
					{:else if ['object', 'array'].includes(storybookargs[prop]?.control?.type)}
						<hb-input-area
							schemaentry={JSON.stringify({
								id: prop,
								value: JSON.stringify(args[prop])
							})}
							on:setValue={(e) => {
								const val = JSON.parse(e.detail.value);
								console.log(val);
								args[prop] = val;
							}}
						/>
						<!-- <input
							type="text"
							on:input={(c) => {
								const val = c.target['value'];
								args[prop] = JSON.parse(val);

								console.log('changemew', c);
							}}
							value={JSON.stringify(args[prop])}
						/> -->
					{/if}
				</td>
			</tr>
		{/each}
	</table>
{/if}
