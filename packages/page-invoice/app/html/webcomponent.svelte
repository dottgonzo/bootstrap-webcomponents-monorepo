<svelte:options tag="hb-page-invoice" />

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
	import type { IItem, ICompany, IHeaders } from "@app/types/webcomponent.type";

	import { printInvoice, OpenInvoiceWindow } from "@app/../extra/utils";

	import pkg from "../../package.json";
	import { createEventDispatcher } from "svelte";
	import { get_current_component } from "svelte/internal";
	import dayjs from "dayjs";
	import debounce from "debounce";
	import "dayjs/locale/it";
	import { addComponent, getChildStyleToPass } from "wc-js-utils/main";
	import parseStyle from "style-to-object";
	let parsedStyle: { [x: string]: string };
	export let style: string;
	let tableStyleToSet: string = "";
	import { styleSetup as tableStyleSetup } from "@htmlbricks/hb-table/release/docs";

	export let id: string;

	export let printer: "yes" | "no";
	export let items: IItem[];
	export let headers: IHeaders;

	let currency: string;
	let currencySymbol: string;
	const tableHeaders: ITableHeader[] = [
		{
			key: "desc",
			label: "descrizione",
			nosort: true,
		},
		{
			key: "price",
			label: "prezzo",
			nosort: true,
		},
		{
			key: "quantity",
			label: "quantità",
			nosort: true,
		},
		{
			key: "subtotal",
			label: "subtotal",
			nosort: true,
		},
		{
			key: "vat",
			label: "iva",
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
		if (style) {
			parsedStyle = parseStyle(style);
			tableStyleToSet = getChildStyleToPass(parsedStyle, tableStyleSetup?.vars);
		}
		if (!printer) printer = "no";
		if (!items) items = [];
		else if (typeof items === "string") items = JSON.parse(items);

		if (!headers) headers = null;
		else if (typeof headers === "string") {
			headers = JSON.parse(headers);
			if (!headers.date) headers.date = new Date();
			if (!headers.category) headers.category = "items";
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
					desc: m.desc,
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

		total = subTotal + taxTotal;
	}
	// const component = get_current_component();
	// const svelteDispatch = createEventDispatcher();
	// function dispatch(name:string, detail:any) {
	// 	svelteDispatch(name, detail);
	// 	component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	// }

	addComponent({ repoName: "@htmlbricks/hb-table", version: pkg.version });
</script>

{#if headers?.from && headers.to}
	<div id="page" class="container">
		<div class="row" style="margin-top:20px">
			<div class="col">
				<img style="height:80px;margin:0px 0px 0px 60px" alt="" src={headers.from.logo} />
				<span style="margin:0px 40px 0px 40px">{headers.from.shortName}</span>
			</div>
			<div class="col">
				{#if printer !== "yes"}
					<div style="text-align:right;padding-right:60px">
						<button on:click={debounce(() => printInvoice({ headers, items, version: pkg.version }), 200)} class="btn btn-default"
							><i class="bi-printer-fill" /></button
						>
						<button on:click={debounce(() => OpenInvoiceWindow({ headers, items, version: pkg.version }), 200)} class="btn btn-default"
							><i class="bi-arrows-fullscreen" /></button
						>
					</div>
				{/if}
			</div>
		</div>
		<div class="row" style="margin-top:60px">
			<div class="col">Data: {dayjs(headers.date).format("DD/MM/YY")}</div>
			<div class="col" />

			<div class="col">Fattura numero: {headers.serial}</div>
		</div>

		<div class="row" style="margin-top:40px">
			<div class="col">
				<div>{headers.from.name}</div>
				<div>{headers.from.address}</div>
				<div>{headers.from.piva}</div>
			</div>
			<div class="col">
				<div>{headers.from.email}</div>
				<div>{headers.from.phone}</div>
			</div>
			<div class="col">
				<div>{headers.to.name}</div>
				<div>{headers.to.address}</div>
				<div>{headers.to.piva}</div>
			</div>
		</div>
		<div class="row" style="margin-top:40px">
			<div class="col">
				<hb-table style={tableStyleToSet} disablepagination="yes" rows={JSON.stringify(tableRows)} headers={JSON.stringify(tableHeaders)} />
			</div>
		</div>
		<div class="row" style="margin-top:40px">
			<div class="col">
				<div style="width:300px;float:right">
					<div style="text-align:left;">
						<div style="line-height:25px">
							<span style="display:inline-block;min-width:200px;">SubTotale:</span>
							{subTotal}{currencySymbol}
						</div>
						<div style="line-height:25px">
							<span style="display:inline-block;min-width:200px;">Tasse:</span>
							{taxTotal}{currencySymbol}
						</div>
						<div style="line-height:25px;font-weight:bold">
							<span style="display:inline-block;min-width:200px;">Totale:</span>
							{total}{currencySymbol}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
{:else}
	error
{/if}

<style lang="scss">
	@import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
</style>
