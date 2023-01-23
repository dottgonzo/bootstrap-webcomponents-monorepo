<svelte:options tag="hb-gauge" />

<script lang="ts">
	import { get_current_component, onDestroy, onMount } from "svelte/internal";
	import debounce from "debounce";

	import { createEventDispatcher } from "svelte";
	import JustGage from "@app/functions/justgage";
	import pkg from "../../package.json";
	const component = get_current_component();
	// const svelteDispatch = createEventDispatcher();
	// function dispatch(name:string, detail:any) {
	// 	svelteDispatch(name, detail);
	// 	component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	// }
	let gaugeEl: HTMLElement;
	let gauge: JustGage;
	export let id: string;
	export let options: any;

	$: {
		if (!id) id = "";
		if (options && typeof options === "string") {
			options = JSON.parse(options);
		}
		if (gaugeEl && gauge) {
			recreateGauge();
		}
	}
	// function updateGauge(val: number) {
	// 	if (gauge) gauge.refresh(val, null, null, null);
	// }
	function recreateGauge() {
		if (gauge) gauge.destroy();
		gauge = null;

		createGauge();
	}
	function createGauge() {
		if (!options || !gaugeEl) return console.error("cannot create gauge");
		if (!gauge) {
			const opts = Object.assign({ element: gaugeEl }, options);
			gauge = new JustGage(opts);
		} else {
			console.error("cannot create html gauge");
		}
	}
	onMount(() => {
		gaugeEl = component.shadowRoot.getElementById("gauge");
		createGauge();
	});
	onDestroy(() => {
		if (gauge) gauge.destroy();
		gauge = null;
	});
</script>

<div part="gauge" style="width:100%" id="gauge" />
<svelte:window on:resize={debounce(recreateGauge, 200)} />

<style lang="scss">
	// @import "../styles/webcomponent.scss";
</style>
