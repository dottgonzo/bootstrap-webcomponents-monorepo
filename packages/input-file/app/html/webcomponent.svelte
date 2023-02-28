<svelte:options tag="hb-input-file" />

<script lang="ts">
	import { get_current_component } from "svelte/internal";
	import { createEventDispatcher } from "svelte";
	import type { FormSchemaEntry } from "@app/types/webcomponent.type";
	export let set_value: boolean;
	export let set_valid: boolean;
	export let show_validation: "yes" | "no";

	export let schemaentry: FormSchemaEntry;

	const types = {
		//   File Extension   MIME Type
		abs: "audio/x-mpeg",
		ai: "application/postscript",
		aif: "audio/x-aiff",
		aifc: "audio/x-aiff",
		aiff: "audio/x-aiff",
		aim: "application/x-aim",
		art: "image/x-jg",
		asf: "video/x-ms-asf",
		asx: "video/x-ms-asf",
		au: "audio/basic",
		avi: "video/x-msvideo",
		avx: "video/x-rad-screenplay",
		bcpio: "application/x-bcpio",
		bin: "application/octet-stream",
		bmp: "image/bmp",
		body: "text/html",
		cdf: "application/x-cdf",
		cer: "application/pkix-cert",
		class: "application/java",
		cpio: "application/x-cpio",
		csh: "application/x-csh",
		css: "text/css",
		dib: "image/bmp",
		doc: "application/msword",
		dtd: "application/xml-dtd",
		dv: "video/x-dv",
		dvi: "application/x-dvi",
		eot: "application/vnd.ms-fontobject",
		eps: "application/postscript",
		etx: "text/x-setext",
		exe: "application/octet-stream",
		gif: "image/gif",
		gtar: "application/x-gtar",
		gz: "application/x-gzip",
		hdf: "application/x-hdf",
		hqx: "application/mac-binhex40",
		htc: "text/x-component",
		htm: "text/html",
		html: "text/html",
		ief: "image/ief",
		jad: "text/vnd.sun.j2me.app-descriptor",
		jar: "application/java-archive",
		java: "text/x-java-source",
		jnlp: "application/x-java-jnlp-file",
		jpe: "image/jpeg",
		jpeg: "image/jpeg",
		jpg: "image/jpeg",
		js: "application/javascript",
		jsf: "text/plain",
		json: "application/json",
		jspf: "text/plain",
		kar: "audio/midi",
		latex: "application/x-latex",
		m3u: "audio/x-mpegurl",
		mac: "image/x-macpaint",
		man: "text/troff",
		mathml: "application/mathml+xml",
		me: "text/troff",
		mid: "audio/midi",
		midi: "audio/midi",
		mif: "application/x-mif",
		mov: "video/quicktime",
		movie: "video/x-sgi-movie",
		mp1: "audio/mpeg",
		mp2: "audio/mpeg",
		mp3: "audio/mpeg",
		mp4: "video/mp4",
		mpa: "audio/mpeg",
		mpe: "video/mpeg",
		mpeg: "video/mpeg",
		mpega: "audio/x-mpeg",
		mpg: "video/mpeg",
		mpv2: "video/mpeg2",
		ms: "application/x-wais-source",
		nc: "application/x-netcdf",
		oda: "application/oda",
		odb: "application/vnd.oasis.opendocument.database",
		odc: "application/vnd.oasis.opendocument.chart",
		odf: "application/vnd.oasis.opendocument.formula",
		odg: "application/vnd.oasis.opendocument.graphics",
		odi: "application/vnd.oasis.opendocument.image",
		odm: "application/vnd.oasis.opendocument.text-master",
		odp: "application/vnd.oasis.opendocument.presentation",
		ods: "application/vnd.oasis.opendocument.spreadsheet",
		odt: "application/vnd.oasis.opendocument.text",
		otg: "application/vnd.oasis.opendocument.graphics-template",
		oth: "application/vnd.oasis.opendocument.text-web",
		otp: "application/vnd.oasis.opendocument.presentation-template",
		ots: "application/vnd.oasis.opendocument.spreadsheet-template",
		ott: "application/vnd.oasis.opendocument.text-template",
		ogx: "application/ogg",
		ogv: "video/ogg",
		oga: "audio/ogg",
		ogg: "audio/ogg",
		otf: "application/x-font-opentype",
		spx: "audio/ogg",
		flac: "audio/flac",
		anx: "application/annodex",
		axa: "audio/annodex",
		axv: "video/annodex",
		xspf: "application/xspf+xml",
		pbm: "image/x-portable-bitmap",
		pct: "image/pict",
		pdf: "application/pdf",
		pgm: "image/x-portable-graymap",
		pic: "image/pict",
		pict: "image/pict",
		pls: "audio/x-scpls",
		png: "image/png",
		pnm: "image/x-portable-anymap",
		pnt: "image/x-macpaint",
		ppm: "image/x-portable-pixmap",
		ppt: "application/vnd.ms-powerpoint",
		pps: "application/vnd.ms-powerpoint",
		ps: "application/postscript",
		psd: "image/vnd.adobe.photoshop",
		qt: "video/quicktime",
		qti: "image/x-quicktime",
		qtif: "image/x-quicktime",
		ras: "image/x-cmu-raster",
		rdf: "application/rdf+xml",
		rgb: "image/x-rgb",
		rm: "application/vnd.rn-realmedia",
		roff: "text/troff",
		rtf: "application/rtf",
		rtx: "text/richtext",
		sfnt: "application/font-sfnt",
		sh: "application/x-sh",
		shar: "application/x-shar",
		sit: "application/x-stuffit",
		snd: "audio/basic",
		src: "application/x-wais-source",
		sv4cpio: "application/x-sv4cpio",
		sv4crc: "application/x-sv4crc",
		svg: "image/svg+xml",
		svgz: "image/svg+xml",
		swf: "application/x-shockwave-flash",
		t: "text/troff",
		tar: "application/x-tar",
		tcl: "application/x-tcl",
		tex: "application/x-tex",
		texi: "application/x-texinfo",
		texinfo: "application/x-texinfo",
		tif: "image/tiff",
		tiff: "image/tiff",
		tr: "text/troff",
		tsv: "text/tab-separated-values",
		ttf: "application/x-font-ttf",
		txt: "text/plain",
		ulw: "audio/basic",
		ustar: "application/x-ustar",
		vxml: "application/voicexml+xml",
		xbm: "image/x-xbitmap",
		xht: "application/xhtml+xml",
		xhtml: "application/xhtml+xml",
		xls: "application/vnd.ms-excel",
		xml: "application/xml",
		xpm: "image/x-xpixmap",
		xsl: "application/xml",
		xslt: "application/xslt+xml",
		xul: "application/vnd.mozilla.xul+xml",
		xwd: "image/x-xwindowdump",
		vsd: "application/vnd.visio",
		wav: "audio/x-wav",
		wbmp: "image/vnd.wap.wbmp",
		wml: "text/vnd.wap.wml",
		wmlc: "application/vnd.wap.wmlc",
		wmls: "text/vnd.wap.wmlsc",
		wmlscriptc: "application/vnd.wap.wmlscriptc",
		wmv: "video/x-ms-wmv",
		woff: "application/font-woff",
		woff2: "application/font-woff2",
		wrl: "model/vrml",
		wspolicy: "application/wspolicy+xml",
		z: "application/x-compress",
		zip: "application/zip",
	};

	let fileType = "";

	let files: File[];
	let value: string;
	let valid = false;

	let accept: string;

	let theFile: File;
	let imgPreview: any;

	let loadedFile: { name: string; size: number; loaded?: boolean; content?: Buffer };
	let percentage: number;
	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();
	function dispatch(name: string, detail: any) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}
	// function readFile(file: File) {
	// 	loadedFile = { name: file.name, size: file.size, loaded: false };
	// 	percentage = 0;
	// 	try {
	// 		console.log("reading file", file);
	// 		const reader = new FileReader();
	// 		reader.addEventListener("load", (event) => {
	// 			const result = event.target.result;
	// 			loadedFile = { percentage: 100, name: file.name, size: 0, loaded: true, content: result };
	// 			console.log("reading file", "loaded", result);

	// 			// Do something with result
	// 		});

	// 		reader.addEventListener("progress", (event) => {
	// 			if (event.loaded && event.total) {
	// 				const percent = (event.loaded / event.total) * 100;
	// 				console.log(`Progress: ${Math.round(percent)}`);
	// 				percentage = percent;
	// 			}
	// 		});
	// 		reader.readAsDataURL(file);
	// 	} catch (err) {
	// 		console.error(err);
	// 	}
	// }
	$: {
		if (!show_validation) show_validation = "no";

		if (schemaentry && typeof schemaentry === "string") {
			schemaentry = JSON.parse(schemaentry as unknown as string);
		} else if (!schemaentry) {
			schemaentry = null;
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

		accept = schemaentry?.params?.accept || "*";

		value = value != null ? value : (schemaentry?.value as string);

		if (files?.[0] && typeof files?.[0]?.name === "string") {
			theFile = files?.[0];
			fileType = types[theFile?.name?.split(".")?.pop()?.toLowerCase()] || "unknown file type";
			imgPreview = URL.createObjectURL(theFile);
		}
		valid = schemaentry ? !schemaentry?.required || (value != null && theFile?.name) : false;

		console.log(valid, value, "validinput");
		setTimeout(() => {
			if (set_value) dispatch("setValue", { value: theFile || {}, id: schemaentry?.id });
			if (set_valid) dispatch("setValid", { valid, id: schemaentry?.id });
		}, 0);
	}
	function changePlaceholderImage() {
		const inputNode = component.shadowRoot.querySelector('input[type="file"]');
		if (inputNode) inputNode.click();
		console.log("changePlaceholderImage", inputNode);
	}
</script>

<svelte:head>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@latest/font/bootstrap-icons.css" />
</svelte:head>
<span class="form-control {show_validation === 'yes' && schemaentry?.required ? (valid ? 'is-valid' : 'is-invalid') : ''}">
	{#if theFile?.name}
		<span id="preview">
			{#if fileType === "image/jpeg" || fileType === "image/png" || fileType === "image/gif" || fileType === "image/svg+xml"}
				<!-- svelte-ignore a11y-missing-attribute -->
				<img
					style="max-height:{schemaentry?.params?.placeHolderImage?.height || '38'};max-width:{schemaentry?.params?.placeHolderImage?.width ||
						'60'}px;"
					src={imgPreview}
				/>
			{:else if fileType === "video/mp4" || fileType === "video/ogg" || fileType === "video/webm"}
				<i style="font-size:1.3em;vertical-align: middle;" class="bi bi-file-earmark-play" />
			{:else if fileType === "audio/mpeg" || fileType === "audio/ogg" || fileType === "audio/wav"}
				<i style="font-size:1.3em;vertical-align: middle;" class="bi bi-file-earmark-music" />
			{:else if fileType === "application/pdf"}
				<i style="font-size:1.3em;vertical-align: middle;" class="bi bi-file-earmark-pdf" />
			{:else if fileType === "application/vnd.ms-excel" || fileType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}
				<i style="font-size:1.3em;vertical-align: middle;" class="bi bi-file-earmark-spreadsheet" />
			{:else if fileType === "application/msword" || fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"}
				<i style="font-size:1.3em;vertical-align: middle;" class="bi bi-file-earmark-word" />
			{:else if fileType === "application/vnd.ms-powerpoint" || fileType === "application/vnd.openxmlformats-officedocument.presentationml.presentation"}
				<i style="font-size:1.3em;vertical-align: middle;" class="bi bi-file-earmark-ppt" />
			{:else if fileType === "application/zip" || fileType === "application/x-7z-compressed" || fileType === "application/x-rar-compressed"}
				<i style="font-size:1.3em;vertical-align: middle;" class="bi bi-file-earmark-zip" />
			{:else}
				<i style="font-size:1.3em;vertical-align: middle;" class="bi bi-file-earmark" />
			{/if}
			{#if !schemaentry?.params?.placeHolderImage?.src}
				<span id="file-name">{theFile.name}</span>
			{/if}
			<button
				style={schemaentry?.params?.placeHolderImage ? "position: absolute;right: 0px;" : ""}
				class="btn btn-outline"
				on:click={() => {
					theFile = null;
					valid = false;
					value = null;
					imgPreview = null;
					files = [];
				}}><i class="bi bi-x-lg" /></button
			>
		</span>
	{/if}
	{#if !theFile?.name}
		{#if schemaentry?.params?.placeHolderImage?.src}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<span style="cursor:pointer" on:click={changePlaceholderImage}>
				<!-- svelte-ignore a11y-missing-attribute -->
				<img
					style="max-height:{schemaentry.params.placeHolderImage.height || '38'}px;max-width:{schemaentry.params.placeHolderImage.width || '60'}px;"
					src={schemaentry?.params?.placeHolderImage?.src}
				/>
				Select image
			</span>
		{/if}
		<input
			bind:value
			bind:files
			style="max-width: 270px;{schemaentry?.params?.placeHolderImage?.src ? 'opacity: 0;position: absolute;z-index: -1;' : ''}"
			type="file"
			id={schemaentry?.id}
			required={schemaentry?.required}
			placeholder={schemaentry?.placeholder}
			readonly={schemaentry?.readonly}
			{accept}
		/>
	{/if}
</span>

{#if schemaentry?.validationTip && show_validation === "yes"}
	<div part="invalid-feedback" class="invalid-feedback mb-1">
		{schemaentry.validationTip}
	</div>
{/if}

<style lang="scss">
	@import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
</style>
