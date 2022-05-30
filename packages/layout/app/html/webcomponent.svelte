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

	import { styleSetup as layoutDesktopStyleSetup } from "../../node_modules/@htmlbricks/hb-layout-desktop/release/docs";
	import { styleSetup as layoutMobileStyleSetup } from "../../node_modules/@htmlbricks/hb-layout-mobile/release/docs";

	import { addComponent, getChildStyleToPass } from "@htmlbricks/hb-jsutils/main";
	import { LanguageTranslator } from "@htmlbricks/hb-jsutils";

	export let id: string;
	export let socials: ISocials;
	export let contacts: IContacts;
	export let company: ICompany;
	export let navlinks: INavLink[];
	export let pagename: string;
	export let usermenu: IUserMenu;
	export let cookielaw: string;
	export let columns: IColumn[];
	export let onescreen: boolean;
	export let cookielawuri4more: string;
	export let cookielawallowdecline: string;
	export let cookielawlanguage: string;
	export let sidebar: Component["sidebar"];
	export let style: string;
	export let size: "small" | "large";
	export let i18nlang: string;

	// let translator: LanguageTranslator;

	let parsedStyle: { [x: string]: string };

	let layoutDesktopStyleSetupToSet: string = "";
	let layoutMobileStyleSetupToSet: string = "";

	let navopen: boolean;
	let wSize: number;

	let layoutType: "small" | "large";
	$: {
		if (style) {
			parsedStyle = parseStyle(style);
			layoutDesktopStyleSetupToSet = getChildStyleToPass(parsedStyle, layoutDesktopStyleSetup?.vars);
			layoutMobileStyleSetupToSet = getChildStyleToPass(parsedStyle, layoutMobileStyleSetup?.vars);
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

		if (!i18nlang) {
			i18nlang = null;
		}

		if (!sidebar) sidebar = null;

		if (!company) {
			company = null;
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

		// 		if (!translator) {
		// 	translator = new LanguageTranslator({ dictionary, lang: i18nlang });
		// } else if (translator && i18nlang && translator.lang && translator.lang !== i18nlang) {
		// 	translator = new LanguageTranslator({ dictionary, lang: i18nlang });
		// }
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

	addComponent({ repoName: "@htmlbricks/hb-layout-desktop", version: pkg.version });
	addComponent({ repoName: "@htmlbricks/hb-layout-mobile", version: pkg.version });
</script>

{#if layoutType === "small"}
	<hb-layout-mobile
		style={layoutMobileStyleSetupToSet}
		company={$$props.company}
		sidebar={$$props.sidebar}
		pagename={$$props.pagename}
		socials={$$props.socials}
		navlinks={$$props.navlinks}
		contacts={$$props.contacts}
		i18nlang={$$props.i18nlang}
		columns={$$props.columns}
		onescreen={$$props.onescreen}
		usermenu={$$props.usermenu}
		cookielawlanguage={$$props.cookielawlanguage}
		cookielawallowdecline={$$props.cookielawallowdecline}
		cookielawuri4more={$$props.cookielawuri4more}
		cookielaw={$$props.cookielaw}
		on:userClick={(l) => dispatch("userClick", l.detail)}
		on:footerClick={(l) => dispatch("footerClick", l.detail)}
		on:pageChange={(l) => dispatch("pageChange", l.detail)}
		on:offcanvasswitch={(l) => dispatch("offcanvasswitch", l.detail)}
		on:layoutStatus={(l) => dispatch("layoutStatus", l.detail)}
	>
		<div slot="page">
			<slot name="page">page</slot>
		</div>
		<div>
			<span slot="nav-header-slot"><slot name="nav-header-slot" /></span>

			<span slot="nav-left-slot"><slot name="nav-left-slot" /></span>
			<span slot="nav-center-slot"><slot name="nav-center-slot" /></span>
			<span slot="nav-right-slot"><slot name="nav-right-slot" /></span>
		</div>
	</hb-layout-mobile>
{:else}
	<hb-layout-desktop
		style={layoutDesktopStyleSetupToSet}
		company={$$props.company}
		sidebar={$$props.sidebar}
		pagename={$$props.pagename}
		socials={$$props.socials}
		navlinks={$$props.navlinks}
		contacts={$$props.contacts}
		i18nlang={$$props.i18nlang}
		columns={$$props.columns}
		onescreen={$$props.onescreen}
		usermenu={$$props.usermenu}
		cookielawlanguage={$$props.cookielawlanguage}
		cookielawallowdecline={$$props.cookielawallowdecline}
		cookielawuri4more={$$props.cookielawuri4more}
		cookielaw={$$props.cookielaw}
		on:userClick={(l) => dispatch("userClick", l.detail)}
		on:footerClick={(l) => dispatch("footerClick", l.detail)}
		on:pageChange={(l) => dispatch("pageChange", l.detail)}
		on:offcanvasswitch={(l) => dispatch("offcanvasswitch", l.detail)}
		on:layoutStatus={(l) => dispatch("layoutStatus", l.detail)}
	>
		<div slot="page">
			<slot name="page">page</slot>
		</div>
		<div>
			<span slot="nav-center-slot"><slot name="nav-center-slot" /></span>
			<span slot="nav-right-slot"><slot name="nav-right-slot" /></span>
		</div>
	</hb-layout-desktop>
{/if}
