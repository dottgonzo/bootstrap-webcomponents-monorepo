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
	import { addComponent, getChildStyleToPass } from "@htmlbricks/hb-jsutils/main";
	import parseStyle from "style-to-object";
	let parsedStyle: { [x: string]: string };
	export let style: string;
	import { styleSetup as formStyleSetup } from "../../node_modules/@htmlbricks/hb-form/release/docs";
	import { styleSetup as rangeSliderStyleSetup } from "../../node_modules/@htmlbricks/hb-range-slider/release/docs";
	let formStyleToSet: string = "";
	let rangeSliderStyleToSet: string = "";

	import extractFrames from "../functions/extractFrames";

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
	let videoElement: HTMLVideoElement;
	let videoTime: number;

	let isPaused = true;

	$: {
		if (style) {
			parsedStyle = parseStyle(style);
			formStyleToSet = getChildStyleToPass(parsedStyle, formStyleSetup?.vars);
			rangeSliderStyleToSet = getChildStyleToPass(parsedStyle, rangeSliderStyleSetup?.vars);
		}
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
		console.log("reload all");
		console.log(videoTime, "log", min);

		if (track) videoTime = track.minValue < (videoTime || 0) ? videoTime || 0 : track.minValue;
		console.log(videoTime, "log2");
	}

	function valueChanged() {
		track.maxValue = maxHours * 3600 + maxMinutes * 60 + maxSeconds;
		track.minValue = minHours * 3600 + minMinutes * 60 + minSeconds;
	}

	function dispatch(name, detail) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}

	function setVideoTime(seconds: number) {
		videoElement.currentTime = seconds;
	}

	addComponent({ repoName: "@htmlbricks/hb-range-slider", version: pkg.version });
	addComponent({ repoName: "@htmlbricks/hb-form", version: pkg.version });

	function dispatchTrackVals(trackStatus: IDispatchValsEvent) {
		track.minValue = trackStatus.minValue;
		track.maxValue = trackStatus.maxValue;
		setTimings();

		if (videoElement.currentTime < track.minValue) {
			setVideoTime(track.minValue);
		}
		if (videoElement.currentTime > track.maxValue) {
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
		videoElement = component.shadowRoot.getElementById("video");
		setTimings();

		// if (!videoTime) videoTime = track.minValue > videoElement.currentTime ? track.minValue : videoElement.currentTime;

		console.log("videoElement", videoElement);

		const parts = durationInSeconds / 5 > 100 ? 100 : durationInSeconds / 5;

		const positions: number[] = [];
		for (let i = 0; i < parts; i++) {
			positions.push(i * 5);
		}

		extractFrames(videoElement, positions)
			.then((imgs) => {
				console.log("extractFrames done ", durationInSeconds, positions, imgs);
			})
			.catch((err) => {
				console.log("extractFrames error ", positions, err);
			});

		// videoToThumb
		// 	.load()
		// 	.positions([0])
		// 	.type("base64")
		// 	.error(function (err) {
		// 		console.log("videoToThumb error", JSON.stringify(err));
		// 	})
		// 	.done(function (imgs) {
		// 		imgs.forEach(function (img) {
		// 			const elem = new Image();
		// 			elem.src = img;
		// 			console.log(elem, "videoToThumb img loaded");
		// 		});
		// 	});
	}

	function cue(point: string) {
		switch (point) {
			case "start":
				if (videoElement.currentTime < track.maxValue) track.minValue = videoElement.currentTime;
				break;
			case "end":
				if (videoElement.currentTime > track.minValue) track.maxValue = videoElement.currentTime;

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
		if (videoElement.currentTime > track.maxValue) {
			videoElement.pause();

			setVideoTime(track.maxValue);
		} else if (videoElement.currentTime < track.minValue - 0.01) {
			videoElement.pause();
			setVideoTime(track.minValue);
		}
		videoTime = videoElement.currentTime;
		// videoTime = track.minValue > videoElement.currentTime ? track.minValue : videoElement.currentTime;
	}
</script>

<div id="card" class="card h-100">
	<!-- svelte-ignore a11y-media-has-caption -->

	<div class="ratio ratio-16x9" style="background-color: black;">
		<video
			on:play={() => (isPaused = false)}
			on:pause={() => (isPaused = true)}
			on:timeupdate={(e) => videoTimeUpdate(e)}
			id="video"
			on:loadedmetadata={(e) => videoLoad(e)}
			class="ratio ratio-16x9"
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
			<div style="flex-grow: 2;text-align:center">
				<!-- {videoTime} -->
				<!-- {#if videoElement}
					<button on:click={() => (videoElement.paused ? videoElement.play() : videoElement.pause())}
						>{#if isPaused} play {:else} pause{/if}</button
					>
				{/if} -->
				<!-- {#if track?.maxValue}duration {Math.round((track.maxValue - track.minValue) * 100) / 100}{/if} -->
			</div>
			<div style="flex-grow: 2;text-align:right">
				<input type="number" class="form-control form-custom-control-numbers" bind:value={maxHours} on:change={valueChanged} />h
				<input bind:value={maxMinutes} class="form-control form-custom-control-numbers" type="number" on:change={valueChanged} />m
				<input type="number" class="form-control form-custom-control-numbers" bind:value={maxSeconds} on:change={valueChanged} />s

				<!-- <span>
	{videoTime}
</span> -->

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
				<div style="display:inline-block; width:50px;">
					{#if videoElement}
						<button on:click={() => (videoElement.paused ? videoElement.play() : videoElement.pause())}
							>{#if isPaused} play {:else} pause{/if}</button
						>
					{/if}
				</div>
				<div style="display:inline-block;width:calc(100% - 60px);position:relative">
					<hb-range-slider
						style={rangeSliderStyleToSet}
						max={max.toString()}
						min={min.toString()}
						maxval={track.maxValue.toString()}
						minval={track.minValue.toString()}
						position_value={videoTime.toString()}
						on:changeRangeValues={(e) => {
							dispatchTrackVals(e.detail);
						}}
					/>
				</div>
			</div>
		{/if}
		{#if form}
			<hb-form
				hide_submit="yes"
				style={formStyleToSet + "margin:40px auto 20px auto; display:block"}
				on:submit={(e) => formSubmit(e.detail)}
				on:change={(e) => formCheck(e.detail)}
				submitted={sendform}
				schema={form}
			/>
		{/if}
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
				{dayjs.duration(parseInt(((track.maxValue - track.minValue) * 1000).toString())).format("s.SSS") + " seconds"}
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
