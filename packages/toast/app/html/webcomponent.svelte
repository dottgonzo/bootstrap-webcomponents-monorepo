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
	export let role: "" | "alert" | "status" = undefined;
	// svelte-ignore unused-export-let
	export let live: "" | "off" | "polite" | "assertive" = undefined;
	// svelte-ignore unused-export-let
	export let atomic: "" | "true" | "false" = undefined;
	// svelte-ignore unused-export-let
	export let autohide: "" | "true" | "false" = undefined;
	// svelte-ignore unused-export-let
	export let delay: number = 5000;
	export let header_strong: string = undefined;
	export let header_img: string = undefined;
	export let header_small: string = undefined;
	export let body: string = undefined;
	export let toast_class: string = "";
	export let btn_close_class: string = "";
	export let custom_content: string = "";
	let isHeaderExists: boolean = false;
	let timer;

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
		isHeaderExists = !(!header_img && !header_strong && !header_small && !$$slots.header_img && !$$slots.header_strong && !$$slots.header_small);
		if (show === "yes") {
			timer = setTimeout(function () {
				close();
			}, delay);
		}

		if (autohide === "false") {
			clearTimeout(timer);
		}
	}
</script>

{#if show === "yes"}
	<div {role} aria-live={$$props["live"]} aria-atomic={$$props["atomic"]} class={`toast fade show ${toast_class}`}>
		{#if isHeaderExists}
			<div class="toast-header">
				<slot name="header_img">{header_img}</slot>
				<strong class="me-auto"><slot name="header_strong">{header_strong}</slot></strong>
				<small><slot name="header_small">{header_small}</slot></small>
				{#if !custom_content && autohide !== "true"}
					<button type="button" class={`btn-close ${btn_close_class}`} data-bs-dismiss="toast" aria-label="Close" on:click={close} />
				{/if}
			</div>
			<div class="toast-body">
				<slot name="body">{body}</slot>
				{#if custom_content}
					<div class="mt-2 pt-2 border-top">
						<slot name="custom_content">{custom_content}</slot>
						{#if autohide !== "true"}
							<button type="button" class={`btn ${btn_close_class}`} data-bs-dismiss="toast" on:click={close}>Close</button>
						{/if}
					</div>
				{/if}
			</div>
		{:else if custom_content}
			<div class="toast-body">
				<slot name="body">{body}</slot>
				<div class="mt-2 pt-2 border-top">
					<slot name="custom_content">{custom_content}</slot>
					{#if autohide !== "true"}
						<button type="button" class={`btn ${btn_close_class}`} data-bs-dismiss="toast" on:click={close}>Close</button>
					{/if}
				</div>
			</div>
		{:else}
			<div class="d-flex">
				<div class="toast-body">
					<slot name="body">{body}</slot>
				</div>
				{#if autohide !== "true"}
					<button type="button" class={`btn-close ${btn_close_class}`} data-bs-dismiss="toast" aria-label="Close" on:click={close} />
				{/if}
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
				border-radius: 0.25rem !important;
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
				border-radius: 0.25rem !important;
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
