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

	import { get_current_component } from "svelte/internal";
	import { createEventDispatcher } from "svelte";
	import pkg from "../../package.json";

	import type { IContacts, ISocials, ICompany, IColumn } from "../../../footer/app/types/webcomponent.type";
	import type { IUserMenu } from "../../../navbar/app/types/webcomponent.type";
	import type { INavLink } from "../../../sidenav-link/app/types/webcomponent.type";
	import type { Component } from "../types/webcomponent.type";
	import parseStyle from "style-to-object";

	import { styleSetup as offcanvasStyleSetup } from "../../node_modules/@htmlbricks/hb-offcanvas/release/docs";
	import { styleSetup as footerStyleSetup } from "../../node_modules/@htmlbricks/hb-footer/release/docs";
	import { styleSetup as navbarStyleSetup } from "../../node_modules/@htmlbricks/hb-navbar/release/docs";
	import { styleSetup as cookieLawBannerStyleSetup } from "../../node_modules/@htmlbricks/hb-cookie-law-banner/release/docs";
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

	let parsedStyle: { [x: string]: string };

	let offcanvasStyleToSet: string = "";
	let footerStyleToSet: string = "";
	let navbarStyleToSet: string = "";
	let cookieLawBannerStyleToSet: string = "";

	let navopen: boolean;
	$: {
		if (style) {
			parsedStyle = parseStyle(style);
			offcanvasStyleToSet = getChildStyleToPass(parsedStyle, offcanvasStyleSetup?.vars);
			footerStyleToSet = getChildStyleToPass(parsedStyle, footerStyleSetup?.vars);
			navbarStyleToSet = getChildStyleToPass(parsedStyle, navbarStyleSetup?.vars);
			cookieLawBannerStyleToSet = getChildStyleToPass(parsedStyle, cookieLawBannerStyleSetup?.vars);
		}
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
		navopen = false;
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
	}
	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();
	function dispatch(name, detail) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}

	addComponent("@htmlbricks/hb-footer", pkg.version);
	addComponent("@htmlbricks/hb-offcanvas", pkg.version);
	addComponent("@htmlbricks/hb-navbar", pkg.version);
	addComponent("@htmlbricks/hb-cookie-law-banner", pkg.version);

	function openmenu(o) {
		if (o.isOpen || o.isOpen === false) navopen = o.isOpen;
		console.log("evvvv", navopen, o);
		dispatch("offcanvasswitch", o);
	}
</script>

<div style={onescreen ? "display: flex;flex-direction: column;	height: 100vh;" : "display:block"} part="container">
	{#if navlinks?.length}
		<hb-offcanvas
			style={offcanvasStyleToSet}
			navpage={pagename || ""}
			navlinks={navlinks || "[]"}
			companytitle={sidebar?.title}
			companylogouri={sidebar?.logo}
			on:offcanvasswitch={(el) => openmenu(el.detail)}
			opened={navopen ? "yes" : "no"}
			type={sidebar?.type ? sidebar.type : "autohide"}
			on:pagechange={(p) => dispatch("pagechange", p.detail)}
		>
			<span slot="header"><slot name="nav-header-slot" /></span>
		</hb-offcanvas>
	{/if}
	<hb-navbar
		part="navbar"
		style={navbarStyleToSet}
		noburger={navlinks ? "" : "yes"}
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
