<svelte:options tag="hb-sidenav-button" />

<script lang="ts">
	import type { INavLink } from "@app/types/webcomponent.type";

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
	import { each, get_current_component } from "svelte/internal";
	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();
	import type { Component } from "@app/types/webcomponent.type";

	function dispatch(name: string, detail: any) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}
	function pageChange(page: string) {
		dispatch("pageChange", {
			page,
		});
	}

	export let id: string;
	export let navlink: INavLink;
	export let selected: boolean;
	export let nav_type: Component["nav_type"];

	$: {
		if (!id) id = null;
		try {
			if (navlink) {
				try {
					navlink = JSON.parse(navlink as unknown as string);
				} catch (err) {}
			} else {
				navlink = null;
			}
		} catch (err) {}
		if ((selected as unknown as string) === "") {
			selected = true;
		} else if (typeof selected === "string" && (selected === "yes" || selected === "true")) {
			selected = true;
		} else if (selected !== true) {
			selected = false;
		}
		if (!nav_type) nav_type = null;
	}
</script>

<svelte:head>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@latest/font/bootstrap-icons.css" />
</svelte:head>
{#if navlink}
	<li part="li" class="nav-item">
		<button
			on:click={() => {
				pageChange(navlink.key);
			}}
			style="color:black;"
			class="custom-button btn nav-link {selected ? 'btn-outline-primary active' : ''}"
		>
			{#if !navlink.badge && nav_type === "checkbox"}
				<span class="chkb"><i class="bi bi-check-circle{navlink.value ? '-fill' : ''}" /></span>
			{:else if !navlink.badge && nav_type === "radio"}
				<span class="chkb"><i class="bi bi-circle{navlink.value ? '-fill' : ''}" /></span>
			{:else}
				<i class="bi me-2 bi-{navlink.icon}" />
			{/if}
			{navlink.text}
			{#if navlink.badge}
				<span style="float:right" class="{navlink.badge.class || 'badge rounded-pill'} {navlink.badge.classcolor || 'bg-secondary'}"
					>{navlink.badge.text}</span
				>
			{:else if nav_type === "switch"}
				<span class="switcher"><i class="bi bi-toggle-{navlink.value ? 'on' : 'off'}" /></span>
			{/if}
		</button>
	</li>
{/if}

<style lang="scss">
	@import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
</style>
