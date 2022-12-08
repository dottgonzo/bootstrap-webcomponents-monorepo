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

	export let id: string;
	export let style: string;

	export let background_color: Component["background_color"];
	export let pen_color: Component["pen_color"];

	export let pen_opacity: Component["pen_opacity"];

	export let options: Component["options"];

	export let goto: Component["goto"];

	export let mode: Component["mode"];

	let index = 0;

	export const next = () => {
		// if (index < draw.length - 1) {
		// 	index++;
		// }
	};

	export const previous = () => {
		// if (index > 0) {
		// 	index--;
		// }
	};
	// export let next: () => void;
	// export let previous: () => void;

	let pointerType: string;

	let historyActions: { action: "draw" | "erase"; index: number }[] = [];

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

	function gotoIndex(i: number) {
		if (i > -1) {
			if (!draw[i]) return console.info("no draw");
			if (i === index) return console.info("same draw");
			index = i;
		} else {
			console.log("no more");
		}
	}

	let draw: TDraw;
	let format = false;
	$: {
		if (!id) id = "";
		if (style) {
			parsedStyle = parseStyle(style);
			// componentStyleToSet = getChildStyleToPass(parsedStyle, componentStyleSetup?.vars);
		}
		// mode
		if (!mode) mode = "draw";

		if (!draw) {
			draw = [];
		}
		if (typeof pen_opacity === "string") pen_opacity = Number(pen_opacity);
		if (!pen_opacity) pen_opacity = 1;
		if (typeof goto === "string") goto = Number(goto);

		if (!draw.length) {
			index = 0;
			goto = null;
		}

		if (!index) {
			index = 0;
		}
		if ((goto && goto < 0) || goto === 0) {
			index = -1;
			// goto = null;
		} else if (goto || goto === 0) {
			if (goto > historyActions.length) goto = historyActions.length;
			index = historyActions[goto - 1]?.index || 0;
			console.log("set index to", index, "from goto", goto, "historyActions", historyActions);
			// const oldDraw = [...draw];
			// // const newDraw = oldDraw.slice(0, index + 1);
			// oldDraw.forEach((stroke, i) => {
			// 	if (!stroke.visible && stroke.erasedAtIndex < goto) {
			// 		stroke.visible = true;
			// 		stroke.erasedAtIndex = null;
			// 	}
			// });

			// draw = newDraw;
		}
		if (index < 0) {
			index = 0;
			format = true;
		} else if (index >= 0) {
			format = false;
		}

		if (!background_color) background_color = "rgb(255,255,255)";
		if (!pen_color) pen_color = "rgb(0,0,0)";
		// if (cv) configureSign();

		stroke = getStroke(draw[index]?.path || [], Object.assign({ simulatePressure: pointerType === "pen" ? false : true }, options));
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
		console.table([{ l: historyActions.length, index, goto }]);
	}

	function eraseHere(e: PointerEvent) {
		if (mode === "eraser") {
			const pathId = (e.target as unknown as any)?.id?.split("_")?.[1];
			console.info("erase here", e.pageX, e.pageY, e.target, pathId);
			if (pathId) {
				const oldDraw = [...draw];

				const stroke = oldDraw.find((s) => s.id === pathId);
				if (stroke) {
					stroke.visible = false;
					stroke.erasedAtIndex = index;
					console.info("erase stroke", stroke.id);
					draw = [...oldDraw];

					// with multiple!?
					if (historyActions[historyActions.length - 1]?.action !== "erase" || historyActions[historyActions.length - 1]?.index !== index) {
						historyActions.push({ action: "erase", index: index });
					}
				}
			}
		}
	}

	function handlePointerDown(e: PointerEvent) {
		if (mode === "draw") {
			if (historyActions.length && goto) {
				historyActions = historyActions.slice(0, historyActions.findIndex((f) => f.index === goto && f.action === "draw") + 1);
			}
			if (draw?.length && index < draw.length) {
				if (!format) {
					index++;
					draw = draw.slice(0, index);
				} else {
					draw = [];
					format = false;
				}
			}

			goto = null;

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

			if (draw?.length) {
				console.info("pushing draw");

				draw = [
					...draw,
					{
						path: [[e.pageX, e.pageY, e.pressure]],
						color: pen_color,
						id: stroke_id,
						start: stroke_start,
						end: stroke_start,
						pathData: pathData,
						min: [strokeMinX, strokeMinY],
						max: [strokeMaxX, strokeMaxY],
						visible: true,
						lineIndex: index,
						actionIndex: historyActions.length,
						opacity: pen_opacity,
					},
				];
			} else {
				draw = [
					{
						path: [[e.pageX, e.pageY, e.pressure]],
						color: pen_color,
						id: stroke_id,
						start: stroke_start,
						end: stroke_start,
						pathData: pathData,
						min: [strokeMinX, strokeMinY],
						max: [strokeMaxX, strokeMaxY],
						visible: true,
						lineIndex: index,
						actionIndex: historyActions.length,
						opacity: pen_opacity,
					},
				];
			}

			dispatch("startStroke", { start: stroke_start, id: stroke_id, index: index });
		} else if (mode === "eraser") {
			// eraser
			console.log("eraser down");
			eraseHere(e);
		}
	}
	function handlePointerMove(e: PointerEvent) {
		if (e.buttons !== 1) return;
		if (mode === "draw") {
			draw[index].path = [...draw[index].path, [e.pageX, e.pageY, e.pressure]];
			draw[index].pathData = pathData;

			if (e.pageX < strokeMinX) strokeMinX = e.pageX;
			if (e.pageY < strokeMinY) strokeMinY = e.pageY;
			if (e.pageX > strokeMaxX) strokeMaxX = e.pageX;
			if (e.pageY > strokeMaxY) strokeMaxY = e.pageY;
		} else if (mode === "eraser") {
			// eraser
			console.log("eraser move");
			eraseHere(e);
		}
	}

	function handlePointerUp(e: PointerEvent) {
		if (mode === "draw") {
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
				index: index,
			});
			historyActions.push({ action: "draw", index: index });
			index++;
		} else if (mode === "eraser") {
			// eraser
			console.log("eraser up");
			eraseHere(e);
		}
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
	<g>
		{#each draw as stroke (stroke.id)}
			{#if stroke.lineIndex <= index && !format && (stroke.visible || stroke.erasedAtIndex > index)}
				<path id={"path_" + stroke.id} d={stroke.pathData} fill={stroke.color} fill-opacity={stroke.opacity} />
			{/if}
		{/each}

		<!-- {/if} -->
		<!-- {#if points?.length}
		<g id="foreground"><path d={pathData} fill={pen_color} /></g>
	{/if} -->
	</g>
</svg>

<style lang="scss">
	@import "../styles/webcomponent.scss";
	@import "../styles/bootstrap.scss";
</style>
