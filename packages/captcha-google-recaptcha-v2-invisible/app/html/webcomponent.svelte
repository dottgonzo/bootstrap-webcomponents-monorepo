<svelte:options tag="hb-captcha-google-recaptcha-v2-invisible" />

<script lang="ts">
	import { get_current_component, onMount } from "svelte/internal";
	import { createEventDispatcher } from "svelte";

	export let api_key: string;

	const elementLabel = "recaptchav2";
	const scriptSdk = elementLabel + "-sdk";
	const elementId = elementLabel + "-element";
	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();
	function dispatch(name, detail) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}
	$: {
		if (!api_key) api_key = undefined;
	}
	onMount(() => {
		if (!document.getElementById(elementId)) {
			const div = document.createElement("div");
			div.id = elementId;
			// div.className = "g-recaptcha";
			div.setAttribute("data-size", "invisible");
			// div.setAttribute("sitekey", schemaentry?.params?.apiKey || "your_site_key");
			document.body.appendChild(div);
		}

		// if (!document.getElementById(scriptId)) {
		// 	const script = document.createElement("script");

		// 	document.head.appendChild(script);
		// }
		if (!document.getElementById(scriptSdk)) {
			const script = document.createElement("script");
			script.id = scriptSdk;
			script.async = true;
			script.defer = true;
			script.src = `https://www.google.com/recaptcha/api.js?render=explicit`;
			document.head.appendChild(script);
		}
		// recaptchaElement = component.shadowRoot.getElementById("recaptchav2");
		// if (recaptchaElement) {
		let grecaptcha;
		let rechecker: number;
		function recheck(timer: number) {
			if (grecaptcha) return;

			rechecker = setTimeout(() => {
				if (api_key) {
					grecaptcha = window["grecaptcha"];

					if (grecaptcha) {
						try {
							console.info("using recaptcha api key:", api_key);
							grecaptcha.render(elementId, {
								sitekey: api_key,
								callback: (response) => {
									console.log("googleRecaptchaV2Response", response);
									dispatch("googleRecaptchaV2Response", { response });
								},
							});
							setTimeout(() => grecaptcha.execute(), 1000); // seems that this is a promise and return the response as the callback does
						} catch (err) {
							console.log("grecaptcha error", err);
						}
					} else {
						recheck(2000);
						console.error("Captcha utils not loaded");
					}
				} else {
					recheck(2000);
					console.error("no api key");
				}
			}, timer);
		}
		recheck(1000);
		// } else {
		// 	console.error("Recaptcha element not found");
		// }
		return () => {
			if (rechecker) clearTimeout(rechecker);
			if (document.getElementById(scriptSdk)) {
				const script = document.getElementById(scriptSdk);
				script.remove();
			}
			if (document.getElementById(elementId)) {
				const element = document.getElementById(elementId);
				element.remove();
			}
			// window.removeEventListener("resize", recheckSize);
		};
	});
</script>

cap

<style lang="scss">
	// @import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
</style>
