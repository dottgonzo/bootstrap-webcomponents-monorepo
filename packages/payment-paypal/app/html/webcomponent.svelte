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
	import { get_current_component } from "svelte/internal";
	import pkg from "../../package.json";
	import type { IShipment, IUser } from "@app/types/webcomponent.type";
	import type { FormSchema } from "../../../form/app/types/webcomponent.type";
	import { formUserSchema, formCreditCardSchema } from "@app/functions/formSchemes";
	import dayjs from "dayjs";

	export let id: string;
	const formShipmentSchema: FormSchema = [
		{
			type: "radio",
			placeholder: "Insert your Full Name here...",
			id: "shipmentsolution",
			required: true,
			label: "Shipment",
			validationTip: "This field cannot be empty.",
			params: {
				options: [],
			},
		},
	];

	let formCreditCardSchemaSubmitted: "yes" | "no" = "no";
	$: {
		if (!id) id = null;
	}

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

	function payByCard(p: {}) {
		formCreditCardSchemaSubmitted = "no";

		dispatch("payByCard", p);
	}
	function payByAccount() {
		dispatch("payByAccount", {});
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
	addComponent("form");
</script>

<div>
	<div><button on:click={() => payByAccount()} style="width:100%;background-color:yellow;color:white" class="btn">paypal</button></div>
	<div class="utils_or"><span>or</span></div>
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
	</div>
</div>

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
	.cart_separator {
		//
	}
	.detail_label {
		font-size: 0.8em;
		font-weight: bold;
	}
	.dataentry_key {
		margin-right: 3px;
	}
	.dataentry_key::after {
		content: ":";
	}
	.dataentry_relevant_value {
		font-weight: bold;
	}
	.detail_btn {
		float: right;
		margin-right: 10px;
		color: green;
		font-weight: bold;
		text-transform: capitalize;
	}
	// #border_top {
	// 	border-top: var(--hb-checkout-border);
	// 	border-bottom: var(--hb-checkout-border);
	// 	margin-top: 40px;
	// }
	.dataentry {
		line-height: 30px;
	}
	.footer_note {
		text-align: center;
		font-size: 12px;
		padding: 5px;
		line-height: 30px;
	}
	.subtitle {
		margin-bottom: 30px;
	}
	.title {
		text-align: center;
		border-bottom: var(--hb-checkout-border);
		padding-bottom: 20px;
	}
	.dataentrycontainer {
		// margin-bottom: 30px;
	}
	.payment_title {
		margin-top: 20px;
		border-top: var(--hb-checkout-border);
		padding-top: 10px;
	}
	#shipment_separator {
		// background-color: red;
	}
	h4 {
		// text-align: center;
	}
</style>
