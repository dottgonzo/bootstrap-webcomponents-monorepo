<script lang="ts">
	// import { onDestroy, onMount } from 'svelte';
	import { events } from '../stores/events';
	import { pageName } from '../stores/app';
	import dayjs from 'dayjs';
	export let definition: any;
	// export let storybookargs: any;
	function defToInterfaceString(definition: {
		properties: any;
		type: 'object' | 'string' | 'array';
		$ref?: string;
		required: string[];
	}) {
		if (definition.$ref) return definition.$ref.replace('#/definitions/', '');
		if (definition.type === 'object' && definition.properties) {
			let text = '{';
			for (const propKey of Object.keys(definition.properties)) {
				const prop = definition.properties[propKey];
				text += ' ' + propKey + (definition?.required?.includes?.(propKey) ? '' : '?') + ': ';
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
			text += ' }';
			return text.replace(', }', ' }');
		}
	}

	function propToType(prop: string) {
		const propDefinition = definition.definitions.Events.properties[prop];
		if (propDefinition.$ref) {
			return defToInterfaceString(
				definition.definitions[propDefinition.$ref.replace('#/definitions/', '')]
			);
		}

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

	// onMount(() => {
	// 	if (!definition?.definitions?.Events?.properties?.length) return;
	// 	console.log('mount events');
	// 	for (const e of Object.keys(definition.definitions.Events.properties)) {
	// 		addEventListener(e, (eve) => {
	// 			console.log(eve);
	// 		});
	// 	}
	// });
	// onDestroy(() => {
	// 	if (!definition?.definitions?.Events?.properties?.length) return;

	// 	console.log('remove events');
	// });
</script>

<table style="width:100%">
	<tr>
		<th>Prop Name</th>
		<th>type</th>
	</tr>

	{#each Object.keys(definition.definitions.Events.properties) as prop (prop)}
		<tr>
			<td>{prop}</td>
			<td>{propToType(prop)}</td>
		</tr>
	{/each}
</table>
<div
	style="margin-top:20px;background-color:rgb(232 232 232 / 36%);padding:10px;max-height:350px;height:350px;overflow-y:scroll"
>
	<div style="text-align:right">
		{#if $events?.filter((f) => f.component === $pageName.replace('hb-', ''))?.length}
			<button
				class="btn btn-default"
				on:click={() => {
					localStorage.setItem(
						'componentsEvents',
						JSON.stringify($events.filter((f) => f.component !== $pageName.replace('hb-', '')))
					);
					events.set($events.filter((f) => f.component !== $pageName.replace('hb-', '')));
				}}><i class="bi bi-arrow-clockwise" /></button
			>
		{:else}
			<button class="btn btn-default" on:click={() => null} disabled
				><i class="bi bi-arrow-clockwise" /></button
			>
		{/if}
	</div>
	{#if $events?.filter((f) => f.component === $pageName.replace('hb-', ''))?.length}
		{#each $events.filter((f) => f.component === $pageName.replace('hb-', '')) as event (event._id)}
			<div>
				[{dayjs(event.unixtime).format('HH:mm:ss')}
				{event.name}]: {JSON.stringify(event.data)}
			</div>
		{/each}
	{/if}
</div>
