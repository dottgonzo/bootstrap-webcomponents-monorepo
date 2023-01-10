<svelte:options tag="hb-messages-topics-card" />

<script lang="ts">
	import pkg from "../../package.json";

	import { get_current_component, onDestroy, onMount } from "svelte/internal";

	import { createEventDispatcher } from "svelte";
	import parseStyle from "style-to-object";
	import { addComponent, getChildStyleToPass } from "@htmlbricks/hb-jsutils/main";
	import type { Component as messageListComponent } from "@htmlbricks/hb-messages-list/release/webcomponent.type";
	import type { Events as messageSendEvents } from "@htmlbricks/hb-messages-send/release/webcomponent.type";
	import type { Component } from "@app/types/webcomponent.type";

	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();

	function dispatch(name, detail) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}
	export let id: string;
	export let style: string;

	export let content: Component["content"];
	export let chat: Component["chat"];

	let parsedStyle: { [x: string]: string };
	//  let componentStyleToSet: string = "";

	let localeTimeString: string;

	$: {
		if (!id) id = "";
		if (style) {
			parsedStyle = parseStyle(style);
		}

		if (typeof content === "string") {
			try {
				content = JSON.parse(content);
			} catch (err) {
				console.error("error parsing content", err);
			}
		}
		if (typeof chat === "string") {
			try {
				chat = JSON.parse(chat);
			} catch (err) {
				console.error("error parsing chat", err);
			}
		}
		if (!content && chat) {
			content = {
				title: chat.chat_name || chat.last_message_author,
				text: chat.last_message_text,
				img_uri: chat.last_message_author_img,
				time: chat.last_message_time,
				counter: chat.counter || 0,
			};
		}

		localeTimeString = content?.time
			? new Date(content.time).getHours().toString().padStart(2, "0") + ":" + new Date(content.time).getMinutes().toString().padStart(2, "0")
			: "";
	}
</script>

{#if content}
	<div id="grid">
		<img src={content.img_uri} alt={content.img_uri} />
		<div id="header">
			<span class="text-item" id="title">{content.title}</span>
			<span class="text-item right" id="time">{localeTimeString}</span>
		</div>
		<div id="details">
			<span id="description" class="text-item">{content.text}</span>
			<span id="counter" class="text-item right">
				<span class="badge rounded-pill bg-secondary">{content.counter.toString()}</span>
			</span>
		</div>
	</div>
{/if}

<style lang="scss">
	@import "../styles/webcomponent.scss";
	@import "../styles/bootstrap.scss";
</style>
