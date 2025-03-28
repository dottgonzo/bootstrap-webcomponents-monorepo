<svelte:options tag="hb-form" />

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
	import { get_current_component } from "svelte/internal";
	import { createEventDispatcher } from "svelte";

	import type { FormSchema, FormSchemaEntry, IControl, IRegisterComponent } from "@app/types/webcomponent.type";

	import pkg from "../../package.json";

	import { groupMultipleBy } from "@app/functions/utils";
	import { addComponent, getChildStyleToPass } from "wc-js-utils/main";
	import parseStyle from "style-to-object";
	let parsedStyle: { [x: string]: string };
	export let style: string;

	import { styleSetup as inputSelectStyleSetup } from "@htmlbricks/hb-input-select/release/docs";
	import { styleSetup as inputDateStyleSetup } from "@htmlbricks/hb-input-date/release/docs";
	import { styleSetup as inputDateTimeStyleSetup } from "@htmlbricks/hb-input-datetime/release/docs";
	import { styleSetup as inputAreaStyleSetup } from "@htmlbricks/hb-input-area/release/docs";
	import { styleSetup as inputTextStyleSetup } from "@htmlbricks/hb-input-text/release/docs";
	import { styleSetup as inputNumberStyleSetup } from "@htmlbricks/hb-input-number/release/docs";
	import { styleSetup as inputEmailStyleSetup } from "@htmlbricks/hb-input-email/release/docs";
	import { styleSetup as inputColorStyleSetup } from "@htmlbricks/hb-input-color/release/docs";
	import { styleSetup as inputFileStyleSetup } from "@htmlbricks/hb-input-file/release/docs";
	import { styleSetup as inputCheckboxStyleSetup } from "@htmlbricks/hb-input-checkbox/release/docs";
	import { styleSetup as inputRadioStyleSetup } from "@htmlbricks/hb-input-radio/release/docs";
	import { styleSetup as inputRangeStyleSetup } from "@htmlbricks/hb-input-range/release/docs";
	import { styleSetup as inputArrayObjectsStyleSetup } from "@htmlbricks/hb-input-array-objects/release/docs";

	let inputSelectStyleToSet: string = "";
	let inputDateStyleToSet: string = "";
	let inputDateTimeStyleToSet: string = "";
	let inputAreaStyleToSet: string = "";
	let inputTextStyleToSet: string = "";
	let inputNumberStyleToSet: string = "";
	let inputEmailStyleToSet: string = "";
	let inputColorStyleToSet: string = "";
	let inputFileStyleToSet: string = "";
	let inputCheckboxStyleToSet: string = "";
	let inputRadioStyleToSet: string = "";
	let inputRangeStyleToSet: string = "";
	let inputArrayObjectsStyleToSet: string = "";

	const registeredComponents: IRegisterComponent = {
		row: { component: null, options: { row: true } },
		select: { component: "hb-input-select" },
		arrayobjects: { component: "hb-input-array-objects" },
		date: { component: "hb-input-date" },
		datetime: { component: "hb-input-datetime" },
		text: { component: "hb-input-text" },
		number: { component: "hb-input-number" },
		email: { component: "hb-input-email" },
		color: { component: "hb-input-color" },
		file: { component: "hb-input-file" },
		textarea: { component: "hb-input-area" },
		range: { component: "hb-input-range" },
		checkbox: { component: "hb-input-checkbox", options: { labelIsHandledByComponent: true } },
		radio: { component: "hb-input-radio" },
	};

	export let schema: FormSchema;
	export let id: string;

	export let values: Record<string, string | number | boolean> = {};

	export let isInvalid: boolean;
	export let submitted: "yes" | "no" | null;
	export let getvals: "yes" | "no" | null;
	export let show_validation: "yes" | "no";
	export let hide_submit: boolean;
	let controls: IControl[];
	let visibility: Record<string, boolean>;
	let valids: Record<string, boolean> = {};

	let allValues: Record<string, string | number | boolean> = {};
	let dependencyMap: Record<string, FormSchemaEntry[]>;
	let getControls: (schema: FormSchema) => IControl[];
	let lastId: string;
	$: {
		if (!id) id = "form";
		if (hide_submit === true || (hide_submit as unknown as string) === "yes" || (hide_submit as unknown as string) === "true") {
			hide_submit = true;
		} else {
			hide_submit = false;
		}
		if (style) {
			parsedStyle = parseStyle(style);

			inputSelectStyleToSet = getChildStyleToPass(parsedStyle, inputSelectStyleSetup?.vars);
			inputDateStyleToSet = getChildStyleToPass(parsedStyle, inputDateStyleSetup?.vars);
			inputAreaStyleToSet = getChildStyleToPass(parsedStyle, inputAreaStyleSetup?.vars);
			inputTextStyleToSet = getChildStyleToPass(parsedStyle, inputTextStyleSetup?.vars);
			inputNumberStyleToSet = getChildStyleToPass(parsedStyle, inputNumberStyleSetup?.vars);
			inputEmailStyleToSet = getChildStyleToPass(parsedStyle, inputEmailStyleSetup?.vars);
			inputColorStyleToSet = getChildStyleToPass(parsedStyle, inputColorStyleSetup?.vars);
			inputFileStyleToSet = getChildStyleToPass(parsedStyle, inputFileStyleSetup?.vars);
			inputCheckboxStyleToSet = getChildStyleToPass(parsedStyle, inputCheckboxStyleSetup?.vars);
			inputRadioStyleToSet = getChildStyleToPass(parsedStyle, inputRadioStyleSetup?.vars);
			inputDateTimeStyleToSet = getChildStyleToPass(parsedStyle, inputDateTimeStyleSetup?.vars);
			inputRangeStyleToSet = getChildStyleToPass(parsedStyle, inputRangeStyleSetup?.vars);
			inputArrayObjectsStyleToSet = getChildStyleToPass(parsedStyle, inputArrayObjectsStyleSetup?.vars);
		}
		if (!show_validation) show_validation = "no";
		if (!visibility) visibility = {};
		if (submitted && submitted === "yes" && schema && typeof schema !== "string") {
			onSubmit();
		} else if (submitted === "yes") {
			submitted = "no";
		}
		if (typeof schema === "string") {
			try {
				schema = JSON.parse(schema as unknown as string);
			} catch (error) {
				console.error("error with schema", schema, error);
				schema = null;
			}
		}
		if (!schema) {
			console.warn("no schema provided");

			valids = {};
			allValues = {};
			dependencyMap = {};
			visibility = {};
			controls = [];
			values = {};
			schema = [];
		}
		if (!controls?.length || !schema.length || !controls.find((f) => f.entry.id === schema[0].id) || lastId !== id) {
			lastId = id;
			valids = {};
			allValues = {};
			dependencyMap = {};
			visibility = {};
			controls = [];
			values = {};
			for (const s of schema) {
				if (s.type !== "row") {
					values[s.id] = s.value;
				} else if (s.type === "row" && s.params?.columns?.length) {
					for (const c of s.params.columns) {
						values[c.id] = c.value;
					}
				}
			}
		}
		if (schema?.length) {
			const allRowEntriesAndColumnEntries = [];
			for (const el of schema) {
				if (el.type === "row" && el.params?.columns?.length) {
					// allRowEntriesAndColumnEntries.push(el);
					allRowEntriesAndColumnEntries.push(...el.params.columns);
				} else {
					allRowEntriesAndColumnEntries.push(el);
				}
			}
			dependencyMap = groupMultipleBy(
				allRowEntriesAndColumnEntries.filter((entry) => entry.dependencies?.length),
				(entry) => entry.dependencies.map((dep) => dep.id),
			);
		} else {
			dependencyMap = {};
		}

		if (!isInvalid && isInvalid !== false) isInvalid = true;

		getControls = (schema: FormSchema): IControl[] => {
			return (
				schema?.map?.((entry) => {
					const component = registeredComponents[entry.type];

					if (!component) {
						throw new Error(`FormRenderer: Tried to render an unknown component type ${entry.type}!`);
					}

					if (component.options?.row) {
						return { entry, columns: getControls(entry.params?.columns ?? []), options: component.options };
					} else {
						visibility[entry.id] = visibility[entry.id] || !entry.dependencies?.length;
					}

					return { entry, component: component.component, options: component.options || {} };
				}) || []
			);
		};

		controls = schema?.length ? getControls(schema) : [];
		isInvalid = !Object.entries(valids).length || Object.entries(valids).some(([id, isValid]) => !isValid && visibility[id]);
		const obj = Object.assign({ _valid: !isInvalid }, values);
		// dispatch("initialize", obj);
		if (getvals && getvals === "yes") getVals();
		else {
			getvals = "no";
		}
	}

	const canShow = (entry: FormSchemaEntry) => {
		console.log("canShow", entry);
		for (const dep of entry.dependencies || []) {
			if (!visibility[dep.id] || !values[dep.id] || (dep.values && !dep.values?.includes(values[dep.id]))) {
				return false;
			}
		}

		return true;
	};

	const handleVisibility = (entry: FormSchemaEntry) => {
		if (canShow(entry)) {
			show(entry, entry.value);
		} else {
			hide(entry);
		}
	};
	const show = (entry: FormSchemaEntry, defaultValue?: string | number | boolean) => {
		visibility[entry.id] = true;

		if (entry.type !== "row") {
			values[entry.id] = allValues[entry.id] ?? defaultValue;
		}

		for (const dependentEntry of dependencyMap[entry.id] || []) {
			handleVisibility(dependentEntry);
		}
	};
	const hide = (entry: FormSchemaEntry) => {
		visibility[entry.id] = false;
		delete values[entry.id];
		for (const d of dependencyMap[entry.id] || []) {
			hide(d);
		}
	};

	const setValueFor = (id: string, value: string | number | boolean) => {
		allValues[id] = value;

		if (visibility[id]) {
			values[id] = value;
		}

		if (dependencyMap[id]) {
			for (const dependent of dependencyMap[id]) {
				handleVisibility(dependent);
			}
		}
	};

	const setValidFor = (id: string, valid: boolean) => {
		valids[id] = valid;
	};

	addComponent({ repoName: "@htmlbricks/hb-input-date", version: pkg.version });

	addComponent({ repoName: "@htmlbricks/hb-input-text", version: pkg.version });
	addComponent({ repoName: "@htmlbricks/hb-input-email", version: pkg.version });
	addComponent({ repoName: "@htmlbricks/hb-input-checkbox", version: pkg.version });
	addComponent({ repoName: "@htmlbricks/hb-input-number", version: pkg.version });
	addComponent({ repoName: "@htmlbricks/hb-input-area", version: pkg.version });
	addComponent({ repoName: "@htmlbricks/hb-input-radio", version: pkg.version });
	addComponent({ repoName: "@htmlbricks/hb-input-select", version: pkg.version });
	addComponent({ repoName: "@htmlbricks/hb-input-file", version: pkg.version });
	addComponent({ repoName: "@htmlbricks/hb-input-color", version: pkg.version });
	addComponent({ repoName: "@htmlbricks/hb-input-range", version: pkg.version });
	addComponent({ repoName: "@htmlbricks/hb-input-datetime", version: pkg.version });
	addComponent({ repoName: "@htmlbricks/hb-input-array-objects", version: pkg.version });

	const component = get_current_component();

	const svelteDispatch = createEventDispatcher();
	function dispatch(name: string, detail: any) {
		svelteDispatch(name, detail);
		component.dispatchEvent?.(new CustomEvent(name, { detail }));
	}
	const onSubmit = () => {
		console.log("subb");
		show_validation = "yes";
		submitted = "no";
		if (isInvalid) return;
		const cc = Object.assign({ _valid: !isInvalid }, values);

		dispatch("submit", cc);
	};
	const getVals = () => {
		if (getvals && getvals === "yes") {
			const cc = Object.assign({ _valid: !isInvalid }, values);

			dispatch("getValues", cc);
		}
		getvals = "no";
	};
	function setValueByMessage(message: { id?: string; value: string }) {
		setValueFor(message.id, message.value);
		const cc = Object.assign({ _valid: !isInvalid, _id: message.id }, values);
		dispatch("change", cc);
	}
	function setValidByMessage(message: { id?: string; valid: boolean }) {
		setValidFor(message.id, message.valid);
		const cc = Object.assign({ _valid: !isInvalid, _id: message.id }, values);
		dispatch("change", cc);
	}
</script>

{#if schema?.length}
	{#each controls as { entry, component, options, columns } (entry.id)}
		{#if options.row}
			{#if (visibility[entry.id] || visibility[entry.id] !== false) && columns?.length ? columns.some((c) => visibility[c.entry.id]) : false}
				<div class="row">
					{#each columns as { entry, component, options } (entry.id)}
						{#if visibility[entry.id]}
							<div class="col mb-3" style={component === "hb-input-checkbox" ? "line-height:52px;" : ""}>
								{#if !options.labelIsHandledByComponent}
									<label for={entry.id}>{entry.label}{entry.required ? "*" : ""}</label>
								{/if}
								{#if component === "hb-array-objects"}
									<hb-input-array-objects
										style={inputArrayObjectsStyleToSet}
										on:setValid={(d) => setValidByMessage(d.detail)}
										on:setValue={(d) => setValueByMessage(d.detail)}
										schemaentry={JSON.stringify(
											{
												...entry,
												value: allValues[entry.id] ?? entry.value,
											},
											null,
											0,
										)}
										set_value
										set_valid
										{show_validation}
									/>
								{:else if component === "hb-input-text"}
									<hb-input-text
										style={inputTextStyleToSet}
										on:setValid={(d) => setValidByMessage(d.detail)}
										on:setValue={(d) => setValueByMessage(d.detail)}
										schemaentry={JSON.stringify(
											{
												...entry,
												value: allValues[entry.id] ?? entry.value,
											},
											null,
											0,
										)}
										set_value
										set_valid
										{show_validation}
										on:clickEnter={() => onSubmit()}
									/>
								{:else if component === "hb-input-color"}
									<hb-input-color
										style={inputColorStyleToSet}
										on:setValid={(d) => setValidByMessage(d.detail)}
										on:setValue={(d) => setValueByMessage(d.detail)}
										schemaentry={JSON.stringify(
											{
												...entry,
												value: allValues[entry.id] ?? entry.value,
											},
											null,
											0,
										)}
										set_value
										set_valid
										{show_validation}
									/>
								{:else if component === "hb-input-range"}
									<hb-input-range
										style={inputRangeStyleToSet}
										on:setValid={(d) => setValidByMessage(d.detail)}
										on:setValue={(d) => setValueByMessage(d.detail)}
										schemaentry={JSON.stringify(
											{
												...entry,
												value: allValues[entry.id] ?? entry.value,
											},
											null,
											0,
										)}
										set_value
										set_valid
										{show_validation}
									/>
								{:else if component === "hb-input-file"}
									<hb-input-file
										style={inputFileStyleToSet}
										on:setValid={(d) => setValidByMessage(d.detail)}
										on:setValue={(d) => setValueByMessage(d.detail)}
										schemaentry={JSON.stringify(
											{
												...entry,
												value: allValues[entry.id] ?? entry.value,
											},
											null,
											0,
										)}
										set_value
										set_valid
										{show_validation}
									/>
								{:else if component === "hb-input-email"}
									<hb-input-email
										style={inputEmailStyleToSet}
										on:setValid={(d) => setValidByMessage(d.detail)}
										on:setValue={(d) => setValueByMessage(d.detail)}
										schemaentry={JSON.stringify(
											{
												...entry,
												value: allValues[entry.id] ?? entry.value,
											},
											null,
											0,
										)}
										set_value
										set_valid
										{show_validation}
										on:clickEnter={() => onSubmit()}
									/>
								{:else if component === "hb-input-date"}
									<hb-input-date
										style={inputDateStyleToSet}
										on:setValid={(d) => setValidByMessage(d.detail)}
										on:setValue={(d) => setValueByMessage(d.detail)}
										schemaentry={JSON.stringify(
											{
												...entry,
												value: allValues[entry.id] ?? entry.value,
											},
											null,
											0,
										)}
										set_value
										set_valid
										{show_validation}
										on:clickEnter={() => onSubmit()}
									/>
								{:else if component === "hb-input-datetime"}
									<hb-input-datetime
										style={inputDateTimeStyleToSet}
										on:setValid={(d) => setValidByMessage(d.detail)}
										on:setValue={(d) => setValueByMessage(d.detail)}
										schemaentry={JSON.stringify(
											{
												...entry,
												value: allValues[entry.id] ?? entry.value,
											},
											null,
											0,
										)}
										set_value
										set_valid
										{show_validation}
										on:clickEnter={() => onSubmit()}
									/>
								{:else if component === "hb-input-checkbox"}
									<hb-input-checkbox
										style={inputCheckboxStyleToSet}
										class="checkbox-inline"
										on:setValid={(d) => setValidByMessage(d.detail)}
										on:setValue={(d) => setValueByMessage(d.detail)}
										schemaentry={JSON.stringify(
											{
												...entry,
												value: allValues[entry.id] ?? entry.value,
											},
											null,
											0,
										)}
										set_value
										set_valid
										{show_validation}
									/>
								{:else if component === "hb-input-number"}
									<hb-input-number
										style={inputNumberStyleToSet}
										on:setValid={(d) => setValidByMessage(d.detail)}
										on:setValue={(d) => setValueByMessage(d.detail)}
										schemaentry={JSON.stringify(
											{
												...entry,
												value: allValues[entry.id] ?? entry.value,
											},
											null,
											0,
										)}
										set_value
										set_valid
										{show_validation}
										on:clickEnter={() => onSubmit()}
									/>
								{:else if component === "hb-input-area"}
									<hb-input-area
										style={inputAreaStyleToSet}
										on:setValid={(d) => setValidByMessage(d.detail)}
										on:setValue={(d) => setValueByMessage(d.detail)}
										schemaentry={JSON.stringify(
											{
												...entry,
												value: allValues[entry.id] ?? entry.value,
											},
											null,
											0,
										)}
										set_value
										set_valid
										{show_validation}
										on:clickEnter={() => onSubmit()}
									/>
								{:else if component === "hb-input-radio"}
									<hb-input-radio
										style={inputRadioStyleToSet}
										on:setValid={(d) => setValidByMessage(d.detail)}
										on:setValue={(d) => setValueByMessage(d.detail)}
										schemaentry={JSON.stringify(
											{
												...entry,
												value: allValues[entry.id] ?? entry.value,
											},
											null,
											0,
										)}
										set_value
										set_valid
										{show_validation}
									/>
								{:else if component === "hb-input-select"}
									<hb-input-select
										style={inputSelectStyleToSet}
										on:setValid={(d) => setValidByMessage(d.detail)}
										on:setValue={(d) => setValueByMessage(d.detail)}
										schemaentry={JSON.stringify(
											{
												...entry,
												value: allValues[entry.id] ?? entry.value,
											},
											null,
											0,
										)}
										set_value
										set_valid
										{show_validation}
									/>
								{/if}
							</div>
						{/if}
					{/each}
				</div>
			{/if}
		{:else if visibility[entry.id]}
			<div class="col mb-3">
				{#if !options.labelIsHandledByComponent}
					<label for={entry.id}>{entry.label}{entry.required ? "*" : ""}</label>
				{/if}

				{#if component === "hb-input-text"}
					<hb-input-text
						style={inputTextStyleToSet}
						on:setValid={(d) => setValidByMessage(d.detail)}
						on:setValue={(d) => setValueByMessage(d.detail)}
						schemaentry={JSON.stringify(
							{
								...entry,
								value: allValues[entry.id] ?? entry.value,
							},
							null,
							0,
						)}
						set_value
						set_valid
						{show_validation}
						on:clickEnter={() => onSubmit()}
					/>
				{:else if component === "hb-input-array-objects"}
					<hb-input-array-objects
						style={inputArrayObjectsStyleToSet}
						on:setValid={(d) => setValidByMessage(d.detail)}
						on:setValue={(d) => setValueByMessage(d.detail)}
						schemaentry={JSON.stringify(
							{
								...entry,
								value: allValues[entry.id] ?? entry.value,
							},
							null,
							0,
						)}
						set_value
						set_valid
						{show_validation}
					/>
				{:else if component === "hb-input-color"}
					<hb-input-color
						style={inputColorStyleToSet}
						on:setValid={(d) => setValidByMessage(d.detail)}
						on:setValue={(d) => setValueByMessage(d.detail)}
						schemaentry={JSON.stringify(
							{
								...entry,
								value: allValues[entry.id] ?? entry.value,
							},
							null,
							0,
						)}
						set_value
						set_valid
						{show_validation}
					/>
				{:else if component === "hb-input-range"}
					<hb-input-range
						style={inputRangeStyleToSet}
						on:setValid={(d) => setValidByMessage(d.detail)}
						on:setValue={(d) => setValueByMessage(d.detail)}
						schemaentry={JSON.stringify(
							{
								...entry,
								value: allValues[entry.id] ?? entry.value,
							},
							null,
							0,
						)}
						set_value
						set_valid
						{show_validation}
					/>
				{:else if component === "hb-input-file"}
					<hb-input-file
						style={inputFileStyleToSet}
						on:setValid={(d) => setValidByMessage(d.detail)}
						on:setValue={(d) => setValueByMessage(d.detail)}
						schemaentry={JSON.stringify(
							{
								...entry,
								value: allValues[entry.id] ?? entry.value,
							},
							null,
							0,
						)}
						set_value
						set_valid
						{show_validation}
					/>
				{:else if component === "hb-input-email"}
					<hb-input-email
						style={inputEmailStyleToSet}
						on:setValid={(d) => setValidByMessage(d.detail)}
						on:setValue={(d) => setValueByMessage(d.detail)}
						schemaentry={JSON.stringify(
							{
								...entry,
								value: allValues[entry.id] ?? entry.value,
							},
							null,
							0,
						)}
						set_value
						set_valid
						{show_validation}
						on:clickEnter={() => onSubmit()}
					/>
				{:else if component === "hb-input-date"}
					<hb-input-date
						style={inputDateStyleToSet}
						on:setValid={(d) => setValidByMessage(d.detail)}
						on:setValue={(d) => setValueByMessage(d.detail)}
						schemaentry={JSON.stringify(
							{
								...entry,
								value: allValues[entry.id] ?? entry.value,
							},
							null,
							0,
						)}
						set_value
						set_valid
						{show_validation}
						on:clickEnter={() => onSubmit()}
					/>
				{:else if component === "hb-input-datetime"}
					<hb-input-datetime
						style={inputDateStyleToSet}
						on:setValid={(d) => setValidByMessage(d.detail)}
						on:setValue={(d) => setValueByMessage(d.detail)}
						schemaentry={JSON.stringify(
							{
								...entry,
								value: allValues[entry.id] ?? entry.value,
							},
							null,
							0,
						)}
						set_value
						set_valid
						{show_validation}
						on:clickEnter={() => onSubmit()}
					/>
				{:else if component === "hb-input-checkbox"}
					<hb-input-checkbox
						style={inputCheckboxStyleToSet}
						on:setValid={(d) => setValidByMessage(d.detail)}
						on:setValue={(d) => setValueByMessage(d.detail)}
						schemaentry={JSON.stringify(
							{
								...entry,
								value: allValues[entry.id] ?? entry.value,
							},
							null,
							0,
						)}
						set_value
						set_valid
						{show_validation}
					/>
				{:else if component === "hb-input-number"}
					<hb-input-number
						style={inputNumberStyleToSet}
						on:setValid={(d) => setValidByMessage(d.detail)}
						on:setValue={(d) => setValueByMessage(d.detail)}
						schemaentry={JSON.stringify(
							{
								...entry,
								value: allValues[entry.id] ?? entry.value,
							},
							null,
							0,
						)}
						set_value
						set_valid
						{show_validation}
						on:clickEnter={() => onSubmit()}
					/>
				{:else if component === "hb-input-area"}
					<hb-input-area
						style={inputAreaStyleToSet}
						on:setValid={(d) => setValidByMessage(d.detail)}
						on:setValue={(d) => setValueByMessage(d.detail)}
						schemaentry={JSON.stringify(
							{
								...entry,
								value: allValues[entry.id] ?? entry.value,
							},
							null,
							0,
						)}
						set_value
						set_valid
						{show_validation}
						on:clickEnter={() => onSubmit()}
					/>
				{:else if component === "hb-input-radio"}
					<hb-input-radio
						style={inputRadioStyleToSet}
						on:setValid={(d) => setValidByMessage(d.detail)}
						on:setValue={(d) => setValueByMessage(d.detail)}
						schemaentry={JSON.stringify(
							{
								...entry,
								value: allValues[entry.id] ?? entry.value,
							},
							null,
							0,
						)}
						set_value
						set_valid
						{show_validation}
					/>
				{:else if component === "hb-input-select"}
					<hb-input-select
						style={inputSelectStyleToSet}
						on:setValid={(d) => setValidByMessage(d.detail)}
						on:setValue={(d) => setValueByMessage(d.detail)}
						schemaentry={JSON.stringify(
							{
								...entry,
								value: allValues[entry.id] ?? entry.value,
							},
							null,
							0,
						)}
						set_value
						set_valid
						{show_validation}
					/>
				{/if}
			</div>
		{/if}
	{/each}
	{#if !hide_submit}
		<div id="button_container" part="button_container">
			<span on:click|preventDefault={() => onSubmit()}
				><slot name="submit_button">
					<button part="main_button" type="button" class="btn btn-primary">
						<slot name="submit_label">Submit</slot>
					</button>
				</slot></span
			>
			<slot name="other_buttons" />
		</div>
	{/if}
{/if}

<style lang="scss">
	@import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
</style>
