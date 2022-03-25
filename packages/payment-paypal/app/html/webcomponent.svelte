<svelte:options tag="hb-payment-paypal" />

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
	import { get_current_component, onMount, onDestroy } from "svelte/internal";
	import pkg from "../../package.json";
	import type { FormSchema } from "../../../form/app/types/webcomponent.type";
	import { formCreditCardSchema } from "@app/functions/formSchemes";
	import { loadScript } from "@paypal/paypal-js";
	import { addComponent, getChildStyleToPass } from "@htmlbricks/hb-jsutils/main";
	import parseStyle from "style-to-object";
	let parsedStyle: { [x: string]: string };
	export let style: string;
	import { styleSetup as formStyleSetup } from "../../node_modules/@htmlbricks/hb-form/release/docs";
	let formStyleToSet: string = "";

	export let id: string;
	export let paypalid: string;
	export let currency: "EUR" | "USD";
	export let total: number;
	let start = false;
	let paypal;
	let paypalEl: HTMLElement;
	let formCreditCardSchemaSubmitted: "yes" | "no" = "no";
	$: {
		if (!id) id = null;
		if (style) {
			parsedStyle = parseStyle(style);
			formStyleToSet = getChildStyleToPass(parsedStyle, formStyleSetup?.vars);
		}
		if (!total) total = null;
		else total = Number(total);
		if (!currency) currency = "EUR";
		else currency = currency.toUpperCase() as "EUR" | "USD";
		if (paypalid) {
			mountPaypalJs();
		} else {
			paypalid = null;
		}
	}
	function mountPaypalJs() {
		if (paypal) paypal.close();
		if (paypalid && paypalEl && !start) {
			start = true;
			loadScript({ "client-id": paypalid, currency })
				.then((p) => {
					console.info("configured paypal payment");
					paypal = p;
					start = false;
					paypal
						.Buttons({
							style: {
								layout: "horizontal",
								tagline: false,
								height: 40,
								width: "100%",
							},
							createOrder: function (data, actions) {
								return actions.order.create({
									purchase_units: [
										{
											amount: {
												value: total.toString(),
											},
										},
									],
								});
							},
							onApprove: function (data, actions) {
								return actions.order.capture().then(function (details) {
									dispatch("paymentCompleted", { method: "paypal", total });
								});
							},
						})
						.render(paypalEl)
						.catch((error) => {
							console.error("failed to render the PayPal Buttons", error);
						});
				})
				.catch((err) => {
					console.error("failed to load the PayPal JS SDK script", err);
				});
		}
	}

	onMount(() => {
		paypalEl = component.shadowRoot.getElementById("paypalbtn");
		mountPaypalJs();
		return () => {
			try {
				paypal.close();
			} catch (err) {}
		};
	});

	function cardChange(u: { _valid: boolean; fullName?: string; cardNumber?: string; CVV?: string; expiration?: string }) {
		for (const k of ["fullName", "cardNumber", "CVV", "expiration"]) {
			if (formCreditCardSchema.find((f) => f.id === k)) {
				formCreditCardSchema[formCreditCardSchema.findIndex((f) => f.id === k)].value = u[k];
			} else if (formCreditCardSchema.find((f) => f.params?.columns?.length && f.params.columns.find((ff) => ff.id === k))) {
				const rowIndex = formCreditCardSchema.findIndex((f) => f.params?.columns?.length && f.params.columns.find((ff) => ff.id === k));
				const elIndex = formCreditCardSchema[rowIndex].params.columns.findIndex((ff) => ff.id === k);
				formCreditCardSchema[rowIndex].params.columns[elIndex].value = u[k];
			}
		}
	}

	// function payByCard(p: {}) {
	// 	formCreditCardSchemaSubmitted = "no";

	// 	dispatch("payByCard", p);
	// }

	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();
	function dispatch(name, detail) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}

	// if (!document.getElementById("paypaljs-script")) {
	// 	const script = document.createElement("script");
	// 	script.id = "paypaljs-script";
	// 	script.src = "https://www.paypal.com/sdk/js?components=buttons,hosted-fields&client-id=<YOUR-CLIENT-ID>";
	// 	script["data-client-token"] = "<YOUR-CLIENT-TOKEN>";
	// 	document.head.appendChild(script);
	// }

	addComponent("form", pkg.version);
</script>

<div part="btn" id="paypalbtn" />

<!-- <div class="utils_or"><span>or</span></div>
<div>
	<div>
		<hb-form
			schema={JSON.stringify(formCreditCardSchema)}
			submitted={formCreditCardSchemaSubmitted}
			on:submit={(e) => payByCard(e.detail)}
			on:change={(e) => {
				cardChange(e.detail);
			}}
		/>
	</div>
	<div>
		<button
			on:click={() => {
				formCreditCardSchemaSubmitted = "yes";
				setTimeout(() => {
					formCreditCardSchemaSubmitted = "no";
				}, 200);
			}}
			style="width:100%"
			class="btn btn-primary">place order</button
		>
	</div>
</div> -->
<style lang="scss">
	@import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
	.utils_or {
		width: 50%;
		text-align: center;
		border-bottom: var(--hb-checkout-border);
		line-height: 0.1em;
		margin: 40px auto 30px auto;
	}
	.utils_or span {
		background: #fff;
		padding: 0 10px;
	}
</style>
