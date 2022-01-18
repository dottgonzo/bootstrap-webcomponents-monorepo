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
	import { formUserSchema, formCreditCardSchema, formShipmentSchema } from "@app/functions/formSchemes";

	export let id: string;
	export let shipments: IShipment[];
	export let user: IUser;
	let editUser: boolean;
	let editShipping: boolean;
	$: {
		if (!id) id = null;
		if (!shipments) shipments = [];
		else if (typeof shipments === "string") shipments = JSON.parse(shipments);
		if (!user) user = null;
		else if (typeof user === "string") user = JSON.parse(user);
	}

	function saveUser(userInputs: { fullName: string; address: string; city: string; zip: string; nationality: string }) {
		console.log("saveuser", userInputs);
		const newUser: IUser = {
			fullName: userInputs.fullName,
			fullAddress: `${userInputs.address}, ${userInputs.city}, ${userInputs.zip},${userInputs.nationality}`,
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
	}

	function saveShipment(results: { fullName: string; address: string; city: string; zip: string; nationality: string }) {
		console.log("saveShipment", results);
		// TODO: set selected shipment
		const shipmentId = "";
		if (shipments.find((f) => f.id === shipmentId)) {
			shipments.forEach((f) => (f.selected = false));
			shipments[0].selected = true;
		}
		shipments.forEach((f) => {
			f.selected = false;
		});
		shipments[0].selected = true;
		editShipping = false;
	}

	function payByCard(p: {}) {
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

<h2 part="title">Checkout</h2>
<div style="border-top:1px solid black;border-bottom:1px solid black;">
	<div style="margin-top:10px">
		{#if user?.fullName && user?.fullAddress && !editUser}
			<h3 part="subtitle">User <button class="btn btn-sm btn-warning" on:click={editUserForm} style="float:right">edit</button></h3>

			<div>
				<div class="shipment">Name: {user.fullName}</div>
				<div class="shipment">Address: {user.fullAddress}</div>
			</div>
		{:else}
			<h3 part="subtitle">User</h3>

			<div>
				<hb-form
					schema={JSON.stringify(formUserSchema)}
					on:submit={(e) => {
						saveUser(e.detail);
					}}
				/>
			</div>
		{/if}
	</div>
	{#if shipments?.length}
		<div style="margin-top:10px;border-top:1px solid black;">
			{#if user?.fullName && user?.fullAddress && !editUser}
				<h3 part="subtitle">Shipping <button class="btn btn-sm btn-warning" on:click={editShippingForm} style="float:right">edit</button></h3>

				{#if !editShipping && (shipments.find((f) => f.selected) || shipments.find((f) => f.standard))}
					<div class="shipment">Shipping Fee: {(shipments.find((f) => f.selected) || shipments.find((f) => f.standard)).price}</div>
					<div class="shipment">Shipping Time: {(shipments.find((f) => f.selected) || shipments.find((f) => f.standard)).durationInSeconds}</div>
				{:else}
					<div>
						<hb-form
							schema={JSON.stringify(formShipmentSchema)}
							on:submit={(e) => {
								saveShipment(e.detail);
							}}
						/>
					</div>
				{/if}
			{:else}
				<h3 part="subtitle">Shipping</h3>
			{/if}
		</div>
	{/if}
</div>
<div>
	<h3 part="subtitle">Payment Method</h3>
	{#if !editUser && !editShipping && ((shipments?.length && shipments.find((f) => f.selected)) || shipments.find((f) => f.standard) || !shipments?.length)}
		<div><button on:click={() => payByAccount()} style="width:100%;background-color:yellow;color:white" class="btn">paypal</button></div>
		<div>OR</div>
		<div>
			<div>
				<hb-form schema={JSON.stringify(formCreditCardSchema)} on:submit={(e) => payByCard(e.detail)} />
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
