<svelte:options tag="hb-map" />

<script lang="ts">
	import { get_current_component, onDestroy, onMount } from "svelte/internal";
	import { Map, View } from "ol";
	import { createEmpty, extend } from "ol/extent";
	import OSM from "ol/source/OSM";
	import XYZ from "ol/source/XYZ";
	import Feature from "ol/Feature";
	import Point from "ol/geom/Point";
	import { Circle as CircleStyle, Fill, Icon, Stroke, Style } from "ol/style";
	import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
	import VectorSource from "ol/source/Vector";
	import { fromLonLat, transform } from "ol/proj";
	import { createEventDispatcher } from "svelte";
	import css from "@app/functions/ol-css";

	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();
	function dispatch(name, detail) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}
	let map: Map;
	let mountEl: HTMLElement;
	export let id: string;
	export let zoom: number;
	export let center: number[];
	export let data: {
		marker?: { lngLat: number[]; icon?: { uri: string; scale?: number; anchor?: number[] } };
		point?: { lngLat: number[]; icon?: { uri: string; scale?: number; anchor?: number[] } };
		line?: { lngLat: number[]; icon?: { uri: string; scale?: number; anchor?: number[] } }[];
	}[];
	export let source: { type: string; url?: string };
	export let options: { centerFromGeometries?: string };

	$: {
		if (!id) id = "";
		if (!source) source = { type: "osm" };
		else if (typeof source === "string") source = JSON.parse(source);
		if (!options) options = {};
		else if (options && typeof options === "string") options = JSON.parse(options);
		if (!zoom) zoom = 6;
		else if (typeof zoom === "string") zoom = Number(zoom);
		if (!center) center = [37.5176038, 15.0819224];
		else if (typeof center === "string") center = JSON.parse(center);
		if (!data) data = [];
		else if (typeof data === "string") data = JSON.parse(data);
		updateMap();
	}

	function pointClick(e) {
		const coordinates = transform(e.coordinate, "EPSG:3857", "EPSG:4326");

		dispatch("pointClickCoordinates", coordinates);
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

			const layers = [];
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
			let markersCenter: number[][] = [];
			let extent = createEmpty();

			if (data?.filter((f) => f.marker).length) {
				const markersToAdd = [];
				for (const marker of data.filter((f) => f.marker).map((m) => m.marker)) {
					// let markerCoords: number[];
					// if (marker.lngLat) {
					// 	markerCoords = marker.lngLat;
					// } else if (marker.nmea) {
					// 	try {
					// 		const nmeaParsed: GPSState = Parse(marker.nmea) as GPSState;
					// 		if (!nmeaParsed || !nmeaParsed.lat || !nmeaParsed.lon) throw new Error("invalid parse");
					// 		markerCoords = [nmeaParsed.lat, nmeaParsed.lon];
					// 	} catch (err) {
					// 		throw new Error("invalid nmea marker " + marker.nmea);
					// 	}
					// } else {
					// 	throw new Error("unsupported marker");
					// }
					const iconFeature = new Feature({
						geometry: new Point(fromLonLat(marker.lngLat)),
						icon: marker.icon,
						// name: "Somewhere near Nottingham",
					});
					markersToAdd.push(iconFeature);
					markersCenter.push(marker.lngLat);
					if (options.centerFromGeometries) {
						//add extent of every feature to the extent
						extent = extend(extent, iconFeature.getGeometry().getExtent());
					}
				}
				const defaultIcon = new Style({
					image: new Icon({
						scale: 3,
						anchor: [0.5, 0.8],

						src: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Maki2-marker-18.svg",
					}),
				});
				const v = new VectorLayer({
					source: new VectorSource({
						features: markersToAdd,
					}),
					style: function (feature) {
						const icon = feature.get("icon");
						let newStyle: Style;
						if (icon?.uri) {
							newStyle = new Style({
								image: new Icon({
									scale: icon.scale || 0.15,
									anchor: icon.anchor || [0.5, 0.8],
									src: icon.uri,
								}),
							});
							return newStyle; // assuming these are created elsewhere
						} else {
							return defaultIcon; // assuming these are created elsewhere
						}
					},
				});
				layers.push(v);
				// markersCenter=v.getBounds().getCenterLonLat()
			}

			map = new Map({
				target: mountEl,
				layers,
				view: new View({
					center: fromLonLat(center),
					zoom,
				}),
			});
			if (options.centerFromGeometries && markersCenter.length > 1) {
				map.getView().fit(extent, { padding: [25, 25, 25, 25] });
			} else if (options.centerFromGeometries) {
				map.getView().setCenter(fromLonLat(markersCenter[0]));
			}
			map.on("singleclick", function (e) {
				pointClick(e);
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
