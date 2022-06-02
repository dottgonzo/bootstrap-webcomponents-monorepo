<svelte:options tag="hb-dashboard-indicator" />

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

	export let id: string;
	export let style: string;
	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();

	function dispatch(name, detail) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}
	export let number: number;
	export let label: string;
	export let icon: string;
	export let link_label: string;
	$: {
		if (!id) {
			id = "";
		}
		if (!style) {
			style = "";
		}
		if (!label) label = "";
		if (!link_label) link_label = "";
		if (!icon) icon = "hypnotize";

		if (!number) {
			number = 0;
		} else if (typeof number === "string") {
			number = Number(number);
		}
	}
</script>

<svelte:head>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@latest/font/bootstrap-icons.css" />
</svelte:head>

<div class="panel panel-green">
	<div class="panel-heading">
		<div class="row">
			<div><i id="icon" class="bi bi-{icon}" /></div>
			<div id="panel-heading-content">
				<div id="number">{number}</div>
				<div>{label}</div>
			</div>
		</div>
	</div>
	{#if link_label}
		<div
			on:click={() => {
				dispatch("dashboardIndicatorClick", {
					id,
				});
			}}
			class="panel-footer"
		>
			<span class="pull-left">{link_label}</span><span style="float:right"><i class="bi bi-arrow-right-circle-fill" /></span>
			<div class="clearfix" />
		</div>
	{/if}
</div>

<style lang="scss">
	@import "../styles/webcomponent.scss";
	#icon {
		font-size: 4rem;
	}
	.row {
		display: grid;
		grid-template-columns: max-content auto;
	}
	#panel-heading-content {
		text-align: right;
	}
	#number {
		font-size: 3rem;
	}
	.panel {
		margin-bottom: 20px;
		background-color: #fff;
		border: 1px solid transparent;
		border-radius: 4px;
		-webkit-box-shadow: 0 1px 1px rgb(0 0 0 / 5%);
		box-shadow: 0 1px 1px rgb(0 0 0 / 5%);
	}
	.panel-green {
		border-color: var(--hb--dashboard-indicator-background);
	}
	.panel-green > .panel-heading {
		color: #fff;
		background-color: var(--hb--dashboard-indicator-background);
	}
	.panel-heading {
		padding: 10px 15px;
		border-bottom: 1px solid transparent;
		border-top-left-radius: 3px;
		border-top-right-radius: 3px;
	}

	a {
		text-decoration: none;
	}
	.panel-footer {
		padding: 10px 15px;
		background-color: #f5f5f5;
		border-top: 1px solid #ddd;
		border-bottom-right-radius: 3px;
		border-bottom-left-radius: 3px;
		color: var(--hb--dashboard-indicator-background);
		cursor: pointer;
	}
</style>
