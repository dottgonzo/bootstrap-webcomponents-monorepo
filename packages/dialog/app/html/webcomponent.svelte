<svelte:options tag="hb-dialog" />

<script lang="ts">
	import { get_current_component } from "svelte/internal";
	import { createEventDispatcher } from "svelte";

	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();
	function dispatch(name: string, detail: any) {
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

	export let title = "";
	export let backdrop = true;
	export let keyboard = true;
	export let describedby = "";
	export let labelledby = "";
	export let content = "";
	export let closelabel = "";
	export let confirmlabel = "";
	export let disable_confirm: boolean;
	export let confirm_btn_class: string;
	export let close_btn_class: string;
	export let hide_close: boolean;
	export let hide_confirm: boolean;

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
		if (!confirm_btn_class) confirm_btn_class = "primary";
		if (typeof disable_confirm === "string")
			disable_confirm = (disable_confirm as string).toLowerCase() === "true" || (disable_confirm as string).toLowerCase() === "yes";
		if (show === "yes") {
			modalOpen();
		} else {
			modalClose();
		}
		if (typeof hide_close === "string" && ((hide_close as string).toLowerCase() === "true" || (hide_close as string).toLowerCase() === "yes")) {
			hide_close = true;
		}
		if (typeof hide_confirm === "string" && ((hide_confirm as string).toLowerCase() === "true" || (hide_confirm as string).toLowerCase() === "yes")) {
			hide_confirm = true;
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
		<div class="modal-dialog" part="modal-dialog" role="document" in:fly={{ y: -50, duration: 300 }} out:fly={{ y: -50, duration: 300, easing: quintOut }}>
			<div class="modal-content">
				<slot name="header" class="modal-header">
					<h5 class="modal-title"><slot name="title">{title || "title"}</slot></h5>
					<button type="button" class="btn-close" on:click={() => (show = "no")} />
				</slot>
				<div class="modal-body" style="word-break: break-all;">
					<slot name="body-content">{content || "Woohoo, you're reading this text in a modal!"}</slot>
				</div>
				<slot name="modal-footer" class="modal-footer">
					<div>
						<slot name="footer">
							{#if !hide_close}<button type="button" class="btn btn-{close_btn_class}" on:click={() => handleCancel()}
									><slot name="close-button-label">{closelabel || "Close"}</slot></button
								>{/if}
							{#if !hide_confirm}<button
									disabled={disable_confirm ? true : false}
									type="button"
									class="btn btn-{confirm_btn_class}"
									on:click={() => handleConfirm()}
									><slot name="confirm-button-label">{confirmlabel || "Save changes"}</slot>
								</button>{/if}
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
