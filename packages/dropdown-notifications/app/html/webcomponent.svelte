<svelte:options tag="hb-dropdown-notifications" />

<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { get_current_component } from "svelte/internal";

	export let id: string;
	export let style: string;

	export let clearUrl: string = $$props["clear-url"];
	export let viewUrl: string = $$props["view-url"];
	export let align: "left" | "right" = "left";

	$: {
		if (!id) id = "";
		if (!style) style = "";
	}

	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();
	function dispatch(name, detail) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}
	let show: boolean = false;
</script>

<div class="dropdown">
	<a on:click={() => (show = !show)} href="#" class:show class="nav-link px-3 text-base text-xs text-opacity-70 text-opacity-100-hover" aria-expanded={show}
		><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bell-fill" viewBox="0 0 16 16">
			<path
				d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"
			/>
		</svg></a
	>
	<div class:show class="dropdown-menu px-2" class:dropdown-menu-end={align === "right"} aria-labelledby="dropdown-notifications">
		<div class="dropdown-item d-flex align-items-center">
			<h6 class="dropdown-header p-0 m-0 font-semibold">Notifications</h6>
			{#if clearUrl}<a href={clearUrl} class="text-sm font-semibold ms-auto">Clear all</a>{/if}
		</div>
		<slot />
		{#if viewUrl}
			<div class="dropdown-divider" />
			<div class="dropdown-item py-2 text-center"><a href={viewUrl} class="font-semibold text-muted text-primary-hover">View all</a></div>
		{/if}
	</div>
</div>

<style lang="scss">
	@import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
</style>
