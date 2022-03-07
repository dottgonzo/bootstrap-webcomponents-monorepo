<svelte:options tag="hb-searchbar" />

<script lang="ts">
	interface keyable {
		[key: string]: any;
	}
	import pkg from "../../package.json";
	import { createEventDispatcher } from "svelte";
	import { get_current_component } from "svelte/internal";

	export let action: string;
	export let method: string = "GET";
	export let actionQueryKey: string = $$props["action-query-key"];
	export let resultItemsKey: string = $$props["result-items-key"];
	export let resultItemTitleKey: string = $$props["result-item-title-key"];
	export let resultItemLinkKey: string = $$props["result-item-link-key"];

	let actionQueryValue: string = "";
	let searchPromise: Promise<keyable[]> = Promise.resolve([]);
	let isSearchCleared: boolean = false;
	let showDropdown: string = "";
	let searchResource;
	let searchInit;
	$: {
		method = method.toUpperCase();
		if (!actionQueryKey) {
			actionQueryKey = "q";
		}
		if (!resultItemsKey) {
			resultItemsKey = "items";
		}
		if (!resultItemTitleKey) {
			resultItemTitleKey = "title";
		}
		if (!resultItemLinkKey) {
			resultItemLinkKey = "link";
		}
		if (isSearchCleared) {
			searchPromise = Promise.resolve([]);
		}
		search(actionQueryValue);
	}
	function search(actionQueryValue) {
		if (actionQueryValue) {
			searchResource = `${action}${actionQueryKey}=${actionQueryValue}`;
			searchInit = {
				method,
				// cache: "no-cache",
				// headers: {
				// 	"Content-Type": "application/json",
				// 	// 'Content-Type': 'application/x-www-form-urlencoded',
				// },
				// redirect: "follow",
				// referrerPolicy: "no-referrer",
			};
			searchPromise = fetchSearchRes(searchResource, searchInit);
			showDropdown = "show";
		} else {
			showDropdown = "";
		}
	}
	let timer;

	const debounce = (v) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			if (!v && actionQueryValue) {
				isSearchCleared = true;
			} else {
				isSearchCleared = false;
			}
			actionQueryValue = v;
		}, 500);
	};
	function handleSearchButtonClick(e) {
		search(actionQueryValue);
	}

	async function fetchSearchRes(resource, init): Promise<object[]> {
		const res = await fetch(resource, init);
		const data = await res.json();

		if (res.ok) {
			dispatch("search-result-items", data);
			return data;
		} else {
			dispatch("search-result-items", new Error(data));
			throw new Error(data);
		}
	}
	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();
	function dispatch(name, detail) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}
</script>

<form class="position-relative">
	<div class="position-relative">
		<input
			class="form-control pe-5 bg-transparent"
			type="search"
			placeholder="Search"
			aria-label="Search"
			on:input={({ target: { value } }) => debounce(value)}
		/>
		<button class="btn bg-transparent px-2 py-0 position-absolute top-50 end-0 translate-middle-y" type="button" on:click={handleSearchButtonClick}>
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
				<path
					d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
				/>
			</svg>
		</button>
	</div>

	<div style="position: absolute; width: 100%;">
		<ul class={`dropdown-menu ${showDropdown}`} style="position: static; margin: 0px; background-color: rgba(255,255,255,0.95);">
			{#await searchPromise}
				<li class="dropdown-item"><span>&#8230;</span></li>
			{:then items}
				{#each items as item}
					<li><a class="dropdown-item" href={item.url}>{item.productName}</a></li>
				{/each}
			{:catch error}
				<li class="dropdown-item alert-danger">{error.message}</li>
			{/await}
		</ul>
	</div>
</form>

<style lang="scss">
	@import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
</style>
