<svelte:options tag="hb-sidebar-desktop" />

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
	import { addComponent, getChildStyleToPass } from "wc-js-utils/main";
	import parseStyle from "style-to-object";

	import { styleSetup as sidenavLinkStyleSetup } from "../../node_modules/@htmlbricks/hb-sidenav-link/release/docs";

	import { createEventDispatcher } from "svelte";
	import { get_current_component } from "svelte/internal";
	export let id: string;

	export let navlinks: INavLink[];
	export let navpage: string;
	export let groups: Component["groups"];
	export let companylogouri: string;
	export let companytitle: string;
	export let enablefooter: boolean;

	export let style: string;

	let parsedStyle: { [x: string]: string };
	let sidenavLinkStyleToSet: string = "";
	let sendOff;
	let switched;
	$: {
		if (!id) id = null;

		if (style) {
			parsedStyle = parseStyle(style);
			sidenavLinkStyleToSet = getChildStyleToPass(parsedStyle, sidenavLinkStyleSetup?.vars);
		}

		if (!companylogouri) companylogouri = "https://upload.wikimedia.org/wikipedia/commons/8/80/Wikipedia-logo-v2.svg";
		if (!companytitle) companytitle = "";
		if (!enablefooter || (enablefooter as unknown as string) === "no") enablefooter = false;

		if (!navpage) {
			navpage = "home";
		}
		try {
			if (typeof groups === "string") {
				groups = JSON.parse(groups);
			} else if (!groups) {
				groups = [];
			}
			if (typeof navlinks === "string") {
				navlinks = JSON.parse(navlinks);
			} else if (!navlinks) {
				navlinks = [];
				navlinks = null;
			}
		} catch (err) {}
	}

	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();

	function dispatch(name: string, detail: any) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}
	function changePage(page: string) {
		console.log(page);
		dispatch("pageChange", {
			page,
		});
	}

	addComponent({ repoName: "@htmlbricks/hb-sidenav-link", version: pkg.version });
</script>

<svelte:head>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@latest/font/bootstrap-icons.css" />
</svelte:head>
<div id="webcomponent" style="position:relative;height:100%;">
	<slot name="test" />

	<div class="d-flex flex-column p-3 bg-light" style="height:100%;padding-top:0px!important;position: relative; max-height: 100%; overflow-y: auto;">
		<h4 class="offcanvas-title">
			<slot name="header" part="header" />
			{#if companytitle}
				<div style="margin-top:10px">
					{#if companylogouri}
						<img style="height:40px;margin-right:10px" src={companylogouri} alt="" />
					{/if}
					{companytitle}
				</div>
			{/if}

			<!-- <button on:click={() => OpenSwitch(false)} type="button" class="btn-close btn-sm text-reset" style="float:right;" /> -->
		</h4>
		<!-- <hr style="margin-top:9px;margin-bottom: 20px;" /> -->

		<ul class="nav nav-pills flex-column mb-auto" style="margin-top:25px">
			{#if navlinks?.length && navlinks.filter((f) => !f.group)?.length}
				{#each navlinks.filter((f) => !f.group) as navLink (navLink.key)}
					<hb-sidenav-link
						style={sidenavLinkStyleToSet}
						navlink={JSON.stringify(navLink)}
						{navpage}
						on:pageChange={(e) => changePage(e.detail.page)}
					/>
				{/each}
			{/if}
			{#if groups?.length}
				{#each groups as navLinkGroup (navLinkGroup.key)}
					<h5 style="margin-top: 40px;">{navLinkGroup.label}</h5>
					<hr style="margin-top:0px;margin-bottom: 10px;" />

					{#each navlinks.filter((f) => f.group && f.group === navLinkGroup.key) as navLink (navLink.key)}
						<hb-sidenav-link
							style={sidenavLinkStyleToSet}
							navlink={JSON.stringify(navLink)}
							{navpage}
							on:pageChange={(e) => changePage(e.detail.page)}
						/>
					{/each}
				{/each}
			{/if}
			{#if navlinks?.length}
				{#each navlinks
					.filter((f) => f.group && (!groups?.length || !groups.map((m) => m.key).includes(f.group)))
					.map((m) => m.group)
					.filter((v, i, a) => a.indexOf(v) === i) as navLinkGroup (navLinkGroup)}
					<h5 style="margin-top: 40px;">{navLinkGroup}</h5>
					<hr style="margin-top:0px;margin-bottom: 10px;" />

					{#each navlinks.filter((f) => f.group && f.group === navLinkGroup) as navLink (navLink.key)}
						<hb-sidenav-link
							style={sidenavLinkStyleToSet}
							navlink={JSON.stringify(navLink)}
							{navpage}
							on:pageChange={(e) => changePage(e.detail.page)}
						/>
					{/each}
				{/each}
			{/if}

			<!-- {#if navlinks.filter((f) => f.group)?.length}
					<hr />
				{/if} -->
		</ul>
		<!-- TODO: add profile login/logout/managment -->
		{#if enablefooter}
			<hr />
			<slot name="footer">footer</slot>
		{/if}
	</div>
</div>

<style lang="scss">
	@import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
	:host {
		display: block;
		width: 240px;
	}
	i {
		min-width: 16px;
		display: inline-block;
	}

	.nav-link {
		padding: 0.5rem 0.2rem 0.5rem 0.2rem;
	}
</style>
