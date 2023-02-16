<svelte:options tag="hb-sidebar-cards-navigator" />

<script lang="ts">
	import pkg from "../../package.json";

	import { get_current_component, onDestroy, onMount } from "svelte/internal";

	import { createEventDispatcher } from "svelte";
	import parseStyle from "style-to-object";
	import { addComponent, getChildStyleToPass } from "@htmlbricks/hb-jsutils/main";
	import type { Component, CardRowSelected, CardRow } from "@app/types/webcomponent.type";
	import { styleSetup as navbarStyleSetup } from "../../node_modules/@htmlbricks/hb-navbar/release/docs";

	import type { Component as SidenavButtonComponent } from "../../node_modules/@htmlbricks/hb-sidenav-button/release/webcomponent.type";
	import { styleSetup as sidenavButtonStyleSetup } from "../../node_modules/@htmlbricks/hb-sidenav-button/release/docs";

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
	let sidenavButtonStyleToSet: string = "";
	let panel: Component["panels"][0];

	$: {
		if (!id) id = "";
		if (style) {
			parsedStyle = parseStyle(style);
			navbarStyleToSet = getChildStyleToPass(parsedStyle, navbarStyleSetup?.vars);
			sidenavButtonStyleToSet = getChildStyleToPass(parsedStyle, sidenavButtonStyleSetup?.vars);
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
		const rowItem = card.rows.find((r) => r.key === itemId);
		const simplePanel = Object.assign({}, panel);
		delete simplePanel.cards;

		const simpleCard = Object.assign({}, card);
		delete simpleCard.rows;

		const customCard: CardRowSelected = { id, row: rowItem, panel: simplePanel, card: simpleCard };
		dispatch("itemClick", customCard);
		if (rowItem.switchToPanelId) {
			// const oldPanelId = panel.id;
			if (panels.find((p) => p.id === rowItem.switchToPanelId)) {
				panel = panels.find((p) => p.id === rowItem.switchToPanelId);
				// panel.parentPanelId = oldPanelId;
			}
		}
	}
	addComponent({ repoName: "@htmlbricks/hb-navbar", version: pkg.version });
	addComponent({ repoName: "@htmlbricks/hb-sidenav-button", version: pkg.version });

	function rowToLineNavlink(row: CardRow) {
		const newSidebarLink: SidenavButtonComponent["navlink"] = {
			text: row.text,
			key: row.key,
		};
		if (row.bootstrapIcon) newSidebarLink.bootstrapIcon = row.bootstrapIcon;
		if (row.badge) newSidebarLink.badge = row.badge;
		return newSidebarLink;
	}
</script>

<svelte:head>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@latest/font/bootstrap-icons.css" />
</svelte:head>
to be done, ref <a href="https://web.telegram.org/z/">https://web.telegram.com</a> left panel
<!-- <div class="sidebar-panel-card"> -->
{#if panel}
	<hb-navbar
		on:navmenuswitch={(s) => {
			if (panel.parentPanelId) {
				panel = panels.find((p) => p.id === panel.parentPanelId);
			}
		}}
		companybrandname={panel.title}
	>
		<i
			slot="nav-switcher"
			style="font-weight:bold;cursor:{panel.parentPanelId ? 'pointer' : ''}"
			class="bi bi-{panel.parentPanelId ? 'arrow-left' : 'list'}"
		/>
	</hb-navbar>
	{#each panel.cards as card (card.id + "_c_" + panel.id)}
		<div class="sidebar-card-container">
			{#if card.rows && card.rows.length > 0}
				<div class="sidebar-card-rows-container">
					{#each card.rows as row (row.key + "_r_" + card.id)}
						<div class="sidebar-card-row">
							<hb-sidenav-button
								on:pageChange={(e) => {
									itemClick(row.key, card.id);
								}}
								navlink={JSON.stringify(rowToLineNavlink(row))}
							/>
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
