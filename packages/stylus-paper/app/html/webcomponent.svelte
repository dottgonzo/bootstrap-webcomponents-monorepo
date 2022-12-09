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

	export let draw_id: string;

	export let background_color: Component["background_color"];
	export let pen_color: Component["pen_color"];

	export let pen_opacity: Component["pen_opacity"];

	export let options: Component["options"];

	export let goto: Component["goto"];

	export let mode: Component["mode"];

	export let debug: Component["debug"];

	export let load_draw: Component["load_draw"];

	export let save: Component["save"];

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

	let pointerType: string = "";
	let containerPos: { left: number; top: number };
	let mouseButton: any = 0;

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

	let selectMinX = 0;
	let selectMinY = 0;
	let selectMaxX = 0;
	let selectMaxY = 0;

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

	function exportDraw(s: Component["save"]) {
		if (s) {
			switch (s.type) {
				case "json":
					return dispatch("save", { type: "json", data: draw, id: id, draw_id, name: s.name });
				default:
					return console.error("unknown save type");
			}
		}
	}

	let draw: TDraw;
	let format = false;
	let pencilStatus: "drawing" | "erasing" | "selecting" | "idle" = "idle";
	let thereIsSelectedStrokes = false;
	let loadTime: Date;
	$: {
		if (draw?.length && save) {
			exportDraw(save);
		}
		if (!id) id = "";
		if (style) {
			parsedStyle = parseStyle(style);
			// componentStyleToSet = getChildStyleToPass(parsedStyle, componentStyleSetup?.vars);
		}
		if (!draw_id) draw_id = Math.random().toString(36) + Math.random().toString(36) + Date.now().toString();

		if (!draw) {
			draw = [];
		}
		// mode
		if (!mode) mode = "draw";
		if (mode && mode !== "select" && thereIsSelectedStrokes) {
			thereIsSelectedStrokes = false;
			const oldDraw = [...draw];
			oldDraw.forEach((stroke) => {
				stroke.selected = false;
			});
			draw = [...oldDraw];
		}

		if (debug !== "yes") debug = "no";
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

		if (typeof load_draw === "string" && (load_draw as string)?.length) {
			try {
				load_draw = JSON.parse(load_draw);
			} catch (err) {
				console.error("error parsing json", err);
			}
		} else if (!load_draw) {
			load_draw = null;
		}

		if (load_draw && (!loadTime || loadTime.valueOf() < load_draw.time.valueOf())) {
			draw = load_draw.draw.filter((f) => f.visible);
			index = draw.length - 1;
			load_draw = null;
			draw_id = load_draw.draw_id;
			historyActions = [];
		}

		stroke = getStroke(draw[index]?.path || [], Object.assign({ simulatePressure: pointerType === "pen" ? false : true }, options));
		pathData = getSvgPathFromStroke(stroke);

		if (!options.size) options.size = defaultOptions.size;
		if (!options.thinning) options.thinning = defaultOptions.thinning;
		if (!options.smoothing) options.smoothing = defaultOptions.smoothing;
		if (!options.streamline) options.streamline = defaultOptions.streamline;
	}

	function eraseHere(e: PointerEvent) {
		const pathId = (e.target as unknown as any)?.id?.split("_")?.[1];
		console.info("erase here", e.pageX - containerPos.left, e.pageY - containerPos.top, e.target, pathId);
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

	function handlePointerDown(e: PointerEvent) {
		// wip on auto detect pointer type
		pointerType = e.pointerType;

		// @ts-ignore
		containerPos = e?.target?.getBoundingClientRect?.() || { left: 0, top: 0 };
		console.log("pos", containerPos);

		mouseButton = e.buttons;

		if (mode === "draw" && e.buttons === 1 && !(e.pointerType === "pen" && e.pressure === 0)) {
			pencilStatus = "drawing";
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

			stroke_start = new Date();
			stroke_id = Date.now().toString();
			strokeMinX = e.pageX - containerPos.left;
			strokeMinY = e.pageY - containerPos.top;
			strokeMaxX = e.pageX - containerPos.left;
			strokeMaxY = e.pageY - containerPos.top;

			if (!start_drawing_date) {
				start_drawing_date = stroke_start;
				dispatch("startStroke", { date: start_drawing_date, id: id, draw_id });
			}
			(e.target as unknown as any).setPointerCapture(e.pointerId);

			if (draw?.length) {
				console.info("pushing draw");

				draw = [
					...draw,
					{
						path: [[e.pageX - containerPos.left, e.pageY - containerPos.top, e.pressure]],
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
						path: [[e.pageX - containerPos.left, e.pageY - containerPos.top, e.pressure]],
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

			dispatch("startStroke", { start: stroke_start, stroke_id: stroke_id, index: index, id: id, draw_id });
		} else if (mode === "eraser" || (mode === "draw" && ((e.pointerType === "pen" && e.pressure === 0 && e.buttons === 1) || e.buttons === 32))) {
			(e.target as unknown as any).setPointerCapture(e.pointerId);
			pencilStatus = "erasing";

			// eraser
			console.log("eraser down");
			eraseHere(e);
		} else if (mode === "select") {
			selectMinX = e.pageX - containerPos.left;
			selectMinY = e.pageY - containerPos.top;

			selectMaxX = e.pageX - containerPos.left;
			selectMaxY = e.pageY - containerPos.top;

			pencilStatus = "selecting";
		}
	}
	function handlePointerMove(e: PointerEvent) {
		// @ts-ignore
		if (!containerPos) containerPos = e?.target?.getBoundingClientRect?.() || { left: 0, top: 0 };

		pointerType = e.pointerType;
		mouseButton = e.buttons + " " + [e.pageX - containerPos.left, e.pageY - containerPos.top, e.pressure].toString();

		if (mode === "draw" && pencilStatus === "drawing" && e.buttons === 1 && !(e.pointerType === "pen" && e.pressure === 0)) {
			draw[index].path = [...draw[index].path, [e.pageX - containerPos.left, e.pageY - containerPos.top, e.pressure]];
			draw[index].pathData = pathData;

			if (e.pageX - containerPos.left < strokeMinX) strokeMinX = e.pageX - containerPos.left;
			if (e.pageY - containerPos.top < strokeMinY) strokeMinY = e.pageY - containerPos.top;
			if (e.pageX - containerPos.left > strokeMaxX) strokeMaxX = e.pageX - containerPos.left;
			if (e.pageY - containerPos.top > strokeMaxY) strokeMaxY = e.pageY - containerPos.top;
		} else if (
			mode === "eraser" ||
			(mode === "draw" && pencilStatus !== "drawing" && ((e.pointerType === "pen" && e.pressure === 0 && e.buttons === 1) || e.buttons === 32))
		) {
			// eraser
			console.log("eraser move");
			eraseHere(e);
		} else if (mode === "select" && pencilStatus === "selecting") {
			selectMaxX = e.pageX - containerPos.left;
			selectMaxY = e.pageY - containerPos.top;

			// console.log("selecting", selectMinX, selectMinY, selectMaxX, selectMaxY
		}
	}

	function handlePointerUp(e: PointerEvent) {
		mouseButton = e.buttons;
		containerPos = null;

		if (mode === "draw" && pencilStatus === "drawing") {
			const stroke_end = new Date();

			dispatch("endStroke", {
				end: stroke_end,
				stroke_id: stroke_id,
				start: stroke_start,
				min: [strokeMinX, strokeMinY],
				max: [strokeMaxX, strokeMaxY],
				pathData: pathData,
				color: pen_color,
				index: index,
				id,
				draw_id,
			});
			historyActions.push({ action: "draw", index: index });
			index++;
		} else if (
			mode === "eraser" ||
			(mode === "draw" && pencilStatus !== "drawing" && ((e.pointerType === "pen" && e.pressure === 0 && e.buttons === 1) || e.buttons === 32))
		) {
			// eraser
			console.log("eraser up");
			eraseHere(e);
		} else if (mode === "select" && pencilStatus === "selecting") {
			const oldDraw = [...draw];
			if (thereIsSelectedStrokes) {
				oldDraw.forEach((stroke) => {
					stroke.selected = false;
				});
				draw = [...oldDraw];
				thereIsSelectedStrokes = false;
			}

			const minX = selectMinX < selectMaxX ? selectMinX : selectMaxX;
			const minY = selectMinY < selectMaxY ? selectMinY : selectMaxY;
			const maxX = selectMinX > selectMaxX ? selectMinX : selectMaxX;
			const maxY = selectMinY > selectMaxY ? selectMinY : selectMaxY;

			const selectedStrokes = oldDraw.filter((stroke) => {
				return stroke.min[0] > minX && stroke.min[1] > minY && stroke.max[0] < maxX && stroke.max[1] < maxY;
			});

			if (selectedStrokes.length > 0) {
				thereIsSelectedStrokes = true;

				for (const stroke of selectedStrokes) {
					stroke.selected = true;
				}
				draw = [...oldDraw];

				console.log(selectedStrokes);

				dispatch("selection", { minX: selectMinX, minY: selectMinY, maxX: selectMaxX, maxY: selectMaxY, strokes: selectedStrokes, id, draw_id });
			}

			// console.log("selecting", selectMinX, selectMinY, selectMaxX, selectMaxY
		}
		pencilStatus = "idle";

		if (e?.pointerId) (e.target as unknown as any)?.releasePointerCapture?.(e.pointerId);
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

<div id="debug" style="display:{debug === 'yes' ? 'block' : 'none'}">{pointerType} b: {mouseButton}</div>
<svg on:pointerdown={handlePointerDown} on:pointermove={handlePointerMove} on:pointerup={handlePointerUp} style="background-color:{background_color}">
	<!-- {#if draw?.length} -->
	<g>
		{#each draw as stroke (stroke.id)}
			{#if stroke.lineIndex <= index && !format && (stroke.visible || stroke.erasedAtIndex > index)}
				{#if stroke.selected}
					<path
						id={"path_" + stroke.id}
						d={stroke.pathData}
						fill={stroke.color}
						fill-opacity={stroke.opacity}
						stroke-linecap="round"
						stroke="red"
						stroke-width="2"
					/>
				{:else}
					<path id={"path_" + stroke.id} d={stroke.pathData} fill={stroke.color} fill-opacity={stroke.opacity} />
				{/if}
			{/if}
		{/each}

		{#if mode === "select" && pencilStatus === "selecting"}
			{#if selectMinX <= selectMaxX && selectMinY <= selectMaxY}
				<rect
					id="selector"
					x={selectMinX}
					y={selectMinY}
					width={selectMaxX - selectMinX}
					height={selectMaxY - selectMinY}
					fill="none"
					stroke="red"
					stroke-width="1"
				/>
			{:else if selectMinX > selectMaxX && selectMinY < selectMaxY}
				<rect
					id="selector"
					x={selectMaxX}
					y={selectMinY}
					width={selectMinX - selectMaxX}
					height={selectMaxY - selectMinY}
					fill="none"
					stroke="red"
					stroke-width="1"
				/>
			{:else if selectMinX < selectMaxX && selectMinY > selectMaxY}
				<rect
					id="selector"
					x={selectMinX}
					y={selectMaxY}
					width={selectMaxX - selectMinX}
					height={selectMinY - selectMaxY}
					fill="none"
					stroke="red"
					stroke-width="1"
				/>
			{:else}
				<rect
					id="selector"
					x={selectMaxX}
					y={selectMaxY}
					width={selectMinX - selectMaxX}
					height={selectMinY - selectMaxY}
					fill="none"
					stroke="red"
					stroke-width="1"
				/>
			{/if}
		{/if}

		<!-- {/if} -->
		<!-- {#if points?.length}
		<g id="foreground"><path d={pathData} fill={pen_color} /></g>
	{/if} -->
	</g>
</svg>

<style lang="scss">
	@import "../styles/webcomponent.scss";
	// @import "../styles/bootstrap.scss";
</style>
