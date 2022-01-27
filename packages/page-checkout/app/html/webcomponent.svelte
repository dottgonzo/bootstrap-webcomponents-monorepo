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
	import type { IShipment, IUser, IGateway, IPayment } from "../../../checkout/app/types/webcomponent.type";
	import type { ICartHeaders, IShopItem } from "../../../checkout-shopping-cart/app/types/webcomponent.type";
	import type { FormSchema } from "../../../form/app/types/webcomponent.type";
	import type { IMerchant } from "@app/types/webcomponent.type";

	export let id: string;
	export let shipments: IShipment[];
	export let user: IUser;
	export let headers: ICartHeaders;
	export let items: IShopItem[];
	export let gateways: IGateway[];
	export let merchant: IMerchant;
	export let completed: "yes" | "no";

	let payment: IPayment;
	const defaultMerchant: IMerchant = {
		name: "merchant",
	};
	$: {
		if (!id) id = null;
		if (!completed) completed = "no";
		if (!merchant) merchant = defaultMerchant;
		else if (typeof merchant === "string") merchant = JSON.parse(merchant) || defaultMerchant;
		if (!shipments) shipments = [];
		else if (typeof shipments === "string") shipments = JSON.parse(shipments) || [];
		if (!items) items = [];
		else if (typeof items === "string") items = JSON.parse(items) || [];
		if (!gateways) gateways = [];
		else if (typeof gateways === "string") gateways = JSON.parse(gateways) || [];
		if (!headers) headers = { country: "us" };
		else if (typeof headers === "string") {
			headers = JSON.parse(headers);
		}
		if (shipments.find((f) => f.selected) || shipments.find((f) => f.standard)) {
			headers.shipmentFee = (shipments.find((f) => f.selected) || shipments.find((f) => f.standard)).price;
		}

		if (!user) user = null;
		let cost = headers?.shipmentFee || 0;
		for (const m of items) {
			cost += m.unitaryPrice * (m.quantity || 1) + Math.round(m.taxPercentage * 0.01 * m.unitaryPrice * (m.quantity || 1) * 100) / 100;
		}
		let currencyCode: string;
		switch (headers?.country?.toUpperCase()) {
			default:
				currencyCode = "EUR";
		}
		payment = {
			merchantName: merchant.name,
			countryCode: headers?.country?.toUpperCase(),
			currencyCode,
			total: Math.round(cost * 100) / 100,
		};
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
				on:paymentCompleted={(e) => dispatch("paymentCompleted", e.detail)}
				on:saveUser={(e) => dispatch("saveUser", e.detail)}
				on:saveShipment={(e) => saveShipment(e.detail)}
				{completed}
				{user}
				shipments={JSON.stringify(shipments)}
				gateways={JSON.stringify(gateways)}
				payment={JSON.stringify(payment)}
			/>
		</div>
		<div class="col-5" style="padding-left:30px">
			<hb-checkout-shopping-cart items={JSON.stringify(items)} headers={JSON.stringify(headers)} />
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
