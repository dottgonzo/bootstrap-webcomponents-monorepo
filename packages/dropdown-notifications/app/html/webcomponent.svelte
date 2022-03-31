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

<div class="dropdown">
	<a
		href="#"
		class="nav-link px-3 text-base text-muted text-opacity-70 text-opacity-100-hover show"
		id="dropdown-notifications"
		data-bs-toggle="dropdown"
		aria-expanded="true"
		><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bell-fill" viewBox="0 0 16 16">
			<path
				d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"
			/>
		</svg></a
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
