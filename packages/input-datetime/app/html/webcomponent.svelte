<svelte:options tag="hb-input-datetime" />

<script lang="ts">
	import { get_current_component } from "svelte/internal";
	import { createEventDispatcher } from "svelte";
	import type { FormSchemaEntry } from "@app/types/webcomponent.type";
	import { addComponent, getChildStyleToPass } from "wc-js-utils/main";
	import { styleSetup as inputNumberStyleSetup } from "../../node_modules/@htmlbricks/hb-input-number/release/docs";
	import { styleSetup as inputDateStyleSetup } from "../../node_modules/@htmlbricks/hb-input-date/release/docs";
	import parseStyle from "style-to-object";
	import pkg from "../../package.json";

	export let style: string;
	export let set_value: boolean;
	export let set_valid: boolean;
	export let show_validation: "yes" | "no";

	export let schemaentry: FormSchemaEntry;
	let inputDateStyleToSet: string = "";
	let inputNumberStyleToSet: string = "";
	let parsedStyle: { [x: string]: string };

	let value: string;
	// let regex: RegExp | undefined;
	let valid = false;

	let value_date: string;
	let value_hours: number;
	let value_minutes: number;
	let value_seconds: number;

	let schemaDate: FormSchemaEntry;
	let schemaHours: FormSchemaEntry;
	let schemaMinutes: FormSchemaEntry;
	let schemaSeconds: FormSchemaEntry;

	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();
	function dispatch(name: string, detail: any) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}
	let old_schemaentry_value: any;
	let first_access = true;
	$: {
		if (style) {
			parsedStyle = parseStyle(style);
			inputDateStyleToSet = getChildStyleToPass(parsedStyle, inputDateStyleSetup?.vars);
			inputNumberStyleToSet = getChildStyleToPass(parsedStyle, inputNumberStyleSetup?.vars);
		}
		if (!show_validation) show_validation = "no";

		if (schemaentry && typeof schemaentry === "string") {
			schemaentry = JSON.parse(schemaentry as unknown as string);
		}
		if (!set_value && (set_value as unknown as string) === "no") {
			set_value = false;
		} else {
			set_value = true;
		}
		if (!set_valid && (set_valid as unknown as string) === "no") {
			set_valid = false;
		} else {
			set_valid = true;
		}

		if (schemaentry?.value && (old_schemaentry_value !== schemaentry?.value || first_access)) {
			console.info("computing values", schemaentry.value);
			first_access = false;
			let date: Date;
			try {
				date = new Date(schemaentry.value);
			} catch (err) {
				console.error("invalid input value on input-datetime", schemaentry.value, err);
			}
			console.info("now date is", date.valueOf());
			if (date && date.valueOf() > 10000 && date.valueOf() < 10000000000000) {
				console.info("converting date");
				value_date = date.toISOString().split("T")[0];
				const rest = date.toISOString().split("T")[1].split(":");
				value_hours = rest[0];
				value_minutes = rest[1];
				value_seconds = rest[2].split(".")[0];
				schemaDate = {
					id: "date",
					type: "date",
					value: value_date,
					required: true,
				};
				schemaHours = {
					id: "hours",
					type: "number",
					value: value_hours,
					required: true,

					params: {
						min: 0,
						max: 23,
					},
				};
				schemaMinutes = {
					id: "minutes",
					type: "number",
					value: value_minutes,
					required: true,

					params: {
						min: 0,
						max: 59,
					},
				};
				schemaSeconds = {
					id: "seconds",
					type: "number",
					value: value_seconds,
					required: true,

					params: {
						min: 0,
						max: 59,
					},
				};
			} else {
				console.error("invalid data value on input-datetime", value);
			}
		}
		if (value_date && (value_hours || value_hours === 0) && (value_minutes || value_minutes === 0)) {
			console.log("NOW", value_date, value_hours, value_minutes);

			try {
				value = new Date(`${value_date} ${value_hours}:${value_minutes}:${value_seconds || 0}`).toISOString();
			} catch (err) {
				console.error("convert error", err);
			}
		} else {
			console.log("reset to 0 datetime");
			value = null;
			if (!schemaDate) {
				schemaDate = {
					id: "date",

					type: "date",
					required: true,
				};
			}
			if (!schemaHours) {
				schemaHours = {
					id: "hours",

					type: "number",
					required: true,
					params: {
						min: 0,
						max: 23,
					},
					placeholder: "hours",
				};
			}

			if (!schemaMinutes) {
				schemaMinutes = {
					id: "minutes",

					type: "number",
					required: true,
					params: {
						min: 0,
						max: 59,
					},
					placeholder: "minutes",
				};
			}
			if (!schemaSeconds) {
				schemaSeconds = {
					id: "seconds",

					type: "number",
					required: true,
					params: {
						min: 0,
						max: 59,
					},
					placeholder: "seconds",
				};
			}
		}
		old_schemaentry_value = schemaentry?.value;
		// regex = schemaentry?.validationRegex && new RegExp(schemaentry.validationRegex);

		if (schemaentry?.required) {
			if (value) {
				let min_date: Date;
				let max_date: Date;
				if (schemaentry?.params?.min) {
					min_date = new Date(schemaentry.params.min);
				}
				if (schemaentry?.params?.max) {
					max_date = new Date(schemaentry.params.max);
				}

				const valueDateIs = new Date(value);

				if (min_date && !(valueDateIs.valueOf() >= min_date.valueOf())) {
					valid = false;
				} else if (max_date && !(valueDateIs.valueOf() <= max_date.valueOf())) {
					valid = false;
				} else {
					valid = true;
				}
			} else {
				valid = false;
			}
		} else {
			valid = true;
		}

		addComponent({ repoName: "@htmlbricks/hb-input-number", version: pkg.version });
		addComponent({ repoName: "@htmlbricks/hb-input-date", version: pkg.version });

		setTimeout(() => {
			if (set_value) dispatch("setValue", { value, id: schemaentry?.id });
			if (set_valid) dispatch("setValid", { valid, id: schemaentry?.id });
		}, 0);
	}
	function changeDate(e) {
		console.log("changeDate", e);
		value_date = e;
		// if (!value_hours) {
		// 	schemaHours.value = 0;
		// }

		// if (!value_minutes) {
		// 	schemaMinutes.value = 0;
		// }
		// if (!value_seconds) {
		// 	schemaSeconds.value = 0;
		// }
	}
	function changeHour(e) {
		console.log("changeHour", e);
		value_hours = e;
		if (!value_minutes) {
			schemaMinutes.value = 0;
		}
		if (!value_seconds) {
			schemaSeconds.value = 0;
		}
	}
	function changeMinutes(e) {
		console.log("changeMinutes", e);
		value_minutes = e;
		if (!value_seconds) {
			schemaSeconds.value = 0;
		}
	}
	function changeSeconds(e) {
		console.log("changeMinutes", e);
		value_minutes = e;
	}
</script>

<div class="form-control {show_validation === 'yes' && schemaentry?.required ? (valid ? 'is-valid' : 'is-invalid') : ''}">
	{#if schemaDate && schemaHours && schemaMinutes}
		<div style="margin-right:20px" class="input">
			<hb-input-date
				on:setValue={(e) => {
					if (e.detail?.value) changeDate(e.detail.value);
				}}
				schemaentry={JSON.stringify(schemaDate)}
				style={inputDateStyleToSet}
			/>
		</div>
		<!-- {#if !schemaentry?.params?.removeSeconds}
			<span class="timelabel">h</span>
		{/if} -->
		<div class="input">
			<hb-input-number
				on:setValue={(e) => {
					if (e.detail?.value || e.detail.value === 0) changeHour(e.detail.value);
				}}
				schemaentry={JSON.stringify(schemaHours)}
				style={inputNumberStyleToSet}
			/>
		</div>
		<!-- 
		{#if !schemaentry?.params?.removeSeconds}
			<span class="timelabel">m</span>
		{:else}
			:
		{/if} -->
		:
		<div class="input">
			<hb-input-number
				on:setValue={(e) => {
					if (e.detail?.value || e.detail.value === 0) changeMinutes(e.detail.value);
				}}
				schemaentry={JSON.stringify(schemaMinutes)}
				style={inputNumberStyleToSet}
			/>
		</div>

		{#if !schemaentry?.params?.removeSeconds}
			<!-- <span class="timelabel">s</span> -->
			:
			<div class="input">
				<hb-input-number
					on:setValue={(e) => {
						if (e.detail?.value || e.detail.value === 0) changeSeconds(e.detail.value);
					}}
					schemaentry={JSON.stringify(schemaSeconds)}
					style={inputNumberStyleToSet}
				/>
			</div>
		{/if}
	{/if}
</div>
{#if schemaentry?.validationTip && show_validation === "yes"}
	<div part="invalid-feedback" class="invalid-feedback mb-1">
		{schemaentry.validationTip}
	</div>
{/if}

<style lang="scss">
	@import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
	.timelabel {
		margin: auto 0px auto 5px;
	}

	.input {
		display: inline-block;
	}

	hb-input-date {
		max-width: 140px;
		display: inline-block;
	}
	hb-input-number {
		width: 100px;
		display: inline-block;
	}
</style>
