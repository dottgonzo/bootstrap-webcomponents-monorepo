<svelte:options tag="videoeditorbootstrap-component" />

<script lang="ts">
	/**
	 * Svelte Video Gallery WebComponent
	 * =====================
	 *
	 * @contributors: Dario Caruso <dev@dariocaruso.info> (https://dariocaruso.info)
	 *
	 * @license: MIT License
	 *
	 */
	import dayjs from "dayjs";

	import { createEventDispatcher } from "svelte";
	import { each, get_current_component } from "svelte/internal";

	import pkg from "../../package.json";
	import type { IDispatchValsEvent, ITrack } from "@app/types/webcomponent.type";

	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();

	export let id: string;
	export let starttime: Date;
	export let endtime: Date;

	let timeDiffInSeconds: number;
	const tracks: ITrack[] = [];
	$: {
		if (!id) {
			id = "";
		}
		if (!starttime) {
			starttime = new Date();
		}
		if (!endtime) {
			endtime = new Date();
		}
		if (!tracks.length) {
			tracks.push({
				maxPercent: 100,
				minPercent: 0,
				maxValue: 100,
				minValue: 0,
				name: "track1",
			});
		}
		timeDiffInSeconds = dayjs(endtime).diff(dayjs(starttime), "s");
	}
	function dispatch(name, detail) {
		// console.log(`svelte: ${name}`);
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}
	function addComponent(componentName: string, scriptJsName: string, componentId: string, localPackageDir?: string) {
		if (!document.getElementById(componentId)) {
			const script = document.createElement("script");
			script.id = componentId;
			script.src = `https://cdn.jsdelivr.net/npm/@htmlbricks/${componentName}@${pkg.version}/release/${scriptJsName}`;
			if (localPackageDir && location.href.includes("localhost")) script.src = `http://localhost:6006/${localPackageDir}/dist/${scriptJsName}`;

			document.head.appendChild(script);
		}
	}
	addComponent("range-slider-component", "rangeslider.js", "rangesliderscript", "rangeslider");

	function dispatchTrackVals(name: string, status: IDispatchValsEvent) {
		const trackStatus: ITrack = Object.assign({ name }, status);
		const registeredTrack: ITrack = tracks.find((f) => f.name === name);
		if (registeredTrack) {
			registeredTrack.maxPercent = registeredTrack.maxPercent;
			registeredTrack.minPercent = registeredTrack.minPercent;
			registeredTrack.maxValue = registeredTrack.maxValue;
			registeredTrack.minValue = registeredTrack.minValue;
			dispatch("changeTrackValues", registeredTrack);
		} else {
			tracks.push(trackStatus);
			dispatch("changeTrackValues", trackStatus);
		}
	}
	function dispatchTracks() {
		dispatch("dispatchTracks", tracks);
		console.log(tracks);
	}
</script>

{#each tracks as track (track.name)}
	<range-slider-component
		on:changeRangeValues={(e) => {
			dispatchTrackVals(track.name, e.detail);
		}}
	/>
{/each}

<button type="submit" on:click={dispatchTracks}>send</button>

<style lang="scss">
	@import "../styles/webcomponent.scss";
</style>
