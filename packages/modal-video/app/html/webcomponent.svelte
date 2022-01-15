<svelte:options tag="hb-modal-video" />

<script lang="ts">
	import { get_current_component } from "svelte/internal";
	import { createEventDispatcher } from "svelte";
	import pkg from "../../package.json";
	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();
	function dispatch(name, detail) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}
	function addComponent(componentName: string) {
		if (!document.getElementById("hb-" + componentName + "-script")) {
			const script = document.createElement("script");
			script.id = "hb-" + componentName + "-script";
			script.src = `https://cdn.jsdelivr.net/npm/@htmlbricks/hb-${componentName}@${pkg.version}/release/release.js`;
			if (location.href.includes("localhost")) script.src = `http://localhost:6006/${componentName}/dist/release.js`;

			document.head.appendChild(script);
		}
	}
	addComponent("dialog");

	export let item: string;
	export let uri: string;
	export let title: string;
	export let provider: string;

	$: {
		if (!item) item = "";
		if (!uri) uri = "";
		if (!title) title = "";
		if (!provider) provider = "";
	}

	function dialogShowEvent(d) {
		if (d.show) {
			item = d.id;
		} else {
			item = "";
			uri = "";
			title = "";
		}
		dispatch("videoModalEvent", { id: item, show: d.show });
	}
</script>

<hb-dialog id={item} show={uri ? "yes" : "no"} on:modalShow={(d) => dialogShowEvent(d.detail)}>
	{#if title}
		<span slot="title">
			<slot name="title">Video: {title}</slot>
		</span>
	{/if}
	<div slot="body-content">
		{#if uri}
			{#if provider === "youtube"}
				<div style="ratio:16/9;width:100%;text-align: center;">
					<iframe style="border:0;aspect-ratio: 16 / 9;width:100%" src={uri} title="YouTube video" allowfullscreen />
				</div>
			{:else}
				<div style="aspect-ratio: 16 / 9;width:100%;text-align: center;background-color: black;">
					<video controls style="aspect-ratio: 16 / 9;width:100%">
						<track kind="captions" />
						<source src={uri} type="video/mp4" />
						Your browser does not support the video tag.
					</video>
				</div>
			{/if}
		{/if}
	</div>

	<span slot="modal-footer" />
</hb-dialog>

<style lang="scss">
	@import "../styles/webcomponent.scss";
</style>