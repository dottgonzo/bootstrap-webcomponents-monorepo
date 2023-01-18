<svelte:options tag="hb-player-input-streaming" />

<script lang="ts">
	import { get_current_component, onDestroy, onMount } from "svelte/internal";

	import { createEventDispatcher } from "svelte";
	import parseStyle from "style-to-object";
	import { addComponent, getChildStyleToPass } from "@htmlbricks/hb-jsutils/main";
	import type { Component } from "@app/types/webcomponent.type";

	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();

	function dispatch(name, detail) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}

	export let id: string;
	export let style: string;

	let videoElement: HTMLVideoElement;

	let isPlaying: boolean = false;
	let isVideoEnabled = true;
	let isAudioEnabled = true;
	let currentTime = 0;

	let parsedStyle: { [x: string]: string };
	//  let componentStyleToSet: string = "";

	$: {
		if (!id) id = "";
		if (style) {
			parsedStyle = parseStyle(style);
			// componentStyleToSet = getChildStyleToPass(parsedStyle, componentStyleSetup?.vars);
		}
	}
	videoElement = component;

	async function garantAccessToCamera() {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
			console.info(`access to camera granted`);
			dispatch("AudioVideoAccess", { granted: true, id });
			videoElement = component.shadowRoot.querySelector("video");
			videoElement.srcObject = stream;
			videoElement.play();
			dispatch("VideoInitialized", { videoElement, id });
		} catch (error) {
			console.error("error on garantAccessToCamera", error);
			dispatch("AudioVideoAccess", { granted: false, id });

			throw new Error("camera access denied");
		}
	}

	function dispatchCustomEvent() {
		dispatch("event", { test: true });
	}
	garantAccessToCamera()
		.then(() => {
			console.log("camera initialized");
		})
		.catch((err) => {
			console.log("camera access denied", err);
		});
</script>

<div class="container">
	<video
		id="video"
		on:play={() => {
			isPlaying = true;
		}}
		on:pause={() => {
			isPlaying = false;
		}}
		on:timeupdate={() => {
			currentTime = videoElement.currentTime;
		}}
	>
		<track kind="captions" />
	</video>
	<div>
		{currentTime}<button
			on:click={() => {
				isPlaying ? videoElement.pause() : videoElement.play();
			}}>{isPlaying ? "pause" : "play"}</button
		>
		<button
			on:click={() => {
				videoElement.requestFullscreen();
			}}>FH</button
		>
		<button
			on:click={() => {
				//videoElement.srcObject.getVideoTracks()[0].enabled = true;

				videoElement.srcObject
					.getTracks()
					.filter((f) => f.kind === "video")
					.forEach((track) => {
						isVideoEnabled = !track.enabled;
						track.enabled = isVideoEnabled;
					});
			}}>{isVideoEnabled ? "remove" : "add"} video</button
		>
		<button
			on:click={() => {
				videoElement.srcObject
					.getTracks()
					.filter((f) => f.kind === "audio")
					.forEach((track) => {
						isAudioEnabled = !track.enabled;
						track.enabled = isAudioEnabled;
					});
			}}>{isAudioEnabled ? "remove" : "add"} audio</button
		>
	</div>
</div>

<style lang="scss">
	@import "../styles/webcomponent.scss";
	// @import "../styles/bootstrap.scss";
</style>
