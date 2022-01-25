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
	import type { FormSchema } from "../../../form/app/types/webcomponent.type";
	import { formCreditCardSchema } from "@app/functions/formSchemes";

	export let id: string;

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
