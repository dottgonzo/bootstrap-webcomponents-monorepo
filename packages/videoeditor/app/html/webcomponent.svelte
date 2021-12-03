<svelte:options tag="videoeditorbootstrap-component" />

<script lang="ts">
	/**
	 * Svelte Video Gallery WebComponent
	 * =====================
	 *
	 * @contributors: Dario Caruso <dev@dariocaruso.info> (https://dariocaruso.info)
	 *
	 * @license: MIT License
	 *
	 */
	import { createEventDispatcher } from "svelte";
	import { get_current_component } from "svelte/internal";

	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();

	export let id: string;
	export let min: number = 60;
	export let max: number = 3000;
	export let videoval: number;

	const minprop = 0;
	const maxprop = 100;

	let minValReal: number;
	let maxValReal: number;

	let minval: number;
	let maxval: number;

	let fromleft: number;
	let fromright: number;

	$: {
		if (!id) {
			id = "";
		}

		if (!min) {
			min = minprop;
		}
		if (!max) {
			max = maxprop;
		}
		if (!minval) {
			minval = minprop;
		}
		if (!maxval) {
			maxval = maxprop;
		}
		if (!videoval) {
			videoval = minval;
		}
		fromleft = (minval / maxprop) * 100;
		fromright = (maxval / maxprop) * 100;
		minValReal = min + ((max - min) / 100) * minval;
		maxValReal = min + ((max - min) / 100) * maxval;
	}
	function dispatch(name, detail) {
		// console.log(`svelte: ${name}`);
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}
	function dispatchVals() {
		const status = { minValue: minValReal, maxValue: maxValReal };
		dispatch("newValues", status);
		console.log("status", status, minval, maxval);
	}
	function changeValMin(e) {
		if (!e?.target?.value || Number(e.target.value) === Infinity || isNaN(Number(e.target.value)))
			return console.error(`invalid value ${e?.target?.value}`);

		if (Number(e.target.value) < maxprop && Number(e.target.value) < maxval) {
			minval = Number(e.target.value);
		} else {
			minval = maxprop > maxval ? maxval : maxprop;
		}
	}
	function changeValMax(e) {
		if (!e?.target?.value || Number(e.target.value) === Infinity || isNaN(Number(e.target.value)))
			return console.error(`invalid value ${e?.target?.value}`);

		if (Number(e.target.value) > minprop && Number(e.target.value) > minval) {
			maxval = Number(e.target.value);
		} else {
			maxval = minprop > minval ? minprop : minval;
		}
	}
</script>

<div id="slider-distance">
	<div>
		<div class="inverse" id="inverse-left" style="width:{fromleft + 100 - fromright}%;" />
		<div class="inverse" id="inverse-right" style="width:{fromleft + 100 - fromright}%;" />
		<div id="the-range" style="left:{fromleft}%;right:{100 - fromright}%;" />
		<span class="the-thumb" style="left:{fromleft}%;" />
		<span class="the-thumb" style="left:{fromright}%;" />
	</div>
	<input type="range" tabindex="0" bind:value={minval} max={maxprop} min={minprop} step="0.0001" on:input={(e) => changeValMin(e)} on:change={dispatchVals} />
	<input type="range" tabindex="0" bind:value={maxval} max={maxprop} min={minprop} step="0.0001" on:input={(e) => changeValMax(e)} on:change={dispatchVals} />
</div>

<button type="submit">send</button>

<style lang="scss">
	@import "../styles/webcomponent.scss";

	#slider-distance {
		position: relative;
		height: 14px;
		border-radius: 10px;
		text-align: left;
		margin: 45px 0 10px 0;
	}

	#slider-distance > div {
		position: absolute;
		left: 13px;
		right: 15px;
		height: 14px;
	}

	.inverse {
		position: absolute;
		height: 14px;
		border-radius: 10px;
		background-color: #ccc;
		margin: 0 7px;
	}

	#inverse-left {
		left: 0;
	}

	#inverse-right {
		right: 0;
	}

	#the-range {
		position: absolute;
		left: 0;
		height: 14px;
		border-radius: 14px;
		background-color: #1abc9c;
	}

	.the-thumb {
		position: absolute;
		top: -7px;
		z-index: 2;
		height: 28px;
		width: 28px;
		text-align: left;
		margin-left: -11px;
		cursor: pointer;
		box-shadow: 0 3px 8px rgba(0, 0, 0, 0.4);
		background-color: #fff;
		border-radius: 50%;
		outline: none;
	}

	input[type="range"] {
		position: absolute;
		pointer-events: none;
		-webkit-appearance: none;
		z-index: 3;
		height: 14px;
		top: -2px;
		width: 100%;
		-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
		-moz-opacity: 0;
		-khtml-opacity: 0;
		opacity: 0;
	}

	input[type="range"]::-ms-track {
		-webkit-appearance: none;
		background: transparent;
		color: transparent;
	}

	input[type="range"]::-moz-range-track {
		-moz-appearance: none;
		background: transparent;
		color: transparent;
	}

	input[type="range"]:focus::-webkit-slider-runnable-track {
		background: transparent;
		border: transparent;
	}

	input[type="range"]:focus {
		outline: none;
	}

	input[type="range"]::-ms-thumb {
		pointer-events: all;
		width: 28px;
		height: 28px;
		border-radius: 0px;
		border: 0 none;
		background: red;
	}

	input[type="range"]::-moz-range-thumb {
		pointer-events: all;
		width: 28px;
		height: 28px;
		border-radius: 0px;
		border: 0 none;
		background: red;
	}

	input[type="range"]::-webkit-slider-thumb {
		pointer-events: all;
		width: 28px;
		height: 28px;
		border-radius: 0px;
		border: 0 none;
		background: red;
		-webkit-appearance: none;
	}

	input[type="range"]::-ms-fill-lower {
		background: transparent;
		border: 0 none;
	}

	input[type="range"]::-ms-fill-upper {
		background: transparent;
		border: 0 none;
	}

	input[type="range"]::-ms-tooltip {
		display: none;
	}
</style>
