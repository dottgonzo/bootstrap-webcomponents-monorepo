<svelte:options tag="hb-shop-item-row" />

<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { get_current_component } from "svelte/internal";
	import debounce from "debounce";

	$: {
	}
	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();
	function dispatch(name, detail) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}
</script>

<svelte:head>
	<link rel="stylesheet" href="../../node_modules/bootstrap-icons/font/bootstrap-icons.css" />
</svelte:head>
<div class="card">
	<div class="row g-0 border rounded overflow-hidden flex-md-row shadow-sm h-md-250 position-relative">
		<div class="col-auto">
			<a href="/" class="position-relative">
				<svg
					class="img-fluid rounded-start"
					width="200"
					height="250"
					xmlns="http://www.w3.org/2000/svg"
					role="img"
					aria-label="Placeholder: Thumbnail"
					preserveAspectRatio="xMidYMid slice"
					focusable="false"
				>
					<title>Placeholder</title>
					<rect width="100%" height="100%" fill="#55595c" />
					<text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text>
				</svg>
				<span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"> New </span>
			</a>
		</div>
		<div class="col d-flex flex-column position-static">
			<div class="card-body">
				<h5 class="card-title"><a class="" href="/">Card title</a></h5>
				<h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
				<p class="card-text mb-2">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
				<div class="lh-1 d-flex align-items-center">
					<span class="text-warning me-1 mb-1">
						<i class="bi bi-star-fill" />
						<i class="bi bi-star-fill" />
						<i class="bi bi-star-fill" />
						<i class="bi bi-star-half" />
						<i class="bi bi-star" />
					</span><span class="text-warning me-1"> 3.5</span><span class="fs-6 text-muted"> (1,500)</span>
				</div>
				<div class="lh-1 mt-3"><span class="text-dark fw-bold">$500</span> <del class="fs-6 text-muted">$600</del></div>
			</div>
			<div class="card-footer">Card footer</div>
		</div>
	</div>
</div>

<style lang="scss">
	@import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
</style>
