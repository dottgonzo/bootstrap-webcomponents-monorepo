<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { homePage } from '../../stores/app';
	onMount(() => {
		goto($homePage);
	});
</script>
