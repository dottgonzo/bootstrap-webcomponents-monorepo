<svelte:options tag="hb-dashboard-counter-lines" />

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

	export let id: string;
	export let style: string;

	export let lines: Component["lines"];

	let parsedStyle: { [x: string]: string };
	//  let componentStyleToSet: string = "";

	$: {
		if (!id) id = "";
		if (style) {
			parsedStyle = parseStyle(style);
			// componentStyleToSet = getChildStyleToPass(parsedStyle, componentStyleSetup?.vars);
		}

		// json
		if (typeof lines === "string") {
			try {
				lines = JSON.parse(lines);
			} catch (err) {
				console.error("error parsing lines", err);
			}
		}
		let i = 0;
		if (lines?.length) {
			lines.forEach((line) => {
				line.index = i++;
			});
		}
	}
</script>

<svelte:head>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@latest/font/bootstrap-icons.css" />
</svelte:head>
{#if lines?.length}
	{#each lines as line (line.index)}
		{#if line.link?.type === "tab"}
			<div on:click={() => window.open(line.link.uri, "_blank")} part="item" class="item">
				<div class="item_content">
					<div class="text">
						{#if line.icon}<i part="icon" class="bi bi-{line.icon}" />{/if}
						<span part="text">{line.text}</span>
					</div>
					<div part="value" class="value badge bg-secondary">{line.value}</div>
				</div>
			</div>
		{:else if line.link?.type === "page"}
			<div on:click={() => (window.location.href = line.link.uri)} part="item" class="item">
				<div class="item_content">
					<div class="text">
						{#if line.icon}<i part="icon" class="bi bi-{line.icon}" />{/if}
						<span part="text">{line.text}</span>
					</div>
					<div part="value" class="value badge bg-secondary">{line.value}</div>
				</div>
			</div>
		{:else if line.link?.type === "event"}
			<div on:click={() => dispatch("counterClick", { key: line.link.uri })} part="item" class="item">
				<div class="text">
					{#if line.icon}<i part="icon" class="bi bi-{line.icon}" />{/if}
					<span part="text">{line.text}</span>
				</div>
				<div part="value" class="value badge bg-secondary">{line.value}</div>
			</div>
		{:else}
			<div part="item" class="item">
				<div class="item_content">
					<div class="text">
						{#if line.icon}<i part="icon" class="bi bi-{line.icon}" />{/if}
						<span part="text">{line.text}</span>
					</div>
					<div part="value" class="value badge bg-secondary">{line.value}</div>
				</div>
			</div>
		{/if}
	{/each}
{/if}

<style lang="scss">
	@import "../styles/webcomponent.scss";
	@import "../styles/bootstrap.scss";
</style>
