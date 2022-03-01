<svelte:options tag="hb-form-contact" />

<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { get_current_component } from "svelte/internal";
	import debounce from "debounce";

	$: {
	}
	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();
	function dispatch(name, detail) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}
</script>

<svelte:head>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@latest/font/bootstrap-icons.css" />
</svelte:head>
<form class="needs-validation pt-2 px-md-3" novalidate="">
	<div class="row">
		<div class="col-md-6 mb-3 pb-1">
			<label class="form-label" for="cont-fn">Name</label>
			<input class="form-control" type="text" id="cont-fn" placeholder="John Doe" />
		</div>
		<div class="col-md-6 mb-3 pb-1">
			<label class="form-label" for="cont-email">Email address<sup class="text-danger ms-1">*</sup></label>
			<input class="form-control" type="email" id="cont-email" placeholder="j.doe@example.com" required="" />
			<div class="invalid-feedback">Please enter a valid email address!</div>
		</div>
	</div>
	<div class="mb-3 pb-1">
		<label class="form-label" for="cont-subject">Subject</label>
		<input class="form-control" type="text" id="cont-subject" placeholder="Title of your message" />
	</div>
	<div class="mb-3 pb-1">
		<label class="form-label" for="cont-message">Message</label>
		<textarea class="form-control" id="cont-message" rows="5" placeholder="Write your message here" />
	</div>
	<div class="text-center pt-2">
		<button class="btn btn-primary g-recaptcha" data-sitekey="reCAPTCHA_site_key" data-callback="onSubmit" data-action="submit" type="submit">Send</button>
	</div>
</form>

<style lang="scss">
	@import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
</style>
