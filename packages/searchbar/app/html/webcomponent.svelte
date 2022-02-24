<svelte:options tag="hb-searchbar" />

<script lang="ts">
	/**
	 * Svelte Search Bar WebComponent
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
	import type { IPayment } from "@app/types/webcomponent.type";

	export let id: string;

	export let payment: IPayment;
	export let completed: "yes" | "no";

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

		if (!payment) {
			payment = { countryCode: "IT", currencySymbol: "€", items: [] };
		} else if (typeof payment === "string") {
			payment = JSON.parse(payment) || {};

			if (!payment.countryCode) payment.countryCode = "IT";
			if (!payment.currencySymbol) {
				switch (payment.countryCode) {
					case "IT":
						payment.currencySymbol = "€";
						break;
					case "EU":
						payment.currencySymbol = "€";
						break;
					case "US":
						payment.currencySymbol = "$";
						break;
				}
			}
		}

		if (payment?.items?.length) {
			tableRows = payment.items.map((m, i) => {
				const r: IRow = {
					_id: i.toString(),
					price: m.unitaryPrice.toString() + payment.currencySymbol + " / " + (m.unit ? m.unit : "unità"),
					name: m.name,
					quantity: m.quantity?.toString?.() || "1",
					subtotal: (m.unitaryPrice * (m.quantity || 1)).toString() + payment.currencySymbol,
					vat: `${(Math.round(m.taxPercentage * 0.01 * m.unitaryPrice * (m.quantity || 1) * 100) / 100).toString()} (${m.taxPercentage}%)`,
					total:
						(m.unitaryPrice * (m.quantity || 1) + Math.round(m.taxPercentage * 0.01 * m.unitaryPrice * (m.quantity || 1) * 100) / 100).toString() +
						payment.currencySymbol,
				};

				return r;
			});
		}
		subTotal = payment?.items
			?.map((m) => m.unitaryPrice * (m.quantity || 1))
			.reduce((accumulator, a) => {
				return accumulator + a;
			}, 0);
		taxTotal = payment?.items
			? Math.round(
					payment?.items
						.map((m) => m.unitaryPrice * (m.quantity || 1) * m.taxPercentage * 0.01)
						.reduce((accumulator, a) => {
							return accumulator + a;
						}, 0) * 100,
			  ) / 100
			: 0;

		total = subTotal + taxTotal + (payment.shipmentFee || 0);
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
	<div class="row" style="margin:40px auto 20px auto">
		<div class="col">
			<div style="line-height:25px">
				<span style="display:inline-block">SubTotale</span>
				<span style="float:right">{subTotal}{payment.currencySymbol}</span>
			</div>
			<div style="line-height:25px">
				<span style="display:inline-block">Tasse</span>
				<span style="float:right">{taxTotal}{payment.currencySymbol}</span>
			</div>
			<div style="line-height:25px;">
				<span style="display:inline-block">Spedizione</span>
				<span style="float:right">{payment.shipmentFee ? payment.shipmentFee + payment.currencySymbol : "-"}</span>
			</div>
			<div style="line-height:25px;font-weight:bold">
				<span style="display:inline-block">Totale</span>
				<span style="float:right">{total}{payment.currencySymbol}</span>
			</div>
		</div>
	</div>
	<div class="row">
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
</style>
