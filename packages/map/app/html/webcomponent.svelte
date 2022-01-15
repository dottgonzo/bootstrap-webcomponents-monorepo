<svelte:options tag="hb-map" />

<script lang="ts">
	import { get_current_component, onDestroy, onMount } from "svelte/internal";
	import { Map, View } from "ol";
	import OSM from "ol/source/OSM";
	import TileLayer from "ol/layer/Tile";
	import { fromLonLat } from "ol/proj";

	import { createEventDispatcher } from "svelte";
	import pkg from "../../package.json";
	const component = get_current_component();
	// const svelteDispatch = createEventDispatcher();
	// function dispatch(name, detail) {
	// 	svelteDispatch(name, detail);
	// 	component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	// }
	let map;
	let mountEl: HTMLElement;
	export let id: string;

	$: {
		if (!id) id = "";
	}

	function updateMap() {
		if (mountEl) {
			map = new Map({
				target: mountEl,
				layers: [
					new TileLayer({
						source: new OSM(),
					}),
				],
				view: new View({
					center: fromLonLat([37.41, 8.82]),
					zoom: 4,
				}),
			});
		}
	}

	onMount(() => {
		mountEl = component.shadowRoot.getElementById("map");
		updateMap();
	});
</script>

<div>
	<div id="map" class="map" style="width: 600px; height: 400px;" />
</div>

<style lang="scss">
	@import "../styles/webcomponent.scss";
</style>
