<svelte:options tag="hb-editor-video" />

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
	import duration from "dayjs/plugin/duration";

	dayjs.extend(duration);

	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();

	export let id: string;
	export let src: string;
	export let form: string;

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
	let sendform: "yes" | "no" = "no";
	let enablesubmit: boolean;

	$: {
		if (!id) {
			id = "";
		}
		if (!form) {
			form = null;
			enablesubmit = true;
		} else {
			enablesubmit = false;
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
	addComponent("hb-range-slider", "rangeslider.js", "rangesliderscript", "rangeslider");
	addComponent("hb-form", "formhostcomponent.js", "formrendererhostscript", "formhostcomponent");

	function dispatchTrackVals(trackStatus: IDispatchValsEvent) {
		track.minValue = trackStatus.minValue;
		track.maxValue = trackStatus.maxValue;
		setTimings();

		if (getVideo().currentTime < track.minValue) {
			setVideoTime(track.minValue);
		}
		if (getVideo().currentTime > track.maxValue) {
			setVideoTime(track.maxValue);
		}
		dispatch("changeTrackValues", { minVaule: track.minValue, maxValue: track.maxValue });
	}
	function dispatchTrack() {
		if (!track || (!track.minValue && track.minValue !== 0) || (!track.maxValue && track.maxValue !== 0)) return;
		if (!form) {
			dispatch("dispatchTrack", track);
			console.log(track);
		} else sendform = "yes";
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
		switch (point) {
			case "start":
				if (getVideo().currentTime < track.maxValue) track.minValue = getVideo().currentTime;
				break;
			case "end":
				if (getVideo().currentTime > track.minValue) track.maxValue = getVideo().currentTime;

				break;

			default:
				return console.error("no vaild point for cue");
		}

		setTimings();
		dispatch("changeTrackValues", { minVaule: track.minValue, maxValue: track.maxValue });
	}
	function formSubmit(details) {
		console.log("formSubmit", details._valid);
		enablesubmit = details._valid;
		if (sendform === "yes") {
			if (details._valid && !(!track || (!track.minValue && track.minValue !== 0) || (!track.maxValue && track.maxValue !== 0))) {
				dispatch("dispatchTrack", Object.assign(track, details));
			}

			console.log(track);
		}
		if (sendform !== "no") sendform = "no";
	}
	function formCheck(details) {
		enablesubmit = details._valid;
	}
	function videoTimeUpdate(v) {
		if (getVideo().currentTime > track.maxValue) {
			getVideo().pause();

			setVideoTime(track.maxValue);
		} else if (getVideo().currentTime < track.minValue - 0.01) {
			getVideo().pause();
			setVideoTime(track.minValue);
		}
	}
</script>

<div id="card" class="card h-100">
	<!-- svelte-ignore a11y-media-has-caption -->

	<div class="ratio ratio-16x9" style="background-color: black;">
		<video on:timeupdate={(e) => videoTimeUpdate(e)} id="video" on:loadedmetadata={(e) => videoLoad(e)} controls class="ratio ratio-16x9"
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
				<hb-range-slider
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
		{#if form}<hb-form
				on:submit={(e) => formSubmit(e.detail)}
				on:change={(e) => formCheck(e.detail)}
				style="margin:40px auto 20px auto; display:block"
				submitted={sendform}
				schema={form}
			/>{/if}
	</div>
	<div class="card-footer">
		<span style="float:left;height:30px;line-height:30px"
			>{#if track?.maxValue}duration:
				{dayjs.duration((track.maxValue - track.minValue) * 1000).hours()
					? dayjs.duration((track.maxValue - track.minValue) * 1000).format("H") + " hours"
					: ""}
				{dayjs.duration((track.maxValue - track.minValue) * 1000).minutes()
					? dayjs.duration((track.maxValue - track.minValue) * 1000).format("m") + " minutes"
					: ""}
				{dayjs.duration(parseInt((track.maxValue - track.minValue) * 1000)).format("s.SSS") + " seconds"}
			{/if}</span
		>
		<span style="float:right;height:30px;line-height:30px">
			{#if enablesubmit}
				<button class="btn btn-sm btn-primary" on:click={dispatchTrack}>send</button>
			{:else}
				<button class="btn btn-sm btn-primary" disabled on:click={dispatchTrack}>send</button>
			{/if}
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
