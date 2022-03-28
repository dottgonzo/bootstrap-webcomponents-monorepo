<svelte:options tag="hb-downloader" />

<script lang="ts">
	import { get_current_component } from "svelte/internal";
	import { createEventDispatcher } from "svelte";
	import pkg from "../../package.json";
	import type { IHeader } from "@app/types/webcomponent.type";
	import { addComponent, getChildStyleToPass } from "@htmlbricks/hb-jsutils/main";
	import parseStyle from "style-to-object";
	let parsedStyle: { [x: string]: string };
	export let style: string;
	import { styleSetup as dialogStyleSetup } from "../../node_modules/@htmlbricks/hb-dialog/release/docs";
	let dialogStyleToSet: string = "";

	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();
	function dispatch(name, detail) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}

	addComponent("@htmlbricks/hb-dialog", pkg.version);

	export let downloadid: string;
	export let uri: string;
	export let headers: IHeader;
	export let targetfilename: string;
	let total: number;
	let loaded: number = 0;

	let xhr: XMLHttpRequest;
	let downloaded: boolean;
	let errorMessage: string;
	$: {
		if (style) {
			parsedStyle = parseStyle(style);
			dialogStyleToSet = getChildStyleToPass(parsedStyle, dialogStyleSetup?.vars);
		}
		if (!downloadid) downloadid = "";
		if (!downloaded) downloaded = false;
		if (!uri) uri = "";

		try {
			if (headers && typeof headers === "string") headers = JSON.parse(headers);
		} catch (err) {}
		if (!targetfilename && uri) targetfilename = uri.split("/")[uri.split("/").length - 1].split("?")[0];
	}

	function onModalOpened() {
		function onRequestError(err: any) {
			console.error(err);
			if (err) errorMessage = err;
			// uri = "";
			// show = false;
			xhr = null;
			// downloaded = false;
			// downloadid = "";
			dispatch("downloadError", { downloaded, id: downloadid, error: err });
		}
		loaded = 0;
		xhr = new XMLHttpRequest();
		try {
			xhr.open("GET", uri, true);
			// xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
			// xhr.setRequestHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, POST, DELETE, OPTIONS");
			// xhr.setRequestHeader("Access-Control-Allow-Headers", "*");

			if (headers) {
				for (const header of Object.keys(headers)) {
					xhr.setRequestHeader(header, headers[header]);
				}
			}

			xhr.responseType = "blob";
			xhr.onload = function () {
				if (xhr.status && (xhr.status > 299 || xhr.status < 200)) return onRequestError("request error");
				const urlCreator = window.URL || window.webkitURL;
				const imageUrl = urlCreator.createObjectURL(this.response);
				const tag = document.createElement("a");
				tag.href = imageUrl;
				tag.target = "_blank";
				tag.download = targetfilename;
				document.body.appendChild(tag);
				tag.click();
				document.body.removeChild(tag);
				console.log("loadEnd");
				downloadid = "";
				uri = "";
				xhr = null;
				downloaded = true;
				errorMessage = null;
				return dispatch("downloadComplete", { downloaded, id: downloadid || "default" });
			};
			xhr.onerror = (error) => {
				return onRequestError(error);
				// uri = "";
				// show = false;
				// xhr = null;
				// downloaded = false;
				// dispatch("downloadError", { downloaded, id, error });
			};
			xhr.onprogress = function (event) {
				total = event?.total || 0;
				loaded = event?.loaded || 0;
				// console.log("PROGRES", event?.total, event?.loaded, event);
			};
			xhr.onloadend = function (event) {};
			xhr.send();
		} catch (error) {
			console.error("download err ", error);

			return onRequestError(error);
		}
	}

	function dialogShowEvent(d) {
		if (d.show) {
			downloadid = d.id;
			onModalOpened();
		} else {
			uri = "";
			downloadid = "";
			errorMessage = null;
			if (xhr) {
				xhr.abort();
			}
			xhr = null;
		}
	}
</script>

<hb-dialog style={dialogStyleToSet} id={downloadid} show={uri ? "yes" : "no"} on:modalShow={(d) => dialogShowEvent(d.detail)}>
	<span slot="title">
		<slot name="title">Downloading</slot>
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
