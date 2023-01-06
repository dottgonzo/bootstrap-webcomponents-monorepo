<svelte:options tag="hb-messages-box" />

<script lang="ts">
	import pkg from "../../package.json";

	import { get_current_component, onDestroy, onMount, text } from "svelte/internal";

	import { createEventDispatcher } from "svelte";
	import parseStyle from "style-to-object";
	import { addComponent, getChildStyleToPass } from "@htmlbricks/hb-jsutils/main";
	import type { Component as messageListComponent } from "@htmlbricks/hb-messages-list/release/webcomponent.type";
	import type { Events as messageSendEvents } from "@htmlbricks/hb-messages-send/release/webcomponent.type";
	import type { Component } from "@app/types/webcomponent.type";

	import { styleSetup as messageListStyleSetup } from "../../node_modules/@htmlbricks/hb-messages-list/release/docs";
	import { styleSetup as messageSendStyleSetup } from "../../node_modules/@htmlbricks/hb-messages-send/release/docs";

	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();

	function dispatch(name, detail) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}
	export let id: string;
	export let style: string;

	export let messages: messageListComponent["messages"];
	export let authors: messageListComponent["authors"];
	export let options: messageListComponent["options"];
	export let message: Component["message"];

	let messagesListStyleSetupToSet: string = "";
	let messagesSendStyleSetupToSet: string = "";

	let parsedStyle: { [x: string]: string };
	//  let componentStyleToSet: string = "";
	let textMessage: string;

	$: {
		if (!id) id = "";
		if (style) {
			parsedStyle = parseStyle(style);
			messagesListStyleSetupToSet = getChildStyleToPass(parsedStyle, messageListStyleSetup?.vars);
			messagesSendStyleSetupToSet = getChildStyleToPass(parsedStyle, messageSendStyleSetup?.vars);
		}

		if (typeof message === "string") {
			try {
				message = JSON.parse(message);
			} catch (err) {
				console.error("error parsing message", err);
			}
		}
		if (!message)
			message = {
				text: "",
			};

		if (!textMessage && textMessage !== "") textMessage = message?.text ? message.text : "";
	}

	function sendMessageEvent(sendDetail: messageSendEvents["sendMessage"]) {
		if (!sendDetail.file && !sendDetail.text) return console.warn("no message to received", sendDetail);
		dispatch("sendMessage", sendDetail);
		textMessage = sendDetail.text;
		textMessage = "";

		const newMessage: messageListComponent["messages"][0] = {
			id: Date.now().toString(),
			text: sendDetail.text,
			timestamp: new Date(Date.now()),
			type: "text",
			authorId: "1",
		};
		// messages = [...messages, newMessage];
	}

	addComponent({ repoName: "@htmlbricks/hb-messages-list", version: pkg.version });
	addComponent({ repoName: "@htmlbricks/hb-messages-send", version: pkg.version });
</script>

{#if authors?.length && messages?.length}
	<hb-messages-list {messages} {authors} {options} style={messagesListStyleSetupToSet + "position:relative;top:30px"} />
	<div style="display:block;position:absolute;bottom:0px;width:100%;overflow:hidden">
		<hb-messages-send text={textMessage} style={messagesSendStyleSetupToSet} on:sendMessage={(e) => sendMessageEvent(e.detail)} />
	</div>
{/if}
{textMessage}

<style lang="scss">
	@import "../styles/webcomponent.scss";
	// @import "../styles/bootstrap.scss";
</style>
