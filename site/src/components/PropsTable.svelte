<script lang="ts">
	export let definition: any;
	export let storybookargs: any;

	function defToInterfaceString(definition: {
		properties: any;
		type: 'object' | 'string' | 'number' | 'array' | 'boolean';
		$ref?: string;
	}) {
		if (definition.$ref) return ' ' + definition.$ref.replace('#/definitions/', '');
		if (definition.type === 'object' && definition.properties) {
			let text = '{';
			for (const propKey of Object.keys(definition.properties)) {
				const prop = definition.properties[propKey];
				text += ' ' + propKey + ':';
				if (prop?.type) {
					switch (prop.type) {
						case 'array':
							if (prop.items) text += defToInterfaceString(prop.items) + '[ ],';
							else text += '[ ],';
							break;
						case 'object':
							if (prop.properties) {
								text += ' ' + defToInterfaceString(prop);
							} else {
								text += '{ },';
							}
							break;

						default:
							text += ' ' + prop.type + ',';
							break;
					}
				} else if (prop.$ref) {
					text += ' ' + prop.$ref.replace('#/definitions/', '') + ',';
				}
			}
			text += ' }';
			return text.replace(', }', ' }');
		} else if (definition.type === 'number' && !definition.properties) {
			return ' number';
		} else if (definition.type === 'string' && !definition.properties) {
			return ' string';
		} else if (definition.type === 'boolean' && !definition.properties) {
			return ' boolean';
		}
	}

	function propToType(prop: string) {
		const propDefinition = definition.definitions.Component.properties[prop];
		if (propDefinition.$ref) return propDefinition.$ref.replace('#/definitions/', '');

		switch (propDefinition.type) {
			case 'array':
				if (propDefinition.items) return defToInterfaceString(propDefinition.items) + '[ ]';
				return '[ ]';
			case 'object':
				// if (propDefinition.items) return defToInterfaceString(propDefinition.items) + '[ ]';
				return defToInterfaceString(propDefinition);
			default:
				return propDefinition.type;
		}
	}
</script>

<h2 style="margin-bottom:20px;">Component attributes</h2>
{#if definition?.definitions?.Component?.properties && Object.keys(definition.definitions.Component.properties).filter((f) => !['id', 'style'].includes(f))?.length}
	<hb-table
		headers={JSON.stringify([
			{ label: 'PropName', key: 'name', search: true },
			{ label: 'type', key: 'type' },
			{ label: 'required', key: 'required' },
			{ label: 'default value', key: 'default' }
		])}
		rows={JSON.stringify(
			Object.keys(definition.definitions.Component.properties)
				.filter((f) => !['id', 'style'].includes(f))
				.map((m) => {
					const row = {
						_id: m,
						name: m,
						type: propToType(m),
						required: definition.definitions.Component.required?.includes(m) ? 'true' : 'false',
						default: definition.definitions.Component.required?.includes(m)
							? ' - '
							: storybookargs[m]?.defaultValue || ''
					};
					return row;
				})
		)}
		size={Object.keys(definition.definitions.Component.properties).filter(
			(f) => !['id', 'style'].includes(f)
		).length}
	/>
{/if}
<!-- <table style="width:100%">
	<tr>
		<th>Prop Name</th>
		<th>type</th>
		<th>required</th>
		<th>default value</th>
	</tr>

	{#each Object.keys(definition.definitions.Component.properties).filter((f) => !['id', 'style'].includes(f)) as prop (prop)}
		<tr>
			<td>{prop}</td>
			<td>{propToType(prop)}</td>
			<td>{definition.definitions.Component.required?.includes(prop) ? 'true' : 'false'}</td>
			<td
				>{definition.definitions.Component.required?.includes(prop)
					? ' - '
					: storybookargs[prop]?.defaultValue || ''}</td
			>
		</tr>
	{/each}
</table> -->
