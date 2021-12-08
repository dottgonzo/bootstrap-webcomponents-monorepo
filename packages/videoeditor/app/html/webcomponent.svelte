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
	import { get_current_component } from "svelte/internal";

	import pkg from "../../package.json";
	import type { IDispatchValsEvent, ITrack } from "@app/types/webcomponent.type";

	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();

	export let id: string;
	export let src: string;

	export let videosrc: string;
	export let track: ITrack;

	let durationInSeconds: number;
	$: {
		if (!id) {
			id = "";
		}
		if (!durationInSeconds) {
			durationInSeconds = 0;
		}
		if (!src) {
			src = "";
		}

		if (track && typeof track === "string") {
			track = JSON.parse(track);
		}
		console.log(track);
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

	function dispatchTrackVals(trackStatus: IDispatchValsEvent) {
		track.minValue = trackStatus.minValue;
		track.maxValue = trackStatus.maxValue;
		dispatch("changeTrackValues", trackStatus);
	}
	function dispatchTrack() {
		dispatch("dispatchTrack", track);
		console.log(track);
	}
	function videoLoad(e) {
		durationInSeconds = e.target.duration;
		if (!track) {
			track = {
				maxValue: durationInSeconds,
				minValue: 0,
			};
		} else if (track.maxValue && track.maxValue > durationInSeconds) {
			track.maxValue = durationInSeconds;
		}
	}
</script>

<div class="card h-100">
	<!-- svelte-ignore a11y-media-has-caption -->

	<div class="ratio ratio-16x9" style="background-color: black;">
		<video on:loadedmetadata={(e) => videoLoad(e)} controls class="ratio ratio-16x9"
			><source {src} type="video/mp4" />
			Your browser does not support the video tag.
		</video>
	</div>

	<div class="card-body">
		<div style="display:flex;align-items:center">
			<div style="width: 200px"><input type="number" />h <input type="number" />m <input type="number" />s</div>
			<div style="width: 100%;margin:20px">aa</div>
			<div style="width: 200px"><input type="number" />h <input type="number" />m <input type="number" />s</div>
		</div>
		{#if durationInSeconds}
			<div style="width: 100%;margin-top:20px">
				<range-slider-component
					maxvalue={track.maxValue.toString()}
					minvalue={track.minValue.toString()}
					on:changeRangeValues={(e) => {
						dispatchTrackVals(e.detail);
					}}
				/>
			</div>
		{/if}
	</div>
	<div class="card-footer" style="text-align: right;">
		<button class="btn btn-sm btn-primary" on:click={dispatchTrack}>send</button>
	</div>
</div>

<style lang="scss">
	@import "../styles/bootstrap.scss";

	@import "../styles/webcomponent.scss";
	input {
		width: 20px;
	}
</style>
