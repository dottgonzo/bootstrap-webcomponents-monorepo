<svelte:options tag="hb-form-contact" />

<script lang="ts">
	import { createEventDispatcher, onMount, beforeUpdate, afterUpdate } from "svelte";
	import { get_current_component } from "svelte/internal";
	import { fly, fade } from "svelte/transition";
	import { addComponent, getChildStyleToPass } from "@htmlbricks/hb-jsutils/main";
	import pkg from "../../package.json";
	import { styleSetup as formStyleSetup } from "../../node_modules/@htmlbricks/hb-form/release/docs";
	import parseStyle from "style-to-object";

	interface keyable {
		[key: string]: any;
	}
	let formStyleToSet: string = "";
	let parsedStyle: { [x: string]: string };

	export let id: string;
	export let style: string;

	export let action: string = window.location.href;
	export let method: string = "POST";
	export let fromkey: string = "from";
	export let subjectkey: string = "subject";
	export let contentkey: string = "content";
	export let recaptchasitekey: string;

	let hasError = false;
	let isSuccessVisible = false;
	let disabled = false;
	let name = "";
	let email;
	let subject = "";
	let content = "";
	let errMessage = "Something went wrong!";
	let State = {
		idle: "idle",
		requesting: "requesting",
		success: "success",
	};
	let token;
	let state = State.idle;

	$: {
		if (!id) id = "";
		if (style) {
			parsedStyle = parseStyle(style);
			formStyleToSet = getChildStyleToPass(parsedStyle, formStyleSetup?.vars);
		}
		method = method.toUpperCase();
	}
	addComponent({ repoName: "@htmlbricks/hb-form", version: pkg.version });

	function submitAfterVerification() {
		state = State.requesting;
		doRecaptcha();
	}

	function doRecaptcha() {
		try {
			// grecaptcha.ready(function () {
			// 	grecaptcha.execute(recaptchasitekey, { action: "submit" }).then(function (t) {
			// 		state = State.success;
			// 		token = t;
			// 		if (token) {
			// 			sendMessage(token);
			// 		}
			// 	});
			// });
		} catch (e) {
			hasError = true;
			errMessage = "Something went wrong!";
			console.error(e);
		}
	}

	function handleSubmit(e) {
		hasError = false;
		disabled = true;
		if (recaptchasitekey) {
			submitAfterVerification();
		} else {
			sendMessage();
		}
	}

	function sendMessage(verify = "") {
		const from = `${name}<${email}>`;
		const data = { [fromkey]: from, [subjectkey]: subject, [contentkey]: content };
		if (verify) {
			data["g-recaptcha-response"] = verify;
		}
		const fetchResource = `${action}`;
		const fetchInit = {
			method,
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		};

		const mailSenderPromise = fetchMailSenderRes(fetchResource, fetchInit);
	}
	async function fetchMailSenderRes(resource, init): Promise<string> {
		const res = await fetch(resource, init);
		const data = await res.json();

		disabled = false;

		if (res.ok) {
			isSuccessVisible = true;

			setTimeout(function () {
				isSuccessVisible = false;
			}, 3000);

			dispatch("sent-mail", data);
			return data;
		} else {
			hasError = true;
			errMessage = "Something went wrong!";
			dispatch("sent-mail-error", new Error(data));
			throw new Error(data);
		}
	}

	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();
	function dispatch(name, detail) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}
</script>

<form class="needs-validation pt-2 px-md-3" on:submit|preventDefault={handleSubmit}>
	{#if recaptchasitekey}
		<script src="https://www.google.com/recaptcha/api.js?render={recaptchasitekey}" async defer></script>
	{/if}
	{#if hasError == true}
		<div class="alert alert-danger" role="alert">{errMessage}</div>
	{:else if isSuccessVisible}
		<div class="alert alert-success" role="alert" transition:fade={{ duration: 150 }}>Message sent successfully</div>
	{/if}
	<div class="row">
		<div class="col-md-6 mb-3 pb-1">
			<label class="form-label" for="cont-fn">Name</label>
			<input class="form-control" type="text" id="cont-fn" placeholder="Name" bind:value={name} />
		</div>
		<div class="col-md-6 mb-3 pb-1">
			<label class="form-label" for="cont-email">Email address<sup class="text-danger ms-1">*</sup></label>
			<input class="form-control" type="email" id="cont-email" placeholder="Email address" required bind:value={email} />
			<div class="invalid-feedback">Please enter a valid email address!</div>
		</div>
	</div>
	<div class="mb-3 pb-1">
		<label class="form-label" for="cont-subject">Subject</label>
		<input class="form-control" type="text" id="cont-subject" placeholder="Subject" bind:value={subject} />
	</div>
	<div class="mb-3 pb-1">
		<label class="form-label" for="cont-message">Message</label>
		<textarea class="form-control" id="cont-message" rows="5" placeholder="Message" bind:value={content} />
	</div>
	<div class="text-center pt-2">
		<button class="btn btn-primary" type="submit" {disabled}>Send</button>
	</div>
</form>

<style lang="scss">
	@import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
</style>
