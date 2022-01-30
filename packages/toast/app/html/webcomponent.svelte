<svelte:options tag="hb-toast" />

<script lang="ts">
	import { get_current_component } from "svelte/internal";
	import { createEventDispatcher } from "svelte";

	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();
	function dispatch(name, detail) {
		// console.log(`svelte: ${name}`);
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}

	// import { fade, fly } from "svelte/transition";
	// import { quintOut } from "svelte/easing";

	export let id: string = "";
	export let show: "yes" | "no" = "yes";
	export let header_strong: string = undefined;
	export let header_img: string = undefined;
	export let header_small: string = undefined;
	export let body: string = undefined;
	export let toast_class: string = "";
	let isHeaderExists: boolean = false;

	$: {
		if (!id) id = "";
		if (show !== "yes") show = "no";

		// if (show && (show === true || (show as unknown as string) === "yes" || (show as unknown as string) === "")) show = true;
		// else show = false;
	}
	// const onOpened = () => dispatch("toastShow", { id, show: true });
	function close() {
		show = "no";
		dispatch("toastShow", { id, show: false });
	}
	// let backdrop = true;
	// let ignoreBackdrop = false;
	// let keyboard = true;

	// let _keyboardEvent;
	// function attachEvent(target, ...args) {
	// 	target.addEventListener(...args);
	// 	return {
	// 		remove: () => target.removeEventListener(...args),
	// 	};
	// }
	// function checkClass(className) {
	// 	return document.body.classList.contains(className);
	// }
	// function toastOpen() {
	// 	if (!checkClass("toast-open")) {
	// 		document.body.classList.add("toast-open");
	// 	}
	// }
	// function toastClose() {
	// 	if (checkClass("toast-open")) {
	// 		document.body.classList.remove("toast-open");
	// 	}
	// }
	// function handleBackdrop(event) {
	// 	if (backdrop && !ignoreBackdrop) {
	// 		event.stopPropagation();
	// 		show = false;
	// 	}
	// }
	// function onToastOpened() {
	// 	if (keyboard) {
	// 		_keyboardEvent = attachEvent(document, "keydown", (e) => {
	// 			if ((event as any).key === "Escape") {
	// 				show = false;
	// 				onClosed();
	// 			}
	// 		});
	// 	}
	// 	onOpened();
	// }
	// function onToastClosed() {
	// 	if (_keyboardEvent) {
	// 		_keyboardEvent.remove();
	// 	}
	// 	onClosed();
	// }
	// Watching changes for Open vairable
	$: {
		if (!body) body = null;
		if (!header_small) header_small = null;
		if (!header_strong) header_strong = null;
		if (!header_img) header_img = null;
		if (!toast_class) toast_class = null;
		isHeaderExists = !(!header_img && !header_strong && !header_small && !$$slots.header_img && !$$slots.header_strong && !$$slots.header_small);
	}
</script>

{#if show === "yes"}
	<div role="alert" aria-live="assertive" aria-atomic="true" class={`toast fade show ${toast_class}`} data-bs-autohide="false" data-bs-delay="10000">
		{#if isHeaderExists}
			<div class="toast-header">
				<slot name="header_img">{@html header_img}</slot>

				<strong class="me-auto"><slot name="header_strong">{@html header_strong}</slot></strong>

				<small><slot name="header_small">{@html header_small}</slot></small>

				<button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close" on:click={close} />
			</div>
			<div class="toast-body"><slot name="body">{@html body}</slot></div>
		{:else}
			<div class="d-flex">
				<div class="toast-body"><slot name="body">{@html body}</slot></div>
				<button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close" on:click={close} />
			</div>
		{/if}
		<style lang="scss">
			img,
			svg {
				vertical-align: middle;
			}
			.me-2 {
				margin-right: 0.5rem !important;
			}
			.rounded {
				border-radius: 0.25rem !important; //
			}
			.me-auto {
				margin-right: auto !important;
			}

			::slotted(img),
			::slotted(svg) {
				vertical-align: middle;
			}
			::slotted(.me-2) {
				margin-right: 0.5rem !important;
			}
			::slotted(.rounded) {
				border-radius: 0.25rem !important; //
			}
			::slotted(.me-auto) {
				margin-right: auto !important;
			}
		</style>
	</div>
{/if}

<style lang="scss">
	@import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
</style>
