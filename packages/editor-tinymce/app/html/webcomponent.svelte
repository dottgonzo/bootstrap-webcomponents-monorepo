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
	// let editor: MediumEditor;
	// let editorElement: HTMLElement;
	// let toolbarElement: HTMLElement;

	$: {
		if (!id) {
			id = null;
		}
		if (!key) {
			key = "no-api-key";
		}
	}
	// function mountEditor() {
	// 	console.info("mount editor");
	// 	if (!editorElement) return console.error("cannot create ckEditor");

	// 	editor = new MediumEditor(editorElement);
	// }
	// onMount(() => {
	// 	editorElement = component.shadowRoot.getElementById("editor");
	// 	// toolbarElement = component.shadowRoot.getElementById("toolbar");
	// 	mountEditor();
	// });
	function example_image_upload_handler(blobInfo, success, failure, progress) {
		var xhr, formData;

		xhr = new XMLHttpRequest();
		xhr.withCredentials = false;
		xhr.open("POST", "postAcceptor.php");

		xhr.upload.onprogress = function (e) {
			progress((e.loaded / e.total) * 100);
		};

		xhr.onload = function () {
			var json;

			if (xhr.status === 403) {
				failure("HTTP Error: " + xhr.status, { remove: true });
				return;
			}

			if (xhr.status < 200 || xhr.status >= 300) {
				failure("HTTP Error: " + xhr.status);
				return;
			}

			json = JSON.parse(xhr.responseText);

			if (!json || typeof json.location != "string") {
				failure("Invalid JSON: " + xhr.responseText);
				return;
			}

			success(json.location);
		};

		xhr.onerror = function () {
			failure("Image upload failed due to a XHR Transport error. Code: " + xhr.status);
		};

		formData = new FormData();
		formData.append("file", blobInfo.blob(), blobInfo.filename());

		xhr.send(formData);
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
<tinymce-editor
	api-key={key}
	plugins="advlist autolink lists link image charmap print preview anchor searchreplace visualblocks code fullscreen insertdatetime media table paste code help wordcount"
	toolbar="undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help"
	images_upload_handler="example_image_upload_handler"
/>

<style lang="scss">
	// @import "../styles/bootstrap.scss";
	// @import "../styles/trix.css";
	@import "../styles/webcomponent.scss";
</style>
