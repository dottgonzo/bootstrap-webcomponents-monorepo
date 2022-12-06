<svelte:options tag="hb-stylus-paper" />

<script lang="ts">
	import { get_current_component, onDestroy, onMount } from "svelte/internal";

	import { createEventDispatcher } from "svelte";
	import parseStyle from "style-to-object";
	import { addComponent, getChildStyleToPass } from "@htmlbricks/hb-jsutils/main";
	import type { Component, TPath, TDraw } from "@app/types/webcomponent.type";

	import { getStroke } from "perfect-freehand";

	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();

	function dispatch(name, detail) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}

	export let index: number;
	let lastIndex = 0;

	export let id: string;
	export let style: string;

	export let background_color: Component["background_color"];
	export let pen_color: Component["pen_color"];
	export let options: Component["options"];

	let pointerType: string;

	const defaultOptions: Component["options"] = {
		size: 6,
		thinning: 0.7,
		smoothing: 0.5,
		streamline: 0.5,
	};

	// let cv: HTMLCanvasElement;
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

	function goto(i: number) {
		if (i > -1) {
			if (!draw[i]) return console.info("no draw");
			if (i === index) return console.info("same draw");
			console.log("goto", i);
			points = draw[i].path;
			pathData = draw[i].pathData;
			stroke_id = draw[i].id;
			stroke_start = draw[i].start;
			strokeMinX = draw[i].min[0];
			strokeMinY = draw[i].min[1];
			strokeMaxX = draw[i].max[0];
			strokeMaxY = draw[i].max[1];
		} else {
			console.log("no more");
		}
	}

	let draw: TDraw;

	$: {
		if (!id) id = "";
		if (style) {
			parsedStyle = parseStyle(style);
			// componentStyleToSet = getChildStyleToPass(parsedStyle, componentStyleSetup?.vars);
		}
		if (!index) index = 0;
		if (!background_color) background_color = "rgb(255,255,255)";
		if (!pen_color) pen_color = "rgb(0,0,0)";
		if (!draw) draw = [];
		// if (cv) configureSign();

		stroke = getStroke(points, options);
		pathData = getSvgPathFromStroke(stroke);

		// json
		if (typeof options === "string" && (options as string)?.length) {
			try {
				options = JSON.parse(options);
			} catch (err) {
				console.error("error parsing json", err);
			}
		} else if (!options) {
			options = defaultOptions;
		}

		if (!options.size) options.size = defaultOptions.size;
		if (!options.thinning) options.thinning = defaultOptions.thinning;
		if (!options.smoothing) options.smoothing = defaultOptions.smoothing;
		if (!options.streamline) options.streamline = defaultOptions.streamline;
	}

	let points: TPath = [];

	function handlePointerDown(e: PointerEvent) {
		// wip on auto detect pointer type
		pointerType = e.pointerType;

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
		(e.target as unknown as any).setPointerCapture(e.pointerId);
		if (points?.length) {
			console.info("pushing draw");
			if (index !== lastIndex) {
				index++;
				draw = draw.slice(0, index + 1);
				lastIndex = index;
			}
			if (draw.length) {
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
						visible: true,
						index: lastIndex,
					},
				];
			} else {
				draw = [
					{
						path: points,
						color: pen_color,
						id: stroke_id,
						start: stroke_start,
						end: stroke_start,
						pathData: pathData,
						min: [strokeMinX, strokeMinY],
						max: [strokeMaxX, strokeMaxY],
						visible: true,
						index: lastIndex,
					},
				];
			}
		}

		points = [[e.pageX, e.pageY, e.pressure]];
		dispatch("startStroke", { start: stroke_start, id: stroke_id });
		lastIndex++;
	}
	function handlePointerMove(e: PointerEvent) {
		if (e.buttons !== 1) return;
		points = [...points, [e.pageX, e.pageY, e.pressure]];

		if (e.pageX < strokeMinX) strokeMinX = e.pageX;
		if (e.pageY < strokeMinY) strokeMinY = e.pageY;
		if (e.pageX > strokeMaxX) strokeMaxX = e.pageX;
		if (e.pageY > strokeMaxY) strokeMaxY = e.pageY;
	}

	function handlePointerUp(e: PointerEvent) {
		const stroke_end = new Date();
		(e.target as unknown as any).releasePointerCapture(e.pointerId);

		dispatch("endStroke", {
			end: stroke_end,
			id: stroke_id,
			start: stroke_start,
			min: [strokeMinX, strokeMinY],
			max: [strokeMaxX, strokeMaxY],
			pathData: pathData,
			color: pen_color,
		});
	}

	// onMount(() => {
	// cv = component.shadowRoot.querySelector("canvas");
	// let retryToMount = 0;
	// const interval = setInterval(() => {
	// 	cv = component.shadowRoot.querySelector("canvas");
	// 	if (cv) {
	// 		clearInterval(interval);
	// 		// configureSign();
	// 	} else {
	// 		retryToMount++;
	// 		if (retryToMount > 10) {
	// 			clearInterval(interval);
	// 			console.warn("no canvas found on check " + retryToMount);
	// 		} else {
	// 			console.error("no canvas found on check " + retryToMount + " end");
	// 		}
	// 	}
	// }, 100);
	// if (!cv) return console.error("no canvas found on mount");
	// configureSign();
	//  component.style.cssText = componentStyleToSet;
	// });
</script>

<svg on:pointerdown={handlePointerDown} on:pointermove={handlePointerMove} on:pointerup={handlePointerUp} style="background-color:{background_color}">
	<!-- {#if draw?.length} -->
	{#each draw as stroke (stroke.id)}
		<g id={stroke.id}><path d={stroke.pathData} fill={stroke.color} /></g>
	{/each}
	<!-- {/if} -->
	{#if points?.length}
		<g id="foreground"><path d={pathData} fill={pen_color} /></g>
	{/if}
</svg>

<style lang="scss">
	@import "../styles/webcomponent.scss";
	@import "../styles/bootstrap.scss";
</style>
