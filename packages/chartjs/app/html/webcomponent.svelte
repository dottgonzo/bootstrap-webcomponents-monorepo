<svelte:options tag="hb-chartjs" />

<script lang="ts">
	import { get_current_component, onMount } from "svelte/internal";
	import { createEventDispatcher } from "svelte";
	import debounce from "debounce";
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
	const svelteDispatch = createEventDispatcher();

	function dispatch(name, detail) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}
	function chartClick(evt) {
		const points = chart.getElementsAtEventForMode(evt, "nearest", { intersect: true }, true);

		let graphPoint: { label?: string; value?: any } = {};

		if (points.length) {
			const firstPoint = points[0];
			graphPoint.label = chart.data.labels[firstPoint.index] as string;
			graphPoint.value = chart.data.datasets[firstPoint.datasetIndex].data[firstPoint.index];
		}
		dispatch("chartClick", graphPoint);
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

<div part="container" class="chart-container">
	<canvas id="canvas" on:click={debounce(chartClick, 200)} />
</div>

<style lang="scss">
	// @import "../styles/webcomponent.scss";

	.chart-container {
		position: relative;
		margin: auto;
	}
</style>
