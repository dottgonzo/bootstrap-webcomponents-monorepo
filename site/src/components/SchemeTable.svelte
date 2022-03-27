<script lang="ts">
	export let definition: any;

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
		const propDefinition = definition.properties[prop];
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

{#if definition.type === 'object'}
	{#if definition?.properties && Object.keys(definition.properties).filter((f) => !['id', 'style'].includes(f))?.length}
		<hb-table
			headers={JSON.stringify([
				{ label: 'PropName', key: 'name' },
				{ label: 'type', key: 'type' },
				{ label: 'required', key: 'required' }
			])}
			rows={JSON.stringify(
				Object.keys(definition.properties)
					.filter((f) => !['id', 'style'].includes(f))
					.map((m) => {
						const row = {
							_id: m,
							name: m,
							type: propToType(m),
							required: definition.required?.includes(m) ? 'true' : 'false'
						};
						return row;
					})
			)}
			size={Object.keys(definition.properties).filter((f) => !['id', 'style'].includes(f)).length}
		/>
	{/if}
{:else if definition.type === 'string'}
	{#if definition.enum}
		string: {#each definition.enum as enu (enu)}
			<span style="margin-right:5px">{enu}</span>
		{/each}
	{/if}
{/if}
