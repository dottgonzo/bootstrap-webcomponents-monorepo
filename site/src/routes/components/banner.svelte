<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { addComponent } from '@htmlbricks/hb-jsutils';

	import { pageName } from '../../stores/app';
	import bannerDefinition from '@htmlbricks/hb-banner/release/webcomponent.type.d.json';
	pageName.set('banner');

	onMount(() => {
		addComponent('banner', 'latest');
	});
	console.log(bannerDefinition.definitions.Component.properties);
</script>

<hb-banner title="tit" />
<hb-area-code content="csssssssode" />

<table style="width:100%">
	<tr>
		<th>Person 1</th>
		<th>Person 2</th>
		<th>Person 3</th>
	</tr>
	<tr>
		<td>Emil</td>
		<td>Tobias</td>
		<td>Linus</td>
	</tr>
	<tr>
		<td>16</td>
		<td>14</td>
		<td>10</td>
	</tr>
</table>
