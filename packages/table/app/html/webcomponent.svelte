<svelte:options tag="hb-table" />

<script lang="ts">
	/**
	 * Svelte Table WebComponent
	 * =====================
	 *
	 * @contributors: Dario Caruso <dev@dariocaruso.info> (https://dariocaruso.info)
	 *
	 * @license: MIT License
	 *
	 */

	import dayjs from "dayjs";
	import "dayjs/locale/it";

	import { createEventDispatcher } from "svelte";
	import { get_current_component } from "svelte/internal";
	import type { IActionButton, IFilter, IRow, ITableHeader } from "@app/types/webcomponent.type";
	import type { Component as ModalComponent } from "../../../dialog/app/types/webcomponent.type";

	import pkg from "@app/../package.json";
	import { addComponent, getChildStyleToPass } from "@htmlbricks/hb-jsutils/main";
	import parseStyle from "style-to-object";
	let parsedStyle: { [x: string]: string };
	export let style: string;

	import { styleSetup as paginateStyleSetup } from "../../node_modules/@htmlbricks/hb-paginate/release/docs";
	import { styleSetup as dialogStyleSetup } from "../../node_modules/@htmlbricks/hb-dialog/release/docs";
	import { styleSetup as dialogformStyleSetup } from "../../node_modules/@htmlbricks/hb-dialogform/release/docs";
	let paginateStyleToSet: string = "";
	let dialogStyleToSet: string = "";
	let dialogformStyleToSet: string = "";

	// import dispatch from "@app/functions/webcomponent";

	export let id: string;
	export let externalfilter: boolean;

	export let rows: IRow[];
	export let size: number;
	export let page: number;
	export let pages: number;
	export let headers: ITableHeader[];
	export let actions: IActionButton[];
	export let selectactions: any[];
	export let selectrow: string;
	export let enableselect: string;
	export let disablepagination: boolean;

	if (!id) {
		id = null;
	}

	let searchOnRangeIsPresent = false;

	let filters: IFilter[] = [];
	let originalRows: IRow[];
	let selectedItems: string[] = [];
	let sortedBy: string;
	let sortedDirection: string;
	let modalConfirm: ModalComponent & { itemId: string; action: string };
	let modalConfirmForm: ModalComponent & { itemId: string; action: string; schema?: any };
	$: {
		if (style) {
			parsedStyle = parseStyle(style);
			paginateStyleToSet = getChildStyleToPass(parsedStyle, paginateStyleSetup?.vars);
			dialogStyleToSet = getChildStyleToPass(parsedStyle, dialogStyleSetup?.vars);
			dialogformStyleToSet = getChildStyleToPass(parsedStyle, dialogformStyleSetup?.vars);
		}
		if (!modalConfirm) {
			modalConfirm = {
				show: "no",
				itemId: null,
				action: null,
				confirmlabel: null,
				title: null,
				content: null,
				closelabel: null,
			};
		}
		if (!modalConfirmForm) {
			modalConfirmForm = {
				show: "no",
				itemId: null,
				action: null,
				confirmlabel: null,
				title: null,
				content: null,
				closelabel: null,
			};
		}
		console.log(disablepagination, "disablepag");
		if (typeof disablepagination !== "boolean") {
			if (
				(disablepagination as unknown as any) === "" ||
				(disablepagination as unknown as string) === "yes" ||
				(disablepagination as unknown as string) === "true"
			) {
				disablepagination = true;
			} else {
				disablepagination = false;
			}
		}
		console.log(disablepagination, "disablepag2");

		if (!externalfilter && (externalfilter as unknown as any) !== "") {
			externalfilter = false;
		} else if (
			(externalfilter as unknown as any) === "" ||
			(externalfilter as unknown as string) === "yes" ||
			(externalfilter as unknown as string) === "true"
		) {
			externalfilter = true;
		} else if ((externalfilter as unknown as any) === "no") {
			externalfilter = false;
		}
		if (!pages) {
			pages = 1;
		} else {
			pages = Number(pages);
		}
		if (!selectactions) {
			selectactions = [];
		} else if (typeof selectactions === "string") {
			selectactions = JSON.parse(selectactions);
		}

		if (!selectrow) {
			selectrow = null;
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

		try {
			if (!headers) throw new Error("no headers");
			if (!rows) throw new Error("no rows");

			if (headers) {
				if (typeof headers === "string") headers = JSON.parse(headers);
				if (headers.find((f) => f.type === "datetime")) searchOnRangeIsPresent = true;
				headers.forEach((m) => {
					if (!m.sortBy) m.sortBy = "none";
					if (!m.type) m.type = "string";
				});
			}

			if (actions) {
				if (typeof actions === "string") actions = JSON.parse(actions);
			} else {
				actions = null;
			}
			if (typeof rows === "string") originalRows = JSON.parse(rows);
			rows = Object.assign([], originalRows);
			if (filters?.length && !externalfilter) {
				console.log("filters", filters, rows);
				for (const filter of filters) {
					if (filter.type === "datetime") {
						if (filter.start) {
							rows = rows.filter((f) => dayjs(getObjVal(f, filter)).valueOf() >= dayjs(filter.start).valueOf());
						}
						if (filter.end) {
							rows = rows.filter((f) => dayjs(getObjVal(f, filter)).valueOf() <= dayjs(filter.end).valueOf());
						}
					} else {
						rows = rows.filter((f) => getObjVal(f, filter).toString().includes(filter.value));
					}
				}
			}

			if (sortedBy && !externalfilter) {
				console.log("resort");
				if (sortedDirection === "asc")
					rows = rows.sort((a, b) => {
						if (
							(a[sortedBy] || a[sortedBy] === 0) &&
							(b[sortedBy] || b[sortedBy] === 0) &&
							typeof a[sortedBy] === "number" &&
							typeof b[sortedBy] === "number"
						) {
							return b[sortedBy] - a[sortedBy];
						}
						if (a === b) return 0;
						if (!a[sortedBy]) return 1;
						if (!b[sortedBy]) return -1;

						if ((a[sortedBy] as string).toUpperCase() < (b[sortedBy] as string).toUpperCase()) return 1;
						if ((a[sortedBy] as string).toUpperCase() > (b[sortedBy] as string).toUpperCase()) return -1;

						return 0;
					});
				if (sortedDirection === "desc")
					rows = rows.sort((a, b) => {
						if ((a[sortedBy] || a[sortedBy] === 0) && (b[sortedBy] || b[sortedBy] === 0) && typeof b[sortedBy] === "number") {
							return a[sortedBy] - b[sortedBy];
						}
						if (a === b) return 0;
						if (!a[sortedBy]) return -1;
						if (!b[sortedBy]) return 1;

						if ((a[sortedBy] as string).toUpperCase() < (b[sortedBy] as string).toUpperCase()) return -1;
						if ((a[sortedBy] as string).toUpperCase() > (b[sortedBy] as string).toUpperCase()) return 1;

						return 0;
					});
			}

			if (rows.length && (!externalfilter || !pages)) {
				pages = Math.floor(rows.length / size) + (rows.length % size ? 1 : 0);
			}

			// const videos = component.getElementsByTagName("video");
			// for (let video of videos) {
			// 	video.load();
			// }
		} catch (err) {}
		// sortByKeyToggle = (key: string) => {
		// 	console.log(key);
		// 	const h = headers.find((f) => f.key === key);
		// 	console.log(h);

		// 	if (!h.sortBy || h.sortBy === "none") {
		// 		h.sortBy = "asc";
		// 	} else if (h.sortBy === "asc") {
		// 		h.sortBy = "desc";
		// 	} else if (h.sortBy === "desc") {
		// 		h.sortBy = null;
		// 	}
		// 	// rows = rows.sort((a, b) => {
		// 	// 	return b[key] - a[key];
		// 	// });
		// };
		// console.log("end computed");
		// console.log(size, page, pages, rows.length, initialDate, lastDate);

		// will only get called when the `color` changed.
		console.log(sortedBy, sortedDirection);
	}

	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();

	function dispatch(name, detail) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}

	function changePage(el) {
		// console.log("changepage");

		if (!externalfilter) page = el.detail.page;
		selectedItems.length = 0;

		dispatch("pageChange", {
			page: el.detail.page,
		});
	}

	// async function getHelloWorld() {
	// 	const { app } = await webcomponent({ text: "hello-world" });

	// 	return app();
	// }

	function getObjVal(obj: IRow, opts: { key: string; type?: string; format?: string; truncateAt?: number }, trim?: boolean): string | number {
		if (!opts) {
			return "";
		}
		let value;
		if (!opts.key.includes(".")) {
			value = obj[opts.key];
		} else {
			let val: any = obj;

			for (const k of opts.key.split(".")) {
				if (!val[k]) {
					value = undefined;
					break;
				}
				val = val[k];
				value = val;
			}
		}

		if (!value && value !== 0) {
			return "";
		} else if (!opts.type || opts.type === "string" || opts.type === "enum") {
			if (trim && opts.truncateAt && value.length > opts.truncateAt) {
				return value.substring(0, opts.truncateAt) + "...";
			} else {
				return value;
			}
		} else if (opts.type === "number") {
			return Number(value);
		} else if (opts.type === "datetime") {
			return opts.format ? dayjs(value).format(opts.format) : dayjs(value).format();
		} else {
			return "";
		}
	}

	function removeFilter(key: string) {
		dispatch("removeFilter", {
			key,
		});
		if (filters.find((f) => f.key === key)) {
			filters = filters.filter((f) => f.key !== key);
		}

		selectedItems.length = 0;
	}
	function setFilter(filter: IFilter) {
		dispatch("changeFilter", {
			filter,
		});
		const filterExist = filters.find((f) => f.key === filter.key);

		if (filterExist) {
			filterExist.key = filter.key;
			filterExist.type = filter.type;
			filterExist.value = filter.value;
			filterExist.start = filter.start;
			filterExist.end = filter.end;

			filters = filters;
		} else {
			filters.push({
				key: filter.key,
				type: filter.type,
				value: filter.value,
				start: filter.start,
				end: filter.end,
			});
			filters = filters;
		}

		selectedItems.length = 0;
	}

	function searchInput(element, h: ITableHeader) {
		const value = element.value;
		if (h.type !== "actions" && value && value.length) {
			setFilter({
				key: h.key,
				type: h.type,
				value,
			});
		} else {
			removeFilter(h.key);
		}
	}
	function changeStartDate(target, th) {
		const newDate = target.value;
		const filterExists = filters.find((f) => f.key === th.key);
		setFilter({
			key: th.key,
			type: th.type,
			start: dayjs(newDate, "YYYY-MM-DD").toDate(),
			end: filterExists && filterExists.end ? filterExists.end : undefined,
		});
	}
	function changeEndDate(target, th) {
		const newDate = target.value;
		const filterExists = filters.find((f) => f.key === th.key);
		setFilter({
			key: th.key,
			type: th.type,
			end: dayjs(newDate, "YYYY-MM-DD").toDate(),
			start: filterExists && filterExists.start ? filterExists.start : undefined,
		});
	}

	function handleClickOnCustomAction(item: IRow, action: IActionButton) {
		console.log("action", action, item);

		dispatch("tableCustomActionClick", {
			itemId: item._id,
			action: action.name,
		});
		console.log("tttttttt", action, modalConfirm);
		if (action.confirm) {
			modalConfirm = {
				show: "yes",
				itemId: item._id,
				action: action.name,
				confirmlabel: action.confirm.confirmLabel,
				title: action.confirm.title,
				content: action.confirm.content,
			};
			// show modal
		} else if (action.edit) {
			modalConfirmForm = {
				show: "yes",
				itemId: item._id,
				action: action.name,
				confirmlabel: action.edit.confirmLabel,
				title: action.edit.title,
				schema: action.edit.schema,
			};
		}
	}
	function handleClickOnAction(itemId: string, action: string) {
		console.log("action", itemId, action);
		dispatch("tableaction", {
			itemId,
			action,
		});
	}
	function handleClickOnRow(itemId: string, colId: string) {
		console.log("cellclick", itemId, colId);
		dispatch("cellclick", {
			rowId: itemId,
			colId: colId,
		});
	}

	function handleSelectedItem(itemId: string, target) {
		console.log(itemId, target.checked, selectedItems);
		if (!target || !itemId) return console.error(`wrong params`);
		if (target.checked && !selectedItems.find((f) => f === itemId)) selectedItems.push(itemId);
		if (!target.checked && selectedItems.find((f) => f === itemId))
			selectedItems.splice(
				selectedItems.findIndex((f) => f === itemId),
				1,
			);
		console.log(itemId, target.checked, selectedItems);
		selectedItems = selectedItems;
	}

	function handleEnableSelector() {
		if (enableselect) {
			enableselect = null;
			selectedItems.length = 0;
		} else {
			enableselect = "yes";
		}
	}

	function handleClickOnMultipleSelectAction(buttonName: string) {
		console.log("action", buttonName, buttonName);
		dispatch("actiononselected", {
			key: buttonName,
			selectedItems,
		});
	}
	function selectAllElements() {
		selectedItems = rows.map((m) => m._id);
	}
	function deSelectAllElements() {
		selectedItems.length = 0;
	}
	function clickonrow(itemId: string) {
		dispatch("clickonrow", {
			itemId,
		});
	}

	addComponent({ repoName: "@htmlbricks/hb-paginate", version: pkg.version });
	addComponent({ repoName: "@htmlbricks/hb-dialog", version: pkg.version });
	addComponent({ repoName: "@htmlbricks/hb-dialogform", version: pkg.version });

	function changeSort(key: string) {
		console.log(sortedBy, sortedDirection);
		if (!sortedBy || key !== sortedBy) {
			sortedDirection = "asc";
			sortedBy = key;
		} else if (key === sortedBy && sortedDirection === "asc") {
			sortedDirection = "desc";
		} else if (key === sortedBy && sortedDirection === "desc") {
			sortedDirection = null;
			sortedBy = null;
		}
		dispatch("changeSort", {
			sortedBy,
			sortedDirection,
		});
		console.log(sortedBy, sortedDirection);
	}
	function dialogShowConfirm(detail, action: string, itemId: string) {
		dispatch("showConfirmModal", Object.assign({ action, itemId }, detail));

		if (!detail.show)
			modalConfirm = {
				show: "no",
				itemId: null,
				action: null,
				confirmlabel: null,
				title: null,
				content: null,
				closelabel: null,
			};
	}
	function dialogShowConfirmForm(detail, action: string, itemId: string) {
		dispatch("showConfirmModalForm", Object.assign({ action, itemId }, detail));

		if (!detail.show)
			modalConfirmForm = {
				show: "no",
				itemId: null,
				action: null,
				confirmlabel: null,
				title: null,
				content: null,
				closelabel: null,
			};
	}
	function modalConfirmation(detail, action: string, itemId: string) {
		dispatch("confirmActionModal", Object.assign({ action, itemId }, detail));
	}
	function modalFormConfirmation(detail, action: string, itemId: string) {
		console.log(action, "action");
		dispatch("confirmActionModalForm", Object.assign({}, detail, { _action: action, itemId }));
	}
	function copyToClipBoard(content: string) {
		navigator.clipboard.writeText(content);
		dispatch("clipboardCopyText", { text: content });
	}
</script>

<svelte:head>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@latest/font/bootstrap-icons.css" />
</svelte:head>
<hb-dialogform
	style={dialogformStyleToSet}
	id={modalConfirmForm.itemId || "confirmationModalForm"}
	show={modalConfirmForm.show}
	title={modalConfirmForm.title}
	confirmlabel={modalConfirmForm.confirmlabel || "Conferma"}
	content={modalConfirmForm.content}
	closelabel={modalConfirmForm.closelabel || "Close"}
	schema={modalConfirmForm.schema ? JSON.stringify(modalConfirmForm.schema) : "[]"}
	on:modalFormConfirm={(e) => modalFormConfirmation(e.detail, modalConfirmForm.action, modalConfirmForm.itemId || "confirmationModalForm")}
	on:modalShow={(d) => dialogShowConfirmForm(d.detail, modalConfirmForm.action, modalConfirmForm.itemId || "confirmationModalForm")}
/>
<hb-dialog
	style={dialogStyleToSet}
	id={modalConfirm.itemId || "confirmationModal"}
	show={modalConfirm.show}
	title={modalConfirm.title}
	confirmlabel={modalConfirm.confirmlabel || "Conferma"}
	content={modalConfirm.content}
	closelabel={modalConfirm.closelabel || "Close"}
	on:modalConfirm={(e) => modalConfirmation(e.detail, modalConfirm.action, modalConfirm.itemId || "confirmationModalForm")}
	on:modalShow={(d) => dialogShowConfirm(d.detail, modalConfirm.action, modalConfirm.itemId || "confirmationModalForm")}
/>
<div id="webcomponent">
	<div class="container-fluid" style="padding:0px; margin-left: 0px; margin-right: 0px;">
		{#if headers && Array.isArray(headers)}
			<table class="table table-responsive table-striped table-hover align-middle" style="width:100%;text-align:left">
				<thead>
					<tr>
						{#if enableselect && selectactions?.length}
							{#if !searchOnRangeIsPresent}
								{#if selectedItems.length !== rows.length}
									<button on:click={selectAllElements} class="btn btn-link">seleziona tutti</button>
								{:else}
									<button on:click={deSelectAllElements} class="btn btn-link">rimuovi tutti</button>
								{/if}
							{:else}
								<th scope="col" />
							{/if}
						{/if}
						{#each headers as th (th.key)}
							<th scope="col">
								{th.label}
								{#if !th.nosort && th.type !== "actions"}
									<button style="border:none; background-color:inherit" on:click={() => changeSort(th.key)}>
										{#if !sortedBy || th.key !== sortedBy}
											&#x21C5;
										{:else if sortedDirection === "asc"}
											&#x21A7;
										{:else if sortedDirection === "desc"}
											&#x21A5;
										{/if}
									</button>
								{/if}
							</th>
						{/each}
						{#if actions}
							<th scope="col"> azioni </th>
						{/if}
					</tr>
					{#if !searchOnRangeIsPresent}
						<tr>
							{#if enableselect && selectactions?.length}
								<th scope="col">
									{selectedItems.length}/{rows.length}
								</th>
							{/if}
							{#if headers.find((f) => f.search)}
								{#each headers as th (th.key)}
									<th scope="col">
										{#if th.search}
											<input
												on:input={(element) => searchInput(element.target, th)}
												type="text"
												style="width:auto"
												class="form-control"
												placeholder="..."
												aria-label="Search"
												aria-describedby="search"
											/>
										{/if}
										{#if !th.search}
											&nbsp;
										{/if}
									</th>
								{/each}
							{/if}
						</tr>
					{:else}
						<tr>
							{#if enableselect && selectactions?.length}
								<th scope="col">
									{#if selectedItems.length !== rows.length}
										<button on:click={selectAllElements} class="btn btn-link">seleziona tutti</button>
									{:else}
										<button on:click={deSelectAllElements} class="btn btn-link">rimuovi tutti</button>
									{/if}
								</th>
							{/if}
							{#each headers as th (th.key)}
								<th scope="col">
									{#if th.search}
										{#if th.type && th.type === "datetime"}
											<span style="width:50px;display:inline-block">Inizio</span>
											<input
												on:input={(element) => changeStartDate(element.target, th)}
												type="date"
												class="form-control"
												style="max-width: 200px;display:inline-block"
											/>
										{:else if !th.type || th.type === "string"}
											<input
												on:input={(element) => searchInput(element.target, th)}
												type="text"
												style="width:auto"
												class="form-control"
												placeholder="..."
												aria-label="Search"
												aria-describedby="search"
											/>
										{:else if th.type && th.type === "enum"}
											<select class="form-select" on:input={(element) => searchInput(element.target, th)}>
												<option value="">tutti</option>

												{#each th.select as se (se)}
													<option value={se}>{se}</option>
												{/each}
											</select>
										{/if}
									{:else}
										&nbsp;
									{/if}
								</th>
							{/each}
						</tr>
						<tr>
							{#if enableselect && selectactions?.length}
								<th scope="col">
									{selectedItems.length}/{rows.length}
								</th>
							{/if}
							{#each headers as th (th.key)}
								<th scope="col">
									{#if th.search && th.type && th.type === "datetime"}
										<span style="width:50px;display:inline-block">Fine</span>
										<input
											on:input={(element) => changeEndDate(element.target, th)}
											type="date"
											class="form-control"
											style="max-width: 200px;display:inline-block"
										/>
									{/if}
								</th>
							{/each}
						</tr>
					{/if}
				</thead>
				<tbody>
					{#if rows?.length}
						{#each !externalfilter ? rows.slice(page * size, (page + 1) * size) : rows as item (item._id)}
							<tr>
								{#if enableselect && selectactions?.length}
									<td style="box-shadow: none;">
										<div class="form-check">
											{#if selectedItems.find((f) => f === item._id)}
												<input
													on:change={(i) => {
														handleSelectedItem(item._id, i.target);
													}}
													id="flexCheckDefault"
													class="form-check-input"
													type="checkbox"
													checked
												/>
											{:else}
												<input
													on:change={(i) => {
														handleSelectedItem(item._id, i.target);
													}}
													id="flexCheckDefault"
													class="form-check-input"
													type="checkbox"
												/>
											{/if}
										</div>
									</td>
								{/if}
								{#if headers.length}
									{#each headers as td (td.key)}
										{#if td.type === "actions"}
											{#if item._actions?.length}
												<td>
													{#each item._actions as abutton (abutton.name)}
														{#if abutton.disabled}
															{#if abutton.type === "text"}
																<button
																	on:click={() => handleClickOnCustomAction(item, abutton)}
																	type="button"
																	class="btn btn-{abutton.btnClass || 'link'}"
																	style="margin-right:10px"
																	disabled>{abutton.iconOrText}</button
																>
															{:else if abutton.type === "icon"}
																<button
																	on:click={() => handleClickOnCustomAction(item, abutton)}
																	type="button"
																	class="btn btn-{abutton.btnClass || 'light'}"
																	style="margin-right:10px"
																	disabled
																	><i class="bi-{abutton.iconOrText}" />
																</button>
															{/if}
														{:else if abutton.type === "text"}
															<button
																on:click={() => handleClickOnCustomAction(item, abutton)}
																type="button"
																class="btn btn-{abutton.btnClass || 'link'}"
																style="margin-right:10px">{abutton.iconOrText}</button
															>
														{:else if abutton.type === "icon"}
															<button
																on:click={() => handleClickOnCustomAction(item, abutton)}
																type="button"
																class="btn btn-{abutton.btnClass || 'light'}"
																style="margin-right:10px"
																><i class="bi-{abutton.iconOrText}" />
															</button>
														{/if}
													{/each}
												</td>
											{:else}
												<td />
											{/if}
										{:else}
											<td
												on:click={() => {
													if (selectrow) clickonrow(item._id);
												}}
											>
												{#if td.click}
													<button on:click={() => handleClickOnRow(item._id, td.key)} type="button" class="btn btn-link"
														>{getObjVal(item, td, true)}</button
													>
												{:else}
													{getObjVal(item, td, true)}
												{/if}
												{#if (td.type === "string" || !td.type) && getObjVal(item, td).toString().length && td.copyTxt}
													<button on:click={() => copyToClipBoard(getObjVal(item, td).toString())} type="button" class="btn btn-link"
														><i class="bi-clipboard" /></button
													>
												{/if}
											</td>
										{/if}
									{/each}
								{/if}
								{#if actions}
									<td>
										{#each actions as abutton (abutton.name)}
											{#if abutton.type === "text"}
												<button
													on:click={() => handleClickOnAction(item._id, abutton.name)}
													type="button"
													class="btn btn-{abutton.btnClass || 'link'}"
													style="margin-right:10px">{abutton.iconOrText}</button
												>
											{:else if abutton.type === "icon"}
												<button
													on:click={() => handleClickOnAction(item._id, abutton.name)}
													type="button"
													class="btn btn-{abutton.btnClass || 'light'}"
													style="margin-right:10px"
													><i class="bi-{abutton.iconOrText}" />
												</button>
											{/if}
										{/each}
									</td>
								{/if}
							</tr>
						{/each}
					{/if}
				</tbody>
			</table>
			<nav style="margin-top:20px" aria-label="actions on selected">
				{#if selectactions?.length}
					<button on:click={handleEnableSelector} class="btn btn-primary btn-sm"> <i class="bi-gear" /> </button>
					{#each selectactions as sbutton (sbutton.name)}
						<span style="margin-left:20px">
							<button
								on:click={() => {
									handleClickOnMultipleSelectAction(sbutton.name);
								}}
								class="btn btn-primary btn-sm"
							>
								{sbutton.name}
							</button>
						</span>
					{/each}
				{/if}
				{#if disablepagination !== true}
					<hb-paginate
						style="float:right;{paginateStyleToSet}"
						on:pageChange={changePage}
						page={page?.toString() || 1}
						pages={pages?.toString() || 1}
					/>
				{/if}
			</nav>
		{/if}
	</div>
</div>

<style lang="scss">
	@import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
</style>
