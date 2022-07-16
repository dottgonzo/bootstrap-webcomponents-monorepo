<svelte:options tag="hb-auth-social-login-button" />

<script lang="ts">
	/**
	 * Svelte Video Login/Register/Forget Password WebComponent
	 * =====================
	 *
	 * @contributors: Dario Caruso <dev@dariocaruso.info> (https://dariocaruso.info)
	 *
	 * @license: MIT License
	 *
	 */

	import type { Component } from "@app/types/webcomponent.type";
	// import "@fortawesome/fontawesome-free";
	import { createEventDispatcher } from "svelte";
	import { get_current_component, onMount } from "svelte/internal";
	export let id: string;
	export let provider: Component["provider"];

	$: {
		if (!id) {
			id = null;
		}

		if (typeof provider === "string") {
			try {
				provider = JSON.parse(provider);
			} catch (error) {
				console.error(error);
			}
		}
	}

	async function socialLogin() {
		if (!provider?.name || (!provider.url && !provider.params)) return console.error("Provider not defined");
		if (provider.url) {
			location.href = provider.url;
		} else if (provider.params?.client_id && provider.params.redirect_url) {
			if (!provider.params.client_id || !provider.params.redirect_url) return console.error("Missing client_id or redirect_url in oauth2ProvidersObj");
			let url: string;
			switch (provider.name) {
				case "google":
					url = `https://accounts.google.com/o/oauth2/v2/auth?scope=${provider.params.scope}&include_granted_scopes=true&response_type=token&state=state_parameter_passthrough_value&redirect_uri=${provider.params.redirect_url}/login&client_id=${provider.params.client_id}`;
					break;
				case "github":
					url = `https://github.com/login/oauth/authorize?scope=${provider.params.scope}&client_id=${provider.params.client_id}&redirect_uri=${provider.params.redirect_url}/login?provider=github`;
					break;
				case "gitlab":
					url = `https://gitlab.com/oauth/authorize?scope=${provider.params.scope}&response_type=code&state=${new Date().valueOf()}&client_id=${
						provider.params.client_id
					}&redirect_uri=${provider.params.redirect_url}/login?provider=gitlab`;
					break;
				case "facebook":
					url = `https://gitlab.com/oauth/authorize?scope=${provider.params.scope}&response_type=code&state=${new Date().valueOf()}&client_id=${
						provider.params.client_id
					}&redirect_uri=${provider.params.redirect_url}/login?provider=gitlab`;
					break;
				// case "twitter":
				// 	url = `https://gitlab.com/oauth/authorize?scope=${provider.params.scope}&response_type=code&state=${new Date().valueOf()}&client_id=${
				// 		provider.params.client_id
				// 	}&redirect_uri=${provider.params.redirect_url}/login?provider=gitlab`;
				// 	break;
				default:
					return console.error("no provider uri composed for " + provider.name);
			}
			if (url) {
				// if (provider.name === "twitter") {
				// 	try {
				// 		const getAuth = await fetch("https://api.twitter.com/oauth/request_token ", {
				// 			method: "POST",
				// 			headers: { "Content-Type": "application/json" },
				// 		});
				// 		if (getAuth.ok) {
				// 			const authToken = await getAuth.json();

				// 			throw new Error("todo");
				// 		} else {
				// 			throw new Error("Error getting auth token");
				// 		}
				// 	} catch (e) {
				// 		console.error(e);
				// 	}
				// }
				location.href = url;
			} else {
				return console.error("no provider url obtained!?", provider);
			}
		} else {
			console.warn("no provider uri or params defined for " + provider.name);
			dispatch("oauthFlowCustom", {
				provider: provider.name,
			});
		}
	}

	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();

	function dispatch(name, detail) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}
	function detectByUri() {
		if (provider?.name) {
			if (provider.name === "google" && location?.href && location.href.split("access_token=").length > 1 && location.href.includes("google")) {
				const token = location.href.split("access_token=")[1].split("&")[0];
				dispatch("oauthFlowInit", { provider: provider.name, token });
			}
			if (
				provider.name === "github" &&
				location?.href &&
				location.href.includes("code=") &&
				location.href.includes("provider=") &&
				location.href.split("provider=")[1].split("&")[0] === "github"
			) {
				const token = location.href.split("code=")[1].split("&")[0];
				dispatch("oauthFlowInit", { provider: provider.name, token, tmpCode: token });
			}
			if (
				provider.name === "facebook" &&
				location?.href &&
				location.href.includes("code=") &&
				location.href.includes("provider=") &&
				location.href.split("provider=")[1].split("&")[0] === "facebook"
			) {
				const token = location.href.split("code=")[1].split("&")[0];
				const state = location.href.split("state=")[1].split("&")[0];
				dispatch("oauthFlowInit", {
					provider: provider.name,
					token,
					tmpCode: token,
					redirect_uri: location.href
						.replace("&state=", "")
						.replace("?state=", "")
						.replace("&code=", "")
						.replace("?code=", "")
						.replace(token, "")
						.replace(state, ""),
				});
			}
			// if (
			// 	provider.name === "twitter" &&
			// 	location?.href &&
			// 	location.href.includes("code=") &&
			// 	location.href.includes("provider=") &&
			// 	location.href.split("provider=")[1].split("&")[0] === "twitter"
			// ) {
			// 	const provider = "twitter";
			// 	const token = location.href.split("code=")[1].split("&")[0];
			// 	const state = location.href.split("state=")[1].split("&")[0];
			// 	// TODO: to be completed
			// 	dispatch("oauthFlowInit", {
			// 		provider,
			// 		token,
			// 		tmpCode: token,
			// 		redirect_uri: location.href
			// 			.replace("&state=", "")
			// 			.replace("?state=", "")
			// 			.replace("&code=", "")
			// 			.replace("?code=", "")
			// 			.replace(token, "")
			// 			.replace(state, ""),
			// 	});
			// }
			if (
				provider.name === "gitlab" &&
				location?.href &&
				location.href.includes("provider=") &&
				location.href.includes("code=") &&
				location.href.split("provider=")[1].split("&")[0] === "gitlab"
			) {
				const token = location.href.split("code=")[1].split("&")[0];
				const state = location.href.split("state=")[1].split("&")[0];
				dispatch("oauthFlowInit", {
					provider: provider.name,
					token,
					tmpCode: token,
					redirect_uri: location.href
						.replace("&state=", "")
						.replace("?state=", "")
						.replace("&code=", "")
						.replace("?code=", "")
						.replace(token, "")
						.replace(state, ""),
				});
			}
		}
	}
	onMount(() => {
		detectByUri();
	});
</script>

<svelte:head>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css" />
</svelte:head>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css" />

<div id="icon">
	<div
		id="icon-content"
		on:click={() => {
			socialLogin();
		}}
	>
		<slot>
			{#if provider?.name === "gitlab"}
				<svg viewBox="-.1 .5 960.2 923.9" width="100%" xmlns="http://www.w3.org/2000/svg"
					><path
						d="m958.9 442.4c1.1 26.1-2 52.1-9.2 77.2-7.1 25.1-18.3 48.8-33.1 70.3a240.43 240.43 0 0 1 -53.6 56.2l-.5.4-199.9 149.8-98.3 74.5-59.9 45.2c-3.5 2.7-7.4 4.7-11.5 6.1s-8.5 2.1-12.9 2.1c-4.3 0-8.7-.7-12.8-2.1s-8-3.4-11.5-6.1l-59.9-45.2-98.3-74.5-198.7-148.9-1.2-.8-.4-.4c-20.9-15.7-39-34.7-53.8-56.2s-26-45.3-33.2-70.4c-7.2-25.1-10.3-51.2-9.2-77.3 1.2-26.1 6.5-51.8 15.8-76.2l1.3-3.5 130.7-340.5q1-2.5 2.4-4.8 1.3-2.3 3.1-4.3 1.7-2.1 3.7-3.9 2-1.7 4.2-3.2c3.1-1.9 6.3-3.3 9.8-4.1 3.4-.9 7-1.3 10.5-1.1 3.6.2 7.1.9 10.4 2.2 3.3 1.2 6.5 3 9.3 5.2q2 1.7 3.9 3.6 1.8 2 3.2 4.3 1.5 2.2 2.6 4.7 1.1 2.4 1.8 5l88.1 269.7h356.6l88.1-269.7q.7-2.6 1.9-5 1.1-2.4 2.6-4.7 1.4-2.2 3.2-4.2 1.8-2 3.9-3.7c2.8-2.2 5.9-3.9 9.2-5.2 3.4-1.2 6.9-1.9 10.4-2.1 3.6-.2 7.1.1 10.6 1 3.4.9 6.7 2.3 9.7 4.2q2.3 1.4 4.3 3.2 2 1.7 3.7 3.8 1.7 2.1 3.1 4.4 1.3 2.3 2.3 4.8l130.5 340.6 1.3 3.5c9.3 24.3 14.6 50 15.7 76.1z"
						fill="#e24329"
					/><path
						d="m959 442.5c1.1 26-2 52.1-9.2 77.2s-18.4 48.9-33.2 70.4-32.9 40.5-53.7 56.2l-.5.4-199.9 149.8s-84.9-64.1-182.5-138l286.5-216.8c12.9-9.7 26.4-18.6 40.3-26.8 13.9-8.3 28.3-15.7 43-22.3 14.8-6.6 29.9-12.5 45.2-17.4 15.4-5 31-9.1 46.9-12.4l1.3 3.5c9.3 24.4 14.6 50.1 15.8 76.2z"
						fill="#fc6d26"
					/><path
						d="m480 658.5c97.6 73.7 182.6 138 182.6 138l-98.3 74.5-59.9 45.2c-3.5 2.7-7.4 4.7-11.5 6.1s-8.5 2.1-12.9 2.1c-4.3 0-8.7-.7-12.8-2.1s-8-3.4-11.5-6.1l-59.9-45.2-98.3-74.5s84.9-64.3 182.5-138z"
						fill="#fca326"
					/><path
						d="m480 658.3c-97.7 73.9-182.5 138-182.5 138l-198.7-148.9-1.2-.8-.4-.4c-20.9-15.7-39-34.7-53.8-56.2s-26-45.3-33.2-70.4c-7.2-25.1-10.3-51.2-9.2-77.3 1.2-26.1 6.5-51.8 15.8-76.2l1.3-3.5c15.9 3.3 31.5 7.4 46.9 12.4 15.3 5 30.4 10.8 45.2 17.5 14.7 6.6 29.1 14.1 43 22.3s27.3 17.2 40.3 26.9z"
						fill="#fc6d26"
					/></svg
				>
			{:else if provider?.name === "github"}
				<svg width="100%" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
						transform="scale(64)"
						fill="#1B1F23"
					/>
				</svg>
			{:else if provider?.name === "facebook"}
				<svg
					id="Layer_1"
					data-name="Layer 1"
					xmlns="http://www.w3.org/2000/svg"
					width="100%"
					xmlns:xlink="http://www.w3.org/1999/xlink"
					viewBox="0 0 287.56 191"
					><defs
						><style>
							.cls-1 {
								fill: #0081fb;
							}
							.cls-2 {
								fill: url(#linear-gradient);
							}
							.cls-3 {
								fill: url(#linear-gradient-2);
							}
						</style><linearGradient
							id="linear-gradient"
							x1="62.34"
							y1="101.45"
							x2="260.34"
							y2="91.45"
							gradientTransform="matrix(1, 0, 0, -1, 0, 192)"
							gradientUnits="userSpaceOnUse"
							><stop offset="0" stop-color="#0064e1" /><stop offset="0.4" stop-color="#0064e1" /><stop offset="0.83" stop-color="#0073ee" /><stop
								offset="1"
								stop-color="#0082fb"
							/></linearGradient
						><linearGradient
							id="linear-gradient-2"
							x1="41.42"
							y1="53"
							x2="41.42"
							y2="126"
							gradientTransform="matrix(1, 0, 0, -1, 0, 192)"
							gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#0082fb" /><stop offset="1" stop-color="#0064e0" /></linearGradient
						></defs
					><title>facebook-meta</title><path
						class="cls-1"
						d="M31.06,126c0,11,2.41,19.41,5.56,24.51A19,19,0,0,0,53.19,160c8.1,0,15.51-2,29.79-21.76,11.44-15.83,24.92-38,34-52l15.36-23.6c10.67-16.39,23-34.61,37.18-47C181.07,5.6,193.54,0,206.09,0c21.07,0,41.14,12.21,56.5,35.11,16.81,25.08,25,56.67,25,89.27,0,19.38-3.82,33.62-10.32,44.87C271,180.13,258.72,191,238.13,191V160c17.63,0,22-16.2,22-34.74,0-26.42-6.16-55.74-19.73-76.69-9.63-14.86-22.11-23.94-35.84-23.94-14.85,0-26.8,11.2-40.23,31.17-7.14,10.61-14.47,23.54-22.7,38.13l-9.06,16c-18.2,32.27-22.81,39.62-31.91,51.75C84.74,183,71.12,191,53.19,191c-21.27,0-34.72-9.21-43-23.09C3.34,156.6,0,141.76,0,124.85Z"
					/><path
						class="cls-2"
						d="M24.49,37.3C38.73,15.35,59.28,0,82.85,0c13.65,0,27.22,4,41.39,15.61,15.5,12.65,32,33.48,52.63,67.81l7.39,12.32c17.84,29.72,28,45,33.93,52.22,7.64,9.26,13,12,19.94,12,17.63,0,22-16.2,22-34.74l27.4-.86c0,19.38-3.82,33.62-10.32,44.87C271,180.13,258.72,191,238.13,191c-12.8,0-24.14-2.78-36.68-14.61-9.64-9.08-20.91-25.21-29.58-39.71L146.08,93.6c-12.94-21.62-24.81-37.74-31.68-45C107,40.71,97.51,31.23,82.35,31.23c-12.27,0-22.69,8.61-31.41,21.78Z"
					/><path
						class="cls-3"
						d="M82.35,31.23c-12.27,0-22.69,8.61-31.41,21.78C38.61,71.62,31.06,99.34,31.06,126c0,11,2.41,19.41,5.56,24.51L10.14,167.91C3.34,156.6,0,141.76,0,124.85,0,94.1,8.44,62.05,24.49,37.3,38.73,15.35,59.28,0,82.85,0Z"
					/></svg
				>
			{:else if provider?.name === "google"}
				<svg viewBox="0 0 24 24" width="100%" xmlns="http://www.w3.org/2000/svg">
					<g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
						<path
							fill="#4285F4"
							d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
						/>
						<path
							fill="#34A853"
							d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
						/>
						<path
							fill="#FBBC05"
							d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
						/>
						<path
							fill="#EA4335"
							d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
						/>
					</g>
				</svg>
			{:else}
				btn
			{/if}
		</slot>
	</div>
</div>

<style lang="scss">
	#icon {
		width: 100%;
		height: 100%;
		position: relative;
	}
	#icon-content {
		margin: 0;
		position: absolute;
		top: 50%;
		-ms-transform: translateY(-50%);
		transform: translateY(-50%);
	}
	:host {
		width: 40px;
		height: 40px;
		display: block;
		padding: 10px;
	}
</style>
