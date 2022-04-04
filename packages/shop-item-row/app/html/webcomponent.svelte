<svelte:options tag="hb-shop-item-row" />

<script lang="ts">
	export let id: string;
	export let style: string;

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
	$: {
		if (!id) id = "";
		if (!style) style = "";
	}
</script>

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
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											fill="currentColor"
											class="pe-1 bi"
											class:bi-star-fill={biStarFill}
											viewBox="0 0 16 16"
										>
											<path
												d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
											/>
										</svg>
									{:else if biStarHalf}
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											fill="currentColor"
											class="pe-1 bi"
											class:bi-star-half={biStarHalf}
											viewBox="0 0 16 16"
										>
											<path
												d="M5.354 5.119 7.538.792A.516.516 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0 1 16 6.32a.548.548 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.52.52 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.58.58 0 0 1 .085-.302.513.513 0 0 1 .37-.245l4.898-.696zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.565.565 0 0 1 .162-.505l2.907-2.77-4.052-.576a.525.525 0 0 1-.393-.288L8.001 2.223 8 2.226v9.8z"
											/>
										</svg>
									{:else}
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											fill="currentColor"
											class="pe-1 bi"
											class:bi-star={biStar}
											viewBox="0 0 16 16"
										>
											<path
												d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"
											/>
										</svg>
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
