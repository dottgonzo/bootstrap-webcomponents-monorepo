<svelte:options tag="hb-dialog" />

<script lang="ts">
	import { get_current_component } from "svelte/internal";
	import { createEventDispatcher } from "svelte";

	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();
	function dispatch(name, detail) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}

	import { fade, fly } from "svelte/transition";
	import { quintOut } from "svelte/easing";

	export let id: string;
	export let show: "yes" | "no";
	$: {
		if (!id) id = "";
		if (show === "yes" || (show as unknown) === "") show = "yes";
		else show = "no";
	}

	export let dialogclasses = "";
	export let title = "";
	export let backdrop = true;
	export let keyboard = true;
	export let describedby = "";
	export let labelledby = "";
	export let content = "";
	export let closelabel = "";
	export let confirmlabel = "";
	export let disable_confirm;

	let ignoreBackdrop = false;

	const onOpened = () => dispatch("modalShow", { id, show: true });
	const onClosed = () => dispatch("modalShow", { id, show: false });
	let _keyboardEvent;
	function attachEvent(target, ...args) {
		target.addEventListener(...args);
		return {
			remove: () => target.removeEventListener(...args),
		};
	}
	function checkClass(className) {
		return document?.body?.classList?.contains?.(className);
	}
	function modalOpen() {
		if (!checkClass("modal-open")) {
			document?.body?.classList?.add?.("modal-open");
		}
	}
	function modalClose() {
		if (checkClass("modal-open")) {
			document?.body?.classList?.remove?.("modal-open");
		}
	}
	function handleBackdrop(event) {
		if (backdrop && !ignoreBackdrop) {
			event.stopPropagation();
			show = "no";
		}
	}
	function onModalOpened() {
		if (keyboard) {
			_keyboardEvent = attachEvent(document, "keydown", (e) => {
				if (event && (event as any).key === "Escape") {
					show = "no";
				}
			});
		}
		onOpened();
	}
	function onModalClosed() {
		if (_keyboardEvent) {
			_keyboardEvent.remove();
		}
		onClosed();
	}
	// Watching changes for Open vairable
	$: {
		if (!disable_confirm) disable_confirm = false;
		else if (typeof disable_confirm === "string") disable_confirm = disable_confirm.toLowerCase() === "true" || disable_confirm.toLowerCase() === "yes";
		if (show === "yes") {
			modalOpen();
		} else {
			modalClose();
		}
	}
	function handleConfirm() {
		dispatch("modalConfirm", { id, confirm: true });
		show = "no";
	}
	function handleCancel() {
		show = "no";

		dispatch("modalConfirm", { id, confirm: false });
	}
</script>

{#if show === "yes"}
	<div
		id="modal-{id}"
		class="modal show"
		tabindex="-1"
		role="dialog"
		aria-labelledby={labelledby}
		aria-describedby={describedby}
		aria-modal="true"
		on:click|self={handleBackdrop}
		on:introend={onModalOpened}
		on:outroend={onModalClosed}
		transition:fade
	>
		<div class="modal-dialog {dialogclasses}" role="document" in:fly={{ y: -50, duration: 300 }} out:fly={{ y: -50, duration: 300, easing: quintOut }}>
			<div class="modal-content">
				<slot name="header" class="modal-header">
					<h5 class="modal-title"><slot name="title">{title || "title"}</slot></h5>
					<button type="button" class="btn-close" on:click={() => (show = "no")}>
						<span aria-hidden="true">&times;</span>
					</button>
				</slot>
				<div class="modal-body" style="word-break: break-all;">
					<slot name="body-content">{content || "Woohoo, you're reading this text in a modal!"}</slot>
				</div>
				<slot name="modal-footer" class="modal-footer">
					<div>
						<slot name="footer">
							<button type="button" class="btn btn-secondary" on:click={() => handleCancel()}
								><slot name="close-button-label">{closelabel || "Close"}</slot></button
							>
							<button type="button" class="btn btn-primary" on:click={() => handleConfirm()}
								><slot name="confirm-button-label">{confirmlabel || "Save changes"}</slot></button
							>
						</slot>
					</div>
				</slot>
			</div>
		</div>
	</div>
	<div class="modal-backdrop show" transition:fade={{ duration: 150 }} />
{/if}

<style lang="scss">
	@import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";

	.modal {
		display: block;
	}
</style>
