<svelte:options tag="hb-page-checkout-paypal" />

<script lang="ts">
	/**
	 * Svelte Payment Page WebComponent
	 * =====================
	 *
	 * @contributors: Dario Caruso <dev@dariocaruso.info> (https://dariocaruso.info)
	 *
	 * @license: MIT License
	 *
	 */

	import { createEventDispatcher } from "svelte";
	import { get_current_component } from "svelte/internal";
	import pkg from "../../package.json";
	import type { IShipment, IUser } from "../../../checkout-paypal/app/types/webcomponent.type";
	import type { ICartHeaders, IShopItem } from "../../../checkout-shopping-cart/app/types/webcomponent.type";
	import type { FormSchema } from "../../../form/app/types/webcomponent.type";

	export let id: string;
	export let shipments: IShipment[];
	export let user: IUser;
	export let headers: ICartHeaders;
	export let items: IShopItem[];
	let completed: boolean = false;
	$: {
		if (!id) id = null;
		if (!shipments) shipments = null;
		if (!headers) headers = null;
		if (!items) items = null;

		if (!user) user = null;
	}

	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();
	function dispatch(name, detail) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
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
	addComponent("checkout-shopping-cart");
	addComponent("checkout-paypal");
</script>

<div class="container">
	<div class="row">
		<div class="col-7" style="padding-right:30px"><hb-checkout-paypal {user} {shipments} /></div>
		<div class="col-5" style="padding-left:30px">
			<hb-checkout-shopping-cart {items} {headers} />
			{#if completed}
				<div>Checkout status:</div>
			{:else}
				<div>Checkout status:</div>
			{/if}
		</div>
	</div>
</div>

<style lang="scss">
	@import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
</style>
