<script lang="ts">
	export let definition: any;
	export let storybookargs: any;

	function defToInterfaceString(definition: {
		properties: any;
		type: 'object' | 'string' | 'array';
		$ref?: string;
	}) {
		if (definition.$ref) return definition.$ref.replace('#/definitions/', '');
		if (definition.type === 'object') {
			let text = '{';
			for (const propKey of Object.keys(definition.properties)) {
				const prop = definition.properties[propKey];
				text += ' ' + propKey + ':';
				if (prop)
					switch (prop.type) {
						case 'array':
							if (prop.items) text += defToInterfaceString(prop.items) + '[ ],';
							else text += '[ ],';
						case 'object':
							// if (propDefinition.items) return defToInterfaceString(propDefinition.items) + '[ ]';
							text += '{ },';
						default:
							text += prop.type + ',';
					}
			}
			text += '}';
			return text.replace(',}', '}');
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
				return '{}';
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

	{#each Object.keys(definition.definitions.Component.properties) as prop (prop)}
		<tr>
			<td>{prop}</td>
			<td>{propToType(prop)}</td>
			<td>{definition.definitions.Component.required?.includes(prop) ? 'true' : 'false'}</td>
			<td>{storybookargs[prop]?.defaultValue || ''}</td>
		</tr>
	{/each}
</table>
