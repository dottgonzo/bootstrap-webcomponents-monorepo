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

	import { fade, fly } from "svelte/transition";
	import { quintOut } from "svelte/easing";

	export let id: string;
	export let show: boolean | string | null;
	export let title: string;
	export let img: string;
	export let small: string;
	export let content: string;

	$: {
		if (!id) id = "";

		if (typeof show !== "undefined") {
			if (show === "" || show === true || show === "true" || show === "yes") {
				show = true;
			} else {
				show = false;
			}
		} else {
			show = false;
		}

		// if (show && (show === true || (show as unknown as string) === "yes" || (show as unknown as string) === "")) show = true;
		// else show = false;
	}

	let backdrop = true;
	let ignoreBackdrop = false;
	let keyboard = true;
	export let onOpened = () => dispatch("toastShow", { id, show: true });
	export let onClosed = () => dispatch("toastShow", { id, show: false });
	let _keyboardEvent;
	function attachEvent(target, ...args) {
		target.addEventListener(...args);
		return {
			remove: () => target.removeEventListener(...args),
		};
	}
	function checkClass(className) {
		return document.body.classList.contains(className);
	}
	function toastOpen() {
		if (!checkClass("toast-open")) {
			document.body.classList.add("toast-open");
		}
	}
	function toastClose() {
		if (checkClass("toast-open")) {
			document.body.classList.remove("toast-open");
		}
	}
	function handleBackdrop(event) {
		if (backdrop && !ignoreBackdrop) {
			event.stopPropagation();
			show = false;
		}
	}
	function onToastOpened() {
		if (keyboard) {
			_keyboardEvent = attachEvent(document, "keydown", (e) => {
				if ((event as any).key === "Escape") {
					show = false;
				}
			});
		}
		onOpened();
	}
	function onToastClosed() {
		if (_keyboardEvent) {
			_keyboardEvent.remove();
		}
		onClosed();
	}
	// Watching changes for Open vairable
	$: {
		if (!content) content = "";
		if (!small) small = "";
		if (!title) title = "";
		if (!img) img = "";
		if (show) {
			toastOpen();
		} else {
			toastClose();
		}
	}
	function handleConfirm() {
		dispatch("toastConfirm", { id, confirm: true });
		show = false;
	}
	function handleCancel() {
		show = false;
		dispatch("toastConfirm", { id, confirm: false });
	}
</script>

{#if show}
	<div
		role="alert"
		aria-live="assertive"
		aria-atomic="true"
		class="toast fade show"
		data-bs-autohide="false"
		data-bs-delay="10000"
		on:click|self={handleBackdrop}
		on:introend={onToastOpened}
		on:outroend={onToastClosed}
	>
		<div class="toast-header">
			<slot name="header_img"
				><img
					data-src="holder.js/200x200"
					class="bd-placeholder-img rounded me-2"
					alt="200x200"
					src={img}
					data-holder-rendered="true"
					style="width: 20px; height: 20px"
				/></slot
			>

			<strong class="me-auto"><slot name="header_strong" />{title}</strong>

			<small><slot name="header_small">{small}</slot></small>

			<button
				type="button"
				class="btn-close"
				data-bs-dismiss="toast"
				aria-label="Close"
				on:click={() => {
					show = false;
				}}
			/>
		</div>

		<div class="toast-body"><slot name="body" />{content}</div>
	</div>
{/if}

<style lang="scss">
	@import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
</style>
