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

	export let id: string;
	export let min: number = 0;
	export let max: number = 300;
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
		minValReal = ((max - min) / 100) * minval;
		maxValReal = ((max - min) / 100) * maxval;
		console.log(minprop, maxprop, minval, maxval, fromleft, fromright);
	}
	function changeValMin(e) {
		minval = Number(e.target.value);
		console.log("minval", minval, minValReal);
	}
	function changeValMax(e) {
		maxval = Number(e.target.value);
		console.log("maxval", maxval, maxValReal);
	}
</script>

<div the-slider id="slider-distance">
	<div>
		<div inverse-left style="width:{fromleft + 100 - fromright}%;" />
		<div inverse-right style="width:{fromleft + 100 - fromright}%;" />
		<div the-range style="left:{fromleft}%;right:{100 - fromright}%;" />
		<span the-thumb style="left:{fromleft}%;" />
		<span the-thumb style="left:{fromright}%;" />
	</div>
	<input type="range" tabindex="0" value={minval} max={maxprop} min={minprop} step="0.01" on:input={changeValMin} />
	<input type="range" tabindex="0" value={maxval} max={maxprop} min={minprop} step="0.01" on:input={changeValMax} />
</div>
<button type="submit">send</button>

<style lang="scss">
	@import "../styles/webcomponent.scss";

	[the-slider] {
		position: relative;
		height: 14px;
		border-radius: 10px;
		text-align: left;
		margin: 45px 0 10px 0;
	}

	[the-slider] > div {
		position: absolute;
		left: 13px;
		right: 15px;
		height: 14px;
	}

	[the-slider] > div > [inverse-left] {
		position: absolute;
		left: 0;
		height: 14px;
		border-radius: 10px;
		background-color: #ccc;
		margin: 0 7px;
	}

	[the-slider] > div > [inverse-right] {
		position: absolute;
		right: 0;
		height: 14px;
		border-radius: 10px;
		background-color: #ccc;
		margin: 0 7px;
	}

	[the-slider] > div > [the-range] {
		position: absolute;
		left: 0;
		height: 14px;
		border-radius: 14px;
		background-color: #1abc9c;
	}

	[the-slider] > div > [the-thumb] {
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

	[the-slider] > input[type="range"] {
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

	div[the-slider] > input[type="range"]::-ms-track {
		-webkit-appearance: none;
		background: transparent;
		color: transparent;
	}

	div[the-slider] > input[type="range"]::-moz-range-track {
		-moz-appearance: none;
		background: transparent;
		color: transparent;
	}

	div[the-slider] > input[type="range"]:focus::-webkit-slider-runnable-track {
		background: transparent;
		border: transparent;
	}

	div[the-slider] > input[type="range"]:focus {
		outline: none;
	}

	div[the-slider] > input[type="range"]::-ms-thumb {
		pointer-events: all;
		width: 28px;
		height: 28px;
		border-radius: 0px;
		border: 0 none;
		background: red;
	}

	div[the-slider] > input[type="range"]::-moz-range-thumb {
		pointer-events: all;
		width: 28px;
		height: 28px;
		border-radius: 0px;
		border: 0 none;
		background: red;
	}

	div[the-slider] > input[type="range"]::-webkit-slider-thumb {
		pointer-events: all;
		width: 28px;
		height: 28px;
		border-radius: 0px;
		border: 0 none;
		background: red;
		-webkit-appearance: none;
	}

	div[the-slider] > input[type="range"]::-ms-fill-lower {
		background: transparent;
		border: 0 none;
	}

	div[the-slider] > input[type="range"]::-ms-fill-upper {
		background: transparent;
		border: 0 none;
	}

	div[the-slider] > input[type="range"]::-ms-tooltip {
		display: none;
	}
</style>
