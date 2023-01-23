<svelte:options tag="hb-form-contact" />

<script lang="ts">
	import { createEventDispatcher, onMount, beforeUpdate, afterUpdate } from "svelte";
	import { get_current_component } from "svelte/internal";
	import { fly, fade } from "svelte/transition";
	import { addComponent, getChildStyleToPass } from "@htmlbricks/hb-jsutils/main";
	import pkg from "../../package.json";
	import { styleSetup as formStyleSetup } from "../../node_modules/@htmlbricks/hb-form/release/docs";
	import type { Component as FormComponent } from "../../../form/app/types/webcomponent.type";
	import parseStyle from "style-to-object";
	import type { Component } from "../types/webcomponent.type";

	interface keyable {
		[key: string]: any;
	}
	let formStyleToSet: string = "";
	let parsedStyle: { [x: string]: string };

	export let id: string;
	export let style: string;

	// export let action: string = window.location.href;
	// export let method: string = "POST";
	// export let fromkey: string = "from";
	// export let subjectkey: string = "subject";
	// export let contentkey: string = "content";
	// export let recaptchasitekey: string;

	export let informations: Component["informations"];
	export let privacy_policy: Component["privacy_policy"];

	export let captcha: Component["captcha"];

	let form_submitted: { _valid: boolean; values: Record<string, string | number | boolean> };

	let schema: FormComponent["schema"];
	let attach_captcha: boolean = false;
	$: {
		if (!id) id = "";
		if (!attach_captcha) attach_captcha = false;
		if (style) {
			parsedStyle = parseStyle(style);
			formStyleToSet = getChildStyleToPass(parsedStyle, formStyleSetup?.vars);
		}
		if (typeof captcha === "string") {
			captcha = JSON.parse(captcha);
		}
		if (typeof informations === "string") {
			informations = JSON.parse(informations);
		}
		if (typeof privacy_policy === "string") {
			privacy_policy = JSON.parse(privacy_policy);
		}
		schema = [];

		if (informations?.name) {
			const nameInfo = {
				id: "name",
				name: "name",
				label: informations.name.label || "Name",
				type: "text",
				required: informations.name.required ? true : false,
				placeholder: informations.name.placeholder || "Your name",
				value: informations.name.value || "",

				validation: {
					minLength: {
						value: 3,
						message: "Name must be at least 3 characters long",
					},
				},
			};

			schema.push(nameInfo);
		}

		if (informations?.email) {
			const emailInfo = {
				id: "email",
				name: "email",
				label: informations.email.label || "email",
				type: "email",
				required: informations.email.required ? true : false,
				placeholder: informations.email.placeholder || "Your email",
				value: informations.email.value || "",

				validation: {
					minLength: {
						value: 3,
						message: "email must be at least 3 characters long",
					},
				},
			};

			schema.push(emailInfo);
		}

		if (informations?.phone) {
			const phoneInfo = {
				id: "phone",
				name: "phone",
				label: informations.phone.label || "phone",
				type: "text",
				required: informations.phone.required ? true : false,
				placeholder: informations.phone.placeholder || "Your phone",
				value: informations.phone.value || "",

				validation: {
					minLength: {
						value: 3,
						message: "phone must be at least 3 characters long",
					},
				},
			};

			schema.push(phoneInfo);
		}
		if (informations?.subject) {
			const subjectInfo = {
				id: "subject",
				name: "subject",
				label: informations.subject.label || "Subject",
				type: "text",
				required: informations.subject.required ? true : false,
				placeholder: informations.subject.placeholder || "Email Subject",
				value: informations.subject.value || "",

				validation: {
					minLength: {
						value: 3,
						message: "Name must be at least 3 characters long",
					},
				},
			};

			schema.push(subjectInfo);
		}

		if (informations?.message) {
			const messageInfo = {
				id: "message",
				name: "message",
				label: informations.message.label || "Message",
				type: "textarea",
				required: informations.message.required ? true : false,
				placeholder: informations.message.placeholder || "Your message here...",
				value: informations.message.value || "",
				validation: {
					minLength: {
						value: 3,
						message: "Name must be at least 3 characters long",
					},
				},
			};

			schema.push(messageInfo);
		}
		if (privacy_policy?.input) {
			const policyInfo = {
				id: "policy",
				name: "policy",
				label: privacy_policy.input,
				type: "checkbox",
				required: privacy_policy.required,
				// placeholder: privacy_policy.input,
				value: false,
				valid: false,
				error: "",
			};

			schema.push(policyInfo);
		}
	}

	addComponent({ repoName: "@htmlbricks/hb-form", version: pkg.version });
	addComponent({ repoName: "@htmlbricks/hb-captcha-google-recaptcha-v2-invisible", version: pkg.version });

	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();
	function dispatch(name: string, detail: any) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}
	function submitContactForm(f: { _valid: boolean; values: Record<string, string | number | boolean> }) {
		if (!f._valid) return console.error("is not yet valid!", f);
		console.log("submit", captcha);

		if (captcha?.siteKey) {
			attach_captcha = true;
			form_submitted = f;
		} else {
			dispatch("formContactSubmit", f);
		}
	}
	function schemeUpdate(data: any) {
		console.log(data);
	}
	function submitAfterVerification(verification: { response: string }) {
		dispatch("formContactSubmitWithCaptcha", Object.assign({ response: verification.response, type: "recaptcha-v2-invisible" }, form_submitted));
	}
</script>

{#if captcha?.siteKey && attach_captcha}
	<hb-captcha-google-recaptcha-v2-invisible api_key={captcha.siteKey} on:googleRecaptchaV2Response={(e) => submitAfterVerification(e.detail)} />
{/if}
<hb-form style={formStyleToSet} on:submit={(e) => submitContactForm(e.detail)} on:change={(e) => schemeUpdate(e.detail)} schema={JSON.stringify(schema)} />

<style lang="scss">
	// @import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
</style>
