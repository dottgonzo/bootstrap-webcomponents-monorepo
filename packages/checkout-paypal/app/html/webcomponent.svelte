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
			id: "name-row",
			type: "row",
			params: {
				columns: [
					{
						type: "text",
						placeholder: "Insert your first name here...",
						id: "firstName",
						required: true,
						label: "First Name",
						validationTip: "This field cannot be empty.",
					},
					{
						type: "text",
						placeholder: "Insert your last name here...",
						id: "lastName",
						required: true,
						label: "Last Name",
						validationTip: "This field cannot be empty.",
					},
					{
						type: "text",
						placeholder: "Insert your last namez here...",
						id: "lastNamez",
						label: "Last Namez",
						validationTip: "This field cannot be emptyz.",
					},
					{
						type: "select",
						placeholder: "Select something here...",
						id: "selectsomething",
						required: true,
						label: "Selection of something",
						validationTip: "This field cannot be empty.",
						params: {
							options: [
								{ label: "", value: "" },
								{ label: "testlabel", value: "testvalue" },
							],
						},
					},
				],
			},
		},
		{
			type: "number",
			id: "age",
			required: true,
			label: "Age",
			params: {
				min: 8,
				max: 120,
			},
			validationTip: "Min 8, Max 120",
		},
		{
			type: "text",
			placeholder: "Insert your last name here...",
			id: "lastName2",
			required: true,
			label: "Last Name",
			validationTip: "This field cannot be empty.",
		},
		{
			type: "textarea",
			placeholder: "Insert your last name22 here...",
			id: "lastName22",
			required: true,
			label: "Last Name2",
			validationTip: "This field cannot be empty2.",
		},
	];
	const formUserSchema: FormSchema = [];
	const formShipmentSchema: FormSchema = [];

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
		<h3 part="subtitle">user <span style="float:right;color:red;font-size:12px">edit</span></h3>

		{#if user?.fullName}
			<div>
				<div class="shipment">Name: {user.fullName}</div>
				<div class="shipment">Address: {user.fullAddress}</div>
			</div>
		{:else}
			<div>
				<hb-form schema={JSON.stringify(formUserSchema)} />
			</div>
		{/if}
	</div>

	<div style="margin-top:10px;border-top:1px solid black;">
		<h3 part="subtitle">shipping <span style="float:right;color:red;font-size:12px">edit</span></h3>

		{#if shipments.find((f) => f.selected) || shipments.find((f) => f.standard)}
			<div class="shipment">Shipping Fee: {(shipments.find((f) => f.selected) || shipments.find((f) => f.standard)).price}</div>
			<div class="shipment">Shipping Time: {(shipments.find((f) => f.selected) || shipments.find((f) => f.standard)).durationInSeconds}</div>
		{:else}
			<div>
				<hb-form schema={JSON.stringify(formShipmentSchema)} />
			</div>
		{/if}
	</div>
</div>
<div>
	<h3 part="subtitle">payment method</h3>

	<div><button style="width:100%;background-color:yellow;color:white" class="btn">paypal</button></div>
	<div>OR</div>
	<div>
		<div>
			<hb-form schema={JSON.stringify(formCreditCardSchema)} />
		</div>
		<div><button style="width:100%" class="btn btn-primary">place order</button></div>
	</div>
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
