<svelte:options tag="hb-layout" />

<script lang="ts">
	/**
	 * Svelte Video Gallery WebComponent
	 * =====================
	 *
	 * @contributors: Dario Caruso <dev@dariocaruso.info> (https://dariocaruso.info)
	 *
	 * @license: MIT License
	 *
	 */

	import { get_current_component, onDestroy, onMount } from "svelte/internal";
	import { createEventDispatcher } from "svelte";
	import pkg from "../../package.json";
	import debounce from "debounce";

	import type { IContacts, ISocials, ICompany, IColumn } from "../../../footer/app/types/webcomponent.type";
	import type { IUserMenu } from "../../../navbar/app/types/webcomponent.type";
	import type { INavLink } from "../../../sidenav-link/app/types/webcomponent.type";
	import type { Component } from "../types/webcomponent.type";
	import parseStyle from "style-to-object";

	import { styleSetup as offcanvasStyleSetup } from "../../node_modules/@htmlbricks/hb-offcanvas/release/docs";
	import { styleSetup as footerStyleSetup } from "../../node_modules/@htmlbricks/hb-footer/release/docs";
	import { styleSetup as navbarStyleSetup } from "../../node_modules/@htmlbricks/hb-navbar/release/docs";
	import { styleSetup as cookieLawBannerStyleSetup } from "../../node_modules/@htmlbricks/hb-cookie-law-banner/release/docs";
	import { styleSetup as sidebarDesktopStyleSetup } from "../../node_modules/@htmlbricks/hb-sidebar-desktop/release/docs";
	import { addComponent, getChildStyleToPass } from "@htmlbricks/hb-jsutils/main";

	export let id: string;
	export let socials: ISocials;
	export let contacts: IContacts;
	export let company: ICompany;
	export let navlinks: INavLink[];
	export let pagename: string;
	export let usermenu: IUserMenu;
	export let cookielaw: string;
	export let columns: IColumn[];
	export let onescreen: "yes";
	export let cookielawuri4more: string;
	export let cookielawallowdecline: string;
	export let cookielawlanguage: string;
	export let sidebar: Component["sidebar"];
	export let style: string;
	export let size: "small" | "large";

	let parsedStyle: { [x: string]: string };

	let offcanvasStyleToSet: string = "";
	let footerStyleToSet: string = "";
	let navbarStyleToSet: string = "";
	let cookieLawBannerStyleToSet: string = "";
	let sidebarDesktopStyleToSet: string;

	let navopen: boolean;
	let wSize: number;
	let screensize = "";

	let layoutType: "small" | "large";
	$: {
		sidebarDesktopStyleToSet = ";position: absolute;width:240px;height:100%;min-height:100vh;";

		if (style) {
			parsedStyle = parseStyle(style);
			offcanvasStyleToSet = getChildStyleToPass(parsedStyle, offcanvasStyleSetup?.vars);
			footerStyleToSet = getChildStyleToPass(parsedStyle, footerStyleSetup?.vars);
			navbarStyleToSet = getChildStyleToPass(parsedStyle, navbarStyleSetup?.vars);
			cookieLawBannerStyleToSet = getChildStyleToPass(parsedStyle, cookieLawBannerStyleSetup?.vars);
			sidebarDesktopStyleToSet = sidebarDesktopStyleToSet + getChildStyleToPass(parsedStyle, sidebarDesktopStyleSetup?.vars);
		}
		if (!size) size = undefined;
		if (!id) id = "";
		if (!cookielawuri4more) cookielawuri4more = "";
		if (!cookielawallowdecline) cookielawallowdecline = "";
		if (!cookielawlanguage) cookielawlanguage = "";
		if (!pagename) pagename = null;
		if (!cookielaw) {
			cookielaw = null;
		}
		if (!usermenu) {
			usermenu = null;
		}
		if (!columns) {
			columns = null;
		}
		if (!onescreen) {
			onescreen = null;
		}
		if (!sidebar) sidebar = {};
		else if (typeof sidebar === "string") {
			sidebar = JSON.parse(sidebar);
		}
		if (!company) {
			company = null;
		} else if (typeof company === "string") {
			company = JSON.parse(company as unknown as string);
		}
		if (!navlinks) {
			navlinks = null;
		}
		if (!socials) {
			socials = null;
		}
		if (!contacts) {
			contacts = null;
		}
		screensize = onescreen ? "display: flex;flex-direction: column;	height: 100vh;" : "display:block;";

		if (layoutType) {
			switch (layoutType) {
				case "small":
					break;
				case "large":
					screensize = screensize + ";padding-left:240px;";

					break;
				default:
					console.warn("Layout type not supported");
					break;
			}
		}
	}
	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();
	function dispatch(name, detail) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}

	const recheckSize = debounce(detectSize, 500);
	onMount(() => {
		detectSize();
		window.addEventListener("resize", recheckSize);
		return () => {
			window.removeEventListener("resize", recheckSize);
		};
	});

	function detectSize() {
		console.log("checkSize");
		if (!window?.innerWidth) {
			if (wSize) return wSize;

			return 0;
		}

		wSize = window.innerWidth;
		if (size) {
			layoutType = size;
			return;
		}
		if (wSize < 992) {
			layoutType = "small";
		} else {
			layoutType = "large";
		}
		dispatch("layoutStatus", { width: wSize, size: layoutType });

		console.log("size:", wSize);
	}

	addComponent({ repoName: "@htmlbricks/hb-footer", version: pkg.version });
	addComponent({ repoName: "@htmlbricks/hb-offcanvas", version: pkg.version });
	addComponent({ repoName: "@htmlbricks/hb-navbar", version: pkg.version });
	addComponent({ repoName: "@htmlbricks/hb-cookie-law-banner", version: pkg.version });
	addComponent({ repoName: "@htmlbricks/hb-sidebar-desktop", version: pkg.version });

	function openmenu(o) {
		console.log("burgerclick", o);
		navopen = o.isOpen;

		dispatch("offcanvasswitch", o);
	}
</script>

{#if navlinks?.length}
	{#if layoutType === "small"}
		<hb-offcanvas
			style={offcanvasStyleToSet}
			navpage={pagename || ""}
			navlinks={navlinks || "[]"}
			companytitle={sidebar?.title}
			companylogouri={sidebar?.logo}
			on:offcanvasswitch={(el) => openmenu(el.detail)}
			opened={navopen ? "yes" : "no"}
			type="autohide"
			on:pageChange={(p) => dispatch("pageChange", p.detail)}
		>
			<span slot="header"><slot name="nav-header-slot" /></span>
		</hb-offcanvas>
	{:else if layoutType === "large"}
		<hb-sidebar-desktop
			on:pageChange={(e) => dispatch("pageChange", e.detail)}
			style={sidebarDesktopStyleToSet}
			navlinks={navlinks || "[]"}
			navpage={pagename || ""}
			companytitle={sidebar?.title}
		/>
	{/if}
{/if}
<div style={screensize} part="container">
	<hb-navbar
		part="navbar"
		style={navbarStyleToSet}
		noburger={layoutType === "small" && navlinks ? "" : "yes"}
		companylogouri={company?.logoUri || ""}
		companybrandname={company?.siteName || ""}
		usermenu={usermenu || ""}
		switchopen={navopen ? "yes" : "no"}
		on:navmenuswitch={(el) => openmenu(el.detail)}
		on:userClick={(el) => dispatch("userClick", el.detail)}
	>
		<span slot="left-slot"><slot name="nav-left-slot" /></span>
		<span slot="center-slot"><slot name="nav-center-slot" /></span>
		<span slot="right-slot"><slot name="nav-right-slot" /></span>
	</hb-navbar>

	<div style={onescreen ? "flex: 2" : ""} part="page" id="page">
		<slot name="page">page</slot>
	</div>
	{#if cookielaw || cookielawallowdecline || cookielawlanguage || cookielawuri4more}
		<hb-cookie-law-banner style={cookieLawBannerStyleToSet} language={cookielawlanguage} allowdecline={cookielawallowdecline} {cookielawuri4more} />
	{/if}
	<hb-footer
		part="footer"
		socials={socials ? JSON.stringify(socials) : ""}
		contacts={contacts ? JSON.stringify(contacts) : ""}
		style="display:block;{footerStyleToSet}"
		company={company ? JSON.stringify(company) : ""}
		columns={columns || ""}
		on:footerClick={(el) => dispatch("footerClick", el.detail)}
	/>
</div>

<style lang="scss">
	// @import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
</style>
