<svelte:options tag="hb-uploader" />

<script lang="ts">
	import { get_current_component } from "svelte/internal";
	import { createEventDispatcher } from "svelte";
	import pkg from "../../package.json";
	import axios from "axios";
	import { addComponent, getChildStyleToPass } from "@htmlbricks/hb-jsutils/main";
	import parseStyle from "style-to-object";
	let parsedStyle: { [x: string]: string };
	import { styleSetup as dialogStyleSetup } from "../../node_modules/@htmlbricks/hb-dialog/release/docs";
	import type { Component } from "@app/types/webcomponent.type";
	let dialogStyleToSet: string = "";

	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();
	function dispatch(name, detail) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}

	addComponent({ repoName: "@htmlbricks/hb-dialog", version: pkg.version });

	export let id: string;
	export let style: string;
	export let fetch_data: Component["fetch_data"];
	let total: number;
	let loaded: number = 0;
	export let upload_id: string;

	let xhr: XMLHttpRequest;
	let completed: boolean;
	let errorMessage: string;
	$: {
		if (!id) id = null;
		if (!upload_id) upload_id = id + "_dialog";
		if (style) {
			parsedStyle = parseStyle(style);
			dialogStyleToSet = getChildStyleToPass(parsedStyle, dialogStyleSetup?.vars);
		}
		if (!completed) completed = false;

		try {
			if (fetch_data && typeof fetch_data === "string") fetch_data = JSON.parse(fetch_data);
		} catch (err) {
			console.error(err);
		}
	}

	async function onModalOpened() {
		function onRequestError(err: Error) {
			console.error(err);
			errorMessage = err?.message || "upload error";

			dispatch("uploadError", { completed, id: upload_id, error: err });
		}
		loaded = 0;
		try {
			const axiosConfig = {
				routes: { cors: true },
				url: fetch_data.url,
				data: fetch_data.data,
				method: fetch_data.method || "POST",
				headers: fetch_data.headers || {},
				onUploadProgress: (p: { total: number; loaded: number }) => {
					console.log(p, "onUploadProgress debug");
					total = p.total;
					loaded = p.loaded;
				},
			};

			await axios.request(axiosConfig);
			return dispatch("uploadComplete", { completed, id: upload_id });
		} catch (error) {
			console.error("upload error ", error);

			return onRequestError(error);
		}
	}

	function dialogShowEvent(d: { id: string; show: true }) {
		errorMessage = null;

		if (d.show) {
			onModalOpened().catch(console.error);
		}
		dispatch("modalShow", d);
	}
</script>

<hb-dialog style={dialogStyleToSet} id={upload_id} show={fetch_data?.url ? "yes" : "no"} on:modalShow={(d) => dialogShowEvent(d.detail)}>
	<span slot="title">
		<slot name="title">Uploading</slot>
	</span>
	<div slot="body-content">
		{#if !total && !errorMessage}
			<div class="progress">
				<div
					class="progress-bar progress-bar-striped progress-bar-animated"
					role="progressbar"
					aria-valuenow="100"
					aria-valuemin="0"
					aria-valuemax="100"
					style="width: 100%"
				/>
			</div>
		{:else if !errorMessage}
			<div class="progress">
				<div
					class="progress-bar"
					style="width:{Math.round((loaded / total) * 100)}%"
					role="progressbar"
					aria-valuenow={Math.round((loaded / total) * 100)}
					aria-valuemin="0"
					aria-valuemax="100"
				>
					{Math.round((loaded / total) * 100)}%
				</div>
			</div>
		{:else if errorMessage}
			{errorMessage}
		{/if}
	</div>
	<span slot="modal-footer" />
</hb-dialog>

<style lang="scss">
	@import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
</style>
