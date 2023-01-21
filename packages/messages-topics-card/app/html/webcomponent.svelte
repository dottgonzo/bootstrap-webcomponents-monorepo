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

	export let chats: Component["chats"];

	let parsedStyle: { [x: string]: string };
	//  let componentStyleToSet: string = "";

	$: {
		if (!id) id = "";
		if (style) {
			parsedStyle = parseStyle(style);
		}

		if (typeof chats === "string") {
			try {
				chats = JSON.parse(chats);
			} catch (err) {
				console.error("error parsing chat", err);
			}
		}
		chats.forEach((chat) => {
			if (!chat.localeTimeString)
				chat.localeTimeString = chat.time
					? new Date(chat.time).getHours().toString().padStart(2, "0") + ":" + new Date(chat.time).getMinutes().toString().padStart(2, "0")
					: "";
		});

		// if (!content && chat) {
		// 	content = {
		// 		title: chat.chat_name || chat.last_message_author,
		// 		text: chat.last_message_text,
		// 		img_uri: chat.last_message_author_img,
		// 		time: chat.last_message_time,
		// 		counter: chat.counter || 0,
		// 	};
		// }
	}
</script>

{#if chats}
	{#each chats as chat (chat.chat_id)}
		<div class="grid">
			<img src={chat.img_uri} alt={chat.img_uri} />
			<div class="header">
				<span class="text-item title">{chat.title}</span>
				<span class="text-item right time">{chat.localeTimeString}</span>
			</div>
			<div class="details">
				<span class="description text-item">{chat.text}</span>
				<span class="counter text-item right">
					<span class="badge rounded-pill bg-secondary">{chat.counter.toString()}</span>
				</span>
			</div>
		</div>
	{/each}
{/if}

<style lang="scss">
	@import "../styles/webcomponent.scss";
	@import "../styles/bootstrap.scss";
</style>
