<svelte:options tag="hb-funnel" />

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

	import { each, get_current_component } from "svelte/internal";
	import { createEventDispatcher } from "svelte";
	import pkg from "../../package.json";
	import type { FormSchema } from "../../../form/app/types/webcomponent.type";
	import { addComponent, getChildStyleToPass } from "wc-js-utils/main";
	import parseStyle from "style-to-object";
	let parsedStyle: { [x: string]: string };
	export let style: string;
	import { styleSetup as formStyleSetup } from "../../node_modules/@htmlbricks/hb-form/release/docs";
	let formStyleToSet: string = "";

	addComponent({ repoName: "@htmlbricks/hb-form", version: pkg.version });
	export let id: string;
	export let steps: number;
	export let schemes: { schema: FormSchema; valid: boolean }[];
	export let step: number;
	export let submitstep: "yes" | "no";

	// let getvals: "yes" | "no" = "no";
	$: {
		if (!id) id = "";
		if (style) {
			parsedStyle = parseStyle(style);
			formStyleToSet = getChildStyleToPass(parsedStyle, formStyleSetup?.vars);
		}
		if (!step && step !== 0) step = 1;
		else if (typeof step === "string") step = Number(step);
		if (schemes && typeof schemes === "string") {
			schemes = JSON.parse(schemes).map((m) => {
				return {
					schema: m,
					valid: false,
				};
			});
		}

		if (steps && typeof steps === "string") steps = Number(steps);
		else if (schemes?.length) steps = schemes.length;
		else if (!steps) steps = 1;
		if (submitstep !== "yes") {
			submitstep = "no";
		}
	}
	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();
	function dispatch(name: string, detail: any) {
		svelteDispatch(name, detail);
		component.dispatchEvent?.(new CustomEvent(name, { detail }));
	}

	function schemeUpdate(s) {
		if (s._id) {
			schemes[step - 1].schema.find((f) => f.id === s._id).value = s[s._id];
		}
		schemes[step - 1].valid = s._valid;
		if (submitstep === "yes") {
			submitstep = "no";
		}
		dispatch("update", { step, scheme: schemes[step - 1], valid: schemes[step - 1].valid });
	}
	function submitFunnel() {
		if (steps === step) {
			dispatch("submit", { schemes, steps, step });
		} else {
			setStep(step + 1);
		}

		submitstep = "no";
	}
	// function getValues(detail) {
	// 	setTimeout(() => {
	// 		console.log("INITIALIZE", detail);
	// 		schemeIsValid = detail._valid;
	// 		getvals = "no";
	// 	}, 1000);
	// }

	function setStep(s: number) {
		step = s;
		// getvals = "yes";
	}
</script>

{#if schemes}
	<hb-form
		style={formStyleToSet}
		id={`scheme-${step}-${steps}`}
		on:submit={(e) => submitFunnel()}
		on:change={(e) => schemeUpdate(e.detail)}
		schema={JSON.stringify(schemes[step - 1].schema)}
		submitted={submitstep}
		hide_submit="yes"
	/>

	<div>
		<span>
			<span class="btn btn-secondary">{step}/{steps}</span>
			{#if step > 1}
				<button class="btn btn-primary" on:click={() => setStep(step - 1)}>Indietro</button>
			{:else}
				<button class="btn btn-primary" on:click={() => setStep(step - 1)} disabled>Indietro</button>
			{/if}
			{#if steps === step}
				<button
					class="btn btn-primary"
					on:click={() => {
						submitstep = "yes";
					}}>Salva</button
				>
			{:else}
				<button
					class="btn btn-primary"
					on:click={() => {
						submitstep = "yes";
					}}>Avanti</button
				>
			{/if}
		</span>
	</div>
{/if}

<style lang="scss">
	@import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
</style>
