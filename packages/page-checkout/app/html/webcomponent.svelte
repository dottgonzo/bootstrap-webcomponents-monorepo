<svelte:options tag="hb-page-checkout" />

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
	import type { IShipment, IUser, IGateway } from "../../../checkout/app/types/webcomponent.type";
	import type { ICartHeaders, IShopItem } from "../../../checkout-shopping-cart/app/types/webcomponent.type";
	import type { FormSchema } from "../../../form/app/types/webcomponent.type";

	export let id: string;
	export let shipments: IShipment[];
	export let user: IUser;
	export let headers: ICartHeaders;
	export let items: IShopItem[];
	export let gateways: IGateway[];
	export let completed: "yes" | "no";
	$: {
		if (!id) id = null;
		if (!completed) completed = "no";
		if (!shipments) shipments = [];
		else if (typeof shipments === "string") shipments = JSON.parse(shipments) || [];
		if (!gateways) gateways = [];
		else if (typeof gateways === "string") gateways = JSON.parse(gateways) || [];
		if (!headers) headers = {};
		else if (typeof headers === "string") {
			headers = JSON.parse(headers);
		}
		if (shipments.find((f) => f.selected) || shipments.find((f) => f.standard)) {
			headers.shipmentFee = (shipments.find((f) => f.selected) || shipments.find((f) => f.standard)).price;
		}
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
	addComponent("checkout");
	function saveShipment(detail: IShipment) {
		const shipmentIndex = shipments.findIndex((f) => f.id === detail.id);
		const shipment = shipments[shipmentIndex];
		shipments.forEach((f) => (f.selected = false));

		shipment.selected = true;
		headers.shipmentFee = shipment.price;
		console.log("sss", shipment, detail);
	}
</script>

<!-- {#if completed ==="yes"}
				<div>Checkout status:</div>
			{:else}
				<div>Checkout status:</div>
			{/if} -->
<div class="container">
	<div class="row">
		<div class="col-7" style="padding-right:30px">
			<hb-checkout
				on:payByCard={(e) => dispatch("payByCard", e.detail)}
				on:payByAccount={(e) => dispatch("payByAccount", e.detail)}
				on:saveUser={(e) => dispatch("saveUser", e.detail)}
				on:saveShipment={(e) => saveShipment(e.detail)}
				{user}
				shipments={JSON.stringify(shipments)}
				gateways={JSON.stringify(gateways)}
			/>
		</div>
		<div class="col-5" style="padding-left:30px">
			<hb-checkout-shopping-cart {items} headers={JSON.stringify(headers)} />
		</div>
	</div>
</div>

<style lang="scss">
	:host {
		font-family: "Roboto", sans-serif;
		display: block;
		margin: 40px 0px 40px 0px;
		--hb-checkout-border: 0.5px solid rgba(197, 197, 197, 0.808);
	}

	@import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
	hb-checkout-shopping-cart {
		border: var(--hb-checkout-border);
		--hb-checkout-border: 0.5px solid rgba(197, 197, 197, 0.808);
	}
	hb-checkout-paypal {
		--hb-checkout-border: 0.5px solid rgba(197, 197, 197, 0.808);
	}
</style>
