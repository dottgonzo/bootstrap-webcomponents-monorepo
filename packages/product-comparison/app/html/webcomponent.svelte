<svelte:options tag="hb-product-comparison" />

<script lang="ts">
	/**
	 * Svelte Video Login/Register/Forget Password WebComponent
	 * =====================
	 *
	 * @contributors: Dario Caruso <dev@dariocaruso.info> (https://dariocaruso.info)
	 *
	 * @license: MIT License
	 *
	 */

	import { createEventDispatcher } from "svelte";
	import { get_current_component } from "svelte/internal";
	export let id: string;
	export let headers: {
		id: string;
		label: string;
	}[];
	export let products: {
		[x: string]: string;
	}[];

	export let options: {
		currency?: string;
	};

	$: {
		if (!id) id = null;
		if (!headers) headers = [];
		else if (typeof headers === "string") headers = JSON.parse(headers);
		if (!products) products = [];
		else if (typeof products === "string") products = JSON.parse(products);
		if (!options) options = {};
		else if (typeof options === "string") options = JSON.parse(options);

		if (!options.currency) options.currency = "$";

		// 		for(const product of products){
		// if(!product._icon) {
		// 	switch(){

		// 	}
		// 	product._icon=''
		// }
		// 		}
	}
	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();
	function dispatch(name, detail) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}
	function purchaseClick(id: string) {
		dispatch("purchaseClick", { id });
	}
</script>

<svelte:head>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@latest/font/bootstrap-icons.css" />
</svelte:head>

<div part="container" class="container">
	<div class="row" part="row">
		<div part="col" class="col">1 of 2</div>
		{#each products as product (product.id)}
			<div part="col" class="col">
				<div class="header_model">
					{product.model}
				</div>
				<div class="header_description">
					{product.description}
				</div>
				<div class="header_price">
					<span class="header_price_currency">
						{options.currency}
					</span>
					<span class="header_price_value">
						{product.price}
					</span>
				</div>
				<div class="header_purchase_button">
					<button
						class="btn btn-primary"
						on:click={() => {
							purchaseClick(product.id);
						}}>Acquista</button
					>
				</div>
			</div>
		{/each}
	</div>
	{#each headers as header (header.id)}
		<div part="row" class="row">
			<div part="col" class="col">{header.label}</div>

			{#each products as product (product.id)}
				<div part="col" class="col">
					{#if product[header.id] === "valid"}
						<i class="bi-check" />
					{:else if product[header.id] === "disabled"}
						<i class="bi-dash" />
					{:else if product[header.id] === "blocked"}
						<i class="bi-x" />
					{:else if product[header.id] === "star"}
						<i class="bi-star-fill" />
					{:else if product[header.id] === "plus"}
						<i class="bi-plus" />
					{:else}
						{product[header.id]}
					{/if}
				</div>
			{/each}
		</div>
	{/each}
</div>

<style lang="scss">
	@import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";

	.header_price {
		padding: 20px;
	}
	.header_price_value {
		font-size: 3.5em;
	}
	.header_price_currency {
		vertical-align: top;
		line-height: 0.5em;
		font-size: 1em;
	}
	.header_purchase_button {
		margin-bottom: 30px;
	}
	.header_model {
		margin-top: 20px;
		font-size: 16px;
		text-transform: uppercase;
		line-height: 16px;
	}
	.header_description {
		font-size: 12px;
	}
	.col {
		min-height: 40px;
		text-align: center;
		border-right: 1px solid black;
		line-height: 40px;
	}
	.row {
		border-bottom: 1px solid black;
	}
	.container {
		border-top: 1px solid black;
		border-left: 1px solid black;
	}
</style>
