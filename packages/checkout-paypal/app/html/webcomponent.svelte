<svelte:options tag="hb-checkout-paypal" />

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

	export let id: string;
	export let shipments: IShipment[];
	export let user: IUser;
	$: {
		if (!id) id = null;
		if (!shipments) shipments = [];
		else if (typeof shipments === "string") shipments = JSON.parse(shipments);
		if (!user) user = null;
		else if (typeof user === "string") user = JSON.parse(user);
	}

	const formCreditCardSchema: FormSchema = [
		{
			type: "text",
			placeholder: "Insert your full Name name here...",
			id: "fullName",
			required: true,
			label: "Full Name",
			validationTip: "This field cannot be empty.",
		},
		{
			type: "text",
			placeholder: "Insert your Credit Card Number here...",
			id: "cardn",
			required: true,
			label: "Card Number",
			validationTip: "This field cannot be empty.",
		},
		{
			id: "name-row2",
			type: "row",
			params: {
				columns: [
					{
						type: "text",
						placeholder: "Insert card CVV here...",
						id: "cvv",
						required: true,
						label: "CVV",
						validationTip: "This field cannot be empty.",
					},
					{
						type: "text",
						placeholder: "Insert card expiration here...",
						id: "expiration",
						required: true,
						label: "Scadenza",
						validationTip: "This field cannot be empty.",
					},
				],
			},
		},
	];
	const formUserSchema: FormSchema = [
		{
			type: "text",
			placeholder: "Insert your Full Name here...",
			id: "fullname",
			required: true,
			label: "Full Name",
			validationTip: "This field cannot be empty.",
		},
		{
			type: "text",
			placeholder: "Insert your Street/Square address with number...",
			id: "street_square",
			required: true,
			label: "Street/Square/...",
			validationTip: "This field cannot be empty.",
		},
		{
			id: "name-row2",
			type: "row",
			params: {
				columns: [
					{
						type: "text",
						placeholder: "Insert your city name here...",
						id: "city",
						required: true,
						label: "City",
						validationTip: "This field cannot be empty.",
					},
					{
						type: "text",
						placeholder: "Insert your zip code here...",
						id: "zip",
						required: true,
						label: "Zip",
						validationTip: "This field cannot be empty.",
					},
					{
						type: "text",
						placeholder: "Insert your nationality here...",
						id: "nationality",
						required: true,
						label: "Nationality",
						validationTip: "This field cannot be empty.",
					},
				],
			},
		},
	];
	const formShipmentSchema: FormSchema = [
		{
			type: "checkbox",
			placeholder: "Insert your Full Name here...",
			id: "fullname",
			required: true,
			label: "Full Name",
			validationTip: "This field cannot be empty.",
		},
	];

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

<h2 part="title">Checkout</h2>
<div style="border-top:1px solid black;border-bottom:1px solid black;">
	<div style="margin-top:10px">
		{#if user?.fullName && user?.fullAddress}
			<h3 part="subtitle">User <span style="float:right;color:red;font-size:12px">edit</span></h3>

			<div>
				<div class="shipment">Name: {user.fullName}</div>
				<div class="shipment">Address: {user.fullAddress}</div>
			</div>
		{:else}
			<h3 part="subtitle">User</h3>

			<div>
				<hb-form schema={JSON.stringify(formUserSchema)} />
			</div>
		{/if}
	</div>

	<div style="margin-top:10px;border-top:1px solid black;">
		{#if user?.fullName && user?.fullAddress}
			<h3 part="subtitle">Shipping <span style="float:right;color:red;font-size:12px">edit</span></h3>

			{#if shipments.find((f) => f.selected) || shipments.find((f) => f.standard)}
				<div class="shipment">Shipping Fee: {(shipments.find((f) => f.selected) || shipments.find((f) => f.standard)).price}</div>
				<div class="shipment">Shipping Time: {(shipments.find((f) => f.selected) || shipments.find((f) => f.standard)).durationInSeconds}</div>
			{:else}
				<div>
					<hb-form schema={JSON.stringify(formShipmentSchema)} />
				</div>
			{/if}
		{:else}
			<h3 part="subtitle">Shipping</h3>
		{/if}
	</div>
</div>
<div>
	<h3 part="subtitle">Payment Method</h3>
	{#if shipments.find((f) => f.selected) || shipments.find((f) => f.standard)}
		<div><button style="width:100%;background-color:yellow;color:white" class="btn">paypal</button></div>
		<div>OR</div>
		<div>
			<div>
				<hb-form schema={JSON.stringify(formCreditCardSchema)} />
			</div>
			<div><button style="width:100%" class="btn btn-primary">place order</button></div>
		</div>
	{/if}
</div>
<div class="footer_note">By Clicking..<button class="btn btn-default">Terms and conditions</button></div>

<style lang="scss">
	@import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
	.shipment {
		line-height: 20px;
	}
	.footer_note {
		text-align: center;
		font-size: 12px;
		padding: 5px;
		line-height: 30px;
	}
</style>
