<script lang="ts">
	import { onMount } from 'svelte';
	import MarkdownIt from 'markdown-it';
	import { pageName, debugVersion } from '../stores/app';

	// export let definition: any;
	// export let storybookargs: any;
	// export let args: any;
	let content;
	async function fetchInfo() {
		content = 'loading';
		try {
			const pageraw = await fetch(
				`https://cdn.jsdelivr.net/gh/dottgonzo/bootstrap-webcomponents-monorepo@${$debugVersion}/packages/${$pageName.replace(
					'hb-',
					''
				)}/README.md`
			);
			const txt = await pageraw.text();
			const md = new MarkdownIt();

			content = md.render(txt);
		} catch (err) {
			console.warn(`no readme page for ${$pageName}`);
		}
	}
	$: {
		if ($pageName) fetchInfo().catch(console.error);
	}
	// onMount(() => {
	// });
</script>

{@html content}
