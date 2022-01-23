<svelte:options tag="hb-checkout" />

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
	import type { IShipment, IUser, IGateway } from "@app/types/webcomponent.type";
	import type { FormSchema } from "../../../form/app/types/webcomponent.type";
	import { formUserSchema, formCreditCardSchema } from "@app/functions/formSchemes";
	import dayjs from "dayjs";

	export let id: string;
	export let shipments: IShipment[];
	export let user: IUser;
	export let gateways: IGateway[];
	let gateway: IGateway;
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
	let editUser: boolean;
	let editShipping: boolean;

	let formUserSchemaSubmitted: "yes" | "no" = "no";
	let formShipmentSchemaSubmitted: "yes" | "no" = "no";
	let formCreditCardSchemaSubmitted: "yes" | "no" = "no";
	$: {
		if (!id) id = null;
		if (!shipments) shipments = [];
		else if (typeof shipments === "string") shipments = JSON.parse(shipments) || [];
		if (!gateways) gateways = [];
		else if (typeof gateways === "string") {
			gateways = JSON.parse(gateways) || [];
			if (gateways.find((f) => f.selected || f.default)) {
				gateway = gateways.find((f) => f.selected || f.default);
			} else if (gateways?.length) {
				gateway = gateways[0];
			}
		}
		if (!user) user = null;
		else if (typeof user === "string") {
			user = JSON.parse(user);
			for (const k of Object.keys(user)) {
				if (formUserSchema.find((f) => f.id === k)) {
					formUserSchema[formUserSchema.findIndex((f) => f.id === k)].value = user[k];
				} else if (formUserSchema.find((f) => f.params?.columns?.length && f.params.columns.find((ff) => ff.id === k))) {
					const rowIndex = formUserSchema.findIndex((f) => f.params?.columns?.length && f.params.columns.find((ff) => ff.id === k));
					const elIndex = formUserSchema[rowIndex].params.columns.findIndex((ff) => ff.id === k);
					formUserSchema[rowIndex].params.columns[elIndex].value = user[k];
				}
			}
		}

		formShipmentSchema[0].params.options = shipments.map((m) => {
			return { value: m.id, label: m.label + " " + m.price + m.currency };
		});
		if (shipments.find((f) => f.selected) || shipments.find((f) => f.standard)) {
			formShipmentSchema[0].value = (shipments.find((f) => f.selected) || shipments.find((f) => f.standard)).id;
		}
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
	function saveUser(userInputs: { fullName: string; addressWithNumber: string; city: string; zip: string; nationality: string }) {
		console.log("saveuser", userInputs);
		const newUser: IUser = {
			fullName: userInputs.fullName,
			addressWithNumber: userInputs.addressWithNumber,

			city: userInputs.city,
			zip: userInputs.zip,
			nationality: userInputs.nationality,
		};
		for (const k of Object.keys(userInputs)) {
			if (formUserSchema.find((f) => f.id === k)) {
				formUserSchema[formUserSchema.findIndex((f) => f.id === k)].value = userInputs[k];
			} else if (formUserSchema.find((f) => f.params?.columns?.length && f.params.columns.find((ff) => ff.id === k))) {
				const rowIndex = formUserSchema.findIndex((f) => f.params?.columns?.length && f.params.columns.find((ff) => ff.id === k));
				const elIndex = formUserSchema[rowIndex].params.columns.findIndex((ff) => ff.id === k);
				formUserSchema[rowIndex].params.columns[elIndex].value = userInputs[k];
			}
		}
		user = newUser;
		editUser = false;
		formUserSchemaSubmitted = "no";
		console.log("edited");
		dispatch("saveUser", user);
	}

	function saveShipment(results: { shipmentsolution: string }) {
		console.log("saveShipment", results);

		const shipmentId = results?.shipmentsolution;
		if (shipmentId && shipments.find((f) => f.id === shipmentId)) {
			shipments.forEach((f) => (f.selected = false));
			const i = shipments.findIndex((f) => f.id === shipmentId);
			shipments[i].selected = true;
			editShipping = false;
			formShipmentSchema[0].value = shipmentId;
			dispatch("saveShipment", shipments[i]);
		}

		formShipmentSchemaSubmitted = "no";
	}

	function payByPaypalAndCard(p: {}) {
		formCreditCardSchemaSubmitted = "no";

		dispatch("payByCard", p);
	}
	function payByPaypalAccount() {
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
	addComponent("payment-paypal");

	function editUserForm() {
		editUser = true;
		editShipping = false;
	}
	function editShippingForm() {
		editUser = false;

		editShipping = true;
	}
</script>

<svelte:head>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@latest/font/bootstrap-icons.css" />
</svelte:head>
<slot name="title"><h1 class="title" part="title">Checkout</h1></slot>
<div id="border_top">
	<div>
		<h3 class="subtitle" part="subtitle"><i class="bi bi-send-fill" /> Delivery</h3>

		{#if user?.fixed && !editUser}
			<div class="dataentrycontainer">
				<slot name="userinfo">
					{#if user.fullName}
						<div class="dataentry"><span class="dataentry_value">{user.fullName}</span></div>
					{/if}
				</slot>
			</div>
		{:else if user?.fullName && user?.addressWithNumber && !editUser}
			<h4 class="subtitle" part="subtitle">
				<button class="btn btn-sm detail_btn" on:click={editUserForm}>edit</button>
			</h4>

			<div class="dataentrycontainer">
				<div class="dataentry"><span class="dataentry_key">Name</span><span class="dataentry_value">{user.fullName}</span></div>
				<div class="dataentry">
					<span class="dataentry_key">Address</span><span class="dataentry_value"
						>{`${user.addressWithNumber}, ${user.city}, ${user.zip},${user.nationality}`}</span
					>
				</div>
			</div>
		{:else}
			<h4 class="subtitle" part="subtitle">Address</h4>

			<div>
				<hb-form
					schema={JSON.stringify(formUserSchema)}
					submitted={formUserSchemaSubmitted}
					on:submit={(e) => {
						saveUser(e.detail);
					}}
				/>
				<div>
					<button
						on:click={() => {
							formUserSchemaSubmitted = "yes";
							setTimeout(() => {
								formUserSchemaSubmitted = "no";
							}, 200);
						}}
						style="width:100%;margin-bottom:10px"
						class="btn btn-primary">continue</button
					>
				</div>
			</div>
		{/if}
	</div>
	{#if shipments?.length}
		<div id="shipment_separator">
			{#if ((user?.fullName && user?.addressWithNumber) || user?.fixed) && !editUser}
				{#if !editShipping && (shipments.find((f) => f.selected) || shipments.find((f) => f.standard))}
					<h4 style="margin-top:20px" class="subtitle" part="subtitle">
						<span class="detail_label"><i class="bi bi-truck" /> Shipment Service</span><button
							class="btn btn-sm detail_btn"
							on:click={editShippingForm}>edit</button
						>
					</h4>
					<div class="dataentrycontainer">
						<div class="dataentry">
							<span class="dataentry_key">Shipping Fee</span><span class="dataentry_value"
								>{(shipments.find((f) => f.selected) || shipments.find((f) => f.standard)).price}</span
							>
						</div>
						<div class="dataentry">
							<span class="dataentry_key">Arrive</span><span class="dataentry_value"
								>{dayjs((shipments.find((f) => f.selected) || shipments.find((f) => f.standard)).arriveDate).format()}
							</span>
						</div>
					</div>
				{:else}
					<h4 class="subtitle" part="subtitle" style="margin-top:20px"><i class="bi bi-truck" /> Shipment Service</h4>
					<div>
						<hb-form
							schema={JSON.stringify(formShipmentSchema)}
							submitted={formShipmentSchemaSubmitted}
							on:submit={(e) => {
								saveShipment(e.detail);
							}}
						/>
						<div>
							<button
								on:click={() => {
									formShipmentSchemaSubmitted = "yes";
									setTimeout(() => {
										formShipmentSchemaSubmitted = "no";
									}, 200);
								}}
								style="width:100%"
								class="btn btn-primary">continue</button
							>
						</div>
					</div>
				{/if}
			{:else if !editShipping && (shipments.find((f) => f.selected) || shipments.find((f) => f.standard))}
				<h4 style="margin-top:20px" class="subtitle" part="subtitle">
					<span class="detail_label"><i class="bi bi-truck" /> Shipment Service</span><button
						class="btn btn-sm detail_btn"
						on:click={editShippingForm}>edit</button
					>
				</h4>
				<div class="dataentrycontainer">
					<div class="dataentry">
						<span class="dataentry_key">Shipping Fee</span><span class="dataentry_value"
							>{(shipments.find((f) => f.selected) || shipments.find((f) => f.standard)).price}</span
						>
					</div>
					<div class="dataentry">
						<span class="dataentry_key">Shipping Time</span><span class="dataentry_value"
							>{(shipments.find((f) => f.selected) || shipments.find((f) => f.standard)).arriveDate}</span
						>
					</div>
				</div>
			{/if}
		</div>
	{/if}
</div>
<div>
	<h3 class="subtitle payment_title" part="subtitle"><i class="bi bi-wallet2" /> Payment Method</h3>
	{#if !editUser && !editShipping && ((shipments?.length && shipments.find((f) => f.selected)) || shipments.find((f) => f.standard) || !shipments?.length)}
		{#if gateway?.id === "paypal"}
			<hb-payment-paypal
				on:payByCard={(e) => payByPaypalAndCard(e.detail)}
				on:payByAccount={(e) => payByPaypalAccount()}
				on:cardChange={(e) => cardChange(e.detail)}
			/>
		{/if}
		<!-- <div>
			<button on:click={() => payByAccount()} style="width:100%;background-color:yellow;color:white" class="btn">paypal</button>
		</div>
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
		</div> -->
	{/if}
</div>
<div class="footer_note"><slot name="footer">By Clicking..<button class="btn btn-default">Terms and conditions</button></slot></div>

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
