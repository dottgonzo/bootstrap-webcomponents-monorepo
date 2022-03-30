<svelte:options tag="hb-offcanvas" />

<script lang="ts">
	/**
	 * Svelte Video Login/Register/Forget Password WebComponent
	 * =====================
	 *
	 * @contributors: Dario Caruso <dev@dariocaruso.info> (https://dariocaruso.info)
	 *
	 * @license: MIT License
	 *
	 */

	import pkg from "../../package.json";
	import type { INavLink } from "../../../sidenav-link/app/types/webcomponent.type";

	import type { Component } from "../types/webcomponent.type";
	import { addComponent, getChildStyleToPass } from "@htmlbricks/hb-jsutils/main";
	import parseStyle from "style-to-object";

	import { styleSetup as sidenavLinkStyleSetup } from "../../node_modules/@htmlbricks/hb-sidenav-link/release/docs";
	import { styleSetup as sidebarDesktopStyleSetup } from "../../node_modules/@htmlbricks/hb-sidenav-link/release/docs";

	import { createEventDispatcher } from "svelte";
	import { get_current_component } from "svelte/internal";
	export let id: string;
	export let opened: boolean;
	export let navlinks: INavLink[];
	export let navpage: string;
	export let groups: Component["groups"];
	export let companylogouri: string;
	export let companytitle: string;
	export let enablefooter: boolean;
	export let type: Component["type"];
	export let style: string;

	let parsedStyle: { [x: string]: string };
	let sidenavLinkStyleToSet: string = "";
	let sidebarDesktopStyleToSet: string = "";
	let sendOff;
	let switched;
	$: {
		if (!id) id = null;

		if (style) {
			parsedStyle = parseStyle(style);
			sidenavLinkStyleToSet = getChildStyleToPass(parsedStyle, sidenavLinkStyleSetup?.vars);
			sidebarDesktopStyleToSet = getChildStyleToPass(parsedStyle, sidebarDesktopStyleSetup?.vars);
		}
		if (!type) type = "autohide";
		if (!companylogouri) companylogouri = "https://upload.wikimedia.org/wikipedia/commons/8/80/Wikipedia-logo-v2.svg";
		if (!companytitle) companytitle = "";
		if (!enablefooter || (enablefooter as unknown as string) === "no") enablefooter = false;
		if (type === "open" || (opened && (opened as unknown as string) !== "no")) {
			opened = true;
			if (sendOff) clearInterval(sendOff);
			if (!switched)
				dispatch("offcanvasswitch", {
					isOpen: opened,
				});
			switched = true;
		} else {
			opened = false;
		}

		if (!navpage) {
			navpage = "home";
		}
		try {
			if (typeof groups === "string") {
				groups = JSON.parse(groups);
			} else if (!groups) {
				groups = [];
			}
			if (!navlinks) {
				navlinks = "" as undefined;
			}
		} catch (err) {}
	}

	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();

	function dispatch(name, detail) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}
	function changePage(page: string) {
		console.log(page);
		dispatch("pageChange", {
			page,
		});
		OpenSwitch(false);
	}
	function OpenSwitch(open: boolean) {
		opened = open;
		switched = false;

		dispatch("offcanvasswitch", {
			isOpen: opened,
		});
	}

	addComponent({ repoName: "@htmlbricks/hb-sidenav-link", version: pkg.version });
	addComponent({ repoName: "@htmlbricks/hb-sidebar-desktop", version: pkg.version });
</script>

<svelte:head>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@latest/font/bootstrap-icons.css" />
</svelte:head>
<div id="webcomponent">
	<slot name="test" />
	<div
		class="offcanvas offcanvas-start show"
		tabindex="-1"
		aria-labelledby="offcanvasExampleLabel"
		style="overflow-y: auto; visibility: visible; {opened ? 'transform:none!important' : 'transform:translateX(-100%)!important'};"
	>
		<hb-sidebar-desktop
			on:pageChange={(e) => dispatch("pageChange", e.detail)}
			style="width:100%"
			navlinks={$$props.navlinks}
			navpage={$$props.$$navpage}
			companytitle={$$props.$$companytitle}
		/>
	</div>
	{#if type === "autohide"}
		<div on:click={() => OpenSwitch(false)} class="modal-backdrop fade {opened ? 'show' : ''}" style="z-index:1040; {opened ? '' : 'visibility:hidden'}" />
	{/if}
</div>

<style lang="scss">
	@import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";

	i {
		min-width: 16px;
		display: inline-block;
	}
	.offcanvas-start {
		width: 240px;
	}
	.nav-link {
		padding: 0.5rem 0.2rem 0.5rem 0.2rem;
	}
</style>
