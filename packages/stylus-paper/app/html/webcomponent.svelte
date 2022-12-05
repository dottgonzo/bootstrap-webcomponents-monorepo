<svelte:options tag="hb-stylus-paper" />

<script lang="ts">
	import { get_current_component, onDestroy, onMount } from "svelte/internal";

	import { createEventDispatcher } from "svelte";
	import parseStyle from "style-to-object";
	import { addComponent, getChildStyleToPass } from "@htmlbricks/hb-jsutils/main";
	import type { Component, TPath, TDraw } from "@app/types/webcomponent.type";

	// import SignaturePad from "signature_pad";

	import { getStroke } from "perfect-freehand";

	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();

	function dispatch(name, detail) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}

	export let id: string;
	export let style: string;

	export let background_color: Component["background_color"];
	export let pen_color: Component["pen_color"];

	let cv: HTMLCanvasElement;
	let start_drawing_date: Date;

	let stroke_id: string;
	let stroke_start: Date;

	let strokeMinX = 0;
	let strokeMinY = 0;

	let strokeMaxX = 0;
	let strokeMaxY = 0;

	let parsedStyle: { [x: string]: string };
	//  let componentStyleToSet: string = "";

	let stroke: number[][];
	let pathData: string;

	function getSvgPathFromStroke(stroke: number[][]) {
		if (!stroke.length) return "";

		const d = stroke.reduce(
			(acc, [x0, y0], i, arr) => {
				const [x1, y1] = arr[(i + 1) % arr.length];
				acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
				return acc;
			},
			["M", ...stroke[0], "Q"],
		);

		d.push("Z");
		return d.join(" ");
	}
	let draw: TDraw;

	let drawLength = 0;

	$: {
		if (!id) id = "";
		if (style) {
			parsedStyle = parseStyle(style);
			// componentStyleToSet = getChildStyleToPass(parsedStyle, componentStyleSetup?.vars);
		}
		if (!background_color) background_color = "rgb(255,255,255)";
		if (!pen_color) pen_color = "rgb(0,0,0)";
		if (!draw) draw = [];
		// if (cv) configureSign();

		const options = {
			size: 32,
			thinning: 0.5,
			smoothing: 0.5,
			streamline: 0.5,
			easing: (t) => t,
			start: {
				taper: 0,
				easing: (t) => t,
				cap: true,
			},
			end: {
				taper: 100,
				easing: (t) => t,
				cap: true,
			},
		};

		stroke = getStroke(points, options);
		pathData = getSvgPathFromStroke(stroke);

		drawLength = draw.length;
		if (draw.length) console.log("drawLength", drawLength, draw.length, draw);
		// json
		// if (typeof json === "string") {
		// 	try {
		// 		json = JSON.parse(json);
		// 	} catch (err) {
		// 		console.error("error parsing json", err);
		// 	}
		// }
		// // boolean
		// if (boolean === ("" as unknown)) boolean = true;
		// if (typeof boolean === "string") boolean = boolean === "no" || boolean === "false" ? false : true;
		// if (!boolean) boolean = false;
	}

	function configureFreeHand() {
		// const fHand=new FreeHand({
		//   canvas: cv,
		//   width: cv.width,
		//   height: cv.height,
		//   lineWidth: 2,
		//   lineColor: pen_color,
		//   lineCap: 'round',
		//   lineJoin: 'round',
		//   undo: 90,
		//   throttle: 16,
		//   smoothing: 0.2,
		//   minDistance: 5,
		//   useWacom: true
		// 	}

		const options = {
			size: 32,
			thinning: 0.5,
			smoothing: 0.5,
			streamline: 0.5,
			easing: (t) => t,
			start: {
				taper: 0,
				easing: (t) => t,
				cap: true,
			},
			end: {
				taper: 100,
				easing: (t) => t,
				cap: true,
			},
		};
	}

	let points: TPath = [];

	function handlePointerDown(e: any) {
		console.log("down");
		stroke_start = new Date();
		stroke_id = Date.now().toString();
		strokeMinX = e.pageX;
		strokeMinY = e.pageY;
		strokeMaxX = e.pageX;
		strokeMaxY = e.pageY;
		if (!start_drawing_date) {
			start_drawing_date = stroke_start;
			dispatch("startStroke", { date: start_drawing_date });
		}
		e.target.setPointerCapture(e.pointerId);
		if (points?.length) {
			console.info("pushing draw");
			draw = [
				...draw,
				{
					path: points,
					color: pen_color,
					id: stroke_id,
					start: stroke_start,
					end: stroke_start,
					pathData: pathData,
					min: [strokeMinX, strokeMinY],
					max: [strokeMaxX, strokeMaxY],
				},
			];
		}

		points = [[e.pageX, e.pageY, e.pressure]];
		dispatch("startStroke", { start: stroke_start, min: [strokeMinX, strokeMinY], max: [strokeMaxX, strokeMaxY], id: stroke_id });
	}
	function handlePointerMove(e: any) {
		if (e.buttons !== 1) return;
		points = [...points, [e.pageX, e.pageY, e.pressure]];

		if (e.pageX < strokeMinX) strokeMinX = e.pageX;
		if (e.pageY < strokeMinY) strokeMinY = e.pageY;
		if (e.pageX > strokeMaxX) strokeMaxX = e.pageX;
		if (e.pageY > strokeMaxY) strokeMaxY = e.pageY;

		console.log("move");
	}

	function handlePointerUp(e: any) {
		const stroke_end = new Date();

		dispatch("endStroke", { end: stroke_end, id: stroke_id, start: stroke_start, min: [strokeMinX, strokeMinY], max: [strokeMaxX, strokeMaxY] });

		// points = [];
	}

	// function configureSign() {
	// 	if (background_color) cv.style.backgroundColor = background_color;
	// 	if (signaturePad) {
	// 		signaturePad.penColor = pen_color;
	// 		// signaturePad.backgroundColor = background_color;
	// 		return console.warn("signaturePad already configured");
	// 	}

	// 	const signOpts = {
	// 		penColor: pen_color,
	// 		// backgroundColor: background_color, // necessary for saving image as JPEG; can be removed is only saving as PNG or SVG
	// 	};
	// 	signaturePad = new SignaturePad(cv, signOpts);
	// 	signaturePad.addEventListener("beginStroke", () => {
	// 		stroke_start = new Date();
	// 		stroke_id = Date.now() + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
	// 		if (!start_drawinpointsg_date) {
	// 			start_drawing_date = stroke_start;
	// 			stroke_id = Date.now().toString();
	// 			dispatch("startStroke", { date: start_drawing_date });
	// 		}
	// 		dispatch("beginStroke", { stroke_start, stroke_id });
	// 	});
	// 	signaturePad.addEventListener("endStroke", () => {
	// 		const stroke_end = new Date();
	// 		dispatch("endStroke", { stroke_end, stroke_id, stroke_start });
	// 		stroke_start = undefined;
	// 		stroke_id = undefined;
	// 	});
	// 	signaturePad.addEventListener("beforeUpdateStroke", (e: any) => {
	// 		console.log("beforeUpdateStroke", signaturePad.dotSize, e.detail.pressure);
	// 		signaturePad.dotSize = e.detail.pressure;
	// 	});
	// 	signaturePad.addEventListener("afterUpdateStroke", (e: any) => {
	// 		console.log("afterUpdateStroke", signaturePad.dotSize, e.detail.pressure);
	// 		signaturePad.dotSize = e.detail.pressure;
	// 	});
	// }

	onMount(() => {
		cv = component.shadowRoot.querySelector("canvas");
		let retryToMount = 0;
		const interval = setInterval(() => {
			cv = component.shadowRoot.querySelector("canvas");
			if (cv) {
				clearInterval(interval);
				// configureSign();
			} else {
				retryToMount++;
				if (retryToMount > 10) {
					clearInterval(interval);
					console.warn("no canvas found on check " + retryToMount);
				} else {
					console.error("no canvas found on check " + retryToMount + " end");
				}
			}
		}, 100);
		if (!cv) return console.error("no canvas found on mount");
		// configureSign();

		//  component.style.cssText = componentStyleToSet;
	});

	function dispatchDrawEvent() {
		dispatch("draw", { type: "point" });
	}

	function handleMouseEvent(event: any) {
		console.log(event);
	}
</script>

<canvas id="stylus-canvas" part="stylus-canvas" />
aa
<svg on:pointerdown={handlePointerDown} on:pointermove={handlePointerMove} on:pointerup={handlePointerUp} style="touchAction: none">
	<!-- {#if draw?.length} -->
	{#each draw as stroke (stroke.id)}
		<g id={stroke.id}><path d={stroke.pathData} stroke={pen_color} /></g>
	{/each}
	<!-- {/if} -->
	{#if points?.length}
		<g id="foreground"><path d={pathData} /></g>
	{/if}
</svg>

<style lang="scss">
	@import "../styles/webcomponent.scss";
	@import "../styles/bootstrap.scss";
</style>
