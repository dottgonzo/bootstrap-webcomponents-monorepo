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
	import { formUserSchema, formCreditCardSchema } from "@app/functions/formSchemes";

	export let id: string;
	export let shipments: IShipment[];
	export let user: IUser;
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
		else if (typeof shipments === "string") shipments = JSON.parse(shipments);
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
			return { value: m.id, label: m.label };
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
		}

		formShipmentSchemaSubmitted = "no";
	}

	function payByCard(p: {}) {
		formCreditCardSchemaSubmitted = "no";

		console.log("payByCard", p);
		dispatch("payByCard", p);
	}
	function payByAccount() {
		console.log("payByAccount");
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

	function editUserForm() {
		editUser = true;
	}
	function editShippingForm() {
		editShipping = true;
	}
</script>

<h2 class="title" part="title">Checkout</h2>
<div style="border-top:1px solid black;border-bottom:1px solid black;margin-top:40px">
	<div>
		{#if user?.fullName && user?.addressWithNumber && !editUser}
			<h3 class="subtitle" part="subtitle">User <button class="btn btn-sm btn-warning" on:click={editUserForm} style="float:right">edit</button></h3>

			<div>
				<div class="shipment">Name: {user.fullName}</div>
				<div class="shipment">Address: {`${user.addressWithNumber}, ${user.city}, ${user.zip},${user.nationality}`}</div>
			</div>
		{:else}
			<h3 class="subtitle" part="subtitle">User</h3>

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
						style="width:100%"
						class="btn btn-primary">continue</button
					>
				</div>
			</div>
		{/if}
	</div>
	{#if shipments?.length}
		<div style="margin-top:10px;border-top:1px solid black;">
			{#if user?.fullName && user?.addressWithNumber && !editUser}
				{#if !editShipping && (shipments.find((f) => f.selected) || shipments.find((f) => f.standard))}
					<h3 class="subtitle" part="subtitle">
						Shipping <button class="btn btn-sm btn-warning" on:click={editShippingForm} style="float:right">edit</button>
					</h3>
					<div class="shipment">Shipping Fee: {(shipments.find((f) => f.selected) || shipments.find((f) => f.standard)).price}</div>
					<div class="shipment">Shipping Time: {(shipments.find((f) => f.selected) || shipments.find((f) => f.standard)).durationInSeconds}</div>
				{:else}
					<h3 class="subtitle" part="subtitle">Shipping</h3>
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
			{:else}
				<h3 class="subtitle" part="subtitle">Shipping</h3>
				{#if !editShipping && (shipments.find((f) => f.selected) || shipments.find((f) => f.standard))}
					<div class="shipment">Shipping Fee: {(shipments.find((f) => f.selected) || shipments.find((f) => f.standard)).price}</div>
					<div class="shipment">Shipping Time: {(shipments.find((f) => f.selected) || shipments.find((f) => f.standard)).durationInSeconds}</div>
				{/if}
			{/if}
		</div>
	{/if}
</div>
<div>
	<h3 class="subtitle" part="subtitle">Payment Method</h3>
	{#if !editUser && !editShipping && ((shipments?.length && shipments.find((f) => f.selected)) || shipments.find((f) => f.standard) || !shipments?.length)}
		<div><button on:click={() => payByAccount()} style="width:100%;background-color:yellow;color:white" class="btn">paypal</button></div>
		<div style="text-align:center;width:100%;padding:20px">OR</div>
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
	{/if}
</div>
<div class="footer_note"><slot name="footer">By Clicking..<button class="btn btn-default">Terms and conditions</button></slot></div>

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
	.subtitle {
		margin-bottom: 30px;
	}
	.title {
		text-align: center;
	}
</style>
