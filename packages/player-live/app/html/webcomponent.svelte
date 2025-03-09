<svelte:options tag="hb-player-live" />

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
	// import { onMount } from "svelte";
	// import { get_current_component } from "svelte/internal";

	import Hls from "hls.js";
	import { onDestroy, onMount } from "svelte";
	import { createEventDispatcher, current_component, get_current_component } from "svelte/internal";
	import type { Component } from "@app/types/webcomponent.type";
	import WebrtcPlayer from "simple-webrtc-element";
	import WebrtcWhepPlayer from "simple-webrtc-element-whep";

	export let mediauri: string;
	export let id: string;
	export let forcecover: string;
	export let media_type: Component["media_type"];
	export let no_controls: boolean;

	export let replacewithtext: {
		title: string;
		subtitle: string;
		text: string;
	};
	if (!id) id = null;
	// const component = get_current_component();
	let timeo: number;
	let isLive: boolean;
	let webrtcPlayer: WebrtcPlayer;
	let webrtcWhepPlayer: WebrtcWhepPlayer;
	let htmlVideo: HTMLVideoElement;
	$: {
		if (no_controls && (no_controls as any) !== "no" && (no_controls as any) !== "false") {
			no_controls = true;
		} else {
			no_controls = false;
		}
		if (!mediauri) {
			mediauri = null;
		}
		if (!forcecover) {
			forcecover = null;
		}

		if (!replacewithtext) {
			replacewithtext = null;
		} else {
			try {
				replacewithtext = JSON.parse(replacewithtext as any as string);
			} catch (err) {}
		}
		// if (media_type === "webrtc" && mediauri) {
		// 	webrtcPlayer = new WebrtcPlayer(component.shadowRoot.querySelector("video"), mediauri);
		// } else {
		// 	webrtcPlayer = null;
		// }
	}

	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();
	function dispatch(name: string, detail: any) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}
	function setVideo(videoElement: HTMLVideoElement) {
		console.log("setttviiiii", media_type);
		htmlVideo = videoElement;
		dispatch("htmlVideoInit", { htmlVideoElement: htmlVideo, id });

		if (media_type === "hls") {
			if (videoElement && Hls.isSupported()) {
				const hls = new Hls({});
				hls.loadSource(mediauri);
				hls.attachMedia(videoElement);
				hls.on(Hls.Events.MEDIA_ATTACHED, function () {
					videoElement.muted = true;
					try {
						videoElement.play();
					} catch (err) {
						console.error("cannot autoplay", err);
					}
				});
			}
			// hls.js is not supported on platforms that do not have Media Source Extensions (MSE) enabled.
			// When the browser has built-in HLS support (check using `canPlayType`), we can provide an HLS manifest (i.e. .m3u8 URL) directly to the video element throught the `src` property.
			// This is using the built-in support of the plain video element, without using hls.js.
			else if (videoElement?.canPlayType("application/vnd.apple.mpegurl")) {
				console.log(`without Media Source Extensions`);
				videoElement.src = mediauri;
				videoElement.muted = true;

				videoElement.addEventListener("canplay", function () {
					try {
						videoElement.play();
					} catch (err) {
						console.error("cannot autoplay", err);
					}
				});
			} else {
				console.error("no hls support");
			}
		} else if (media_type === "whep") {
			console.info("whep", mediauri);
			try {
				function onOffline() {
					console.info("offline whep");

					dispatch("liveStatus", { live: false, id });
					isLive = false;
				}
				function onOnline() {
					console.info("online whep");
					dispatch("liveStatus", { live: true, id });
					isLive = true;
				}
				console.info("whep", mediauri);
				webrtcWhepPlayer = new WebrtcWhepPlayer({ videoElement, whepUri: mediauri, onOnline, onOffline });
				try {
					videoElement.muted = true;
					videoElement.play();
				} catch (err) {
					console.error("cannot autoplay whep", err);
				}
			} catch (err) {
				console.error("whep error ....", err);
			}
		} else if (media_type === "webrtc") {
			console.info("webrtc", mediauri);
			try {
				function onOffline() {
					dispatch("liveStatus", { live: false, id });
					isLive = false;
				}
				function onOnline() {
					dispatch("liveStatus", { live: true, id });
					isLive = true;
				}
				webrtcPlayer = new WebrtcPlayer({ videoElement, wsUri: mediauri, onOnline, onOffline });
				webrtcPlayer.start();
				try {
					videoElement.muted = true;
					videoElement.play();
				} catch (err) {
					console.error("cannot autoplay webrtc", err);
				}
			} catch (err) {
				console.error("webrtc error ....", err);
			}
		} else {
			console.error("unknown media type", media_type);
		}
	}

	async function loadLive() {
		function relo() {
			console.log("reloading", isLive, mediauri);
			if (!isLive || !mediauri)
				loadLive().catch((err) => {
					console.error("reload uri", err);
				});
		}
		try {
			if (!mediauri) {
				timeo = setTimeout(relo, 5000);
				return;
			}
			if (media_type === "hls") {
				console.info("checking live");
				const res = await fetch(mediauri);
				if (!res || (res.status && (res.status > 299 || res.status < 199))) throw new Error("wrong uri");

				isLive = true;
				dispatch("liveStatus", { live: true, id });
			} else {
				throw new Error("wrong media type");
			}
		} catch (err) {
			if (isLive !== false) dispatch("liveStatus", { live: false, id });
			isLive = false;

			timeo = setTimeout(relo, 5000);
		}

		return;
	}
	component.getVideoElement = () => {
		if (htmlVideo) {
			return htmlVideo;
		}
	};

	onMount(() => {
		loadLive()
			.catch(() => {
				console.error("merr");
				// return timeo ? clearTimeout(timeo) : undefined;
			})
			.then(() => {
				console.log("start live checker");

				// return timeo ? clearTimeout(timeo) : undefined;
			});
		return () => {
			console.log("destroying player");
			if (timeo) {
				console.log("destroy live checker");
				clearTimeout(timeo);
			}
			if (webrtcWhepPlayer) {
				webrtcWhepPlayer.pc.close();
				webrtcWhepPlayer.pc = null;
				fetch(webrtcWhepPlayer.sessionUrl, {
					method: "DELETE",
				});
			}
		};
	});

	// onMount(async () => {
	// 	setVideo();
	// });
</script>

<!-- svelte-ignore a11y-media-has-caption -->
<div part="container" style="width: 100%;position:relative">
	{#if mediauri && media_type}
		<video id="video" controls={no_controls ? false : true} part="video" use:setVideo class="video" autoplay />
	{/if}
	{#if forcecover || (mediauri && !isLive && (replacewithtext?.title || replacewithtext?.subtitle || replacewithtext?.text))}
		<div part="replacewithtext" class="replacetext video">
			{#if replacewithtext?.title && replacewithtext?.subtitle && replacewithtext?.text}
				<slot name="replacewithtext">
					<div style="flex: 1">
						<div class="subsection">
							<div><slot name="replacetitle">{replacewithtext?.title || ""}</slot></div>
						</div>
					</div>
					<div style="flex:1">
						<div class="subsection">
							<div style="flex:1">
								<div class="subsection">
									<div><slot name="replacesubtitle">{replacewithtext?.subtitle || ""}</slot></div>
								</div>
							</div>
							<div style="flex:1">
								<div class="subsection">
									<div><slot name="replacetext">{replacewithtext?.text || ""}</slot></div>
								</div>
							</div>
						</div>
					</div>
				</slot>
			{:else if replacewithtext?.title && replacewithtext?.subtitle}
				<slot name="replacewithtext">
					<div style="flex: 1">
						<div class="subsection">
							<div><slot name="replacetitle">{replacewithtext?.title || ""}</slot></div>
						</div>
					</div>
					<div style="flex:1">
						<div class="subsection">
							<div style="flex:1">
								<div class="subsection">
									<div><slot name="replacesubtitle">{replacewithtext?.subtitle || ""}</slot></div>
								</div>
							</div>
						</div>
					</div>
				</slot>
			{:else if replacewithtext?.title}
				<slot name="replacewithtext">
					<div style="flex: 1">
						<div class="subsection">
							<div><slot name="replacetitle">{replacewithtext?.title || ""}</slot></div>
						</div>
					</div>
				</slot>
			{/if}
		</div>
	{:else if mediauri && !isLive && (!replacewithtext || (!replacewithtext.title && !replacewithtext.subtitle && !replacewithtext.text))}
		<div class="replacetext video" part="replacewithtext">offline</div>
	{:else if !mediauri}
		<div class="replacetext video" part="replacewithtext">nouri</div>
	{/if}
</div>

<style lang="scss">
	@import "../styles/webcomponent.scss";
</style>
