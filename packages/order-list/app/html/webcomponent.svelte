<svelte:options tag="hb-order-list" />

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
	import type { OrderPayment } from "@app/types/webcomponent.type";

	export let id: string;

	export let payment: OrderPayment;

	let subTotal: number;
	let taxTotal: number;
	let total: number;
	const defaultOrder: OrderPayment = { countryCode: "IT", currencySymbol: "€", items: [], orderNumber: "0000" };
	$: {
		if (!id) id = null;

		if (!payment) {
			payment = defaultOrder;
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
	// const component = get_current_component();
	// const svelteDispatch = createEventDispatcher();
	// function dispatch(name, detail) {
	// 	svelteDispatch(name, detail);
	// 	component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	// }
</script>

<div class="container">
	<div class="row" id="o_header">
		<div class="col-10"><span id="o_number">Order N. {payment.orderNumber}</span></div>
		<div id="o_tracking" class="col-2">tracking</div>
	</div>

	<div id="o_items">
		{#each payment.items as item (item.id)}
			<div class="o_item row">
				<div class="col-9">
					<img part="item_image" class="o_item_image" src={item.image} alt="" />
					<span class="o_item_desc">{item.name}</span>
				</div>

				<div class="col-3 text-center">quantity</div>
			</div>
		{/each}
	</div>
	<div class="row" id="o_footer">
		<div class="col-3 text-center">cancel</div>
		<div class="col-6">bbb</div>

		<div class="col-3 text-center">{`${total}${payment.currencySymbol}`}</div>
	</div>
</div>

<style lang="scss">
	@import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
	#o_header {
		margin: 20px auto 0px auto;
		padding-bottom: 20px;
	}
	#o_tracking {
		text-align: center;
	}
	#o_items {
	}
	.o_item {
		border-top: solid 1px black;

		padding: 20px 20px 20px 20px;
	}
	.o_item_image {
		width: 120px;
		height: 120px;
		background-size: cover;
		display: inline-block;
	}
	.o_item_desc {
		display: inline-block;
		margin-left: 10px;
	}
	#o_footer {
		padding-top: 20px;

		border-top: solid 1px black;
	}
</style>
