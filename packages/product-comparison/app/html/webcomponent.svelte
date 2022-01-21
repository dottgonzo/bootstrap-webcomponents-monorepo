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
		characteristics: { [x: string]: string };
		id: string;
		model: string;
		description?: string;
		price: number;
		note?: string;

		promotion?: {
			originalPrice: number;
			type?: string;
			note?: string;
		};
		columnColor?: {
			headerBackground?: string;
			columnBackground?: string;

			purchaseButton?: string;
		};
	}[];

	export let options: {
		currency?: string;
		preferredProductId?: string;
	};

	$: {
		if (!id) id = null;
		if (!headers) headers = [];
		else if (typeof headers === "string") headers = JSON.parse(headers);
		if (!products) products = [];
		else if (typeof products === "string") products = JSON.parse(products);
		if (!options) options = {};
		else if (typeof options === "string") options = JSON.parse(options);

		if (!options.currency) options.currency = "€";

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

<div part="container" class="container d-none d-lg-block">
	<div class="row" part="row">
		<div part="col" class="col"><slot name="corner" /></div>
		{#each products as product (product.id)}
			<div part="col" class="col">
				<div class="header_model">
					{product.model}
				</div>
				<div class="header_description">
					{product.description}
				</div>
				{#if products.find((f) => f.promotion?.originalPrice || (options.preferredProductId && f.id === options.preferredProductId))}
					<div class="header_promotion">
						{#if options.preferredProductId && product.id === options.preferredProductId}
							preferred choice
						{:else if product.promotion?.originalPrice}
							on sale
						{/if}
					</div>
				{/if}

				<div class="header_price">
					<span class="header_price_currency">
						{options.currency}
						{#if product.promotion?.originalPrice}
							<span class="slashed">{product.promotion.originalPrice}</span>
						{/if}
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
					{#if product.characteristics[header.id] === "valid"}
						<i class="bi-check" />
					{:else if !product.characteristics[header.id] || product.characteristics[header.id] === "disabled"}
						<i class="bi-dash" />
					{:else if product.characteristics[header.id] === "blocked"}
						<i class="bi-x" />
					{:else if product.characteristics[header.id] === "star"}
						<i class="bi-star-fill" />
					{:else if product.characteristics[header.id] === "plus"}
						<i class="bi-plus" />
					{:else}
						{product.characteristics[header.id]}
					{/if}
				</div>
			{/each}
		</div>
	{/each}
</div>

<div part="container" class="container d-lg-none">
	{#each products as product (product.id)}
		<div style="margin-bottom:100px;border-left:0.5px solid #dddddd;border-right:0.5px solid #dddddd;">
			<div part="col" class="mincol">
				<div class="header_model">
					{product.model}
				</div>
				<div class="header_description">
					{product.description}
				</div>
				{#if (options.preferredProductId && product.id === options.preferredProductId) || product.promotion?.originalPrice}
					<div class="header_promotion">
						{#if options.preferredProductId && product.id === options.preferredProductId}
							preferred choice
						{:else if product.promotion?.originalPrice}
							on sale
						{/if}
					</div>
				{/if}

				<div class="header_price">
					<span class="header_price_currency">
						{options.currency}
						{#if product.promotion?.originalPrice}
							<span class="slashed">{product.promotion.originalPrice}</span>
						{/if}
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
			{#each headers as header (header.id)}
				<div part="col" class="mincol2">
					{header.label}
					{#if product.characteristics[header.id] === "valid"}
						<i class="bi-check" />
					{:else if !product.characteristics[header.id] || product.characteristics[header.id] === "disabled"}
						<i class="bi-dash" />
					{:else if product.characteristics[header.id] === "blocked"}
						<i class="bi-x" />
					{:else if product.characteristics[header.id] === "star"}
						<i class="bi-star-fill" />
					{:else if product.characteristics[header.id] === "plus"}
						<i class="bi-plus" />
					{:else}
						{product.characteristics[header.id]}
					{/if}
				</div>
			{/each}
		</div>
	{/each}
</div>

<style lang="scss">
	@import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
	.slashed {
		text-decoration: line-through;
	}
	.header_price {
		padding: 20px;
	}
	.header_promotion {
		font-weight: bold;
		line-height: 30px;
		min-height: 30px;
		margin: 10px auto 10px auto;
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
		font-weight: bold;
	}
	.header_description {
		font-size: 12px;
	}
	.col {
		min-height: 40px;
		text-align: center;
		border-right: 0.5px solid #dddddd;
		line-height: 40px;
		border-bottom: 0.5px solid #dddddd;
	}
	.mincol {
		min-height: 40px;
		text-align: center;
		border-top: 0.5px solid #dddddd;
		border-bottom: 0.5px solid #dddddd;
		line-height: 40px;
	}
	.mincol2 {
		min-height: 40px;
		text-align: center;
		border-bottom: 0.5px solid #dddddd;
		line-height: 40px;
	}
	.row {
	}
	.d-lg-block {
		border-top: 0.5px solid #dddddd;
		border-left: 0.5px solid #dddddd;
	}
</style>
