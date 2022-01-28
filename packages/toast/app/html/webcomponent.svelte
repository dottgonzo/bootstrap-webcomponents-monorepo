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

	export let id: string;
	export let show: "yes" | "no";
	export let header_strong: string;
	export let header_img: HTMLImageElement | SVGElement;
	export let header_small: string;
	export let body: string;

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
		if (!body) body = "";
		if (!header_small) header_small = "";
		if (!header_strong) header_strong = "";
		// if (!header_img) header_img = "";
	}
</script>

{#if show === "yes"}
	<div role="alert" aria-live="assertive" aria-atomic="true" class="toast fade show" data-bs-autohide="false" data-bs-delay="10000">
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
		<div class="toast-header">
			<slot name="header_img">{@html header_img}</slot>

			<strong class="me-auto"><slot name="header_strong">{@html header_strong}</slot></strong>

			<small><slot name="header_small">{@html header_small}</slot></small>

			<button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close" on:click={close} />
		</div>

		<div class="toast-body"><slot name="body">{@html body}</slot></div>
	</div>
{/if}

<style lang="scss">
	@import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
</style>
