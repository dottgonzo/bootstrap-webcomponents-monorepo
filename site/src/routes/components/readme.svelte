<script lang="ts">
	import MarkdownIt from 'markdown-it';
	import { pageName, componentsVersion } from '../../stores/app';

	pageName.set('readme');
	// export let definition: any;
	// export let storybookargs: any;
	// export let args: any;
	let content;
	async function fetchInfo() {
		content = 'loading';
		try {
			const pageraw = await fetch(
				`https://cdn.jsdelivr.net/gh/dottgonzo/bootstrap-webcomponents-monorepo@${$componentsVersion}/README.md`
			);
			const txt = await pageraw.text();
			const md = new MarkdownIt();

			content = md.render(txt);
		} catch (err) {
			console.warn(`no readme page for ${$pageName}`);
		}
	}
	$: {
		if ($componentsVersion) {
			fetchInfo().catch(console.error);
		}
	}
	// onMount(() => {
	// });
</script>

<div class="container">
	{@html content}
</div>
