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
	export let submitted: string | undefined;

	let schema: FormComponent["schema"];

	$: {
		if (!submitted) submitted = undefined;
		if (!id) id = "";
		if (style) {
			parsedStyle = parseStyle(style);
			formStyleToSet = getChildStyleToPass(parsedStyle, formStyleSetup?.vars);
		}

		if (typeof informations === "string") {
			informations = JSON.parse(informations);
		}
		schema = [];

		if (informations?.name) {
			const nameInfo = {
				id: "name",
				name: "name",
				label: informations.name.label || "Name",
				type: "text",
				required: informations.name.required,
				placeholder: informations.name.placeholder || "Your name",
				value: informations.name.value || "",
				valid: false,
				error: "",
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
				type: "text",
				required: informations.email.required,
				placeholder: informations.email.placeholder || "Your email",
				value: informations.email.value || "",
				valid: false,
				error: "",
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
				required: informations.phone.required,
				placeholder: informations.phone.placeholder || "Your phone",
				value: informations.phone.value || "",
				valid: false,
				error: "",
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
				required: informations.subject.required,
				placeholder: informations.subject.placeholder || "Email Subject",
				value: informations.subject.value || "",
				valid: false,
				error: "",
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
				required: informations.message.required,
				placeholder: informations.message.placeholder || "Your message here...",
				value: informations.message.value || "",
				valid: false,
				error: "",
				validation: {
					minLength: {
						value: 3,
						message: "Name must be at least 3 characters long",
					},
				},
			};

			schema.push(messageInfo);
		}
	}

	addComponent({ repoName: "@htmlbricks/hb-form", version: pkg.version });

	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();
	function dispatch(name, detail) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}
	function submitContactForm() {
		console.log("submit");
	}
	function schemeUpdate(data: any) {
		console.log(data);
	}
</script>

<hb-form style={formStyleToSet} on:submit={(e) => submitContactForm()} on:change={(e) => schemeUpdate(e.detail)} schema={JSON.stringify(schema)} {submitted} />

<style lang="scss">
	// @import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
</style>
