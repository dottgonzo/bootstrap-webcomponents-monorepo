<svelte:options tag="hb-sidebar-cards-navigator" />

<script lang="ts">
	import pkg from "../../package.json";

	import { get_current_component, onDestroy, onMount } from "svelte/internal";

	import { createEventDispatcher } from "svelte";
	import parseStyle from "style-to-object";
	import { addComponent, getChildStyleToPass } from "@htmlbricks/hb-jsutils/main";
	import type { Component, CardRowSelected, CardRowLine } from "@app/types/webcomponent.type";
	import { styleSetup as navbarStyleSetup } from "../../node_modules/@htmlbricks/hb-navbar/release/docs";
	import type { Component as NavbarComponent } from "../../node_modules/@htmlbricks/hb-sidenav-link/release/webcomponent.type";
	import { styleSetup as sidenavLinkStyleSetup } from "../../node_modules/@htmlbricks/hb-sidenav-link/release/docs";

	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();

	function dispatch(name: string, detail: any) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}

	export let id: string;
	export let style: string;

	// export let string: string;
	// export let json: Component["json"];
	// export let boolean: boolean;
	export let panels: Component["panels"];

	let parsedStyle: { [x: string]: string };
	let navbarStyleToSet: string = "";
	let sidenavLinkStyleToSet: string = "";
	let panel: Component["panels"][0];

	$: {
		if (!id) id = "";
		if (style) {
			parsedStyle = parseStyle(style);
			navbarStyleToSet = getChildStyleToPass(parsedStyle, navbarStyleSetup?.vars);
			sidenavLinkStyleToSet = getChildStyleToPass(parsedStyle, sidenavLinkStyleSetup?.vars);
		}
		// if (!string) string = "";

		// panels
		if (typeof panels === "string") {
			try {
				panels = JSON.parse(panels);
			} catch (err) {
				console.error("error parsing panels", err);
			}
		}
		if (!panel && panels?.length) {
			panel = panels.find((f) => f.main);
			if (!panel) panel = panels.find((f) => !f.parentPanelId);
		}

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
		const card = panel.cards.find((c) => c.id === cardId);
		const rowItem = card.rows.find((r) => r.id === itemId);
		const simplePanel = Object.assign({}, panel);
		delete simplePanel.cards;

		const simpleCard = Object.assign({}, card);
		delete simpleCard.rows;

		const customCard: CardRowSelected = { id, row: rowItem, panel: simplePanel, card: simpleCard };
		dispatch("itemClick", customCard);
		if (rowItem.switchToPanelId) {
			panel = panels.find((p) => p.id === rowItem.switchToPanelId);
		}
	}
	addComponent({ repoName: "@htmlbricks/hb-navbar", version: pkg.version });
	addComponent({ repoName: "@htmlbricks/hb-sidenav-link", version: pkg.version });

	function rowToLineNavlink(row: CardRowLine) {
		const newSidebarLink: NavbarComponent["navlink"] = {
			label: row.text,
			key: row.id,
		};
		if (row.bootstrapIcon) newSidebarLink.icon = row.bootstrapIcon;
		if (row.badge) newSidebarLink.badge = row.badge;
		return newSidebarLink;
	}
</script>

to be done, ref <a href="https://web.telegram.org/z/">https://web.telegram.com</a> left panel
<!-- <div class="sidebar-panel-card"> -->
{#if panel}
	<hb-navbar />
	{#each panel.cards as card (card.id)}
		<div class="sidebar-card-container">
			{#if card.rows && card.rows.length > 0}
				<div class="sidebar-card-rows-container">
					{#each card.rows as row (row.id)}
						<div class="sidebar-card-row">
							{#if row.type === "line"}
								<hb-sidenav-link
									on:pageChange={(e) => {
										itemClick(row.id, card.id);
									}}
									navlink={JSON.stringify(rowToLineNavlink(row))}
								/>
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
{/if}

<!-- </div> -->
<style lang="scss">
	@import "../styles/webcomponent.scss";
	// @import "../styles/bootstrap.scss";
</style>
