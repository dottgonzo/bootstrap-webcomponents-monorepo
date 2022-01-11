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

	import type { FormSchema, FormSchemaEntry } from "@app/types/webcomponent.type";

	import pkg from "../../package.json";

	import { groupMultipleBy } from "@app/functions/utils";

	type IComponentName =
		| "hb-input-select"
		| "hb-input-date"
		| "hb-input-text"
		| "hb-input-file"
		| "hb-input-number"
		| "hb-input-email"
		| "hb-input-area"
		| "hb-input-checkbox"
		| "hb-input-radio";

	interface ISchemaOption {
		labelIsHandledByComponent?: boolean;
		row?: boolean;
	}
	interface IComponent {
		options?: ISchemaOption;
		component?: IComponentName;
	}
	interface IRegisterComponent {
		[k: string]: IComponent;
	}
	interface IControl {
		entry: FormSchemaEntry;
		component?: IComponentName;
		options?: ISchemaOption;
		columns?: any;
	}
	const registeredComponents: IRegisterComponent = {
		row: { component: null, options: { row: true } },
		select: { component: "hb-input-select" },
		date: { component: "hb-input-date" },
		text: { component: "hb-input-text" },
		number: { component: "hb-input-number" },
		email: { component: "hb-input-email" },
		file: { component: "hb-input-file" },
		textarea: { component: "hb-input-area" },
		checkbox: { component: "hb-input-checkbox", options: { labelIsHandledByComponent: true } },
		radio: { component: "hb-input-radio", options: { labelIsHandledByComponent: true } },
	};

	export let schema: FormSchema;

	export let values: Record<string, string | number | boolean> = {};

	export let isInvalid: boolean;
	export let submitted: "yes" | null;
	export let getvals: "yes" | "no" | null;
	let controls: IControl[];
	let visibility: Record<string, boolean>;
	let valids: Record<string, boolean> = {};

	let allValues: Record<string, string | number | boolean> = {};
	let dependencyMap: Record<string, FormSchemaEntry[]>;
	let getControls: (schema: FormSchema) => IControl[];
	$: {
		if (!visibility) visibility = {};
		if (submitted && submitted === "yes" && schema && typeof schema !== "string") {
			onSubmit();
		}
		if (typeof schema === "string") {
			schema = JSON.parse(schema as unknown as string);
			if (!controls?.length || !controls.find((f) => f.entry.id === schema[0].id)) {
				valids = {};
				allValues = {};
				dependencyMap = {};
				visibility = {};
				controls = [];
				values = {};
			}

			for (const s of schema) {
				if (s.type !== "row") {
					values[s.id] = s.value;
				}
			}
		} else if (!schema) {
			schema = null;
		}
		dependencyMap = schema
			? groupMultipleBy(
					schema.filter((entry) => entry.dependencies?.length),
					(entry) => entry.dependencies.map((dep) => dep.id),
			  )
			: {};

		if (!isInvalid && isInvalid !== false) isInvalid = true;

		getControls = (schema: FormSchema): IControl[] => {
			return schema.map((entry) => {
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
			});
		};

		controls = schema ? getControls(schema) : [];
		isInvalid = !Object.entries(valids).length || Object.entries(valids).some(([id, isValid]) => !isValid && visibility[id]);
		const obj = Object.assign({ _valid: !isInvalid }, values);
		// dispatch("initialize", obj);
		if (getvals && getvals === "yes") getVals();
		else {
			getvals = "no";
		}
	}

	const canShow = (entry: FormSchemaEntry) => {
		for (const dep of entry.dependencies || []) {
			if (!visibility[dep.id] || !dep.values?.includes(values[dep.id])) {
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

	function addComponent(componentName: string, scriptJsName: string, componentId: string, localPackageDir?: string) {
		if (!document.getElementById(componentId)) {
			const script = document.createElement("script");
			script.id = componentId;
			script.src = `https://cdn.jsdelivr.net/npm/@htmlbricks/${componentName}@${pkg.version}/release/${scriptJsName}`;
			if (localPackageDir && location.href.includes("localhost")) script.src = `http://localhost:6006/${localPackageDir}/dist/${scriptJsName}`;

			document.head.appendChild(script);
		}
	}

	addComponent("hb-input-date", "formrendererdateinput.js", "formrendererdateinputscript", "formdateinputrenderer");

	addComponent("hb-input-text", "formrenderertextinput.js", "formrenderertextinputscript", "formtextinputrenderer");
	addComponent("hb-input-email", "formrendereremailinput.js", "formrendereremailinputscript", "formemailinputrenderer");
	addComponent("hb-input-checkbox", "formrenderercheckboxinput.js", "formrenderercheckboxinputscript", "formcheckboxinputrenderer");
	addComponent("hb-input-number", "formrenderernumberinput.js", "formrenderernumberinputscript", "formnumberinputrenderer");
	addComponent("hb-input-area", "formrendererareainput.js", "formrendererareainputscript", "formareainputrenderer");
	addComponent("hb-input-radio", "formrendererradioinput.js", "formrendererradioinputscript", "formradioinputrenderer");
	addComponent("hb-input-select", "formrendererselectinput.js", "formrendererselectinputscript", "formselectinputrenderer");
	addComponent("hb-input-file", "formrendererfileinput.js", "formrendererfileinputscript", "formfileinputrenderer");

	const component = get_current_component();

	const svelteDispatch = createEventDispatcher();
	function dispatch(name, detail) {
		svelteDispatch(name, detail);
		component.dispatchEvent?.(new CustomEvent(name, { detail }));
	}
	const onSubmit = () => {
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

{#if schema}
	{#each controls as { entry, component, options, columns } (entry.id)}
		{#if options.row}
			{#if (visibility[entry.id] || visibility[entry.id] !== false) && columns?.length ? columns.some((c) => visibility[c.entry.id]) : false}
				<div class="row">
					{#each columns as { entry, component, options } (entry.id)}
						<div class="col">
							{#if visibility[entry.id]}
								<div class="col mb-3">
									{#if !options.labelIsHandledByComponent}
										<label for={entry.id}>{entry.label}</label>
									{/if}

									{#if component === "hb-input-text"}
										<hb-input-text
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
											setvalue
											setvalid
										/>
									{:else if component === "hb-input-file"}
										<hb-input-file
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
											setvalue
											setvalid
										/>
									{:else if component === "hb-input-email"}
										<hb-input-email
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
											setvalue
											setvalid
										/>
									{:else if component === "hb-input-date"}
										<hb-input-date
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
											setvalue
											setvalid
										/>
									{:else if component === "hb-input-checkbox"}
										<hb-input-checkbox
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
											setvalue
											setvalid
										/>
									{:else if component === "hb-input-number"}
										<hb-input-number
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
											setvalue
											setvalid
										/>
									{:else if component === "hb-input-area"}
										<hb-input-area
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
											setvalue
											setvalid
										/>
									{:else if component === "hb-input-radio"}
										<hb-input-radio
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
											setvalue
											setvalid
										/>
									{:else if component === "hb-input-select"}
										<hb-input-select
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
											setvalue
											setvalid
										/>
									{/if}
								</div>
							{/if}
						</div>
					{/each}
				</div>
			{/if}
		{:else if visibility[entry.id]}
			<div class="col mb-3">
				{#if !options.labelIsHandledByComponent}
					<label for={entry.id}>{entry.label}</label>
				{/if}

				{#if component === "hb-input-text"}
					<hb-input-text
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
						setvalue
						setvalid
					/>
				{:else if component === "hb-input-file"}
					<hb-input-file
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
						setvalue
						setvalid
					/>
				{:else if component === "hb-input-email"}
					<hb-input-email
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
						setvalue
						setvalid
					/>
				{:else if component === "hb-input-date"}
					<hb-input-date
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
						setvalue
						setvalid
					/>
				{:else if component === "hb-input-checkbox"}
					<hb-input-checkbox
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
						setvalue
						setvalid
					/>
				{:else if component === "hb-input-number"}
					<hb-input-number
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
						setvalue
						setvalid
					/>
				{:else if component === "hb-input-area"}
					<hb-input-area
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
						setvalue
						setvalid
					/>
				{:else if component === "hb-input-radio"}
					<hb-input-radio
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
						setvalue
						setvalid
					/>
				{:else if component === "hb-input-select"}
					<hb-input-select
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
						setvalue
						setvalid
					/>
				{/if}
			</div>
		{/if}
	{/each}
	{#if !submitted}<button type="button" class="btn btn-primary" disabled={isInvalid} on:click|preventDefault={() => onSubmit()}
			><slot name="submit-label">Submit</slot></button
		>{/if}
{/if}

<style lang="scss">
	@import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
</style>
