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
		[c: string]: string;
	}[];

	$: {
		if (!id) id = null;
		if (!headers) headers = [];
		else if (typeof headers === "string") headers = JSON.parse(headers);
		if (!products) products = [];
		else if (typeof products === "string") products = JSON.parse(products);

		// 		for(const product of products){
		// if(!product._icon) {
		// 	switch(){

		// 	}
		// 	product._icon=''
		// }
		// 		}
	}
</script>

<svelte:head>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@latest/font/bootstrap-icons.css" />
</svelte:head>
<div part="container" id="maintable">
	<div part="col0" class="tablecol tablecol0">
		<div part="row0" class="rowproduct rowproduct0">bb</div>
		{#each headers as header (header.id)}
			<div part="row" class="rowproduct">{header.label}</div>
		{/each}
	</div>
	{#each products as product (product.id)}
		<div part="col" class="tablecol">
			<div part="row0" class="rowproduct rowproduct0">
				<div>
					{product.model}
				</div>

				<div>
					{product.price}
				</div>
			</div>
			{#each headers as header (header.id)}
				<div part="row" class="rowproduct">
					{#if product[header.id] === "valid"}
						<i class="bi-alarm" />
					{:else if product[header.id] === "disabled"}
						<i class="bi-alarm" />
					{/if}
				</div>
			{/each}
		</div>
	{/each}
</div>

<style lang="scss">
	// @import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";

	#maintable {
		display: flex;
	}
	.tablecol {
		flex: 1; /* distributes space on the line equally among items */
	}
	.tablecol0 {
		flex: 2; /* distributes space on the line equally among items */
	}
	.rowproduct0 {
		height: 200px;
	}
	.rowproduct {
		height: 40px;
	}
</style>
