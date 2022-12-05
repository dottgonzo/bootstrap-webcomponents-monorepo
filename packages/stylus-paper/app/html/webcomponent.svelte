<svelte:options tag="hb-stylus-paper" />

<script lang="ts">
	import { get_current_component, onDestroy, onMount } from "svelte/internal";

	import { createEventDispatcher } from "svelte";
	import parseStyle from "style-to-object";
	import { addComponent, getChildStyleToPass } from "@htmlbricks/hb-jsutils/main";
	import type { Component } from "@app/types/webcomponent.type";

	import SignaturePad from "signature_pad";

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
	let pressure: any;
	let parsedStyle: { [x: string]: string };
	//  let componentStyleToSet: string = "";
	let signaturePad: SignaturePad;

	$: {
		if (!id) id = "";
		if (style) {
			parsedStyle = parseStyle(style);
			// componentStyleToSet = getChildStyleToPass(parsedStyle, componentStyleSetup?.vars);
		}
		// if (!background_color) background_color = "rgb(255,255,255)";
		if (!pen_color) pen_color = "rgb(0,0,0)";

		if (cv) configureSign();

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

	function configureSign() {
		if (background_color) cv.style.backgroundColor = background_color;
		if (signaturePad) {
			signaturePad.penColor = pen_color;
			// signaturePad.backgroundColor = background_color;
			return console.warn("signaturePad already configured");
		}

		const signOpts = {
			penColor: pen_color,
			// backgroundColor: background_color, // necessary for saving image as JPEG; can be removed is only saving as PNG or SVG
		};
		signaturePad = new SignaturePad(cv, signOpts);
		signaturePad.addEventListener("beginStroke", () => {
			stroke_start = new Date();
			stroke_id = Date.now() + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
			if (!start_drawing_date) {
				start_drawing_date = stroke_start;
				stroke_id = Date.now().toString();
				dispatch("startStroke", { date: start_drawing_date });
			}
			dispatch("beginStroke", { stroke_start, stroke_id });
		});
		signaturePad.addEventListener("endStroke", () => {
			const stroke_end = new Date();
			dispatch("endStroke", { stroke_end, stroke_id, stroke_start });
			stroke_start = undefined;
			stroke_id = undefined;
		});
		signaturePad.addEventListener("beforeUpdateStroke", (e: any) => {
			console.log("beforeUpdateStroke", signaturePad.dotSize, "pressure" + e.detail.pressure);
			signaturePad.dotSize = e.detail.pressure;
			pressure = e.detail.pressure;
		});
		signaturePad.addEventListener("afterUpdateStroke", (e: any) => {
			console.log("afterUpdateStroke", signaturePad.dotSize, "pressure" + e.detail.pressure);
			signaturePad.dotSize = e.detail.pressure;
			pressure = e.detail.pressure;
		});
	}

	onMount(() => {
		cv = component.shadowRoot.querySelector("canvas");
		let retryToMount = 0;
		const interval = setInterval(() => {
			cv = component.shadowRoot.querySelector("canvas");
			if (cv) {
				clearInterval(interval);
				configureSign();
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
		configureSign();

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
{pressure}

<style lang="scss">
	@import "../styles/webcomponent.scss";
	@import "../styles/bootstrap.scss";
</style>
