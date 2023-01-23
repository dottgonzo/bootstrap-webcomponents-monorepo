<svelte:options tag="hb-paragraps-around-image-cell" />

<script lang="ts">
	import { get_current_component, onDestroy, onMount } from "svelte/internal";

	import { createEventDispatcher } from "svelte";
	import parseStyle from "style-to-object";
	import { addComponent, getChildStyleToPass } from "@htmlbricks/hb-jsutils/main";
	import type { Component } from "@app/types/webcomponent.type";

	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();

	function dispatch(name: string, detail: any) {
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
		margin: 30px auto 40px auto;
		display: flex;
		flex-direction: row;"
	>
		<div><i style="font-size:1.8rem;padding:25px" class="bi bi-{paragraph.icon}" /></div>
		<div>
			{#if paragraph.title}
				<div style="margin:5px 0px 20px 0px;font-weight:bold">
					{#if paragraph.link}
						<a style="color:inherit" target="_blank" href={paragraph.link}
							>{paragraph.title}<i style="margin-left:10px;" class="bi bi-box-arrow-up-right" /></a
						>
					{:else if paragraph.key}
						<div
							style="text-decoration:underline;cursor:pointer"
							on:click={() => {
								dispatch("paragraphPressed", { key: paragraph.key });
							}}
						>
							{paragraph.title}<i style="margin-left:10px;" class="bi bi-box-arrow-up-right" />
						</div>
					{:else}
						{paragraph.title}
					{/if}
				</div>
			{/if}
			<div
				style="	
		    --lh: 1.5rem;
            line-height: var(--lh);
		    --max-lines: {max_lines};
			position: relative;
			max-height: calc(var(--lh) * var(--max-lines));
			overflow: hidden;
			"
			>
				{paragraph.text}
			</div>
		</div>
	</div>
{/if}

<style lang="scss">
	@import "../styles/webcomponent.scss";
	// @import "../styles/bootstrap.scss";
</style>
