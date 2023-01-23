<svelte:options tag="hb-messages-send" />

<script lang="ts">
	import { get_current_component, onDestroy, onMount } from "svelte/internal";

	import { createEventDispatcher } from "svelte";
	import parseStyle from "style-to-object";
	import { addComponent, getChildStyleToPass } from "@htmlbricks/hb-jsutils/main";
	import type { Component } from "@app/types/webcomponent.type";
	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();

	function dispatch(name: string, detail: any) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}
	export let id: string;
	export let style: string;

	export let text: Component["text"];
	let fileMessage: File;

	let parsedStyle: { [x: string]: string };
	//  let componentStyleToSet: string = "";

	$: {
		if (!id) id = "";
		if (style) {
			parsedStyle = parseStyle(style);
			// componentStyleToSet = getChildStyleToPass(parsedStyle, componentStyleSetup?.vars);
		}

		if (!text) text = "";
	}

	function sendMessage() {
		if (!text?.length && !fileMessage) return console.warn("no message to send");
		console.log("send message " + text);
		dispatch("sendMessage", { text, id, file: fileMessage });
	}
</script>

<svelte:head>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@latest/font/bootstrap-icons.css" />
</svelte:head>

<div class="column left" />
<div class="column middle">
	<textarea class="send-message-text" bind:value={text} />
</div>
<div class="column right">
	<div class="message-buttons">
		<label class="upload-file" style="opacity:{fileMessage ? '0.5' : '0.25'}">
			<input type="file" bind:value={fileMessage} disabled={fileMessage ? true : false} />
			{#if !fileMessage}
				<i class="bi bi-paperclip" />
			{:else}
				<i class="bi bi-file-earmark-check-fill" />
			{/if}
		</label>
		<button
			type="button"
			on:click={() => sendMessage()}
			class="send-message-button btn-info"
			disabled={text?.length || fileMessage ? false : true}
			style="opacity:{text?.length || fileMessage ? '1' : '0.25'}"
		>
			<i class="bi bi-send-fill" />
		</button>
	</div>
</div>

<style lang="scss">
	@import "../styles/webcomponent.scss";
	// @import "../styles/bootstrap.scss";
</style>
