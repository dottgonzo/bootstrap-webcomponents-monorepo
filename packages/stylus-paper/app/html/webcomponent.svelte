<svelte:options tag="hb-stylus-paper" />

<script lang="ts">
	import { get_current_component, onDestroy, onMount } from "svelte/internal";

	import { createEventDispatcher } from "svelte";
	import parseStyle from "style-to-object";
	import { addComponent, getChildStyleToPass } from "@htmlbricks/hb-jsutils/main";
	import type { Component, IStroke } from "@app/types/webcomponent.type";

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

	export let save_as: Component["save_as"];

	let index = 0;
	let pointerIsOnSelect: boolean;

	let version: number;

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

	let svgDom: SVGSVGElement;

	let pointerType: string = "";
	let containerPos: { left: number; top: number };
	let mouseButton: any = 0;

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

	function exportDraw(s: Component["save_as"]) {
		if (s) {
			switch (s.type) {
				case "json":
					return dispatch("save", { type: "json", draw, id: id, draw_id, name: s.name, version });
				default:
					return console.error("unknown save type");
			}
		}
	}

	let draw: IStroke[];
	let format = false;
	let pencilStatus: "drawing" | "erasing" | "selecting" | "idle" = "idle";
	let thereIsSelectedStrokes: number;

	let moveFromX: number;
	let moveFromY: number;
	let startMove: boolean = false;
	let selectMinXStart: number;
	let selectMinYStart: number;
	let selectMaxXStart: number;
	let selectMaxYStart: number;

	$: {
		if (svgDom) {
			containerPos = svgDom.getBoundingClientRect();

			if (!id) id = "";
			if (style) {
				parsedStyle = parseStyle(style);
				// componentStyleToSet = getChildStyleToPass(parsedStyle, componentStyleSetup?.vars);
			}
			if (typeof save_as === "string" && (save_as as string)?.length) {
				try {
					save_as = JSON.parse(save_as);
				} catch (err) {
					console.error("error parsing json", err);
				}
			}
			if (draw?.length && save_as) {
				exportDraw(save_as);
			}
			if (!draw_id) draw_id = Math.random().toString(36) + Math.random().toString(36) + Date.now().toString();

			if (!draw) {
				draw = [];
			}
			// mode
			if (!mode) mode = "draw";
			if (mode && mode !== "select" && thereIsSelectedStrokes) {
				thereIsSelectedStrokes = 0;
				const oldDraw = [...draw];
				oldDraw.forEach((stroke) => {
					stroke.selected = false;
					if (stroke.type === "multiplestroke")
						stroke.multipath.forEach((stroke) => {
							stroke.selected = false;
						});
				});
				draw = [...oldDraw];
			}
			if (mode !== "select") {
				selectMaxX = 0;
				selectMaxY = 0;
				selectMinX = 0;
				selectMinY = 0;
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
			if (goto && goto < 0) {
				index = -1;
				// goto = null;
			} else if (goto || goto === 0) {
				if (goto > draw.length) goto = draw.length;
				index = goto + 0;
				goto = null;
				dispatch("changeIndex", { index: index, draw_id, id });

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

			if (load_draw && (!version || version < load_draw.version || draw_id !== load_draw.draw_id)) {
				draw = load_draw.draw.filter((f) => f.visible && f.type === "stroke");
				index = draw.length - 1;
				draw_id = load_draw.draw_id;
				version = load_draw.version;
				load_draw = null;
				dispatch("historyIndex", { index: index, draw_id, id });
			}

			stroke = getStroke(draw[index]?.path || [], Object.assign({ simulatePressure: pointerType === "pen" ? false : true }, options));
			pathData = getSvgPathFromStroke(stroke);

			if (!options.size) options.size = defaultOptions.size;
			if (!options.thinning) options.thinning = defaultOptions.thinning;
			if (!options.smoothing) options.smoothing = defaultOptions.smoothing;
			if (!options.streamline) options.streamline = defaultOptions.streamline;
			console.log("set index to", index, "from goto", goto, "historyActions", draw.length);
		}
	}

	function eraseHere(e: PointerEvent) {
		const pathId = (e.target as unknown as any)?.id?.split("_")?.[1];
		if (pathId) {
			let oldDraw = [...draw];

			const stroke = oldDraw.find((s) => s.id === pathId);
			if (stroke) {
				stroke.visible = false;
				stroke.erasedAtIndex = index;
				console.info("erase stroke", stroke.id);

				if (oldDraw[oldDraw.length - 1].type !== "eraser") {
					oldDraw = oldDraw.slice(0, index + 1);

					oldDraw.push({
						type: "eraser",
						visible: true,
						id: Math.random().toString(36) + Math.random().toString(36) + Date.now().toString(),
						actionIndex: draw.length,
					});
					oldDraw.forEach((stroke, i) => {
						if (!stroke.visible && stroke.erasedAtIndex > index) {
							stroke.visible = true;
							stroke.erasedAtIndex = null;
						}
					});
					draw = [...oldDraw];

					index++;
					dispatch("historyIndex", { index: index, draw_id, id });
				} else {
					draw = [...oldDraw];
				}

				// with multiple!?
				// if (historyActions[historyActions.length - 1]?.action !== "erase" || historyActions[historyActions.length - 1]?.index !== index) {
				// 	historyActions.push({ action: "erase", index: index });
				// }
			}
		}
	}

	function handlePointerDown(e: PointerEvent) {
		// wip on auto detect pointer type
		pointerType = e.pointerType;

		mouseButton = e.buttons;
		version++;
		if (mode === "draw" && e.buttons === 1 && !(e.pointerType === "pen" && e.pressure === 0)) {
			pencilStatus = "drawing";
			if (index !== draw.length - 1) {
				const oldDraw = [...draw];

				oldDraw.forEach((stroke, i) => {
					if (!stroke.visible && stroke.erasedAtIndex > index) {
						stroke.visible = true;
						stroke.erasedAtIndex = null;
					}
				});
				draw = oldDraw;

				// 	dispatch("historyIndex", { index: historyActions.length - 1, draw_id, id });
			}
			if (draw?.length && index < draw.length) {
				if (!format) {
					index++;
					const oldDraw = [...draw];

					draw = oldDraw.slice(0, index);
				} else {
					draw = [];
					format = false;
				}
			}
			dispatch("historyIndex", { index: index, draw_id, id });

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
						pathData: pathData,
						min: [strokeMinX, strokeMinY],
						max: [strokeMaxX, strokeMaxY],
						visible: true,
						actionIndex: draw.length,
						opacity: pen_opacity,
						type: "stroke",
					},
				];
			} else {
				draw = [
					{
						path: [[e.pageX - containerPos.left, e.pageY - containerPos.top, e.pressure]],
						color: pen_color,
						id: stroke_id,
						pathData: pathData,
						min: [strokeMinX, strokeMinY],
						max: [strokeMaxX, strokeMaxY],
						visible: true,
						actionIndex: draw.length,
						opacity: pen_opacity,
						type: "stroke",
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
		} else if (mode === "select" && draw.length) {
			let isSelected = false;

			const pointerIsOnSelectX = e.pageX - containerPos.left;
			const pointerIsOnSelectY = e.pageY - containerPos.top;
			isSelected =
				pointerIsOnSelectX > selectMinX && pointerIsOnSelectX < selectMaxX && pointerIsOnSelectY > selectMinY && pointerIsOnSelectY < selectMaxY;

			selectMinX = e.pageX - containerPos.left;
			selectMinY = e.pageY - containerPos.top;

			selectMaxX = e.pageX - containerPos.left;
			selectMaxY = e.pageY - containerPos.top;

			if (!startMove && !thereIsSelectedStrokes && isSelected) {
				pencilStatus = "idle";

				thereIsSelectedStrokes = Date.now();

				console.info("set move mode");
				const oldDraw = [...draw];
				moveFromX = e.pageX - containerPos.left;
				moveFromY = e.pageY - containerPos.top;
				// hide selected strokes
				oldDraw
					.filter((f) => f.selected)
					.forEach((f) => {
						f.visible = false;
						f.erasedAtIndex = index;
					});
				// copy all selected strokes inside new path that contains all of them
				const newMultiPath = JSON.parse(JSON.stringify(draw.filter((f) => f.selected)));

				newMultiPath.forEach((m) => {
					m.visible = true;
				});

				oldDraw.push({
					multipath: newMultiPath,
					id: thereIsSelectedStrokes.toString(),
					type: "multiplestroke",
					actionIndex: index,
					visible: true,
					min: [selectMinX, selectMinY],
					max: [selectMaxX, selectMaxY],
				});
				draw = [...oldDraw];
				// index++;
				console.log(draw, index);
				startMove = true;
				selectMinXStart = selectMinX;
				selectMinYStart = selectMinY;
				selectMaxXStart = selectMaxX;
				selectMaxYStart = selectMaxY;
			} else {
				pencilStatus = "selecting";
				thereIsSelectedStrokes = 0;
			}
		}
	}
	function handlePointerMove(e: PointerEvent) {
		pointerType = e.pointerType;
		mouseButton = e.buttons + " " + [e.pageX - containerPos.left, e.pageY - containerPos.top, e.pressure].toString();

		if (mode === "draw" && pencilStatus === "drawing" && e.buttons === 1 && !(e.pointerType === "pen" && e.pressure === 0)) {
			draw[index].path = [...draw[index].path, [e.pageX - containerPos.left, e.pageY - containerPos.top, e.pressure]];
			draw[index].pathData = pathData;

			if (e.pageX - containerPos.left < strokeMinX) strokeMinX = e.pageX - containerPos.left;
			if (e.pageY - containerPos.top < strokeMinY) strokeMinY = e.pageY - containerPos.top;
			if (e.pageX - containerPos.left > strokeMaxX) strokeMaxX = e.pageX - containerPos.left;
			if (e.pageY - containerPos.top > strokeMaxY) strokeMaxY = e.pageY - containerPos.top;

			draw[index].min = [strokeMinX, strokeMinY];
			draw[index].max = [strokeMaxX, strokeMaxY];
		} else if (
			pencilStatus === "erasing" &&
			(mode === "eraser" || (mode === "draw" && ((e.pointerType === "pen" && e.pressure === 0 && e.buttons === 1) || e.buttons === 32)))
		) {
			// eraser
			console.log("eraser move");
			eraseHere(e);
		} else if (mode === "select" && pencilStatus === "selecting") {
			selectMaxX = e.pageX - containerPos.left;
			selectMaxY = e.pageY - containerPos.top;

			// console.log("selecting", selectMinX, selectMinY, selectMaxX, selectMaxY
		} else if (mode === "select" && !startMove) {
			const pointerIsOnSelectX = e.pageX - containerPos.left;
			const pointerIsOnSelectY = e.pageY - containerPos.top;
			const isSelected =
				pointerIsOnSelectX > selectMinX && pointerIsOnSelectX < selectMaxX && pointerIsOnSelectY > selectMinY && pointerIsOnSelectY < selectMaxY;
			if (isSelected && !pointerIsOnSelect) {
				pointerIsOnSelect = true;

				console.log("on select", pointerIsOnSelect);
			} else if (!isSelected && pointerIsOnSelect) {
				pointerIsOnSelect = false;
				console.log("off select", pointerIsOnSelect);
			}
		} else if (startMove && draw[index].type === "multiplestroke" && thereIsSelectedStrokes.toString() === draw[index].id) {
			const oldDraw = [...draw];

			// move selected strokes
			const moveToX = e.pageX - containerPos.left;
			const moveToY = e.pageY - containerPos.top;

			const moveX = moveToX - moveFromX;
			const moveY = moveToY - moveFromY;
			console.info("move selected strokes on multistrokes", moveFromX, moveFromY, moveX, moveY);

			oldDraw[index].multipath.forEach((f) => {
				const oldStroke = draw.find((d) => d.id === f.id);

				f.path.forEach((p, i) => {
					if (i === 0) console.log("debug path ", p[0], oldStroke.path[i][0], draw);
					p[0] = oldStroke.path[i][0] + moveX;
					p[1] = oldStroke.path[i][1] + moveY;
				});
				const thestroke = getStroke(f.path || [], Object.assign({ simulatePressure: pointerType === "pen" ? false : true }, options));
				f.pathData = getSvgPathFromStroke(thestroke);
			});
			selectMinX = selectMinXStart + moveX;
			selectMinY = selectMinYStart + moveY;
			selectMaxX = selectMaxXStart + moveX;
			selectMaxY = selectMaxYStart + moveY;

			draw = [...oldDraw];
		}
	}

	function handlePointerUp(e: PointerEvent) {
		mouseButton = e.buttons;
		startMove = false;

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
			index++;
			dispatch("historyIndex", { index: index, draw_id, id });
		} else if (
			mode === "eraser" ||
			(mode === "draw" && pencilStatus !== "drawing" && ((e.pointerType === "pen" && e.pressure === 0 && e.buttons === 1) || e.buttons === 32))
		) {
			// eraser
			console.log("eraser up");
			eraseHere(e);
		} else if (mode === "select") {
			const oldDraw = [...draw];
			oldDraw.forEach((stroke) => {
				stroke.selected = false;
				if (stroke.type === "multiplestroke")
					stroke.multipath.forEach((stroke) => {
						stroke.selected = false;
					});
			});
			draw = [...oldDraw];
			thereIsSelectedStrokes = 0;

			const minX = selectMinX < selectMaxX ? selectMinX : selectMaxX;
			const minY = selectMinY < selectMaxY ? selectMinY : selectMaxY;
			const maxX = selectMinX > selectMaxX ? selectMinX : selectMaxX;
			const maxY = selectMinY > selectMaxY ? selectMinY : selectMaxY;

			const selectedStrokes = oldDraw.filter((stroke) => {
				return stroke.min[0] > minX && stroke.min[1] > minY && stroke.max[0] < maxX && stroke.max[1] < maxY;
			});

			console.table({ minX, minY, maxX, maxY, selectedStrokes });

			if (selectedStrokes.length > 0) {
				for (const stroke of selectedStrokes) {
					stroke.selected = true;
				}
				draw = [...oldDraw];

				console.log(selectedStrokes);

				dispatch("selection", { minX: selectMinX, minY: selectMinY, maxX: selectMaxX, maxY: selectMaxY, strokes: selectedStrokes, id, draw_id });
			} else {
				selectMinX = 0;
				selectMinY = 0;
				selectMaxX = 0;
				selectMaxY = 0;
			}

			// console.log("selecting", selectMinX, selectMinY, selectMaxX, selectMaxY
		}
		pencilStatus = "idle";

		if (e?.pointerId) (e.target as unknown as any)?.releasePointerCapture?.(e.pointerId);
	}

	onMount(() => {
		svgDom = component.shadowRoot.querySelector("svg");
		let retryToMount = 0;
		const interval = setInterval(() => {
			svgDom = component.shadowRoot.querySelector("svg");
			if (svgDom) {
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
		if (!svgDom) return console.error("no canvas found on mount");
	});
</script>

<div id="debug" style="display:{debug === 'yes' ? 'block' : 'none'}">{pointerType} b: {mouseButton}</div>
<svg
	on:pointerdown={handlePointerDown}
	on:pointermove={handlePointerMove}
	on:pointerup={handlePointerUp}
	style="background-color:{background_color};cursor:{pointerIsOnSelect === true ? 'move' : 'default'}"
>
	<!-- {#if draw?.length} -->
	{#if svgDom}
		<g>
			{#each draw.filter((f) => f.type === "stroke" && f.path) as stroke (stroke.id)}
				{#if stroke.actionIndex <= index && !format && (stroke.visible || stroke.erasedAtIndex > index)}
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
			{#each draw.filter((f) => f.type === "multiplestroke") as multistroke (multistroke.id)}
				{#each multistroke.multipath as stroke (stroke.id)}
					{#if stroke.actionIndex <= index && !format && (stroke.visible || stroke.erasedAtIndex > index)}
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
			{/each}
			{#if mode === "select"}
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
	{/if}
</svg>

<style lang="scss">
	@import "../styles/webcomponent.scss";
	// @import "../styles/bootstrap.scss";
</style>
