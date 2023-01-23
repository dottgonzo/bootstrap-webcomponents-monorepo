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
	import type { IShipment, IUser, IGateway, IPayment as CheckoutPayment } from "../../../checkout/app/types/webcomponent.type";
	import type { IShoppingPayment, IShopItem } from "../../../checkout-shopping-cart/app/types/webcomponent.type";
	import type { FormSchema } from "../../../form/app/types/webcomponent.type";
	import { addComponent, getChildStyleToPass } from "@htmlbricks/hb-jsutils/main";
	import { styleSetup as checkoutStyleSetup } from "../../node_modules/@htmlbricks/hb-checkout/release/docs";
	import { styleSetup as checkoutShoppingCartStyleSetup } from "../../node_modules/@htmlbricks/hb-checkout-shopping-cart/release/docs";

	import parseStyle from "style-to-object";
	let parsedStyle: { [x: string]: string };
	export let style: string;
	let checkoutStyleToSet: string = "";
	let checkoutShoppingCartStyleToSet: string = "";

	export let id: string;
	export let shipments: IShipment[];
	export let user: IUser;
	export let payment: IShoppingPayment & CheckoutPayment;
	export let gateways: IGateway[];
	export let completed: "yes" | "no";
	const defaultPayment: IShoppingPayment & CheckoutPayment = {
		merchantName: "merchant",
		countryCode: "IT",
		total: 0,
		currencyCode: "EUR",
		items: [],
	};

	$: {
		if (!id) id = null;
		if (style) {
			parsedStyle = parseStyle(style);
			checkoutStyleToSet = getChildStyleToPass(parsedStyle, checkoutStyleSetup?.vars);
			checkoutShoppingCartStyleToSet = getChildStyleToPass(parsedStyle, checkoutShoppingCartStyleSetup?.vars);
		}
		if (!completed) completed = "no";
		if (!shipments) shipments = [];
		else if (typeof shipments === "string") shipments = JSON.parse(shipments) || [];
		if (!gateways) gateways = [];
		else if (typeof gateways === "string") gateways = JSON.parse(gateways) || [];
		if (!payment) payment = defaultPayment;
		else if (typeof payment === "string") {
			payment = JSON.parse(payment);
		}
		if (shipments.find((f) => f.selected) || shipments.find((f) => f.standard)) {
			payment.shipmentFee = (shipments.find((f) => f.selected) || shipments.find((f) => f.standard)).price;
		}

		if (!user) user = null;
		let cost = payment?.shipmentFee || 0;
		for (const m of payment.items) {
			cost += m.unitaryPrice * (m.quantity || 1) + Math.round(m.taxPercentage * 0.01 * m.unitaryPrice * (m.quantity || 1) * 100) / 100;
		}
		let currencyCode: string;
		switch (payment?.countryCode?.toUpperCase()) {
			default:
				currencyCode = "EUR";
		}
		payment.total = Math.round(cost * 100) / 100;
		payment.currencyCode = currencyCode;
	}

	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();
	function dispatch(name: string, detail: any) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}

	addComponent({ repoName: "@htmlbricks/hb-checkout-shopping-cart", version: pkg.version });
	addComponent({ repoName: "@htmlbricks/hb-checkout", version: pkg.version });
	function saveShipment(detail: IShipment) {
		const shipmentIndex = shipments.findIndex((f) => f.id === detail.id);
		const shipment = shipments[shipmentIndex];
		shipments.forEach((f) => (f.selected = false));

		shipment.selected = true;
		payment.shipmentFee = shipment.price;
		console.log("sss", shipment, detail);
	}
	function paymentCompleted(data) {
		if (data.completed) {
			completed = "yes";
			dispatch("paymentCompleted", data);
		} else {
			console.warn(data);
		}
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
				style={checkoutStyleToSet}
				on:paymentCompleted={(e) => paymentCompleted(e.detail)}
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
			<hb-checkout-shopping-cart style={checkoutShoppingCartStyleToSet} {completed} payment={JSON.stringify(payment)} />
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
