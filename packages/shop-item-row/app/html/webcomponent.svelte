<svelte:options tag="hb-shop-item-row" />

<script lang="ts">
	export let img: string = undefined;
	export let url: string = undefined;
	export let badge: string = undefined;
	export let title: string = undefined;
	export let subtitle: string = undefined;
	export let text: string = undefined;
	export let rating: number = undefined;
	export let ratingScale: number = $$props["rating-scale"] || 5;
	export let reviews: string = undefined;
	export let reviewsUrl: string = $$props["reviews-url"];
	export let price: string = undefined;
	export let regularPrice: string = ($$props["regular-price"] = undefined);
	export let footer: string = undefined;
</script>

<svelte:head>
	<link rel="stylesheet" href="../../node_modules/bootstrap-icons/font/bootstrap-icons.css" />
</svelte:head>
<div class="card">
	<div class="row g-0 border rounded overflow-hidden flex-md-row shadow-sm h-md-250 position-relative">
		<div class="col-auto">
			<slot />
			{#if img}
				<a href={url || null} class="position-relative">
					<img alt={title || "..."} src={img} class="img-fluid rounded-start" />
					{#if $$slots.badge || badge}
						<span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"> <slot name="badge">{badge}</slot> </span>
					{/if}
				</a>
			{/if}
		</div>
		<div class="col d-flex flex-column position-static">
			<div class="card-body">
				{#if $$slots.title || title}
					<h5 class="card-title"><a class="" href={url || null}><slot name="title">{title}</slot></a></h5>
				{/if}
				{#if $$slots.subtitle || subtitle}
					<h6 class="card-subtitle mb-2 text-muted"><slot name="subtitle">{subtitle}</slot></h6>
				{/if}
				{#if $$slots.text || text}
					<p class="card-text mb-2"><slot name="text">{text}</slot></p>
				{/if}
				{#if rating || $$slots.reviews || reviews}
					<div class="lh-1 d-flex align-items-center">
						{#if rating}
							<span class="text-warning me-1 mb-1">
								{#each { length: ratingScale } as _, i}
									{@const biStar = true}
									{@const biStarHalf = i + 0.25 < rating}
									{@const biStarFill = i + 0.75 < rating}
									{#if biStarFill}
										<i class="bi" class:bi-star-fill={biStarFill} />
									{:else if biStarHalf}
										<i class="bi" class:bi-star-half={biStarHalf} />
									{:else}
										<i class="bi" class:bi-star={biStar} />
									{/if}
								{/each}
							</span><span class="text-warning me-1"> <slot name="rating">{rating}</slot></span>
						{/if}
						{#if $$slots.reviews || reviews}
							<span class="fs-6 text-muted"> <a class="" href={reviewsUrl || null}>(<slot name="reviews">{reviews}</slot>)</a></span>
						{/if}
					</div>
				{/if}

				{#if $$slots.price || price || $$slots["regular-price"] || regularPrice}
					<div class="lh-1 mt-3">
						{#if $$slots.price || price}
							<span class="text-dark fw-bold"><slot name="price">{price}</slot></span>
						{/if}
						{#if $$slots["regular-price"] || regularPrice}
							<del class="fs-6 text-muted"><slot name="regular-price">{regularPrice}</slot></del>
						{/if}
					</div>
				{/if}
			</div>
			{#if $$slots.footer || footer}
				<div class="card-footer"><slot name="footer">{footer}</slot></div>
			{/if}
		</div>
	</div>
</div>

<style lang="scss">
	@import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
</style>
