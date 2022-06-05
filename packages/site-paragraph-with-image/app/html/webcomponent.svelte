<svelte:options tag="hb-site-paragraph-with-image" />

<script lang="ts">
	import { get_current_component, onDestroy, onMount } from "svelte/internal";

	import { createEventDispatcher } from "svelte";
	import parseStyle from "style-to-object";
	import { addComponent, getChildStyleToPass } from "@htmlbricks/hb-jsutils/main";

	import type { Component } from "../types/webcomponent.type";

	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();

	function dispatch(name, detail) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}

	export let id: string;
	export let style: string;

	export let img: Component["img"];
	export let text: Component["text"];
	export let text_side: Component["text_side"];
	export let half_space: Component["half_space"];
	let innerWidth: number = 0;

	let parsedStyle: { [x: string]: string };
	//  let componentStyleToSet: string = "";

	$: {
		if (!id) id = "";
		if (style) {
			parsedStyle = parseStyle(style);
			// componentStyleToSet = getChildStyleToPass(parsedStyle, componentStyleSetup?.vars);
		}
		if (text_side !== "left") text_side = "right";
		if ((half_space as unknown as string) === "yes" || (half_space as unknown as string) === "true" || half_space === true) half_space = true;
		else half_space = false;
		if (!img) img = null;
		else if (typeof img === "string") img = JSON.parse(img);
		if (!text) text = null;
		else if (typeof text === "string") text = JSON.parse(text);
	}

	function dispatchClick() {
		dispatch("elClick", { key: text.link.key });
	}
</script>

<svelte:window bind:innerWidth />

{#if innerWidth < 800}
	<div id="mobile_container">
		<div id="mobile_text_container">
			{#if text?.body || text?.title}
				<div part="mobile_text_content" id="mobile_text_content">
					<h1 id="mobile_title" part="mobile_title">{text.title}</h1>
					<p part="mobile_text_body">{text.body}</p>
					{#if text.link?.label}
						<p>
							<button
								part="mobile_link_button"
								class="btn btn-primary"
								style={(text.link.bgColor ? "background-color:" + text.link.bgColor + ";border-color:" + text.link.bgColor + ";" : "") +
									(text.link.textColor ? "color:" + text.link.textColor + ";" : "")}
								on:click={dispatchClick}>{text.link.label}</button
							>
						</p>
					{/if}
				</div>
			{:else}
				no title or body
			{/if}
		</div>
		<div id="mobile_image_container">
			{#if img?.src}
				<div part="mobile_image_content" id="mobile_image_content">
					<img id="mobile_img" alt={img.alt} src={img.src} />
				</div>
			{:else}
				no img
			{/if}
		</div>
	</div>
{:else}
	<div id="row_container">
		{#if text_side !== "left"}
			<div style={half_space ? "flex-grow: 5;" : "flex-grow: 2;"} id="image_container">
				{#if img?.src}
					<div part="image_content" id="image_content">
						<img id="desktop_img" alt={img.alt} src={img.src} />
					</div>
				{:else}
					no img
				{/if}
			</div>
		{/if}
		<div id="text_container">
			{#if text?.body || text?.title}
				<div part="text_content" id="text_content">
					<h1 id="title" part="title">{text.title}</h1>
					<p part="text_body">{text.body}</p>
					{#if text.link?.label}
						<p>
							<button
								part="link_button"
								class="btn btn-primary"
								style={(text.link.bgColor ? "background-color:" + text.link.bgColor + ";border-color:" + text.link.bgColor + ";" : "") +
									(text.link.textColor ? "color:" + text.link.textColor + ";" : "")}
								on:click={dispatchClick}>{text.link.label}</button
							>
						</p>
					{/if}
				</div>
			{:else}
				no title or body
			{/if}
		</div>
		{#if text_side === "left"}
			<div style={half_space ? "flex-grow: 5;" : "flex-grow: 2;"} id="image_container">
				{#if img?.src}
					<div part="image_content" id="image_content">
						<img id="desktop_img" alt={img.alt} src={img.src} />
					</div>
				{:else}
					no img
				{/if}
			</div>
		{/if}
	</div>
{/if}

<style lang="scss">
	@import "../styles/webcomponent.scss";
	@import "../styles/bootstrap.scss";
	// @media only screen and (max-width: 600px) {
	// 	#row_container {
	// 		display: none;
	// 	}
	// }
	// @media (min-width: 600px) {
	// 	#mobile_container {
	// 		display: none;
	// 	}
	// }
</style>
