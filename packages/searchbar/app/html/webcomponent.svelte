<svelte:options tag="hb-searchbar" />

<script lang="ts">
	import pkg from "../../package.json";
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
	<link rel="stylesheet" href="../../node_modules/bootstrap-icons/font/bootstrap-icons.css" />
</svelte:head>
<form class="position-relative">
	<div class="position-relative">
		<input class="form-control pe-5 bg-transparent" type="search" placeholder="Search" aria-label="Search" />
		<button class="btn bg-transparent px-2 py-0 position-absolute top-50 end-0 translate-middle-y" type="submit">
			<i class="bi bi-search" />
		</button>
	</div>
	<div class="position-relative">
		<ul class="dropdown-menu show" style="position: static; margin: 0px;">
			<li><a class="dropdown-item" href="#">Menu item</a></li>
			<li><a class="dropdown-item" href="#">Menu item</a></li>
			<li><a class="dropdown-item" href="#">Menu item</a></li>
		</ul>
	</div>
</form>

<style lang="scss">
	@import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
</style>
