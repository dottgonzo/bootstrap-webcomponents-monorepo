<svelte:options tag="hb-sidebar-cards-navigator" />

<script lang="ts">
	import { get_current_component, onDestroy, onMount } from "svelte/internal";

	import { createEventDispatcher } from "svelte";
	import parseStyle from "style-to-object";
	import { addComponent, getChildStyleToPass } from "@htmlbricks/hb-jsutils/main";
	import type { Component, CardRowSelected, CardNavigatorRowSelected } from "@app/types/webcomponent.type";

	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();

	function dispatch(name, detail) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}

	export let id: string;
	export let style: string;

	// export let string: string;
	// export let json: Component["json"];
	// export let boolean: boolean;
	export let cards: Component["cards"];

	let parsedStyle: { [x: string]: string };
	//  let componentStyleToSet: string = "";

	$: {
		if (!id) id = "";
		if (style) {
			parsedStyle = parseStyle(style);
			// componentStyleToSet = getChildStyleToPass(parsedStyle, componentStyleSetup?.vars);
		}
		// if (!string) string = "";

		// cards
		if (typeof cards === "string") {
			try {
				cards = JSON.parse(cards);
			} catch (err) {
				console.error("error parsing cards", err);
			}
		}
		if (!cards) cards = [];
		// // boolean
		// if (boolean === ("" as unknown)) boolean = true;
		// if (typeof boolean === "string") boolean = boolean === "no" || boolean === "false" ? false : true;
		// if (!boolean) boolean = false;
	}

	// onMount(() => {
	// 	console.log(component.shadowRoot.getElementById("skeletontest"));
	// });

	// function dispatchCustomEvent() {
	// 	dispatch("event", { test: true });
	// }
	function itemClick(itemId: string, cardId: string) {
		const card = cards.find((c) => c.id === cardId);
		const rowItem = card.rows.find((r) => r.id === itemId);
		const simpleCard = Object.assign({}, card);
		delete simpleCard.rows;

		const customCard: CardRowSelected = { id, row: rowItem, card: simpleCard as unknown as CardNavigatorRowSelected };
		dispatch("itemClick", customCard);
	}
</script>

{#each cards as card (card.id)}
	<div class="sidebar-card-container">
		{#if card.rows && card.rows.length > 0}
			<div class="sidebar-card-rows-container">
				{#each card.rows as row (row.id)}
					<div class="sidebar-card-row">
						{#if row.type === "line"}
							<div
								on:click={() => {
									itemClick(row.id, card.id);
								}}
								class="sidebar-card-item line-container"
							>
								line
							</div>
						{:else if row.type === "customLine"}
							<div
								on:click={() => {
									itemClick(row.id, card.id);
								}}
								class="sidebar-card-item custom-line-container"
							>
								customLine
							</div>
						{/if}
					</div>
				{/each}
			</div>
		{/if}
	</div>
{/each}
aaa

<style lang="scss">
	@import "../styles/webcomponent.scss";
	// @import "../styles/bootstrap.scss";
</style>
