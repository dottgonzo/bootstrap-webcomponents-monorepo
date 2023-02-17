<svelte:options tag="hb-messages-list" />

<script lang="ts">
	import parseStyle from "style-to-object";
	import { addComponent, getChildStyleToPass } from "wc-js-utils/main";
	import type { Component } from "@app/types/webcomponent.type";

	export let id: string;
	export let style: string;

	export let messages: Component["messages"];
	export let authors: Component["authors"];
	export let options: Component["options"];

	type Message = Component["messages"][0] & { author: Component["authors"][0]; dateString: string };

	let msgs: Message[] = [];

	let parsedStyle: { [x: string]: string };
	//  let componentStyleToSet: string = "";

	const defaultOptions: Component["options"] = {};
	$: {
		if (!id) id = "";
		if (style) {
			parsedStyle = parseStyle(style);
			// componentStyleToSet = getChildStyleToPass(parsedStyle, componentStyleSetup?.vars);
		}

		if (typeof options === "string") {
			try {
				options = JSON.parse(options);
			} catch (err) {
				console.error("error parsing options", err);
			}
		}
		if (!options) options = defaultOptions;

		if (typeof messages === "string") {
			try {
				messages = JSON.parse(messages);
			} catch (err) {
				console.error("error parsing messages", err);
			}
		}
		if (typeof authors === "string") {
			try {
				authors = JSON.parse(authors);
			} catch (err) {
				console.error("error parsing authors", err);
			}
		}
		if (messages?.length && authors?.length) {
			console.log("reload messages");
			const newMessages: Message[] = [];
			for (const message of messages) {
				const author = authors.find((a) => a.id === message.authorId);
				if (author) {
					const isToday = new Date(message.timestamp).toDateString() === new Date().toDateString();
					const messageTimestamp = new Date(message.timestamp);
					const hourAndMinutes = messageTimestamp.toLocaleTimeString().split(":")[0] + ":" + messageTimestamp.toLocaleTimeString().split(":")[1];
					const dateAndHourAndMinutes =
						messageTimestamp.toLocaleString().split(" ")[0] +
						" " +
						messageTimestamp.toLocaleTimeString().split(":")[0] +
						":" +
						messageTimestamp.toLocaleTimeString().split(":")[1];
					const dateString = isToday ? hourAndMinutes : dateAndHourAndMinutes;
					newMessages.push({
						...message,
						author,
						dateString,
					});
				}
			}
			msgs = newMessages;
		}

		console.info("messages are", msgs);
	}
</script>

{#each msgs as message (message.id)}
	{#if message.author.me}
		<div class="message my-message">
			<img alt="" class="img-circle medium-image" src={message.author.avatar} />

			<div class="message-body">
				<div class="message-body-inner">
					<div class="message-info">
						<h4>{message.author.name}</h4>
						<h5><i class="fa fa-clock-o" />{message.dateString}</h5>
					</div>
					<hr />
					<div class="message-text">{message.text}</div>
				</div>
			</div>
			<br />
		</div>
	{:else}
		<div class="message info">
			<img alt="" class="img-circle medium-image" src={message.author.avatar} />

			<div class="message-body">
				<div class="message-info">
					<h4>{message.author.name}</h4>
					<h5><i class="fa fa-clock-o" />{message.dateString}</h5>
				</div>
				<hr />
				<div class="message-text">{message.text}</div>
			</div>
			<br />
		</div>
	{/if}
{/each}

<style lang="scss">
	@import "../styles/webcomponent.scss";
	// @import "../styles/bootstrap.scss";
</style>
