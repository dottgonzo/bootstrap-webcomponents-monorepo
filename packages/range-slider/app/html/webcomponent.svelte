<svelte:options tag="hb-range-slider" />

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
	export let min: number;
	export let max: number;
	export let minval: number;
	export let maxval: number;
	export let withbubbles: boolean;

	export let position_value: number;

	const minSlider = 0;
	const maxSlider = 100;
	let minValReal: number;
	let maxValReal: number;
	let positionValReal: number;
	let minPercent: number;
	let maxPercent: number;
	let positionPercent: number;

	let fromleft: number;
	let fromright: number;
	let positionFromLeft: number;

	$: {
		if (!id) {
			id = "";
		}
		if (!withbubbles && (withbubbles as unknown as string) !== "") {
			withbubbles = false;
		} else {
			withbubbles = true;
		}
		if (!min) {
			min = minSlider;
		} else {
			min = Number(min);
		}
		if (!max) {
			max = maxSlider;
		} else {
			max = Number(max);
		}

		if (minval) {
			if (min > minval) minval = min;

			minPercent = ((minval - min) * 100) / (max - min);
			minval = null;
		}
		if (maxval) {
			if (max < maxval) maxval = max;

			maxPercent = ((maxval - min) * 100) / (max - min);
			maxval = null;
		}

		if (position_value || position_value === 0) {
			position_value = Number(position_value) <= max ? Number(position_value) : max;
			position_value = Number(position_value) >= min ? Number(position_value) : min;
			positionPercent = ((position_value - min) * 100) / (max - min);

			position_value = null;
		}

		if (!minPercent) {
			minPercent = minSlider;
		}
		if (!maxPercent) {
			maxPercent = maxSlider;
		}

		minValReal = min + ((max - min) / 100) * minPercent;
		maxValReal = min + ((max - min) / 100) * maxPercent;
		positionValReal = min + ((max - min) / 100) * positionPercent;

		fromleft = (minPercent / maxSlider) * 100;
		fromright = (maxPercent / maxSlider) * 100;
		if (positionPercent || positionPercent === 0) {
			positionPercent = positionPercent <= maxPercent ? positionPercent : maxPercent;
			positionPercent = positionPercent >= minPercent ? positionPercent : minPercent;
			positionFromLeft = (positionPercent / maxSlider) * 100;
			console.info("newpos", minSlider, positionPercent, positionFromLeft);
		}
	}
	function dispatch(name, detail) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}
	function dispatchVals() {
		const status = { minValue: minValReal, maxValue: maxValReal, minPercent, maxPercent, positionPercent, positionValReal };
		dispatch("changeRangeValues", status);
	}
	function changeValMin(e) {
		if (!e?.target?.value || Number(e.target.value) === Infinity || isNaN(Number(e.target.value)))
			return console.error(`invalid value ${e?.target?.value}`);

		if (Number(e.target.value) < maxSlider && Number(e.target.value) < maxPercent) {
			minPercent = Number(e.target.value);
		} else {
			minPercent = maxSlider > maxPercent ? maxPercent : maxSlider;
		}
	}
	function changeValMax(e) {
		if (!e?.target?.value || Number(e.target.value) === Infinity || isNaN(Number(e.target.value)))
			return console.error(`invalid value ${e?.target?.value}`);

		if (Number(e.target.value) > minSlider && Number(e.target.value) > minPercent) {
			maxPercent = Number(e.target.value);
		} else {
			maxPercent = minSlider > minPercent ? minSlider : minPercent;
		}
	}
	function changePos(e) {
		console.log("changePos", e);
		if (!e?.target?.value || Number(e.target.value) === Infinity || isNaN(Number(e.target.value)))
			return console.error(`invalid value ${e?.target?.value}`);

		if (Number(e.target.value) >= minSlider && Number(e.target.value) <= maxSlider) {
			positionPercent = Number(e.target.value);
		} else {
			positionPercent = minSlider > Number(e.target.value) ? minSlider : maxSlider;
		}
		console.log("new pos", positionPercent);
	}
</script>

<div id="slider-distance-container" style={withbubbles ? "margin: 45px 0 10px 0;" : ""}>
	<div id="slider-distance-content">
		<div class="inverse" part="inverse" id="inverse-left" style="width:{fromleft + 100 - fromright}%;" />
		<div class="inverse" part="inverse" id="inverse-right" style="width:{fromleft + 100 - fromright}%;" />
		<div id="the-range" part="the-range" style="left:{fromleft}%;right:{100 - fromright}%;" />
		<span class="the-thumb" part="the-thumb" style="left:{fromleft}%;" />
		{#if positionFromLeft || positionFromLeft === 0}<span
				class="the-thumb thumb-internal"
				part="the-thumb-internal"
				style="left:{positionFromLeft}%;"
			/>{/if}
		<span class="the-thumb" part="the-thumb" style="left:{fromright}%;" />
		{#if withbubbles}
			<div class="sign" part="sign" style="left:{fromleft}%;">
				<span id="value">{Math.round(minValReal)}</span>
			</div>
			<div class="sign" part="sign" style="left:{fromright}%;">
				<span id="value">{Math.round(maxValReal)}</span>
			</div>
		{/if}
	</div>

	<input
		type="range"
		tabindex="0"
		bind:value={minPercent}
		max={maxSlider}
		min={minSlider}
		step="0.0001"
		on:input={(e) => changeValMin(e)}
		on:change={dispatchVals}
	/>
	{#if positionPercent || positionPercent === 0}
		<input
			type="range"
			tabindex="0"
			bind:value={positionPercent}
			max={maxSlider}
			min={minSlider}
			step="0.0001"
			on:input={(e) => changePos(e)}
			on:change={dispatchVals}
		/>
	{/if}
	<input
		type="range"
		tabindex="0"
		bind:value={maxPercent}
		max={maxSlider}
		min={minSlider}
		step="0.0001"
		on:input={(e) => changeValMax(e)}
		on:change={dispatchVals}
	/>
</div>

<style lang="scss">
	@import "../styles/webcomponent.scss";

	#slider-distance-container {
		position: relative;
		height: 14px;
		border-radius: 10px;
		text-align: left;
	}

	#slider-distance-content {
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
		background-color: var(--hb-slider-background-color);
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
	.thumb-internal {
		z-index: 20;
		height: 18px;
		width: 18px;
		background-color: black;
		top: -2px;
		margin-left: -6px;
	}
	input[type="range"] {
		position: absolute;
		pointer-events: none;
		-webkit-appearance: none;
		z-index: 30;
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

	.sign {
		position: absolute;
		margin-left: -11px;
		top: -39px;
		z-index: 3;
		background-color: #1abc9c;
		color: #fff;
		width: 28px;
		height: 28px;
		border-radius: 28px;
		-webkit-border-radius: 28px;
		align-items: center;
		-webkit-justify-content: center;
		justify-content: center;
		text-align: center;
	}

	.sign:after {
		position: absolute;
		content: "";
		left: 0;
		border-radius: 16px;
		top: 19px;
		border-left: 14px solid transparent;
		border-right: 14px solid transparent;
		border-top-width: 16px;
		border-top-style: solid;
		border-top-color: #1abc9c;
	}

	.sign > span {
		font-size: 12px;
		font-weight: 700;
		line-height: 28px;
	}
</style>
