<script lang="ts">
	export let definition: any;
	export let storybookargs: any;

	function defToInterfaceString(definition: {
		properties: any;
		type: 'object' | 'string' | 'number' | 'array' | 'boolean';
		$ref?: string;
	}) {
		if (definition.$ref) return definition.$ref.replace('#/definitions/', '');
		if (definition.type === 'object' && definition.properties) {
			let text = '{';
			for (const propKey of Object.keys(definition.properties)) {
				const prop = definition.properties[propKey];
				text += ' ' + propKey + ':';
				if (prop)
					switch (prop.type) {
						case 'array':
							if (prop.items) text += defToInterfaceString(prop.items) + '[ ],';
							else text += '[ ],';
							break;
						case 'object':
							if (prop.properties) {
								text += defToInterfaceString(prop);
							} else {
								text += '{ },';
							}
							break;

						default:
							text += prop.type + ',';
							break;
					}
			}
			text += ' }';
			return text.replace(', }', ' }');
		} else if (definition.type === 'number' && !definition.properties) {
			return 'number';
		} else if (definition.type === 'string' && !definition.properties) {
			return 'string';
		} else if (definition.type === 'boolean' && !definition.properties) {
			return 'boolean';
		}
	}

	function propToType(prop: string) {
		const propDefinition = definition.definitions.Component.properties[prop];
		if (propDefinition.$ref)
			return defToInterfaceString(
				definition.definitions[propDefinition.$ref.replace('#/definitions/', '')]
			);

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

<table style="width:100%">
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
			<td>{storybookargs[prop]?.defaultValue || ''}</td>
		</tr>
	{/each}
</table>
