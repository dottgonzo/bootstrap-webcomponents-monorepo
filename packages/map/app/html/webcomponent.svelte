<svelte:options tag="hb-map" />

<script lang="ts">
	import { get_current_component, onDestroy, onMount } from "svelte/internal";
	import { Map, View } from "ol";
	import OSM from "ol/source/OSM";
	import XYZ from "ol/source/XYZ";
	import Feature from "ol/Feature";
	import Point from "ol/geom/Point";
	import { Circle as CircleStyle, Fill, Icon, Stroke, Style } from "ol/style";
	import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
	import VectorSource from "ol/source/Vector";
	import { fromLonLat } from "ol/proj";
	import Attribution from "ol/control/Attribution";
	import { defaults } from "ol/control";
	import { createEventDispatcher } from "svelte";
	import pkg from "../../package.json";
	import css from "@app/functions/ol-css";

	const component = get_current_component();
	// const svelteDispatch = createEventDispatcher();
	// function dispatch(name, detail) {
	// 	svelteDispatch(name, detail);
	// 	component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	// }
	let map: Map;
	let mountEl: HTMLElement;
	export let id: string;
	export let zoom: number;
	export let center: number[];
	export let markers: { latLng: number[] }[];
	export let source: { type: string; url?: string };

	$: {
		if (!id) id = "";
		if (!source) source = { type: "osm" };
		else if (typeof source === "string") source = JSON.parse(source);
		if (!zoom) zoom = 6;
		else if (typeof zoom === "string") zoom = Number(zoom);
		if (!center) center = [37.41, 8.82];
		else if (typeof center === "string") center = JSON.parse(center);
		if (!markers) markers = [];
		else if (typeof markers === "string") markers = JSON.parse(markers);
		updateMap();
	}

	function updateMap() {
		if (mountEl) {
			if (map) {
				map = null;
				const style = document.createElement("style");
				style.innerHTML = css;
				mountEl.innerHTML = "";
				mountEl.appendChild(style);
			}
			const attribution = new Attribution({
				collapsible: false,
			});

			let layers = [];
			if (source.type.toLowerCase() === "osm") {
				layers.push(
					new TileLayer({
						source: new OSM(),
					}),
				);
			} else if (source.type.toLowerCase() === "xyz" && source.url) {
				layers.push(
					new TileLayer({
						source: new XYZ({ url: source.url }),
					}),
				);
			}
			if (markers.length) {
				const markersToAdd = [];
				for (const marker of markers) {
					const iconFeature = new Feature({
						geometry: new Point(fromLonLat(marker.latLng)),
						name: "Somewhere near Nottingham",
					});
					markersToAdd.push(iconFeature);
				}

				const v = new VectorLayer({
					source: new VectorSource({
						features: markersToAdd,
					}),
					style: new Style({
						image: new Icon({
							scale: 3,
							anchor: [0.5, 18],

							anchorXUnits: "fraction",
							anchorYUnits: "pixels",
							src: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Maki2-marker-18.svg",
						}),
					}),
				});
				layers.push(v);
			}
			map = new Map({
				controls: defaults({ attribution: false }).extend([attribution]),
				target: mountEl,
				layers,
				view: new View({
					center: fromLonLat(center),
					zoom,
				}),
			});
		}
	}

	onMount(() => {
		mountEl = component.shadowRoot.getElementById("map");
		const style = document.createElement("style");
		style.innerHTML = css;
		mountEl.appendChild(style);
		updateMap();
	});
</script>

<div id="map" style="width: 100%; height: 100%;" />

<style lang="scss">
	:host {
		display: block;
		height: 100%;
	}
</style>
