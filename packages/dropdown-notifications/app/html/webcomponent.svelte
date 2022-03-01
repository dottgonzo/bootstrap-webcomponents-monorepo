<svelte:options tag="hb-dropdown-notifications" />

<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { get_current_component } from "svelte/internal";
	import debounce from "debounce";

	$: {
	}
	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();
	function dispatch(name, detail) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}
</script>

<svelte:head>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@latest/font/bootstrap-icons.css" />
</svelte:head>
<div class="dropdown">
	<a
		href="#"
		class="nav-link px-3 text-base text-muted text-opacity-70 text-opacity-100-hover show"
		id="dropdown-notifications"
		data-bs-toggle="dropdown"
		aria-expanded="true"><i class="bi bi-bell-fill" /></a
	>
	<div class="dropdown-menu dropdown-menu-end px-2 show" aria-labelledby="dropdown-notifications" data-bs-popper="none">
		<div class="dropdown-item d-flex align-items-center">
			<h6 class="dropdown-header p-0 m-0 font-semibold">Notifications</h6>
			<a href="#" class="text-sm font-semibold ms-auto">Clear all</a>
		</div>
		<div class="dropdown-item py-3 d-flex">
			<div>
				<div class="avatar bg-success text-white rounded-circle">DC</div>
			</div>
			<div class="flex-fill ms-3">
				<div class="text-sm lg-snug w-64 text-wrap">
					<a href="#" class="font-semibold text-heading text-primary-hover">Dario</a>
					sent a message to <a href="#" class="font-semibold text-heading text-primary-hover">HTMLBrick</a>
				</div>
				<span class="text-muted text-xs">30 mins ago</span>
			</div>
		</div>
		<div class="dropdown-item py-3 d-flex">
			<div><img alt="..." src="https://picsum.photos/200/300" class="avatar rounded-circle" /></div>
			<div class="flex-fill ms-3">
				<div class="text-sm lg-snug w-64 text-wrap">
					<a href="#" class="font-semibold text-heading text-primary-hover">Dario</a>
					sent a message to <a href="#" class="font-semibold text-heading text-primary-hover">HTMLBrick</a>
				</div>
				<span class="text-muted text-xs">30 mins ago</span>
			</div>
		</div>
		<div class="dropdown-divider" />
		<div class="dropdown-item py-2 text-center"><a href="#" class="font-semibold text-muted text-primary-hover">View all</a></div>
	</div>
</div>

<style lang="scss">
	@import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
</style>
