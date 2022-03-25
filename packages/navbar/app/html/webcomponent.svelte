<svelte:options tag="hb-navbar" />

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
	import type { IUserMenu } from "@app/types/webcomponent.type";
	import { addComponent, getChildStyleToPass } from "@htmlbricks/hb-jsutils/main";
	import { styleSetup as dropdownSimpleStyleSetup } from "../../node_modules/@htmlbricks/hb-dropdown-simple/release/docs";

	import parseStyle from "style-to-object";
	let parsedStyle: { [x: string]: string };
	export let style: string;
	let dropdownSimpleStyleToSet: string = "";

	export let id: string;
	export let companybrandname: string;
	export let companylogouri: string;
	export let switchopen: string;
	export let usermenu: IUserMenu;
	export let noburger: string;

	let isOpen: boolean;
	$: {
		if (style) {
			parsedStyle = parseStyle(style);
			dropdownSimpleStyleToSet = getChildStyleToPass(parsedStyle, dropdownSimpleStyleSetup?.vars);
		}
		if (!companybrandname) companybrandname = "";
		if (!companylogouri) companylogouri = "";
		if (!id) id = "";
		if (!switchopen || switchopen === "no") {
			switchopen = "";
			isOpen = false;
		} else {
			isOpen = true;
		}
		if (!noburger) {
			noburger = null;
		}
		if (!usermenu) {
			usermenu = null;
		} else if (typeof usermenu === "string") {
			usermenu = JSON.parse(usermenu);
		}
	}

	addComponent("dropdown-simple", pkg.version);

	// if (!document.getElementById("spectrumelements")) {
	// 	const script = document.createElement("script");
	// 	script.id = "spectrumelements";
	// 	script.src = `https://jspm.dev/@spectrum-web-components/bundle/elements.js`;
	// 	script.type = "module";

	// 	document.head.appendChild(script);
	// }
	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();

	function dispatch(name, detail) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}
	function switchMenu() {
		isOpen = !isOpen;
		dispatch("navmenuswitch", {
			isOpen,
		});
	}
</script>

<nav id="navbar">
	<div style="text-align:left" class="navitem" part="left-slot">
		{#if !noburger}
			<button style="font-size:20px;border:none" on:click={() => switchMenu()}>☰</button>
		{/if}
		<slot name="left-slot" />
	</div>
	<div part="center-slot" class="navitem">
		<slot name="brand">
			{#if companylogouri}<img style="height: 30px;vertical-align: middle;" alt="" src={companylogouri} />{/if}
			{companybrandname}
		</slot>
		<slot name="center-slot" />
	</div>

	<div part="right-slot" class="navitem">
		<div style="display: inline-block;">
			<slot name="right-slot">
				<!-- <div style="text-align:right;margin-right:10px">{pagetitle}</div> -->
			</slot>
		</div>
		{#if usermenu}
			<hb-dropdown-simple
				style={dropdownSimpleStyleToSet}
				on:dropDownClick={(e) => dispatch("userClick", e.detail.key)}
				list={JSON.stringify(usermenu.list)}
				position="right"
				><span slot="dropdownbutton"><img style="height: 30px;vertical-align: middle;" alt="" src={usermenu.imgUri} /></span></hb-dropdown-simple
			>
			<!-- 
					<sp-avatar size="100" label="Dog the User" src={usermenu.imgUri} />
				<sp-action-menu size="m" style="margin-right:5px;max-height:30px">
					{#each usermenu.list as menuItem (menuItem.key)}
						<sp-menu-item on:click={() => dispatch("userClick", menuItem.key)} style="min-width:{menuItem.badge ? '140px' : ''}">
							<span style="line-height: 24px">{menuItem.label}</span>
							{#if menuItem.badge}
								<sp-button style="float: right;" size="s" variant="secondary">{menuItem.badge}</sp-button>
							{/if}
						</sp-menu-item>
					{/each}
				</sp-action-menu> -->

			<!-- <bootstrapdropdown-component list={usermenu.list?.length ? JSON.stringify(usermenu.list) : ""}>
				<div slot="dropdownbutton">user</div>
			</bootstrapdropdown-component> -->
		{/if}
	</div>
</nav>
<!-- Insert content requiring theme application here. -->

<!-- End content requiring theme application. -->
<style lang="scss">
	// @import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
</style>
