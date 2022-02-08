<svelte:options tag="hb-editor-tinymce" />

<script lang="ts">
	/**
	 * Svelte Video Login/Register/Forget Password WebComponent
	 * =====================
	 *
	 * @contributors: Dario Caruso <dev@dariocaruso.info> (https://dariocaruso.info)
	 *
	 * @license: MIT License
	 *
	 */

	import { createEventDispatcher } from "svelte";
	import { get_current_component, onMount } from "svelte/internal";
	// import MediumEditor from "medium-editor";
	// import tinymce from "@app/functions/tinymce/tinymce.min";

	// import "@app/functions/tinymce/themes/silver/theme.min.js";
	// import "@app/functions/tinymce/skins/ui/oxide/content.min.css";
	// import "@app/functions/tinymce/skins/ui/oxide/skin.min.css";
	// import "@app/functions/tinymce/icons/default/icons.min";

	import "@tinymce/tinymce-webcomponent";

	export let id: string;
	export let key: string;
	export let plugins: string;
	export let toolbar: string;
	export let images_upload_url: string;

	$: {
		if (!id) {
			id = null;
		}
		if (!key) {
			key = "no-api-key";
		}
		if (!plugins) {
			plugins =
				"advlist autolink lists link image charmap print preview anchor searchreplace visualblocks code fullscreen insertdatetime media table paste code help wordcount";
		}
		if (!toolbar) {
			toolbar =
				"undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help | customDateButton";
		}
		if (!images_upload_url) {
			images_upload_url = "";
		}
	}

	function imagesUpload(e) {
		console.log("images_upload_url", e, e.base64());
		return e.base64();
	}

	function editorSetup(e) {
		console.log(e, "ttt");
	}

	function setup(editor) {
		console.log(editor);
		editor.ui.registry.addButton("customInsertButton", {
			text: "My Button",
			onAction: function () {
				editor.insertContent("&nbsp;<strong>It's my button!</strong>&nbsp;");
			},
		});

		const toTimeHtml = function (date) {
			return '<time datetime="' + date.toString() + '">' + date.toDateString() + "</time>";
		};
		editor.on("change", (e) => e.dispatchEvent("change"));
		// editor.dom.dispatchEvent("change");
		editor.ui.registry.addButton("customDateButton", {
			icon: "insert-time",
			tooltip: "Insert Current Date",
			disabled: true,
			onAction: function () {
				editor.insertContent(toTimeHtml(new Date()));
			},
			onSetup: function (buttonApi) {
				var editorEventCallback = function (eventApi) {
					buttonApi.setDisabled(eventApi.element.nodeName.toLowerCase() === "time");
				};
				editor.on("NodeChange", editorEventCallback);

				/* onSetup should always return the unbind handlers */
				return function (buttonApi) {
					editor.off("NodeChange", editorEventCallback);
				};
			},
		});
	}

	function initTiny(e: HTMLElement) {
		const c = document.createElement("script");
		c.innerText = imagesUpload.toString() + setup.toString();

		e.parentNode.appendChild(c);
	}
</script>

<!-- <svelte:head>
	<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/medium-editor@latest/dist/css/medium-editor.min.css" type="text/css" media="screen" charset="utf-8" />
</svelte:head> -->
<!-- <form method="post">
	<textarea id="editor">Hello, World!</textarea>
</form> -->
<!-- <form>
	<input id="x" type="hidden" name="content" />
	<trix-editor input="x" />
</form> -->
{#if images_upload_url}
	<tinymce-editor api-key={key} {plugins} {toolbar} {images_upload_url} />
{:else}
	<tinymce-editor use:initTiny api-key={key} {plugins} {toolbar} images_upload_handler="imagesUpload" setup="setup" on:change={editorSetup} />
{/if}

<style lang="scss">
	// @import "../styles/bootstrap.scss";
	// @import "../styles/trix.css";
	// @import "../styles/webcomponent.scss";
</style>
