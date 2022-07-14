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
		if (provider) {
			if (provider.name === "google" && location?.href && location.href.split("access_token=").length > 1 && location.href.includes("google")) {
				const provider = "google";
				const token = location.href.split("access_token=")[1].split("&")[0];
				dispatch("oauthFlowInit", { provider, token });
			}
			if (
				provider.name === "github" &&
				location?.href &&
				location.href.includes("code=") &&
				location.href.includes("provider=") &&
				location.href.split("provider=")[1].split("&")[0] === "github"
			) {
				const provider = "github";
				const token = location.href.split("code=")[1].split("&")[0];
				dispatch("oauthFlowInit", { provider, token, tmpCode: token });
			}
			if (
				provider.name === "facebook" &&
				location?.href &&
				location.href.includes("code=") &&
				location.href.includes("provider=") &&
				location.href.split("provider=")[1].split("&")[0] === "facebook"
			) {
				const provider = "facebook";
				const token = location.href.split("code=")[1].split("&")[0];
				const state = location.href.split("state=")[1].split("&")[0];
				dispatch("oauthFlowInit", {
					provider,
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
			if (
				provider.name === "twitter" &&
				location?.href &&
				location.href.includes("code=") &&
				location.href.includes("provider=") &&
				location.href.split("provider=")[1].split("&")[0] === "twitter"
			) {
				const provider = "twitter";
				const token = location.href.split("code=")[1].split("&")[0];
				const state = location.href.split("state=")[1].split("&")[0];
				// TODO: to be completed
				dispatch("oauthFlowInit", {
					provider,
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
			if (
				provider.name === "gitlab" &&
				location?.href &&
				location.href.includes("provider=") &&
				location.href.includes("code=") &&
				location.href.split("provider=")[1].split("&")[0] === "gitlab"
			) {
				const provider = "gitlab";
				const token = location.href.split("code=")[1].split("&")[0];
				const state = location.href.split("state=")[1].split("&")[0];
				dispatch("oauthFlowInit", {
					provider,
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

	async function socialLogin() {
		if (!provider?.name || (!provider.uri && !provider.params)) return console.error("Provider not defined");
		if (provider.uri) {
			location.href = provider.uri;
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
				case "twitter":
					url = `https://gitlab.com/oauth/authorize?scope=${provider.params.scope}&response_type=code&state=${new Date().valueOf()}&client_id=${
						provider.params.client_id
					}&redirect_uri=${provider.params.redirect_url}/login?provider=gitlab`;
					break;
				default:
					return console.error("no provider uri composed for " + provider.name);
			}
			if (url) {
				if (provider.name === "twitter") {
					try {
						const getAuth = await fetch("https://api.twitter.com/oauth/request_token ", {
							method: "POST",
							headers: { "Content-Type": "application/json" },
						});
						if (getAuth.ok) {
							const authToken = await getAuth.json();

							throw new Error("todo");
						} else {
							throw new Error("Error getting auth token");
						}
					} catch (e) {
						console.error(e);
					}
				}
				location.href = url;
			} else {
				return console.error("no provider url obtained!?", provider);
			}
		} else {
			console.error("no provider uri or params defined for " + provider.name);
		}
	}

	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();

	function dispatch(name, detail) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}
</script>

<div
	on:click={() => {
		socialLogin();
	}}
>
	<slot>btn</slot>
</div>

<style lang="scss">
</style>
