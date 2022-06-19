<svelte:options tag="hb-paragraps-around-image-cell" />

<script lang="ts">
	import { get_current_component, onDestroy, onMount } from "svelte/internal";

	import { createEventDispatcher } from "svelte";
	import parseStyle from "style-to-object";
	import { addComponent, getChildStyleToPass } from "@htmlbricks/hb-jsutils/main";
	import type { Component } from "@app/types/webcomponent.type";

	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();

	function dispatch(name, detail) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}

	export let paragraph: Component["paragraphs"][0];
	export let max_lines: string;

	let parsedStyle: { [x: string]: string };
	//  let componentStyleToSet: string = "";

	$: {
		if (!paragraph) console.warn("paragraph is undefined");
		if (!max_lines) max_lines = "8";
	}
</script>

{#if paragraph}
	<div
		style="	
		  --lh: 1.4rem;
line-height: var(--lh);
		  --max-lines: {max_lines};
  position: relative;
  max-height: calc(var(--lh) * var(--max-lines));
  overflow: hidden;
"
	>
		{#if paragraph.title}
			<div>
				{paragraph.title}
			</div>
		{/if}
		<div>{paragraph.text}</div>
	</div>
{/if}

<style lang="scss">
	@import "../styles/webcomponent.scss";
	// @import "../styles/bootstrap.scss";
</style>
