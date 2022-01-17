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
	import debounce from "debounce";
	import Overlay from "ol/Overlay";

	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();
	function dispatch(name, detail) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}
	let map: Map;
	let mountEl: HTMLElement;
	let popupEl: HTMLElement;
	let popupContentEl: HTMLElement;
	let overlay;
	export let id: string;
	export let zoom: number;
	export let center: number[];
	export let data: {
		marker?: { lngLat: number[]; icon?: { uri: string; scale?: number; anchor?: number[] }; id?: string; popupHtml?: string };
		point?: { lngLat: number[]; icon?: { uri: string; scale?: number; anchor?: number[] }; id?: string; popupHtml?: string };
		line?: { lngLat: number[]; icon?: { uri: string; scale?: number; anchor?: number[] }; id?: string; popupHtml?: string }[];
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
		const feature = map.forEachFeatureAtPixel(e.pixel, function (feat, layer) {
			return feat;
		});

		if (feature && feature.get("marker")) {
			dispatch("markerClick", { coordinates: { latitude: coordinates[1], longitude: coordinates[0] }, id: feature.get("id") });
			if (feature.get("popupHtml")) {
				popupContentEl.innerHTML = feature.get("popupHtml");
				overlay.setPosition(e.coordinate);
			}
		} else {
			overlay.setPosition(undefined);

			dispatch("pointClickCoordinates", { coordinates: { latitude: coordinates[1], longitude: coordinates[0] } });
		}
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
						marker: true,
						id: marker.id || undefined,
						popupHtml: marker.popupHtml,
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
			overlay = new Overlay({
				element: popupEl,
				autoPan: {
					animation: {
						duration: 250,
					},
				},
			});
			map = new Map({
				target: mountEl,
				layers,
				overlays: [overlay],
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

	function popupClose(e?: { target: HTMLElement }) {
		overlay.setPosition(undefined);
		e?.target?.blur?.();
	}

	onMount(() => {
		mountEl = component.shadowRoot.getElementById("map");
		popupEl = component.shadowRoot.getElementById("popup");
		popupContentEl = component.shadowRoot.getElementById("popup-content");

		const style = document.createElement("style");
		style.innerHTML = css;
		mountEl.appendChild(style);
		updateMap();
	});
</script>

<svelte:window on:resize={debounce(updateMap, 200)} />
<div id="map" style="width: 100%; height: 100%;" />
<div id="popup" class="ol-popup">
	<button on:click={(e) => popupClose(e)} id="popup-closer" class="ol-popup-closer" />
	<div id="popup-content" />
</div>

<style lang="scss">
	:host {
		display: block;
		height: 100%;
	}
</style>
