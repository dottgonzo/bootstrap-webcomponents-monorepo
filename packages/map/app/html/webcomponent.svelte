<svelte:options tag="hb-map" />

<script lang="ts">
	import { get_current_component, onDestroy, onMount } from "svelte/internal";
	import L from "leaflet";

	import { createEventDispatcher } from "svelte";
	import pkg from "../../package.json";
	const component = get_current_component();
	// const svelteDispatch = createEventDispatcher();
	// function dispatch(name, detail) {
	// 	svelteDispatch(name, detail);
	// 	component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	// }
	let map: L;
	let mountEl: HTMLElement;
	export let id: string;

	$: {
		if (!id) id = "";
	}

	function updateMap() {
		if (mountEl) {
			map = L.map(mountEl).setView([51.505, -0.09], 13);

			const tiles = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
				attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
			}).addTo(map);
		}
	}

	onMount(() => {
		mountEl = component.shadowRoot.getElementById("map");
		updateMap();
	});
</script>

<div>
	<div id="map" style="width: 600px; height: 400px;" />
</div>

<style lang="scss">
	@import "../styles/webcomponent.scss";
</style>
