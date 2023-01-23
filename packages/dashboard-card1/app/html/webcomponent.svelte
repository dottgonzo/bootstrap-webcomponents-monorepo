<svelte:options tag="hb-dashboard-card1" />

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

	import { get_current_component } from "svelte/internal";
	import { createEventDispatcher } from "svelte";
	import type { Component } from "../types/webcomponent.type";

	export let id: string;
	export let style: string;
	export let body: Component["body"];

	export let header: Component["header"];
	// export let placeholder: Component["placeholder"];

	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();

	function dispatch(name: string, detail: any) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}

	$: {
		if (!id) {
			id = "";
		}
		if (!style) {
			style = "";
		}
		if (!header) {
			header = null;
		} else if (typeof header === "string") {
			header = JSON.parse(header);
		}
		// if (!placeholder) {
		// 	placeholder = null;
		// } else if (typeof placeholder === "string") {
		// 	placeholder = JSON.parse(placeholder);
		// }
		if (!body) {
			body = { noborder: false };
		} else if (typeof body === "string") {
			body = JSON.parse(body);
		}
		if (!body.noborder) {
			body.noborder = false;
		}
	}
</script>

<svelte:head>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@latest/font/bootstrap-icons.css" />
</svelte:head>

<div part="card" class="card">
	<div class="card-header">
		<slot name="header_content">
			{#if header?.label}
				{#if header.icon}
					<i class="bi bi-{header.icon}" />
				{/if}
				<span>{header.label}</span>
			{/if}
			{#if header?.badge}
				<span style="float:right;margin-right:10px" class="badge bg-secondary">{header.badge}</span>
			{/if}
		</slot>
	</div>
	<div class="card-body" style={body.noborder ? "padding:0px" : ""}>
		<slot name="content">
			<!-- {#if placeholder?.type}
				{#if placeholder.type === "text" && placeholder.content}
					<div part="text_placeholder" id="text_placeholder">
						{placeholder.content}
					</div>
				{:else}
					todo
				{/if}
			{/if} -->
		</slot>
	</div>
	<!-- <div class="card-footer text-muted"><slot name="footer_content" /></div> -->
</div>

<style lang="scss">
	@import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
</style>
