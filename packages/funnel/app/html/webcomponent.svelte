<svelte:options tag="funnel-component" />

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
	import type { FormSchema } from "../../../formhostcomponent/app/types/webcomponent.type";

	function addComponent(componentName: string, scriptJsName: string, componentId: string, localPackageDir?: string) {
		if (!document.getElementById(componentId)) {
			const script = document.createElement("script");
			script.id = componentId;
			script.src = `https://cdn.jsdelivr.net/npm/@htmlbricks/${componentName}@${pkg.version}/release/${scriptJsName}`;
			if (localPackageDir && location.href.includes("localhost")) script.src = `http://localhost:6006/${localPackageDir}/dist/${scriptJsName}`;

			document.head.appendChild(script);
		}
	}
	addComponent("formrenderer-host", "formhostcomponent.js", "formhostscript", "formhostcomponent");
	export let id: string;
	export let steps: number;
	export let schemes: { schema: FormSchema; valid: boolean }[];
	export let step: number;
	export let submitstep: "yes" | "no";

	// let getvals: "yes" | "no" = "no";
	$: {
		if (!id) id = "";

		if (!step) step = 1;
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
	function dispatch(name, detail) {
		// console.log(`svelte: ${name}`);
		svelteDispatch(name, detail);
		component.dispatchEvent?.(new CustomEvent(name, { detail }));
	}

	function schemeUpdate(s) {
		if (s._id) {
			schemes[step - 1].schema.find((f) => f.id === s._id).value = s[s._id];
		}
		schemes[step - 1].valid = s._valid;
		dispatch("update", { step, scheme: schemes[step - 1], valid: schemes[step - 1].valid });
	}
	function submitFunnel() {
		submitstep = "no";
		dispatch("submit", { schemes, steps, step });
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
	<formrenderer-host
		id={`scheme-${step}-${steps}`}
		on:submit={(e) => submitFunnel()}
		on:change={(e) => schemeUpdate(e.detail)}
		schema={JSON.stringify(schemes[step - 1].schema)}
		submitted={submitstep}
	/>
{/if}
<div>
	<span>
		<span class="btn btn-secondary">{step}/{steps}</span>
		{#if step > 1}
			<button class="btn btn-primary" on:click={() => setStep(step - 1)}>Indietro</button>
		{:else}
			<button class="btn btn-primary" on:click={() => setStep(step - 1)} disabled>Indietro</button>
		{/if}
		{#if steps === step && schemes[step - 1].valid}
			<button class="btn btn-primary" on:click={() => (submitstep = "yes")}>Salva</button>
		{:else if steps === step}
			<button class="btn btn-primary" on:click={() => (submitstep = "yes")} disabled>Salva</button>
		{:else if steps > step && schemes[step - 1].valid}
			<button class="btn btn-primary" on:click={() => setStep(step + 1)}>Avanti</button>
		{:else}
			<button class="btn btn-primary" on:click={() => setStep(step + 1)} disabled>Avanti</button>
		{/if}
	</span>
</div>

<style lang="scss">
	@import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
</style>
