/**
 * JustGage - Animated gauges using RaphaelJS
 * Check http://www.justgage.com for official releases
 * Licensed under MIT.
 * @author Bojan Djuricic (@Toorshia)
 **/

import Raphael from "raphael";

export default class JustGage {

	constructor(config) {
		// Helps in case developer wants to debug it. unobtrusive
		if (isUndefined(config)) {
			throw new Error("* justgage: Make sure to pass options to the constructor!");
		}
		this.events = {};

		this.node = config.element;

		const dataset = this.node.dataset ? this.node.dataset : {};

		// check for defaults
		const defaults = !isUndefined(config.defaults) ? config.defaults : false;
		if (defaults !== false) {
			config = extend({});
			delete config.defaults;
		}

		// configurable parameters
		this.config = {
			// id : string
			// this is container element
			element: config.element,

			// classId : string
			// this is the class id utilize when generating styles
			classId: uuid(),

			// value : float
			// value gauge is showing
			value: kvLookup("value", config, dataset, 0, "float"),

			// defaults : bool
			// defaults parameter to use
			defaults: kvLookup("defaults", config, dataset, 0, false),

			// parentNode : node object
			// this is container element
			parentNode: kvLookup("parentNode", config, dataset, null),

			// width : int
			// gauge width
			width: kvLookup("width", config, dataset, null),

			// height : int
			// gauge height
			height: kvLookup("height", config, dataset, null),

			// valueFontColor : string
			// color of label showing current value
			valueFontColor: kvLookup("valueFontColor", config, dataset, "#010101"),

			// valueFontFamily : string
			// color of label showing current value
			valueFontFamily: kvLookup("valueFontFamily", config, dataset, "Arial"),

			// symbol : string
			// special symbol to show next to value
			symbol: kvLookup("symbol", config, dataset, ""),

			// min : float
			// min value
			min: kvLookup("min", config, dataset, 0, "float"),

			// minTxt : string
			// min value text
			minTxt: kvLookup("minTxt", config, dataset, false),

			// max : float
			// max value
			max: kvLookup("max", config, dataset, 100, "float"),

			// maxTxt : string
			// max value text
			maxTxt: kvLookup("maxTxt", config, dataset, false),

			// reverse : bool
			// reverse min and max
			reverse: kvLookup("reverse", config, dataset, false),

			// humanFriendlyDecimal : int
			// number of decimal places for our human friendly number to contain
			humanFriendlyDecimal: kvLookup("humanFriendlyDecimal", config, dataset, 0),

			// textRenderer: func
			// function applied before rendering text
			textRenderer: kvLookup("textRenderer", config, dataset, null),

			// onAnimationEnd: func
			// function applied after animation is done
			onAnimationEnd: kvLookup("onAnimationEnd", config, dataset, null),

			// gaugeWidthScale : float
			// width of the gauge element
			gaugeWidthScale: kvLookup("gaugeWidthScale", config, dataset, 1.0),

			// gaugeColor : string
			// background color of gauge element
			gaugeColor: kvLookup("gaugeColor", config, dataset, "#edebeb"),

			// label : string
			// text to show below value
			label: kvLookup("label", config, dataset, ""),

			// labelFontColor : string
			// color of label showing label under value
			labelFontColor: kvLookup("labelFontColor", config, dataset, "#b3b3b3"),

			// valueFontFamily : string
			// font-family for label as well as min/max value
			labelFontFamily: kvLookup("labelFontFamily", config, dataset, "Arial"),

			// shadowOpacity : int
			// 0 ~ 1
			shadowOpacity: kvLookup("shadowOpacity", config, dataset, 0.2),

			// shadowSize: int
			// inner shadow size
			shadowSize: kvLookup("shadowSize", config, dataset, 5),

			// shadowVerticalOffset : int
			// how much shadow is offset from top
			shadowVerticalOffset: kvLookup("shadowVerticalOffset", config, dataset, 3),

			// levelColors : string[]
			// colors of indicator, from lower to upper, in RGB format
			levelColors: kvLookup("levelColors", config, dataset, ["#a9d70b", "#f9c802", "#ff0000"], "array", ","),

			// startAnimationTime : int
			// length of initial animation
			startAnimationTime: kvLookup("startAnimationTime", config, dataset, 700),

			// startAnimationType : string
			// type of initial animation (linear, >, <,  <>, bounce)
			startAnimationType: kvLookup("startAnimationType", config, dataset, ">"),

			// refreshAnimationTime : int
			// length of refresh animation
			refreshAnimationTime: kvLookup("refreshAnimationTime", config, dataset, 700),

			// refreshAnimationType : string
			// type of refresh animation (linear, >, <,  <>, bounce)
			refreshAnimationType: kvLookup("refreshAnimationType", config, dataset, ">"),

			// donutStartAngle : int
			// angle to start from when in donut mode
			donutStartAngle: kvLookup("donutStartAngle", config, dataset, 90),

			// valueMinFontSize : int
			// absolute minimum font size for the value
			valueMinFontSize: kvLookup("valueMinFontSize", config, dataset, 16),

			// labelMinFontSize
			// absolute minimum font size for the label
			labelMinFontSize: kvLookup("labelMinFontSize", config, dataset, 10),

			// minLabelMinFontSize
			// absolute minimum font size for the minimum label
			minLabelMinFontSize: kvLookup("minLabelMinFontSize", config, dataset, 10),

			// maxLabelMinFontSize
			// absolute minimum font size for the maximum label
			maxLabelMinFontSize: kvLookup("maxLabelMinFontSize", config, dataset, 10),

			// hideValue : bool
			// hide value text
			hideValue: kvLookup("hideValue", config, dataset, false),

			// hideMinMax : bool
			// hide min and max values
			hideMinMax: kvLookup("hideMinMax", config, dataset, false),

			// showInnerShadow : bool
			// show inner shadow
			showInnerShadow: kvLookup("showInnerShadow", config, dataset, false),

			// humanFriendly : bool
			// convert large numbers for min, max, value to human friendly (e.g. 1234567 -> 1.23M)
			humanFriendly: kvLookup("humanFriendly", config, dataset, false),

			// noGradient : bool
			// whether to use gradual color change for value, or sector-based
			noGradient: kvLookup("noGradient", config, dataset, false),

			// donut : bool
			// show full donut gauge
			donut: kvLookup("donut", config, dataset, false),

			// relativeGaugeSize : bool
			// whether gauge size should follow changes in container element size
			relativeGaugeSize: kvLookup("relativeGaugeSize", config, dataset, false),

			// counter : bool
			// animate level number change
			counter: kvLookup("counter", config, dataset, false),

			// decimals : int
			// number of digits after floating point
			decimals: kvLookup("decimals", config, dataset, 0),

			// customSectors : object
			// custom sectors colors. Expects an object with props
			// percents : bool hi/lo are percents values
			// ranges : array of objects : {hi, lo, color}
			customSectors: kvLookup("customSectors", config, dataset, {}),

			// formatNumber: boolean
			// formats numbers with commas where appropriate
			formatNumber: kvLookup("formatNumber", config, dataset, false),

			// pointer : bool
			// show value pointer
			pointer: kvLookup("pointer", config, dataset, false),

			// pointerOptions : object
			// define pointer look
			pointerOptions: kvLookup("pointerOptions", config, dataset, {}),

			// displayRemaining: boolean
			// replace display number with the number remaining to reach max
			displayRemaining: kvLookup("displayRemaining", config, dataset, false),
		};

		// variables
		let canvasW,
			canvasH,
			widgetW,
			widgetH,
			aspect,
			dx,
			dy,
			valueFontSize,
			valueX,
			valueY,
			labelFontSize,
			labelX,
			labelY,
			minFontSize,
			minX,
			minY,
			maxFontSize,
			maxX,
			maxY;

		// overflow values
		if (this.config.value > this.config.max) this.config.value = this.config.max;
		if (this.config.value < this.config.min) this.config.value = this.config.min;
		this.originalValue = kvLookup("value", config, dataset, -1, "float");

		// create canvas
		this.canvas = Raphael(this.config.element, "100%", "100%");

		// canvas dimensions
		if (this.config.relativeGaugeSize === true) {
			if (this.config.donut === true) {
				this.canvas.setViewBox(0, 0, 200, 200, true);
				canvasW = 200;
				canvasH = 200;
			} else {
				this.canvas.setViewBox(0, 0, 200, 100, true);
				canvasW = 200;
				canvasH = 100;
			}
		} else if (this.config.width !== null && this.config.height !== null) {
			canvasW = this.config.width;
			canvasH = this.config.height;
		} else if (this.config.parentNode !== null) {
			this.canvas.setViewBox(0, 0, 200, 100, true);
			canvasW = 200;
			canvasH = 100;
		} else {
			canvasW = Number(getStyle(this.config.element, "width").slice(0, -2)) * 1;
			canvasH = Number(getStyle(this.config.element, "height").slice(0, -2)) * 1;
		}

		// widget dimensions
		if (this.config.donut === true) {
			if (canvasW > canvasH) {
				// landscape
				widgetH = canvasH;
				widgetW = widgetH;
				// width less than height
			} else if (canvasW < canvasH) {
				// portrait
				widgetW = canvasW;
				widgetH = widgetW;
			} else {
				// square
				widgetW = canvasW;
				widgetH = widgetW;
			}

			// delta
			dx = (canvasW - widgetW) / 2;
			dy = (canvasH - widgetH) / 2;

			// value
			valueFontSize = widgetH / 6.4 > 16 ? widgetH / 5.4 : 18;
			valueX = dx + widgetW / 2;
			if (this.config.label !== "") {
				valueY = dy + widgetH / 1.85;
			} else {
				valueY = dy + widgetH / 1.7;
			}

			// label
			labelFontSize = widgetH / 16 > 10 ? widgetH / 16 : 10;
			labelX = dx + widgetW / 2;
			labelY = valueY + labelFontSize;

			// min
			minFontSize = widgetH / 16 > 10 ? widgetH / 16 : 10;
			minX = dx + widgetW / 10 + ((widgetW / 6.666666666666667) * this.config.gaugeWidthScale) / 2;
			minY = labelY;

			// max
			maxFontSize = widgetH / 16 > 10 ? widgetH / 16 : 10;
			maxX = dx + widgetW - widgetW / 10 - ((widgetW / 6.666666666666667) * this.config.gaugeWidthScale) / 2;
			maxY = labelY;
		} else {
			if (canvasW > canvasH) {
				// landscape
				widgetH = canvasH;
				widgetW = widgetH * 2;
				if (widgetW > canvasW) {
					// if width doesn't fit, rescale both
					aspect = widgetW / canvasW;
					widgetW = widgetW / aspect;
					widgetH = widgetH / aspect;
				}
			} else if (canvasW < canvasH) {
				// portrait
				widgetW = canvasW;
				widgetH = widgetW / 2;
			} else {
				// square
				widgetW = canvasW;
				widgetH = widgetW * 0.5;
			}

			// delta
			dx = (canvasW - widgetW) / 2;
			dy = (canvasH - widgetH) / 2;

			// value
			valueFontSize = widgetH / 6.5 > this.config.valueMinFontSize ? widgetH / 6.5 : this.config.valueMinFontSize;
			valueX = dx + widgetW / 2;
			valueY = dy + widgetH / 1.275;

			// label
			labelFontSize = widgetH / 16 > this.config.labelMinFontSize ? widgetH / 16 : this.config.labelMinFontSize;
			labelX = dx + widgetW / 2;
			labelY = valueY + valueFontSize / 2 + 5;

			// min
			minFontSize = widgetH / 16 > this.config.minLabelMinFontSize ? widgetH / 16 : this.config.minLabelMinFontSize;
			minX = dx + widgetW / 10 + ((widgetW / 6.666666666666667) * this.config.gaugeWidthScale) / 2;
			minY = labelY;

			// max
			maxFontSize = widgetH / 16 > this.config.maxLabelMinFontSize ? widgetH / 16 : this.config.maxLabelMinFontSize;
			maxX = dx + widgetW - widgetW / 10 - ((widgetW / 6.666666666666667) * this.config.gaugeWidthScale) / 2;
			maxY = labelY;
		}

		// parameters
		this.params = {
			canvasW: canvasW,
			canvasH: canvasH,
			widgetW: widgetW,
			widgetH: widgetH,
			dx: dx,
			dy: dy,
			valueFontSize: valueFontSize,
			valueX: valueX,
			valueY: valueY,
			labelFontSize: labelFontSize,
			labelX: labelX,
			labelY: labelY,
			minFontSize: minFontSize,
			minX: minX,
			minY: minY,
			maxFontSize: maxFontSize,
			maxX: maxX,
			maxY: maxY,
		};

		// var clear
		// canvasW, canvasH, widgetW, widgetH, aspect, dx, dy, valueFontSize, valueX, valueY, labelFontSize, labelX, labelY, minFontSize, minX, minY, maxFontSize, maxX, maxY = null

		/**
		 * pki - custom attribute for generating gauge paths
		 *
		 * @param {Number} value display value
		 * @returns SVG path string for gauge level
		 */
		this.canvas.customAttributes.pki = (value) => {
			let min = this.config.min;
			let max = this.config.max;
			const w = this.params.widgetW;
			const h = this.params.widgetH;
			const dx = this.params.dx;
			const dy = this.params.dy;
			const gws = this.config.gaugeWidthScale;
			const donut = this.config.donut;

			let alpha, Ro, Ri, Cx, Cy, Xo, Yo, Xi, Yi, path;

			if (min < 0) {
				max -= min;
				value -= min;
				min = 0;
			}

			if (donut) {
				alpha = (1 - (2 * (value - min)) / (max - min)) * Math.PI;
				Ro = w / 2 - w / 30;
				Ri = Ro - (w / 6.666666666666667) * gws;

				Cx = w / 2 + dx;
				Cy = h / 2 + dy;

				Xo = Cx + Ro * Math.cos(alpha);
				Yo = Cy - Ro * Math.sin(alpha);
				Xi = Cx + Ri * Math.cos(alpha);
				Yi = Cy - Ri * Math.sin(alpha);

				path = "M" + (Cx - Ri) + "," + Cy + " ";
				path += "L" + (Cx - Ro) + "," + Cy + " ";
				if (value - min > (max - min) / 2) {
					path += "A" + Ro + "," + Ro + " 0 0 1 " + (Cx + Ro) + "," + Cy + " ";
				}
				path += "A" + Ro + "," + Ro + " 0 0 1 " + Xo + "," + Yo + " ";
				path += "L" + Xi + "," + Yi + " ";
				if (value - min > (max - min) / 2) {
					path += "A" + Ri + "," + Ri + " 0 0 0 " + (Cx + Ri) + "," + Cy + " ";
				}
				path += "A" + Ri + "," + Ri + " 0 0 0 " + (Cx - Ri) + "," + Cy + " ";
				path += "Z ";

				return {
					path: path,
				};
			} else {
				alpha = (1 - (value - min) / (max - min)) * Math.PI;
				Ro = w / 2 - w / 10;
				Ri = Ro - (w / 6.666666666666667) * gws;

				Cx = w / 2 + dx;
				Cy = h / 1.25 + dy;

				// Xo = w / 2 + dx + Ro * Math.cos(alpha);
				// Yo = h - (h - Cy) - Ro * Math.sin(alpha);
				// Xi = w / 2 + dx + Ri * Math.cos(alpha);
				// Yi = h - (h - Cy) - Ri * Math.sin(alpha);

				Xo = Cx + Ro * Math.cos(alpha);
				Yo = Cy - Ro * Math.sin(alpha);
				Xi = Cx + Ri * Math.cos(alpha);
				Yi = Cy - Ri * Math.sin(alpha);

				path = "M" + (Cx - Ri) + "," + Cy + " ";
				path += "L" + (Cx - Ro) + "," + Cy + " ";
				path += "A" + Ro + "," + Ro + " 0 0 1 " + Xo + "," + Yo + " ";
				path += "L" + Xi + "," + Yi + " ";
				path += "A" + Ri + "," + Ri + " 0 0 0 " + (Cx - Ri) + "," + Cy + " ";
				path += "Z ";

				return {
					path: path,
				};
			}
		};

		/**
		 * ndl - custom attribute for generating pointer path
		 *
		 * @param {Number} value display value
		 * @returns SVG path string for gauge pointer
		 */
		this.canvas.customAttributes.ndl = function (value) {
			const min = this.config.min;
			const max = this.config.max;
			const w = this.params.widgetW;
			const h = this.params.widgetH;
			const dx = this.params.dx;
			const dy = this.params.dy;
			const gws = this.config.gaugeWidthScale;
			const donut = this.config.donut;

			let dlt = (w * 3.5) / 100;
			let dlb = w / 15;
			let dw = w / 100;

			if (this.config.pointerOptions.toplength != null && this.config.pointerOptions.toplength !== undefined) dlt = this.config.pointerOptions.toplength;
			if (this.config.pointerOptions.bottomlength != null && this.config.pointerOptions.bottomlength !== undefined)
				dlb = this.config.pointerOptions.bottomlength;
			if (this.config.pointerOptions.bottomwidth != null && this.config.pointerOptions.bottomwidth !== undefined)
				dw = this.config.pointerOptions.bottomwidth;

			let alpha, Ro, Ri, Cy, Xo, Yo, Xi, Yi, Xc, Yc, Xz, Yz, Xa, Ya, Xb, Yb, path;

			if (donut) {
				alpha = (1 - (2 * (value - min)) / (max - min)) * Math.PI;
				Ro = w / 2 - w / 30;
				Ri = Ro - (w / 6.666666666666667) * gws;

				// Cx = w / 2 + dx
				Cy = h / 2 + dy;

				Xo = w / 2 + dx + Ro * Math.cos(alpha);
				Yo = h - (h - Cy) - Ro * Math.sin(alpha);
				Xi = w / 2 + dx + Ri * Math.cos(alpha);
				Yi = h - (h - Cy) - Ri * Math.sin(alpha);

				Xc = Xo + dlt * Math.cos(alpha);
				Yc = Yo - dlt * Math.sin(alpha);
				Xz = Xi - dlb * Math.cos(alpha);
				Yz = Yi + dlb * Math.sin(alpha);

				Xa = Xz + dw * Math.sin(alpha);
				Ya = Yz + dw * Math.cos(alpha);
				Xb = Xz - dw * Math.sin(alpha);
				Yb = Yz - dw * Math.cos(alpha);

				path = "M" + Xa + "," + Ya + " ";
				path += "L" + Xb + "," + Yb + " ";
				path += "L" + Xc + "," + Yc + " ";
				path += "Z ";

				return {
					path: path,
				};
			} else {
				alpha = (1 - (value - min) / (max - min)) * Math.PI;
				Ro = w / 2 - w / 10;
				Ri = Ro - (w / 6.666666666666667) * gws;

				// Cx = w / 2 + dx
				Cy = h / 1.25 + dy;

				Xo = w / 2 + dx + Ro * Math.cos(alpha);
				Yo = h - (h - Cy) - Ro * Math.sin(alpha);
				Xi = w / 2 + dx + Ri * Math.cos(alpha);
				Yi = h - (h - Cy) - Ri * Math.sin(alpha);

				Xc = Xo + dlt * Math.cos(alpha);
				Yc = Yo - dlt * Math.sin(alpha);
				Xz = Xi - dlb * Math.cos(alpha);
				Yz = Yi + dlb * Math.sin(alpha);

				Xa = Xz + dw * Math.sin(alpha);
				Ya = Yz + dw * Math.cos(alpha);
				Xb = Xz - dw * Math.sin(alpha);
				Yb = Yz - dw * Math.cos(alpha);

				path = "M" + Xa + "," + Ya + " ";
				path += "L" + Xb + "," + Yb + " ";
				path += "L" + Xc + "," + Yc + " ";
				path += "Z ";

				return {
					path: path,
				};
			}
		};

		// gauge
		this.gauge = this.canvas.path().attr({
			stroke: "none",
			fill: this.config.gaugeColor,
			pki: [this.config.max],
		});

		// level
		this.level = this.canvas.path().attr({
			stroke: "none",
			fill: getColor(
				this.config.value,
				(this.config.value - this.config.min) / (this.config.max - this.config.min),
				this.config.levelColors,
				this.config.noGradient,
				this.config.customSectors,
			),
			pki: [this.config.min],
		});
		if (this.config.donut) {
			this.level.transform(
				"r" + this.config.donutStartAngle + ", " + (this.params.widgetW / 2 + this.params.dx) + ", " + (this.params.widgetH / 2 + this.params.dy),
			);
		}

		if (this.config.pointer) {
			// needle
			this.needle = this.canvas.path().attr({
				stroke: !isUndefined(this.config.pointerOptions.stroke) ? this.config.pointerOptions.stroke : "none",
				"stroke-width": !isUndefined(this.config.pointerOptions.stroke_width) ? this.config.pointerOptions.stroke_width : 0,
				"stroke-linecap": !isUndefined(this.config.pointerOptions.stroke_linecap) ? this.config.pointerOptions.stroke_linecap : "square",
				fill: !isUndefined(this.config.pointerOptions.color) ? this.config.pointerOptions.color : "#000000",
				ndl: [this.config.min],
			});

			if (this.config.donut) {
				this.needle.transform(
					"r" + this.config.donutStartAngle + ", " + (this.params.widgetW / 2 + this.params.dx) + ", " + (this.params.widgetH / 2 + this.params.dy),
				);
			}
		}

		// value
		this.txtValue = this.canvas.text(this.params.valueX, this.params.valueY, 0);
		this.txtValue.attr({
			"font-size": this.params.valueFontSize,
			"font-weight": "bold",
			"font-family": this.config.valueFontFamily,
			fill: this.config.valueFontColor,
			"fill-opacity": "0",
		});
		setDy(this.txtValue, this.params.valueFontSize, this.params.valueY);

		// label
		this.txtLabel = this.canvas.text(this.params.labelX, this.params.labelY, this.config.label);
		this.txtLabel.attr({
			"font-size": this.params.labelFontSize,
			"font-weight": "normal",
			"font-family": this.config.labelFontFamily,
			fill: this.config.labelFontColor,
			"fill-opacity": "0",
		});
		setDy(this.txtLabel, this.params.labelFontSize, this.params.labelY);

		// min
		let min = this.config.min;
		if (this.config.reverse) {
			min = this.config.max;
		}

		this.txtMinimum = min;
		if (this.config.minTxt) {
			this.txtMinimum = this.config.minTxt;
		} else if (this.config.humanFriendly) {
			this.txtMinimum = humanFriendlyNumber(min, this.config.humanFriendlyDecimal);
		} else if (this.config.formatNumber) {
			this.txtMinimum = formatNumber(min);
		}
		this.txtMin = this.canvas.text(this.params.minX, this.params.minY, this.txtMinimum);
		this.txtMin.attr({
			"font-size": this.params.minFontSize,
			"font-weight": "normal",
			"font-family": this.config.labelFontFamily,
			fill: this.config.labelFontColor,
			"fill-opacity": this.config.hideMinMax || this.config.donut ? "0" : "1",
		});
		setDy(this.txtMin, this.params.minFontSize, this.params.minY);

		// max
		let max = this.config.max;
		if (this.config.reverse) {
			max = this.config.min;
		}
		this.txtMaximum = max;
		if (this.config.maxTxt) {
			this.txtMaximum = this.config.maxTxt;
		} else if (this.config.humanFriendly) {
			this.txtMaximum = humanFriendlyNumber(max, this.config.humanFriendlyDecimal);
		} else if (this.config.formatNumber) {
			this.txtMaximum = formatNumber(max);
		}
		this.txtMax = this.canvas.text(this.params.maxX, this.params.maxY, this.txtMaximum);
		this.txtMax.attr({
			"font-size": this.params.maxFontSize,
			"font-weight": "normal",
			"font-family": this.config.labelFontFamily,
			fill: this.config.labelFontColor,
			"fill-opacity": this.config.hideMinMax || this.config.donut ? "0" : "1",
		});
		setDy(this.txtMax, this.params.maxFontSize, this.params.maxY);

		const defs = this.canvas.canvas.childNodes[1];
		const svg = "http://www.w3.org/2000/svg";

		if (ie !== undefined && ie < 9) {
			// VML mode - no SVG & SVG filter support
		} else if (ie !== undefined) {
			onCreateElementNsReady(() => {
				this.generateShadow(svg, defs);
			});
		} else {
			this.generateShadow(svg, defs);
		}

		// set value to display
		if (this.config.textRenderer && this.config.textRenderer(this.originalValue) !== false) {
			this.originalValue = this.config.textRenderer(this.originalValue);
		} else if (this.config.humanFriendly) {
			this.originalValue = humanFriendlyNumber(this.originalValue, this.config.humanFriendlyDecimal) + this.config.symbol;
		} else if (this.config.formatNumber) {
			this.originalValue = formatNumber(this.originalValue) + this.config.symbol;
		} else if (this.config.displayRemaining) {
			this.originalValue = ((this.config.max - this.originalValue) * 1).toFixed(this.config.decimals) + this.config.symbol;
		} else {
			this.originalValue = (this.originalValue * 1).toFixed(this.config.decimals) + this.config.symbol;
		}

		if (this.config.counter === true) {
			// on each animation frame
			const onFrame = () => {
				let currentValue = this.level.attr("pki")[0];
				if (this.config.reverse) {
					currentValue = this.config.max * 1 + this.config.min * 1 - this.level.attr("pki")[0] * 1;
				}
				if (this.config.textRenderer && this.config.textRenderer(Math.floor(currentValue)) !== false) {
					this.txtValue.attr("text", this.config.textRenderer(Math.floor(currentValue)));
				} else if (this.config.humanFriendly) {
					this.txtValue.attr("text", humanFriendlyNumber(Math.floor(currentValue), this.config.humanFriendlyDecimal) + this.config.symbol);
				} else if (this.config.formatNumber) {
					this.txtValue.attr("text", formatNumber(Math.floor(currentValue)) + this.config.symbol);
				} else if (this.config.displayRemaining) {
					this.txtValue.attr("text", ((this.config.max - currentValue) * 1).toFixed(this.config.decimals) + this.config.symbol);
				} else {
					this.txtValue.attr("text", (currentValue * 1).toFixed(this.config.decimals) + this.config.symbol);
				}
				setDy(this.txtValue, this.params.valueFontSize, this.params.valueY);
				currentValue = null;
			};

			// on animation end
			const onFinish = () => {
				this.txtValue.attr({
					text: this.originalValue,
				});
				setDy(this.txtValue, this.params.valueFontSize, this.params.valueY);
			};

			this.bindEvent("raphael.anim.finish", onFinish);
			this.bindEvent("raphael.anim.frame", onFrame);
		} else {
			// on animation start
			const onStart = () => {
				this.txtValue.attr({
					text: this.originalValue,
				});
				setDy(this.txtValue, this.params.valueFontSize, this.params.valueY);
			};

			this.bindEvent("raphael.anim.start", onStart);
		}

		// animate gauge level, value & label
		let rvl = this.config.value;
		if (this.config.reverse) {
			rvl = this.config.max * 1 + this.config.min * 1 - this.config.value * 1;
		}
		this.level.animate(
			{
				pki: [rvl],
			},
			this.config.startAnimationTime,
			this.config.startAnimationType,
			this.config.onAnimationEnd,
		);

		if (this.config.pointer) {
			this.needle.animate(
				{
					ndl: [rvl],
				},
				this.config.startAnimationTime,
				this.config.startAnimationType,
			);
		}

		this.txtValue.animate(
			{
				"fill-opacity": this.config.hideValue ? "0" : "1",
			},
			this.config.startAnimationTime,
			this.config.startAnimationType,
		);
		this.txtLabel.animate(
			{
				"fill-opacity": "1",
			},
			this.config.startAnimationTime,
			this.config.startAnimationType,
		);
	}

	/**
	 * Bind a function to a Raphael eve event
	 *
	 * @param {String} eventName Raphael event name
	 * @param {Function} func The function to call on that event
	 */
	bindEvent(eventName, func) {
		// add the level id to the event
		eventName += "." + this.level.id;

		// check for existing bind events
		if (this.events[eventName]) {
			Raphael.eve.off(eventName, this.events[eventName]);
		}

		Raphael.eve.on(eventName, func);

		this.events[eventName] = func;
	}
	/**
	 * Update Gauge values
	 *
	 * @param {Number} val The value
	 * @param {Number|String} max Max value
	 * @param {Number|String} min Min value
	 * @param {String} label The Label
	 */
	refresh(val, max, min, label) {
		let displayVal;

		max = isNumber(max) ? max : null;
		min = isNumber(min) ? min : null;
		label = label || null;

		// set label min
		if (label !== null) {
			this.config.label = label;

			this.txtLabel.attr({
				text: this.config.label,
			});
			setDy(this.txtLabel, this.params.labelFontSize, this.params.labelY);
		}

		// set new min
		if (min !== null) {
			this.config.min = min;
			// TODO: update customSectors

			this.txtMinimum = this.config.min;
			if (this.config.minTxt) {
				this.txtMinimum = this.config.minTxt;
			} else if (this.config.humanFriendly) {
				this.txtMinimum = humanFriendlyNumber(this.config.min, this.config.humanFriendlyDecimal);
			} else if (this.config.formatNumber) {
				this.txtMinimum = formatNumber(this.config.min);
			}
			if (!this.config.reverse) {
				this.txtMin.attr({
					text: this.txtMinimum,
				});
				setDy(this.txtMin, this.params.minFontSize, this.params.minY);
			} else {
				this.txtMax.attr({
					text: this.txtMinimum,
				});
				setDy(this.txtMax, this.params.minFontSize, this.params.minY);
			}
		}

		// set new max
		if (max !== null) {
			this.config.max = max;

			this.txtMaximum = this.config.max;
			if (this.config.maxTxt) {
				this.txtMaximum = this.config.maxTxt;
			} else if (this.config.humanFriendly) {
				this.txtMaximum = humanFriendlyNumber(this.config.max, this.config.humanFriendlyDecimal);
			} else if (this.config.formatNumber) {
				this.txtMaximum = formatNumber(this.config.max);
			}
			if (!this.config.reverse) {
				this.txtMax.attr({
					text: this.txtMaximum,
				});
				setDy(this.txtMax, this.params.maxFontSize, this.params.maxY);
			} else {
				this.txtMin.attr({
					text: this.txtMaximum,
				});
				setDy(this.txtMin, this.params.maxFontSize, this.params.maxY);
			}
		}

		// overflow values
		displayVal = val;
		if (val * 1 > this.config.max * 1) {
			val = this.config.max * 1;
		}
		if (val * 1 < this.config.min * 1) {
			val = this.config.min * 1;
		}

		const color = getColor(
			val,
			(val - this.config.min) / (this.config.max - this.config.min),
			this.config.levelColors,
			this.config.noGradient,
			this.config.customSectors,
		);

		if (this.config.textRenderer && this.config.textRenderer(displayVal) !== false) {
			displayVal = this.config.textRenderer(displayVal);
		} else if (this.config.humanFriendly) {
			displayVal = humanFriendlyNumber(displayVal, this.config.humanFriendlyDecimal) + this.config.symbol;
		} else if (this.config.formatNumber) {
			displayVal = formatNumber((displayVal * 1).toFixed(this.config.decimals)) + this.config.symbol;
		} else if (this.config.displayRemaining) {
			displayVal = ((this.config.max - displayVal) * 1).toFixed(this.config.decimals) + this.config.symbol;
		} else {
			displayVal = (displayVal * 1).toFixed(this.config.decimals) + this.config.symbol;
		}
		this.originalValue = displayVal;
		this.config.value = val * 1;

		if (!this.config.counter) {
			this.txtValue.attr({
				text: displayVal,
			});
			setDy(this.txtValue, this.params.valueFontSize, this.params.valueY);
		}

		let rvl = this.config.value;
		if (this.config.reverse) {
			rvl = this.config.max * 1 + this.config.min * 1 - this.config.value * 1;
		}

		this.level.animate(
			{
				pki: [rvl],
				fill: color,
			},
			this.config.refreshAnimationTime,
			this.config.refreshAnimationType,
			this.config.onAnimationEnd,
		);

		if (this.config.pointer) {
			this.needle.animate(
				{
					ndl: [rvl],
				},
				this.config.refreshAnimationTime,
				this.config.refreshAnimationType,
			);
		}
	}

	/**
	 * Update Gauge options
	 *
	 * @param options {String} option The target option name
	 * @param val {Number|String} val The value to be assigned to the option
	 *
	 * Alternative signature
	 * @param options {String|Object} options name and value
	 */
	update(options, val) {
		const obj = this;

		// options as an object of option/val values
		if (options instanceof Object) {
			for (const option in options) {
				val = options[option];
				updateProp(obj, option, val);
			}

			// options as single option/val
		} else {
			updateProp(obj, options, val);
		}
	}
	/**
	 * Destroy the Gauge Object and unbind events
	 *
	 */
	destroy() {
		if (this.node && this.node.parentNode) this.node.innerHTML = "";

		for (const event in this.events) {
			Raphael.eve.off(event, this.events[event]);
		}

		this.events = {};
	}

	/**
	 * Generate Shadow
	 *
	 * @param {Object} svg The Svg element Object
	 * @param {Object} defs The defs element Object
	 */
	generateShadow(svg, defs) {
		const sid = "inner-shadow-" + (this.config.element.id || this.config.classId);

		// FILTER
		const gaussFilter = document.createElementNS(svg, "filter");
		gaussFilter.setAttribute("id", sid);
		defs.appendChild(gaussFilter);

		// offset
		const feOffset = document.createElementNS(svg, "feOffset");
		feOffset.setAttribute("dx", "0");
		feOffset.setAttribute("dy", this.config.shadowVerticalOffset);
		gaussFilter.appendChild(feOffset);

		// blur
		const feGaussianBlur = document.createElementNS(svg, "feGaussianBlur");
		feGaussianBlur.setAttribute("result", "offset-blur");
		feGaussianBlur.setAttribute("stdDeviation", this.config.shadowSize);
		gaussFilter.appendChild(feGaussianBlur);

		// composite 1
		const feComposite1 = document.createElementNS(svg, "feComposite");
		feComposite1.setAttribute("operator", "out");
		feComposite1.setAttribute("in", "SourceGraphic");
		feComposite1.setAttribute("in2", "offset-blur");
		feComposite1.setAttribute("result", "inverse");
		gaussFilter.appendChild(feComposite1);

		// flood
		const feFlood = document.createElementNS(svg, "feFlood");
		feFlood.setAttribute("flood-color", "black");
		feFlood.setAttribute("flood-opacity", this.config.shadowOpacity);
		feFlood.setAttribute("result", "color");
		gaussFilter.appendChild(feFlood);

		// composite 2
		const feComposite2 = document.createElementNS(svg, "feComposite");
		feComposite2.setAttribute("operator", "in");
		feComposite2.setAttribute("in", "color");
		feComposite2.setAttribute("in2", "inverse");
		feComposite2.setAttribute("result", "shadow");
		gaussFilter.appendChild(feComposite2);

		// composite 3
		const feComposite3 = document.createElementNS(svg, "feComposite");
		feComposite3.setAttribute("operator", "over");
		feComposite3.setAttribute("in", "shadow");
		feComposite3.setAttribute("in2", "SourceGraphic");
		gaussFilter.appendChild(feComposite3);

		// set shadow
		if (this.config.showInnerShadow) {
			this.canvas.canvas.childNodes[2].setAttribute("filter", "url(#" + sid + ")");
			this.canvas.canvas.childNodes[3].setAttribute("filter", "url(#" + sid + ")");
		}
	}
}

/**
 * Utility function to update properties to a JustGage object
 *
 * @param obj {JustGage Object} JustGage object to apply the property update to
 * @param option {String} option name
 * @param val {String} option value
 */
function updateProp(obj, option, val) {
	switch (option) {
		case "valueFontColor":
			if (!isHexColor(val)) {
				console.log("* justgage: the updated valueFontColor value is not a valid hex color");
				break;
			}

			obj.txtValue.attr({
				fill: val,
			});
			break;

		case "labelFontColor":
			if (!isHexColor(val)) {
				console.log("* justgage: the updated labelFontColor value is not a valid hex color");
				break;
			}

			obj.txtMin.attr({
				fill: val,
			});
			obj.txtMax.attr({
				fill: val,
			});
			obj.txtLabel.attr({
				fill: val,
			});

			break;

		default:
			console.log(`* justgage: "${option}" is not a supported update setting`);
	}
}

//
// tiny helper function to lookup value of a key from two hash tables
// if none found, return defaultvalue
//
// key: string
// tablea: object
// tableb: DOMStringMap|object
// defval: string|integer|float|null
// datatype: return datatype
// delimiter: delimiter to be used in conjunction with datatype formatting
//
function kvLookup(key, tablea, tableb, defval, datatype, delimiter) {
	let val = defval;
	let canConvert = false;
	if (!isUndefined(key)) {
		if (!isUndefined(tableb) && typeof tableb === "object" && key in tableb) {
			val = tableb[key];
			canConvert = true;
		} else if (!isUndefined(tablea) && typeof tablea === "object" && key in tablea) {
			val = tablea[key];
			canConvert = true;
		} else {
			val = defval;
		}
		if (canConvert === true) {
			if (!isUndefined(datatype)) {
				switch (datatype) {
					case "int":
						val = parseInt(val, 10);
						break;
					case "float":
						val = parseFloat(val);
						break;
					default:
						break;
				}
			}
		}
	}
	return val;
}

function isUndefined(v) {
	return v === null || v === undefined;
}

/** Get color for value */
function getColor(val, pct, col, noGradient, custSec) {
	let percentage, rval, gval, bval, lower, upper, range, rangePct, pctLower, pctUpper, color;
	const cust = custSec && custSec.ranges && custSec.ranges.length > 0;
	noGradient = noGradient || cust;

	if (cust) {
		if (custSec.percents === true) val = pct * 100;
		for (let i = 0; i < custSec.ranges.length; i++) {
			if (val >= custSec.ranges[i].lo && val <= custSec.ranges[i].hi) {
				return custSec.ranges[i].color;
			}
		}
	}

	const no = col.length;
	if (no === 1) return col[0];
	const inc = noGradient ? 1 / no : 1 / (no - 1);
	const colors = [];
	for (let i = 0; i < col.length; i++) {
		percentage = noGradient ? inc * (i + 1) : inc * i;
		rval = parseInt(cutHex(col[i]).substring(0, 2), 16);
		gval = parseInt(cutHex(col[i]).substring(2, 4), 16);
		bval = parseInt(cutHex(col[i]).substring(4, 6), 16);
		colors[i] = {
			pct: percentage,
			color: {
				r: rval,
				g: gval,
				b: bval,
			},
		};
	}

	if (pct === 0) {
		return "rgb(" + [colors[0].color.r, colors[0].color.g, colors[0].color.b].join(",") + ")";
	}

	for (let j = 0; j < colors.length; j++) {
		if (pct <= colors[j].pct) {
			if (noGradient) {
				return "rgb(" + [colors[j].color.r, colors[j].color.g, colors[j].color.b].join(",") + ")";
			} else {
				lower = colors[j - 1];
				upper = colors[j];
				range = upper.pct - lower.pct;
				rangePct = (pct - lower.pct) / range;
				pctLower = 1 - rangePct;
				pctUpper = rangePct;
				color = {
					r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
					g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
					b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper),
				};
				return "rgb(" + [color.r, color.g, color.b].join(",") + ")";
			}
		}
	}
}

/** Fix Raphael display:none tspan dy attribute bug */
function setDy(elem, fontSize, txtYpos) {
	if ((!ie || ie > 9) && elem.node.firstChild.attributes.dy) {
		elem.node.firstChild.attributes.dy.value = 0;
	}
}

/**  Cut hex  */
function cutHex(str) {
	return str.charAt(0) === "#" ? str.substring(1, 7) : str;
}

/**
 * Validate if html hex color presentation
 *
 * @param val
 * @returns {*|boolean}
 */
function isHexColor(val) {
	const regExp = /^#([0-9A-Fa-f]{3}){1,2}$/;
	return typeof val === "string" && regExp.test(val);
}

/**  Human friendly number suffix - @robertsLando */
function humanFriendlyNumber(n, d) {
	const d2 = Math.pow(10, d);
	const s = " KMGTPE";
	let i = 0;
	const c = 1000;

	while ((n >= c || n <= -c) && ++i < s.length) n = n / c;

	i = i >= s.length ? s.length - 1 : i;

	return Math.round(n * d2) / d2 + s[i];
}

/** Format numbers with commas - From: http://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript */
function formatNumber(x) {
	const parts = x.toString().split(".");
	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	return parts.join(".");
}

/**  Get style  */
function getStyle(oElm, strCssRule) {
	let strValue = "";
	if (document.defaultView && document.defaultView.getComputedStyle) {
		strValue = document.defaultView.getComputedStyle(oElm, "").getPropertyValue(strCssRule);
	} else if (oElm.currentStyle) {
		strCssRule = strCssRule.replace(/-(\w)/g, function (strMatch, p1) {
			return p1.toUpperCase();
		});
		strValue = oElm.currentStyle[strCssRule];
	}
	return strValue;
}

/**  Create Element NS Ready  */
function onCreateElementNsReady(func) {
	if (document.createElementNS !== undefined) {
		func();
	} else {
		setTimeout(function () {
			onCreateElementNsReady(func);
		}, 100);
	}
}

/**  Get IE version  */
// ----------------------------------------------------------
// A short snippet for detecting versions of IE in JavaScript
// without resorting to user-agent sniffing
// ----------------------------------------------------------
// If you're not in IE (or IE version is less than 5) then:
// ie === undefined
// If you're in IE (>=5) then you can determine which version:
// ie === 7; // IE7
// Thus, to detect IE:
// if (ie) {}
// And to detect the version:
// ie === 6 // IE6
// ie > 7 // IE8, IE9 ...
// ie < 9 // Anything less than IE9
// ----------------------------------------------------------
// UPDATE: Now using Live NodeList idea from @jdalton
const ie = (function () {
	let v = 3;
	const div = document.createElement("div");
	const all = div.getElementsByTagName("i");

	while (all[0]) {
		div.innerHTML = "<!--[if gt IE " + ++v + "]><i></i><![endif]-->";
	}
	return v > 4 ? v : undefined;
})();

// extend target object with second object
function extend(out) {
	out = out || {};

	for (let i = 1; i < arguments.length; i++) {
		if (!arguments[i]) {
			continue;
		}

		for (const key in arguments[i]) {
			if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
				out[key] = arguments[i][key];
			}
		}
	}

	return out;
}

function isNumber(n) {
	return n !== null && n !== undefined && !isNaN(n);
}

/**
 * Generate UUID
 * @returns UUID
 */
function uuid() {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
		const r = (Math.random() * 16) | 0;
		const v = c === "x" ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}
