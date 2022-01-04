<svelte:options tag="toast-component" />

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

	interface Header {
		img?: HTMLImageElement | SVGElement | null;
		strong?: string | null;
		small?: string | null;
	}

	export let id: string;
	export let show: boolean | string | null;
	export let header: Header;
	export let body: string;
	let headerImg: Header["img"];
	let headerStrong: Header["strong"];
	let headerSmall: Header["small"];
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
		try {
			header = JSON.parse(header as unknown as string);
			headerImg = header ? (header.img ? header.img : null) : null;
			headerStrong = header ? (header.strong ? header.strong : null) : null;
			headerSmall = header ? (header.small ? header.small : null) : null;
		} catch (err) {}
	}

	export let dialogClasses = "";
	export let title = "";
	export let backdrop = true;
	export let ignoreBackdrop = false;
	export let keyboard = true;
	export let describedby = "";
	export let labelledby = "";
	export let content = "";
	export let closelabel = "";
	export let confirmlabel = "";
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
		{#if headerImg || headerStrong || headerSmall}
			<div class="toast-header">
				<!-- <slot name="headerImg" /> -->
				{#if headerImg}
					{@html headerImg}
				{/if}
				{#if headerStrong}
					<strong class="me-auto">{@html headerStrong}</strong>
				{/if}
				{#if headerSmall}
					<small>{@html headerSmall}</small>
				{/if}
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
		{/if}

		{#if body}
			<div class="toast-body">{@html body}</div>
		{/if}
		{#if !headerImg && !headerStrong && !headerSmall}
			<button
				type="button"
				class="btn-close me-2 m-auto"
				data-bs-dismiss="toast"
				aria-label="Close"
				on:click={() => {
					show = false;
				}}
			/>
		{/if}
	</div>
{/if}

<style lang="scss">
	@import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";

	// .toast {
	// 	display: block;
	// }
</style>
