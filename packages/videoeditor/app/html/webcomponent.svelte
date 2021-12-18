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

	export let track: ITrack;
	let max;
	let min = 0;
	let maxHours;
	let minHours;
	let maxMinutes;
	let minMinutes;
	let maxSeconds;
	let minSeconds;
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
		} else if (!track) {
			track = {
				maxValue: null,
				minValue: null,
			};
		}
	}

	function valueChanged() {
		track.maxValue = maxHours * 3600 + maxMinutes * 60 + maxSeconds;
		track.minValue = minHours * 3600 + minMinutes * 60 + minSeconds;
	}

	function dispatch(name, detail) {
		// console.log(`svelte: ${name}`);
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}
	function getVideo() {
		const video = component.shadowRoot.getElementById("video");
		return video;
	}
	function setVideoTime(seconds: number) {
		getVideo().currentTime = seconds;
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
		setTimings();

		dispatch("changeTrackValues", { minVaule: track.minValue, maxValue: track.maxValue });
	}
	function dispatchTrack() {
		dispatch("dispatchTrack", track);
		console.log(track);
	}
	function setTimings() {
		maxHours = parseInt((track.maxValue / 3600).toString());
		minHours = parseInt((track.maxValue / 3600).toString());
		maxMinutes = parseInt(((track.maxValue - Number(maxHours) * 60) / 60).toString());
		minMinutes = parseInt(((track.minValue - Number(minHours) * 60) / 60).toString());
		maxSeconds = track.maxValue - Number(maxHours) * 3600 - Number(maxMinutes) * 60;
		minSeconds = track.minValue - Number(minHours) * 3600 - Number(minMinutes) * 60;
	}
	function videoLoad(e) {
		durationInSeconds = e.target.duration;
		max = durationInSeconds;

		if (!track.maxValue || track.maxValue > max) track.maxValue = max;
		if (!track.minValue || track.minValue < min) track.minValue = min;
		setTimings();
	}

	function cue(point: string) {
		console.log(getVideo().currentTime);
		switch (point) {
			case "start":
				track.minValue = getVideo().currentTime;
				break;
			case "end":
				track.maxValue = getVideo().currentTime;

				break;

			default:
				return console.error("no vaild point for cue");
		}

		setTimings();
		dispatch("changeTrackValues", { minVaule: track.minValue, maxValue: track.maxValue });
	}
</script>

<div id="card" class="card h-100">
	<!-- svelte-ignore a11y-media-has-caption -->

	<div class="ratio ratio-16x9" style="background-color: black;">
		<video id="video" on:loadedmetadata={(e) => videoLoad(e)} controls class="ratio ratio-16x9"
			><source {src} type="video/mp4" />
			Your browser does not support the video tag.
		</video>
	</div>

	<div class="card-body">
		<div id="controls">
			<div style="flex-grow: 2">
				<button
					class="btn btn-sm btn-secondary"
					on:click={() => {
						cue("start");
					}}>▼</button
				>
				<button
					class="btn btn-sm btn-secondary"
					on:click={() => {
						setVideoTime(track.minValue);
					}}>▲</button
				>
				<input type="number" class="form-control form-custom-control-numbers" bind:value={minHours} on:change={valueChanged} />h
				<input bind:value={minMinutes} class="form-control form-custom-control-numbers" type="number" on:change={valueChanged} />m
				<input type="number" class="form-control form-custom-control-numbers" bind:value={minSeconds} on:change={valueChanged} />s
			</div>
			<!-- <div style="flex-grow: 2;text-align:center">
				{#if track?.maxValue}duration {Math.round((track.maxValue - track.minValue) * 100) / 100}{/if}
			</div> -->
			<div style="flex-grow: 2;text-align:right">
				<input type="number" class="form-control form-custom-control-numbers" bind:value={maxHours} on:change={valueChanged} />h
				<input bind:value={maxMinutes} class="form-control form-custom-control-numbers" type="number" on:change={valueChanged} />m
				<input type="number" class="form-control form-custom-control-numbers" bind:value={maxSeconds} on:change={valueChanged} />s
				<button
					class="btn btn-sm btn-secondary"
					on:click={() => {
						setVideoTime(track.maxValue);
					}}>▲</button
				>
				<button
					class="btn btn-sm btn-secondary"
					on:click={() => {
						cue("end");
					}}>▼</button
				>
			</div>
		</div>
		{#if durationInSeconds && track}
			<div style="width: 100%;margin-top:20px">
				<range-slider-component
					max={max.toString()}
					min={min.toString()}
					maxval={track.maxValue.toString()}
					minval={track.minValue.toString()}
					on:changeRangeValues={(e) => {
						dispatchTrackVals(e.detail);
					}}
				/>
			</div>
		{/if}
	</div>
	<div class="card-footer">
		<span style="float:left;height:30px;line-height:30px"
			>{#if track?.maxValue}duration {Math.round((track.maxValue - track.minValue) * 100) / 100}{/if}</span
		>
		<span style="float:right;height:30px;line-height:30px">
			<button class="btn btn-sm btn-primary" on:click={dispatchTrack}>send</button>
		</span>
	</div>
</div>

<style lang="scss">
	@import "../styles/bootstrap.scss";

	@import "../styles/webcomponent.scss";
	.form-custom-control-numbers {
		width: 40px;
		display: inline-block;
		padding: 0px;
	}
	#controls {
		display: flex;

		justify-content: space-around;
		flex-flow: row wrap;
		align-items: stretch;
	}
</style>
