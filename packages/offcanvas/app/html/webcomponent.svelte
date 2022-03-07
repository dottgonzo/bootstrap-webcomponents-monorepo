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

	import { createEventDispatcher } from "svelte";
	import { get_current_component } from "svelte/internal";
	export let id: string;
	export let opened: boolean;
	export let navlinks: INavLink[];
	export let navpage: string;
	export let groups: string;
	export let companylogouri: string;
	export let companytitle: string;
	export let enablefooter: boolean;
	export let type: "open" | "autohide" | "small";
	let groupsArr: { key: string; label: string }[] = [];
	let sendOff;
	let switched;
	$: {
		if (!id) id = null;
		if (!type) type = "autohide";
		if (!companylogouri) companylogouri = "https://upload.wikimedia.org/wikipedia/commons/8/80/Wikipedia-logo-v2.svg";
		if (!companytitle) companytitle = "company";
		if (!enablefooter) enablefooter = false;
		if (opened && (opened as unknown as string) !== "no") {
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
			if (groups) {
				groupsArr = JSON.parse(groups);
			} else {
				groups = null;
				groupsArr = [];
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

	function dispatch(name, detail) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}
	function changePage(page: string) {
		console.log(page);
		dispatch("pagechange", {
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
	function addComponent(componentName: string) {
		if (!document.getElementById("hb-" + componentName + "-script")) {
			const script = document.createElement("script");
			script.id = "hb-" + componentName + "-script";
			script.src = `https://cdn.jsdelivr.net/npm/@htmlbricks/hb-${componentName}@${pkg.version}/release/release.js`;
			if (location.href.includes("localhost")) script.src = `http://localhost:6006/${componentName}/dist/release.js`;

			document.head.appendChild(script);
		}
	}
	addComponent("sidenav-link");
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
		style="visibility: visible; {opened ? 'transform:none!important' : 'transform:translateX(-100%)!important;'}"
	>
		<div class="d-flex flex-column flex-shrink-0 p-3 bg-light" style="min-height:100vh;padding-top:0px!important">
			<h4 class="offcanvas-title">
				<slot name="header" part="header">
					<div style="margin-top:10px">
						{#if companylogouri}
							<img style="height:40px;margin-right:10px" src={companylogouri} alt="" />
						{/if}
						{companytitle}
					</div>
				</slot>

				<!-- <button on:click={() => OpenSwitch(false)} type="button" class="btn-close btn-sm text-reset" style="float:right;" /> -->
			</h4>
			<!-- <hr style="margin-top:9px;margin-bottom: 20px;" /> -->

			<ul class="nav nav-pills flex-column mb-auto" style="margin-top:25px">
				{#if navlinks?.length && navlinks.filter((f) => !f.group)?.length}
					{#each navlinks.filter((f) => !f.group) as navLink (navLink.key)}
						<hb-sidenav-link navlink={JSON.stringify(navLink)} {navpage} on:pagechange={(e) => changePage(e.detail.page)} />
					{/each}
				{/if}
				{#if groupsArr?.length}
					{#each groupsArr as navLinkGroup (navLinkGroup.key)}
						<h5 style="margin-top: 40px;">{navLinkGroup.label}</h5>
						<hr style="margin-top:0px;margin-bottom: 10px;" />

						{#each navlinks.filter((f) => f.group && f.group === navLinkGroup.key) as navLink (navLink.key)}
							<hb-sidenav-link navlink={JSON.stringify(navLink)} {navpage} on:pagechange={(e) => changePage(e.detail.page)} />
						{/each}
					{/each}
				{/if}
				{#if navlinks?.length}
					{#each navlinks
						.filter((f) => f.group && (!groupsArr || !groupsArr.length || !groupsArr.map((m) => m.key).includes(f.group)))
						.map((m) => m.group)
						.filter((v, i, a) => a.indexOf(v) === i) as navLinkGroup (navLinkGroup)}
						<h5 style="margin-top: 40px;">{navLinkGroup}</h5>
						<hr style="margin-top:0px;margin-bottom: 10px;" />

						{#each navlinks.filter((f) => f.group && f.group === navLinkGroup) as navLink (navLink.key)}
							<hb-sidenav-link navlink={JSON.stringify(navLink)} {navpage} on:pagechange={(e) => changePage(e.detail.page)} />
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
