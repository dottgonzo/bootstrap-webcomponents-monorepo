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
			<div><i class="bi bi-{icon}" style="font-size: 2rem;" /></div>
			<div id="panel-heading-content">
				<div class="huge">{number}</div>
				<div>{label}</div>
			</div>
		</div>
	</div>
	{#if link_label}
		<a href="/admin/requests" class=""
			><div class="panel-footer">
				<span class="pull-left">{link_label}</span><span style="float:right"><i class="bi bi-arrow-right-circle" /></span>
				<div class="clearfix" />
			</div>
		</a>
	{/if}
</div>

<style lang="scss">
	@import "../styles/webcomponent.scss";
	.row {
		display: grid;
		grid-template-columns: max-content auto;
	}
	#panel-heading-content {
		text-align: right;
	}
	.panel {
		margin-bottom: 20px;
		background-color: #fff;
		border: 1px solid transparent;
		border-radius: 4px;
		-webkit-box-shadow: 0 1px 1px rgb(0 0 0 / 5%);
		box-shadow: 0 1px 1px rgb(0 0 0 / 5%);
	}
	.panel-green > .panel-heading {
		border-color: #5cb85c;
		color: #fff;
		background-color: #5cb85c;
	}
	.panel-heading {
		padding: 10px 15px;
		border-bottom: 1px solid transparent;
		border-top-left-radius: 3px;
		border-top-right-radius: 3px;
	}
	.panel-green > a {
		color: #5cb85c;
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
	}
</style>
