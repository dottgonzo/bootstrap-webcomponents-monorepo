<svelte:options tag="hb-captcha-google-recaptcha-v2-invisible" />

<script lang="ts">
	import { get_current_component, onMount } from "svelte/internal";
	import { createEventDispatcher } from "svelte";

	export let api_key: string;
	export let get: any;
	const elementLabel = "recaptchav2";
	const scriptSdk = elementLabel + "-sdk";
	const elementId = elementLabel + "-element";
	let grecaptcha: any;
	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();
	function dispatch(name, detail) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}
	let isJustRendered = false;
	let isJustRenderedRightNow = false;
	let isJustExecuted = false;

	function renderCaptcha() {
		if (!grecaptcha) return console.error("no captcha util loaded");

		grecaptcha.render(elementId, {
			sitekey: api_key,
			callback: (response) => {
				console.log("googleRecaptchaV2Response", response);
				isJustExecuted = true;
				dispatch("googleRecaptchaV2Response", { response });
			},
		});
		dispatch("googleRecaptchaRendered", { render: true });
		isJustRendered = true;
	}
	function execCaptcha() {
		if (!grecaptcha) return console.error("no captcha util loaded");
		if (!isJustExecuted) return grecaptcha.execute();
		console.info("resetting captcha");
		grecaptcha.reset();
		grecaptcha.execute();
	}
	let i = 0;
	$: {
		console.log("render " + i, get);
		i++;
		if (isJustRendered && isJustRenderedRightNow && get !== null) {
			console.info("executing recaptcha another time");
			execCaptcha();
		} else if (isJustRendered) {
			isJustRenderedRightNow = true;
		}
		// if (!api_key) api_key = undefined;
		// if (api_key && grecaptcha) {
		// 	if (status.rendered) {
		// 		if (status.immediate) {
		// 			grecaptcha.execute(api_key);
		// 		}
		// 	} else if (status.immediate || status.visible) {
		// 		grecaptcha.render(elementId, {
		// 			sitekey: api_key,
		// 			callback: (response) => {
		// 				console.log("googleRecaptchaV2Response", response);
		// 				dispatch("googleRecaptchaV2Response", { response });
		// 			},
		// 		});
		// 	}
		// }
		// 	grecaptcha.execute().then(()=>{
		// 	}).catch(()=>{
		// 	})
		// } else if(api_key&&grecaptcha&&status.immediate){
		// } else if(api_key&&grecaptcha&&status.visible){
		// }
	}
	onMount(() => {
		if (!document.getElementById(elementId) && !grecaptcha) {
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
		if (!document.getElementById(scriptSdk) && !grecaptcha) {
			const script = document.createElement("script");
			script.id = scriptSdk;
			script.async = true;
			script.defer = true;
			script.src = `https://www.google.com/recaptcha/api.js?render=explicit`;
			document.head.appendChild(script);
		}
		// recaptchaElement = component.shadowRoot.getElementById("recaptchav2");
		// if (recaptchaElement) {
		let rechecker: number;
		function recheck(timer: number) {
			if (grecaptcha) return;

			rechecker = setTimeout(() => {
				if (api_key) {
					grecaptcha = window["grecaptcha"];

					if (grecaptcha) {
						// if render
						try {
							console.info("using recaptcha api key:", api_key);
							renderCaptcha();
							execCaptcha();
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
			window["grecaptcha"] = undefined;
			// window.removeEventListener("resize", recheckSize);
		};
	});
</script>

<style lang="scss">
	// @import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
</style>
