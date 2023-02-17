<svelte:options tag="hb-stylus-paper" />

<script lang="ts">
	import { get_current_component, onDestroy, onMount } from "svelte/internal";

	import { createEventDispatcher } from "svelte";
	import parseStyle from "style-to-object";
	import { addComponent, getChildStyleToPass } from "wc-js-utils/main";
	import type { Component, IStroke, Events } from "@app/types/webcomponent.type";

	import { getStroke } from "perfect-freehand";

	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();

	function dispatch(name: string, detail: any) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}

	export let id: string;
	export let style: string;

	export let draw_id: string;

	export let background_color: Component["background_color"];
	export let pen_color: Component["pen_color"];

	export let insert_image: Component["insert_image"];
	export let insert_text: Component["insert_text"];

	export let pen_opacity: Component["pen_opacity"];

	export let options: Component["options"];

	export let goto: Component["goto"];

	export let mode: Component["mode"];

	export let debug: Component["debug"];

	export let load_draw: Component["load_draw"];

	export let save_as: Component["save_as"];
	export let size: Component["size"];
	export let view: Component["view"];
	let viewStatus: {
		containerWidth: number;
		containerHeight: number;
		drawWidth: number;
		drawHeight: number;
		paperWidth: number;
		paperHeight: number;
	};

	const defaultSize: Component["size"] = {
		paperSize: "A4",
	};
	const defaultView: Component["view"] = {
		zoom: { type: "fit", value: 1 },
		pan: { x: 0, y: 0 },
		lockPan: false,
		lockZoom: false,
	};
	let start_index: number;

	let index = 0;
	let pointerIsOnSelect: boolean;

	let version: number = 0;

	let svgDom: SVGSVGElement;
	let containerDom: HTMLElement;

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

	function exportDraw(s: Component["save_as"]) {
		if (s) {
			switch (s.type) {
				case "json":
					const drawToSave: IStroke[] = [];
					for (const s of draw) {
						if (s.visible) {
							if (s.type === "stroke") {
								s.actionIndex = 0;
								drawToSave.push(s);
							} else if (s.type === "multiplestroke") {
								for (const s2 of s.multipath.filter((f) => f.visible)) {
									s2.actionIndex = 0;
									drawToSave.push(s2);
								}
							}
						}
					}

					return dispatchSave({ type: "json", draw: drawToSave, id: id, draw_id, name: s.name, version: version + 1, size });
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

	function dispatchDrawLoaded(d: Events["drawLoaded"]) {
		dispatch("drawLoaded", d);
	}
	function dispatchSave(d: Events["save"]) {
		dispatch("save", d);
	}
	function dispatchHistoryStatus(d: Events["historyIndex"]) {
		dispatch("historyIndex", d);
	}
	function dispatchChangeIndex(d: Events["changeIndex"]) {
		dispatch("changeIndex", d);
	}
	function dispatchSelection(d: Events["selection"]) {
		dispatch("selection", d);
	}
	function dispatchStartStroke(d: Events["startStroke"]) {
		dispatch("startStroke", d);
	}
	function dispatchEndStroke(d: Events["endStroke"]) {
		dispatch("endStroke", d);
	}
	function dispatchImageLoaded(d: Events["imageLoaded"]) {
		dispatch("imageLoaded", d);
	}
	function dispatchTxtLoaded(d: Events["txtLoaded"]) {
		dispatch("txtLoaded", d);
	}

	function updateSvgDomWindowStatus() {
		containerPos = svgDom.getBoundingClientRect();

		if (!viewStatus) viewStatus = {} as any;
		viewStatus.containerWidth = containerDom.clientWidth;
		viewStatus.containerHeight = containerDom.clientHeight;
		viewStatus.drawWidth = svgDom.clientWidth;
		viewStatus.drawHeight = svgDom.clientHeight;

		switch (size.paperSize) {
			case "A3":
				viewStatus.paperWidth = 297;
				viewStatus.paperHeight = 420;
				break;
			case "A4":
			default:
				viewStatus.paperWidth = 210;
				viewStatus.paperHeight = 297;
				break;
		}
	}
	$: {
		if (!id) id = "";
		if (style) {
			parsedStyle = parseStyle(style);
			// componentStyleToSet = getChildStyleToPass(parsedStyle, componentStyleSetup?.vars);
		}
		if (!size) {
			size = Object.assign({}, defaultSize);
		} else if (typeof size === "string") {
			try {
				size = JSON.parse(size);
			} catch (err) {
				console.error("error parsing size json", err);
			}
		}
		if (!view) {
			view = Object.assign({}, defaultView);
		} else if (typeof view === "string") {
			try {
				view = JSON.parse(view);
			} catch (err) {
				console.error("error parsing view json", err);
			}
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
		if (typeof save_as === "string" && (save_as as string)?.length) {
			try {
				save_as = JSON.parse(save_as);
			} catch (err) {
				console.error("error parsing json", err);
			}
		}
		if (!mode) mode = "draw";
		if (debug !== "yes") debug = "no";
		if (typeof pen_opacity === "string") pen_opacity = Number(pen_opacity);
		if (!pen_opacity) pen_opacity = 1;
		if (!background_color) background_color = "rgb(255,255,255)";
		if (!pen_color) pen_color = "rgb(0,0,0)";
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

		if (!insert_image) {
			insert_image = null;
		} else if (typeof insert_image === "string") {
			try {
				insert_image = JSON.parse(insert_image);
			} catch (err) {
				console.error("error parsing insert_object json", err);
			}
		}

		if (!insert_image) {
			insert_image = null;
		} else if (typeof insert_image === "string") {
			try {
				insert_image = JSON.parse(insert_image);
			} catch (err) {
				console.error("error parsing insert_object json", err);
			}
		}
		if (svgDom) {
			if (!containerPos) updateSvgDomWindowStatus();

			if (load_draw && (!version || version < load_draw.version || draw_id !== load_draw.draw_id)) {
				draw = load_draw.draw;
				index = draw.length;
				draw_id = load_draw.draw_id;
				version = load_draw.version;
				load_draw = null;
				start_index = draw.length;
				dispatchHistoryStatus({ index: index, draw_id, id, start_index });
				dispatchDrawLoaded({ index: index, draw_id, id, start_index });
			}

			if (draw?.length && save_as) {
				exportDraw(save_as);
			}
			if (!draw_id) draw_id = Math.random().toString(36) + Math.random().toString(36) + Date.now().toString();

			if (!draw) {
				draw = [];
			}
			// mode
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
				if (start_index && goto > start_index) goto = start_index;
				else if (goto > draw.length) goto = draw.length;

				index = goto + 0;
				goto = null;
				dispatchChangeIndex({ index: index, draw_id, id, start_index });

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

			// if (cv) configureSign();

			// // number
			// if (typeof start_index === "string" && (start_index as string)?.length) {
			// 	try {
			// 		start_index = Number(start_index);
			// 	} catch (err) {
			// 		console.error("error parsing start_index", err);
			// 	}
			// } else if (!start_index) {
			// 	start_index = null;
			// }

			if (insert_image) {
				console.info("inserting object");
				let isLoaded = false;
				switch (insert_image.type) {
					case "jpg":
					case "jpeg":
					case "png":
						insertImage(insert_image);
						isLoaded = true;
						break;
					case "svg":
						insertSvg(insert_image);
						isLoaded = true;
						break;

					default:
						console.error("unknown insert_object type", insert_image.type);
						isLoaded = false;
				}
				if (isLoaded) dispatchImageLoaded({ ok: true, draw_id, id });
			}
			if (insert_text) {
				insertText(insert_text);

				dispatchTxtLoaded({ ok: true, draw_id, id });
			}
			stroke = getStroke(draw[index]?.path || [], Object.assign({ simulatePressure: pointerType === "pen" ? false : true }, options));
			pathData = getSvgPathFromStroke(stroke);

			console.log("set index to", index, "from goto", goto, "historyActions", draw.length);
		}
	}

	function insertImage(o: Component["insert_image"]) {
		const oldDraw = [...draw];
		const attachObj: IStroke = {
			id: Date.now().toString(),
			type: "image",
			actionIndex: index,
			visible: true,
			pathData: o.base64,
		};
		oldDraw.push(attachObj);
		draw = [...oldDraw];
		index++;
	}

	function insertSvg(o: Component["insert_image"]) {
		console.info(`inserting SVG ${o.type}`);
	}
	function insertText(o: Component["insert_text"]) {
		console.info(`inserting Text ${o.content}`);
	}
	function eraseHere(e: PointerEvent) {
		const pathId = (e.target as unknown as any)?.id?.split("_")?.[1];

		if (pathId) {
			let oldDraw = [...draw];

			let stroke = oldDraw.find((s) => s.id === pathId && s.visible);
			if (!stroke) {
				for (const substroke of oldDraw.filter((s) => s.type === "multiplestroke").sort((a, b) => b.actionIndex - a.actionIndex)) {
					const substrokeFind = substroke.multipath.find((s) => s.id === pathId && s.visible);
					if (substrokeFind) {
						stroke = substrokeFind;
						break;
					}
				}
			}

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
					dispatchHistoryStatus({ index: index, draw_id, id, start_index });
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

				// 	dispatchHistoryStatus({ index: historyActions.length - 1, draw_id, id });
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
			dispatchHistoryStatus({ index: index, draw_id, id, start_index });

			stroke_start = new Date();
			stroke_id = Date.now().toString();
			strokeMinX = e.pageX - containerPos.left;
			strokeMinY = e.pageY - containerPos.top;
			strokeMaxX = e.pageX - containerPos.left;
			strokeMaxY = e.pageY - containerPos.top;

			if (!start_drawing_date) {
				start_drawing_date = stroke_start;
				dispatchStartStroke({ start: start_drawing_date, id: id, draw_id, stroke_id, index });
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

			dispatchStartStroke({ start: stroke_start, stroke_id: stroke_id, index: index, id: id, draw_id });
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
				oldDraw
					.filter((f) => f.type === "multiplestroke")
					.forEach((f) => {
						f.multipath
							.filter((f) => f.selected)
							.forEach((f) => {
								f.visible = false;
								f.erasedAtIndex = index;
							});
					});
				// copy all selected strokes inside new path that contains all of them

				const subSelection: IStroke[] = [];

				for (const stroke of oldDraw.filter((f) => f.type === "multiplestroke")) {
					for (const substroke of stroke.multipath.filter((f) => f.selected)) {
						subSelection.push(JSON.parse(JSON.stringify(substroke)));
						substroke.visible = false;
					}
				}

				const newMultiPath = JSON.parse(JSON.stringify(draw.filter((f) => f.selected))).concat(subSelection);

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
				if (draw[draw.length - 1].type === "multiplestroke") {
					index++;
				}
				draw = [...oldDraw];
				dispatchHistoryStatus({ index: index, draw_id, id, start_index });

				// index++;
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
				let oldStroke: IStroke;
				for (const substroke of draw
					.filter((f) => f.type === "multiplestroke")
					.filter((f) => f.id !== draw[index].id)
					.sort((a, b) => b.actionIndex - a.actionIndex)) {
					const oldSubStroke = substroke.multipath.find((d) => d.id === f.id);
					if (oldSubStroke) {
						oldStroke = oldSubStroke;
						break;
					}
				}
				if (!oldStroke) {
					oldStroke = draw.find((d) => d.id === f.id);
				}

				f.path.forEach((p, i) => {
					if (i === 0) console.log("debug path ", p[0], oldStroke.path[i][0], draw);
					p[0] = oldStroke.path[i][0] + moveX;
					p[1] = oldStroke.path[i][1] + moveY;
				});
				f.max = [oldStroke.max[0] + moveX, oldStroke.max[1] + moveY];
				f.min = [oldStroke.min[0] + moveX, oldStroke.min[1] + moveY];
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

			dispatchEndStroke({
				end: stroke_end,
				stroke_id: stroke_id,
				start: stroke_start,
				min: [strokeMinX, strokeMinY],
				max: [strokeMaxX, strokeMaxY],
				pathData: pathData,
				pen_color: pen_color,
				index: index,
				id,
				draw_id,
			});
			index++;
			dispatchHistoryStatus({ index: index, draw_id, id, start_index });
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
				if (
					stroke.visible &&
					stroke.type === "stroke" &&
					stroke.min[0] > minX &&
					stroke.min[1] > minY &&
					stroke.max[0] < maxX &&
					stroke.max[1] < maxY
				) {
					return true;
				} else {
					return false;
				}
			});
			let thereAreSubStrokes = false;
			for (const substroke of oldDraw.filter((f) => f.type === "multiplestroke")) {
				for (const stroke of substroke.multipath) {
					if (
						stroke.visible &&
						stroke.type === "stroke" &&
						stroke.min[0] > minX &&
						stroke.min[1] > minY &&
						stroke.max[0] < maxX &&
						stroke.max[1] < maxY
					) {
						thereAreSubStrokes = true;
					}
				}
			}

			if (selectedStrokes.length > 0 || thereAreSubStrokes) {
				for (const stroke of oldDraw.filter((f) => f.type === "multiplestroke")) {
					for (const substroke of stroke.multipath) {
						if (substroke.visible && substroke.min[0] > minX && substroke.min[1] > minY && substroke.max[0] < maxX && substroke.max[1] < maxY) {
							substroke.selected = true;
						}
					}
				}

				for (const stroke of selectedStrokes) {
					stroke.selected = true;
				}
				draw = [...oldDraw];

				console.log(selectedStrokes);

				dispatchSelection({ minX: selectMinX, minY: selectMinY, maxX: selectMaxX, maxY: selectMaxY, strokes: selectedStrokes, id, draw_id });
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
		containerDom = component.shadowRoot.getElementById("container");
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
<div id="container">
	<svg
		on:pointerdown={handlePointerDown}
		on:pointermove={handlePointerMove}
		on:pointerup={handlePointerUp}
		style="background-color:{background_color};cursor:{pointerIsOnSelect === true ? 'move' : 'default'}"
	>
		<!-- {#if draw?.length} -->
		{#if svgDom}
			<g>
				{#each draw as stroke (stroke.id)}
					{#if stroke.actionIndex <= index && !format && (stroke.visible || stroke.erasedAtIndex > index)}
						{#if stroke.type === "stroke" || stroke.type === "image" || stroke.type === "text"}
							{#if stroke.selected}
								{#if stroke.type === "stroke"}
									<path
										id={"path_" + stroke.id}
										d={stroke.pathData}
										fill={stroke.color}
										fill-opacity={stroke.opacity}
										stroke-linecap="round"
										stroke="red"
										stroke-width="2"
									/>
								{:else if stroke.type === "image"}
									<image id={"path_" + stroke.id} href={stroke.pathData} stroke-linecap="round" stroke="red" stroke-width="2" />
								{:else if stroke.type === "text"}
									<text id={"path_" + stroke.id} stroke-linecap="round" stroke="red" stroke-width="2">{stroke.pathData}</text>
								{/if}
							{:else if !stroke.selected && stroke.type === "stroke"}
								<path id={"path_" + stroke.id} d={stroke.pathData} fill={stroke.color} fill-opacity={stroke.opacity} />
							{:else if !stroke.selected && stroke.type === "image"}
								<image id={"path_" + stroke.id} href={stroke.pathData} />
							{:else if !stroke.selected && stroke.type === "text"}
								<text id={"path_" + stroke.id}>{stroke.pathData}</text>
							{/if}
						{:else if stroke.type === "multiplestroke"}
							{#each stroke.multipath as m_stroke (m_stroke.id + stroke.id)}
								{#if m_stroke.actionIndex <= index && !format && (m_stroke.visible || m_stroke.erasedAtIndex > index)}
									{#if m_stroke.selected}
										{#if m_stroke.type === "stroke"}
											<path
												id={"path_" + m_stroke.id + "_" + stroke.id}
												d={m_stroke.pathData}
												fill={m_stroke.color}
												fill-opacity={m_stroke.opacity}
												stroke-linecap="round"
												stroke="red"
												stroke-width="2"
											/>
										{:else if m_stroke.type === "image"}
											<image
												id={"path_" + m_stroke.id + "_" + stroke.id}
												href={m_stroke.pathData}
												stroke-linecap="round"
												stroke="red"
												stroke-width="2"
											/>
										{:else if m_stroke.type === "text"}
											<text id={"path_" + m_stroke.id + "_" + stroke.id} stroke-linecap="round" stroke="red" stroke-width="2"
												>{m_stroke.pathData}</text
											>
										{/if}
									{:else if !m_stroke.selected && m_stroke.type === "stroke"}
										<path
											id={"path_" + m_stroke.id + "_" + stroke.id}
											d={m_stroke.pathData}
											fill={m_stroke.color}
											fill-opacity={m_stroke.opacity}
										/>
									{:else if !m_stroke.selected && m_stroke.type === "image"}
										<image id={"path_" + m_stroke.id + "_" + stroke.id} href={m_stroke.pathData} />
									{:else if !m_stroke.selected && m_stroke.type === "text"}
										<text id={"path_" + m_stroke.id + "_" + stroke.id}>{m_stroke.pathData}</text>
									{/if}
								{/if}
							{/each}
						{/if}
					{/if}
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
</div>

<style lang="scss">
	@import "../styles/webcomponent.scss";
	// @import "../styles/bootstrap.scss";
</style>
