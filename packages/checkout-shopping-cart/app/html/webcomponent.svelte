<svelte:options tag="hb-checkout-shopping-cart" />

<script lang="ts">
	/**
	 * Svelte Invoice WebComponent
	 * =====================
	 *
	 * @contributors: Dario Caruso <dev@dariocaruso.info> (https://dariocaruso.info)
	 *
	 * @license: MIT License
	 *
	 */
	import type { IActionButton, IFilter, IRow, ITableHeader } from "../../../table/app/types/webcomponent.type";

	import pkg from "../../package.json";
	import { createEventDispatcher } from "svelte";
	import { get_current_component } from "svelte/internal";
	import dayjs from "dayjs";
	import debounce from "debounce";
	import "dayjs/locale/it";
	import type { IShopItem, ICartHeaders } from "@app/types/webcomponent.type";

	export let id: string;
	export let items: IShopItem[];

	export let headers: ICartHeaders;
	export let completed: "yes" | "no";

	let currency: string;
	let currencySymbol: string;
	const tableHeaders: ITableHeader[] = [
		{
			key: "name",
			label: "nome",
			nosort: true,
		},
		{
			key: "quantity",
			label: "n.",
			nosort: true,
		},
		{
			key: "total",
			label: "totale",
			nosort: true,
		},
	];

	let tableRows: IRow[] = [];
	let subTotal: number;
	let taxTotal: number;
	let total: number;
	$: {
		if (!id) id = null;
		if (!completed) completed = "no";

		if (!items) items = [];
		else if (typeof items === "string") items = JSON.parse(items);

		if (!headers) {
			headers = { country: "it" };
			currency = "euro";
			currencySymbol = "€";
		} else if (typeof headers === "string") {
			headers = JSON.parse(headers) || {};

			if (!headers.country) headers.country = "it";
			switch (headers.country) {
				case "it":
					currency = "euro";
					currencySymbol = "€";
					break;
				case "eu":
					currency = "euro";
					currencySymbol = "€";
					break;
				case "us":
					currency = "dollar";
					currencySymbol = "$";
					break;
			}
		}

		if (items?.length) {
			tableRows = items.map((m, i) => {
				const r: IRow = {
					_id: i.toString(),
					price: m.unitaryPrice.toString() + currencySymbol + " / " + (m.unit ? m.unit : "unità"),
					name: m.name,
					quantity: m.quantity?.toString?.() || "1",
					subtotal: (m.unitaryPrice * (m.quantity || 1)).toString() + currencySymbol,
					vat: `${(Math.round(m.taxPercentage * 0.01 * m.unitaryPrice * (m.quantity || 1) * 100) / 100).toString()} (${m.taxPercentage}%)`,
					total:
						(m.unitaryPrice * (m.quantity || 1) + Math.round(m.taxPercentage * 0.01 * m.unitaryPrice * (m.quantity || 1) * 100) / 100).toString() +
						currencySymbol,
				};

				return r;
			});
		}
		subTotal = items
			?.map((m) => m.unitaryPrice * (m.quantity || 1))
			.reduce((accumulator, a) => {
				return accumulator + a;
			}, 0);
		taxTotal =
			Math.round(
				items
					.map((m) => m.unitaryPrice * (m.quantity || 1) * m.taxPercentage * 0.01)
					.reduce((accumulator, a) => {
						return accumulator + a;
					}, 0) * 100,
			) / 100;

		total = subTotal + taxTotal + (headers.shipmentFee || 0);
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
	addComponent("table");
</script>

<svelte:head>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@latest/font/bootstrap-icons.css" />
</svelte:head>
<div id="page" class="container">
	<h3><i style="font-size:0.9em;margin-right:0.2em" class="bi bi-cart-fill" />Shopping Cart</h3>
	<div class="row" style="margin:40px auto 20px auto">
		<div class="col">
			<div style="line-height:25px">
				<span style="display:inline-block">SubTotale</span>
				<span style="float:right">{subTotal}{currencySymbol}</span>
			</div>
			<div style="line-height:25px">
				<span style="display:inline-block">Tasse</span>
				<span style="float:right">{taxTotal}{currencySymbol}</span>
			</div>
			<div style="line-height:25px;">
				<span style="display:inline-block">Spedizione</span>
				<span style="float:right">{headers.shipmentFee ? headers.shipmentFee + currencySymbol : "-"}</span>
			</div>
			<div style="line-height:25px;font-weight:bold">
				<span style="display:inline-block">Totale</span>
				<span style="float:right">{total}{currencySymbol}</span>
			</div>
		</div>
	</div>
	<div class="row cart_divider">
		<div class="col">
			<hb-table disablepagination="yes" rows={JSON.stringify(tableRows)} headers={JSON.stringify(tableHeaders)} />
		</div>
	</div>
</div>

<style lang="scss">
	@import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
	#page {
		padding-top: 20px;
	}
	.cart_divider {
		padding-top: 40px;
		border-top: var(--hb-checkout-border);
	}
</style>
