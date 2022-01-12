<svelte:options tag="hb-chartjs" />

<script lang="ts">
	import { get_current_component, onMount } from "svelte/internal";
	import { createEventDispatcher } from "svelte";
	import pkg from "../../package.json";
	const component = get_current_component();
	// const svelteDispatch = createEventDispatcher();
	// function dispatch(name, detail) {
	// 	svelteDispatch(name, detail);
	// 	component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	// }

	import {
		Chart,
		ArcElement,
		LineElement,
		BarElement,
		PointElement,
		BarController,
		BubbleController,
		DoughnutController,
		LineController,
		PieController,
		PolarAreaController,
		RadarController,
		ScatterController,
		CategoryScale,
		LinearScale,
		LogarithmicScale,
		RadialLinearScale,
		TimeScale,
		TimeSeriesScale,
		Decimation,
		Filler,
		Legend,
		Title,
		Tooltip,
		SubTitle,
	} from "chart.js";

	Chart.register(
		ArcElement,
		LineElement,
		BarElement,
		PointElement,
		BarController,
		BubbleController,
		DoughnutController,
		LineController,
		PieController,
		PolarAreaController,
		RadarController,
		ScatterController,
		CategoryScale,
		LinearScale,
		LogarithmicScale,
		RadialLinearScale,
		TimeScale,
		TimeSeriesScale,
		Decimation,
		Filler,
		Legend,
		Title,
		Tooltip,
		SubTitle,
	);

	export let id: string;
	export let data: any;

	let mounted = false;
	let chart: Chart;
	$: {
		if (!id) id = "";
		if (data && typeof data === "string") data = JSON.parse(data);

		updateChart();
	}

	function updateChart() {
		if (mounted && data) {
			if (chart) {
				chart.destroy();
				chart = null;
			}
			chart = new Chart(component.shadowRoot.getElementById("canvas"), data as unknown as any);
		}
	}
	onMount(() => {
		mounted = true;

		updateChart();
	});
</script>

<canvas id="canvas" />

<style lang="scss">
	@import "../styles/webcomponent.scss";
</style>
