<svelte:options tag="hb-gallery-video" />

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

	import dayjs from "dayjs";
	import { createEventDispatcher } from "svelte";
	import pkg from "../../package.json";
	import { addComponent, getChildStyleToPass } from "@htmlbricks/hb-jsutils/main";
	import parseStyle from "style-to-object";
	let parsedStyle: { [x: string]: string };
	export let style: string;

	// import dispatch from "@app/functions/webcomponent";

	// interface IRestApi {
	// 	uri: string;
	// 	pagination?: boolean;
	// 	capabilities: string;
	// 	convert: { page: string, items:string }
	// }
	export let cards: string;
	export let size: number;
	export let page: number;
	export let pages: number;
	export let linkLabel: string;
	export let dateformat: string;
	export let primarycolor: string;
	export let filter: string;
	export let id: string;
	// export let restapi: string;
	export let externalfilter: string;
	export let disabletextfilter: string;

	export let initialdate: Date;
	export let lastdate: Date;

	import { styleSetup as paginateStyleSetup } from "../../node_modules/@htmlbricks/hb-paginate/release/docs";
	import { styleSetup as cardVideoStyleSetup } from "../../node_modules/@htmlbricks/hb-card-video/release/docs";
	let paginateStyleToSet: string = "";
	let cardVideoStyleToSet: string = "";

	let firstCardData: Date;
	let lastCardData: Date;
	let enableDate = true;
	let cardItems: ICard[];

	$: {
		if (style) {
			parsedStyle = parseStyle(style);
			paginateStyleToSet = getChildStyleToPass(parsedStyle, paginateStyleSetup?.vars);
			cardVideoStyleToSet = getChildStyleToPass(parsedStyle, cardVideoStyleSetup?.vars);
		}
		console.log(disabletextfilter, "disabletextfilter");
		if (!linkLabel) {
			linkLabel = "";
		}
		if (disabletextfilter && disabletextfilter !== "yes") {
			disabletextfilter = null;
		}
		if (!primarycolor) {
			primarycolor = null;
		}
		if (!dateformat) {
			dateformat = "dddd DD MMMM YYYY HH:mm";
		}
		if (!id) {
			id = null;
		}
		if (!pages) {
			pages = 1;
		} else {
			pages = Number(pages);
		}
		if (!externalfilter) {
			externalfilter = null;
		}
		if (!size) {
			size = 12;
		} else {
			size = parseInt(size as unknown as string);
		}
		if (!page) {
			page = 0;
		} else {
			page = parseInt(page as unknown as string);
		}
		if (!filter) {
			filter = null;
		}
		if (!cardItems) {
			cardItems = [];
		}
		try {
			// if (!restapi) {
			// 	restapi = null;
			cardItems = JSON.parse(cards);
			let cc = 0;
			for (const c of cardItems) {
				c._id = `${cc.toString() + c.title}`;
				if (!c.time) {
					enableDate = false;
					console.warn("UNABLE TO ACTIVATE SEARCH FILTER!");
					break;
				}
				c.time = dayjs(c.time).toDate();
				if (!initialdate || initialdate.valueOf() > c.time.valueOf()) {
					initialdate = c.time;
				}
				if (!lastdate || lastdate.valueOf() < c.time.valueOf()) {
					lastdate = c.time;
				}
				cc++;
			}

			if (enableDate && !externalfilter) {
				cardItems = cardItems.sort((b, a) => {
					return a.time.valueOf() - b.time.valueOf();
				});
				if (!firstCardData) {
					firstCardData = initialdate;
				}
				if (!lastCardData) {
					lastCardData = lastdate;
				}
				cardItems = cardItems.filter((f) => f.time.valueOf() >= firstCardData.valueOf() && f.time.valueOf() <= lastCardData.valueOf());
			}
			if (filter && !externalfilter) {
				console.info(filter);

				cardItems = cardItems.filter((c) => {
					if (c.title?.toLowerCase().includes(filter.toLowerCase()) || c.description?.toLowerCase().includes(filter.toLowerCase())) {
						return true;
					}
					return false;
				});
			} else if (externalfilter) {
				console.info(filter);
				dispatch("textFilterVideos", { filter: filter || null });
			}
			if (cardItems.length && (!externalfilter || !pages)) {
				console.log("calcpage", cardItems.length, !externalfilter || !pages, pages);

				pages = Math.floor(cardItems.length / size) + (cardItems.length % size ? 1 : 0);
			}
			// }

			// const videos = component.getElementsByTagName("video");
			// for (let video of videos) {
			// 	video.load();
			// }
		} catch (err) {}

		// console.log("end computed");
		// console.log(size, page, pages, cardItems.length, initialdate, lastdate);

		// will only get called when the `color` changed.
	}
	import { get_current_component, onMount } from "svelte/internal";
	import type { ICard } from "@app/types/webcomponent.type";

	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();

	function dispatch(name, detail) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}

	function changePage(el) {
		// console.log("changepage");

		if (!externalfilter) page = el.detail.page;
		dispatch("pagechange", {
			page: el.detail.page,
			cards: getCurrentCards(),
		});
	}

	function getCurrentCards() {
		return !externalfilter ? cardItems.slice(page * size, (page + 1) * size) : cardItems;
	}

	function changeStartDate(node) {
		const newDate = node.target.value;

		dispatch("dateFilterVideos", {
			start: dayjs(newDate, "YYYY-MM-DD").startOf("day").toDate(),
			dateKey: "start",
		});

		// console.log(newDate);
		if (!externalfilter) firstCardData = dayjs(newDate, "YYYY-MM-DD").startOf("day").toDate();
		filter = null;
	}
	function changeEndDate(node) {
		const newDate = node.target.value;
		dispatch("dateFilterVideos", {
			end: dayjs(newDate, "YYYY-MM-DD").startOf("day").toDate(),
			dateKey: "end",
		});
		// console.log(newDate);
		if (!externalfilter) lastCardData = dayjs(newDate, "YYYY-MM-DD").endOf("day").toDate();
		filter = null;
	}
	// async function getHelloWorld() {
	// 	const { app } = await webcomponent({ text: "hello-world" });

	// 	return app();
	// }

	addComponent("paginate", pkg.version);
	addComponent("card-video", pkg.version);

	// onMount(async () => {
	// 	await reloadCards();
	// });

	// async function fetchData(uri: string) {
	// 	const fetched = await fetch(uri);
	// 	const data = fetched.json();
	// 	return data;
	// }

	// async function reloadCards() {
	// 	if (restapi) {
	// 		const restObj: IRestApi = JSON.parse(restapi);
	// 		console.info("fetch cards", restObj.uri);
	// 		if (restObj.pagination) {
	// 		}

	// 		const data = await fetchData(restObj.uri);
	// 		cardItems = data;

	// 		console.log(data);
	// 	}

	// 	console.info("reload cards");
	// }
</script>

<div class="container-fluid" part="container">
	{#if cardItems && (cardItems.length || cardItems.length === 0)}
		<div class="d-none d-md-block">
			<div class="row">
				{#if !disabletextfilter}
					<div class="col-4 col-xxl-2">
						<div class="input-group mb-3">
							<span class="input-group-text" id="search">&#x1F50E;</span>
							<input type="text" bind:value={filter} class="form-control" placeholder="..." aria-label="Search" aria-describedby="search" />
						</div>
					</div>
				{/if}

				<div class="col-8 col-xxl-10">
					{#if enableDate}
						<div class="input-group mb-3">
							<span class="input-group-text">&#128197;</span>

							<input
								on:input={changeStartDate}
								type="date"
								class="form-control"
								style="max-width: 200px"
								value={dayjs(initialdate).format("YYYY-MM-DD")}
							/>
							<input
								on:input={changeEndDate}
								type="date"
								class="form-control"
								style="max-width: 200px"
								value={dayjs(lastdate).format("YYYY-MM-DD")}
							/>
						</div>
					{/if}
				</div>
			</div>
		</div>
		<div class="d-block d-md-none">
			<div class="row">
				{#if !disabletextfilter}
					<div class="col-12">
						<div class="input-group mb-3">
							<span class="input-group-text" id="search">&#x1F50E;</span>
							<input type="text" bind:value={filter} class="form-control" placeholder="..." aria-label="Search" aria-describedby="search" />
						</div>
					</div>
				{/if}
			</div>
			{#if enableDate}
				<div class="row">
					<div class="col-12">
						<div class="input-group mb-3">
							<span class="input-group-text">&#128197;</span>

							<input on:input={changeStartDate} type="date" class="form-control" />
							<input on:input={changeEndDate} type="date" class="form-control" />
						</div>
					</div>
				</div>
			{/if}
		</div>
		{#if cardItems && cardItems.length}
			<div class="row">
				{#each !externalfilter ? cardItems.slice(page * size, (page + 1) * size) : cardItems as item (item._id)}
					<div class="col-12 col-xxl-3 col-xl-4 col-md-6" style="padding:12px">
						<hb-card-video
							style={cardVideoStyleToSet}
							title={item.title || ""}
							description={item.description || ""}
							time={item.time ? dayjs(item.time).format() : undefined}
							dateformat={dateformat || ""}
							pageuri={item.pageUri || ""}
							videosrc={item.videoSrc || ""}
							provider={item.provider || ""}
						/>
					</div>
				{/each}
			</div>
			<nav style="margin-top:20px" aria-label="Page navigation example">
				<hb-paginate
					style={paginateStyleToSet}
					on:pagechange={changePage}
					page={page.toString()}
					pages={pages.toString()}
					primarycolor={primarycolor || ""}
				/>
			</nav>
		{/if}
	{/if}
</div>

<style lang="scss">
	@import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
</style>
