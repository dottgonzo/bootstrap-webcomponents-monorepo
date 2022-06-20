<svelte:options tag="hb-faq-component" />

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
	export let info: Component["info"];
	export let topics: Component["topics"];
	export let filter: string;

	let parsedStyle: { [x: string]: string };
	//  let componentStyleToSet: string = "";

	$: {
		if (!id) id = "";
		if (!filter) filter = null;
		if (style) {
			parsedStyle = parseStyle(style);
			// componentStyleToSet = getChildStyleToPass(parsedStyle, componentStyleSetup?.vars);
		}
		if (typeof info === "string") {
			try {
				info = JSON.parse(info);
			} catch (err) {
				console.error("error parsing info", err);
			}
		}
		if (typeof topics === "string") {
			try {
				topics = JSON.parse(topics);
			} catch (err) {
				console.error("error parsing topics", err);
			}
		}
		let i = 0;
		if (topics?.length)
			topics = topics.map((m) => {
				m.index = i;
				i++;
				return m;
			});
	}
</script>

<svelte:head>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@latest/font/bootstrap-icons.css" />
</svelte:head>
{#if topics?.length}
	<div id="topics">
		{#each topics as t (t.index)}
			{#if t.index % 5 === 0}
				<div class="break" />
				<!-- break -->
			{/if}
			<div
				class="topic"
				on:click={() => {
					if (t.catchAll) filter = null;
					else filter = t.key;
				}}
			>
				<div class="topic_content"><i class="bi bi-{t.icon}" /> {t.label}</div>
			</div>
		{/each}
	</div>
{/if}
{#if info?.length}
	<div class="faq-content">
		{#each info.filter((f) => (filter ? f.topic === filter : true)) as i (i.title)}
			<div class="faq-question">
				<input id="q1_{i.title.replace(/ /g, '')}" type="checkbox" class="panel" />
				<div class="plus">+</div>
				<label for="q1_{i.title.replace(/ /g, '')}" class="panel-title">{i.title}</label>
				<div class="panel-content">{@html i.text}</div>
			</div>
		{/each}
	</div>
{/if}

<style lang="scss">
	@import "../styles/webcomponent.scss";
	// @import "../styles/bootstrap.scss";
</style>
