<svelte:options tag="hb-animated-container" />

<script lang="ts">
	import { get_current_component, onMount } from "svelte/internal";

	import type { Component } from "@app/types/webcomponent.type";

	const component = get_current_component();

	export let id: string;
	export let animation: Component["animation"];
	export let params: Component["params"];

	let container: HTMLElement;
	let content: HTMLElement;

	let interval: number;
	$: {
		if (!id) id = "";

		if (typeof params === "string") {
			try {
				params = JSON.parse(params);
			} catch (err) {
				console.error("error parsing params", err);
			}
		}
		switch (animation) {
			case "rain":
			default:
				animation = "rain";
		}
	}

	function routine() {
		if (animation === "rain") {
			function createCircle() {
				if (container && content) {
					const circleEl = document.createElement("div");
					circleEl.classList.add("circle");
					if (container.clientHeight) circleEl.style.top = Math.random() * container.clientHeight + "px";
					if (container.clientWidth) circleEl.style.left = Math.random() * container.clientWidth + "px";
					content.appendChild(circleEl);

					setTimeout(
						() => {
							circleEl.remove();
						},
						params?.speed ? params.speed * 10 : 3000,
					);
				}
			}

			interval = setInterval(createCircle, params?.speed || 300);
		}
	}

	onMount(() => {
		container = component.shadowRoot.getElementById("container");
		content = component.shadowRoot.getElementById("content");
		routine();
		return () => {
			if (interval) clearInterval(interval);
		};
	});
</script>

{#if animation}
	<div id="container"><div id="content" /></div>
{/if}
<!-- Set Hidden element only to preserve cicle class from rollup cleanup -->
<div class="circle" style="display:none" />

<style lang="scss">
	@import "../styles/webcomponent.scss";
	// @import "../styles/bootstrap.scss";
</style>
