<svelte:options tag="hb-input-captcha-google-v2" />

<script lang="ts">
	import { get_current_component, onMount } from "svelte/internal";
	import { createEventDispatcher } from "svelte";
	import type { FormSchemaEntry } from "@app/types/webcomponent.type";
	export let setvalue: boolean;
	export let setvalid: boolean;
	export let showvalidation: "yes" | "no";

	export let schemaentry: FormSchemaEntry;

	let value: boolean;

	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();
	function dispatch(name, detail) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}
	let recaptchaElement: HTMLElement;
	$: {
		if (!showvalidation) showvalidation = "no";

		if (schemaentry && typeof schemaentry === "string") {
			schemaentry = JSON.parse(schemaentry as unknown as string);
		}
		if (!setvalue && (setvalue as unknown as string) === "no") {
			setvalue = false;
		} else {
			setvalue = true;
		}
		if (!setvalid && (setvalid as unknown as string) === "no") {
			setvalid = false;
		} else {
			setvalid = true;
		}

		value = value != null ? value : !!schemaentry?.value;
		setTimeout(() => {
			if (setvalue) dispatch("setValue", { value, id: schemaentry?.id });
			if (setvalid) dispatch("setValid", true);
		}, 0);
	}
	onMount(() => {
		const scriptId = "recaptchav2-script";

		if (!document.getElementById(scriptId)) {
			const script = document.createElement("script");
			script.id = scriptId;
			script.async = true;
			script.defer = true;
			script.src = `https://www.google.com/recaptcha/api.js`;
			document.head.appendChild(script);
		}
		recaptchaElement = component.shadowRoot.getElementById("recaptchav2");
		if (recaptchaElement) {
			let grecaptcha;
			let attempts = 0;
			function recheck(timer: number) {
				if (attempts > 10 || grecaptcha) return;
				attempts++;

				setTimeout(() => {
					grecaptcha = window["grecaptcha"];
					if (grecaptcha) {
						try {
							const apiKey = schemaentry?.params?.apiKey || "your_site_key";
							console.info("using api key:", apiKey);
							const capth = grecaptcha.render(recaptchaElement, {
								sitekey: apiKey,
							});
							console.log(capth);
							setTimeout(() => {
								if (grecaptcha.getResponse().length == 0) {
									alert("Please click the reCAPTCHA checkbox");
									parent.postMessage("captcha failed", location.origin);
									return false;
								}
							}, 15000);
						} catch (err) {
							console.log("grecaptcha error", err);
						}
					} else {
						recheck(2000);
						console.error("Captcha utils not loaded");
					}
				}, timer);
			}
			recheck(1000);
		} else {
			console.error("Recaptcha element not found");
		}
	});
</script>

<div id="recaptchav2" class="g-recaptcha" data-callback={() => console.log("cbbbbbbb")} />

<style lang="scss">
	// @import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
</style>
