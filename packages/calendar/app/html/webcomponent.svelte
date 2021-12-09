<svelte:options tag="calendar-component" />

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
	import { get_current_component } from "svelte/internal";

	import type { IEvent } from "@app/types/webcomponent.type";

	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();

	export let id: string;
	export let month: number;
	export let year: number;
	export let events: IEvent[];

	let rows: number;
	let targetDate: Date;
	let monthsEvent: IEvent[];

	$: {
		if (!id) {
			id = "";
		}

		if (!month && !targetDate) {
			month = Number(dayjs().format("M"));
		} else if (targetDate) {
			month = Number(dayjs(targetDate).format("M"));
		}
		if (!year && !targetDate) {
			year = Number(dayjs().format("YYYY"));
		} else if (targetDate) {
			year = Number(dayjs(targetDate).format("YYYY"));
		}

		if (!targetDate) targetDate = dayjs(`${year.toString()} ${month.toString()} 01`, "YYYY M DD").toDate();
		if (events) {
			if (typeof events === "string") events = JSON.parse(events);
			monthsEvent = events.filter((f) => Number(dayjs(f.date).format("M")) === month && Number(dayjs(f.date).format("YYYY")) === year);
		}

		rows = Math.ceil((dayjs(targetDate).daysInMonth() + dayjs(targetDate).day()) / 7); //+ (dayjs(targetDate).day() === 1 ? 0 : 1);
	}
	const detectedLang = navigator?.languages ? navigator.languages[0]?.split("-")[0]?.toLowerCase() : "en";
	const dayDateFormat = new Intl.DateTimeFormat(detectedLang, { weekday: "short" });
	const monthDateFormat = new Intl.DateTimeFormat(detectedLang, { month: "long" });
	function dispatch(name, detail) {
		// console.log(`svelte: ${name}`);
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}
	function changeMonth(c) {
		targetDate = dayjs(targetDate).add(c, "month").toDate();
	}
	function calendarEventClick(detail: { eventId: string }) {
		dispatch("calendarEventClick", detail);
	}
</script>

<div style="line-height:50px;margin:10px;vertical-align:middle">
	<span style="text-transform:capitalize">
		{monthDateFormat.format(dayjs(targetDate))}
	</span>
	<span style="float:right">
		<button class="btn btn-primary" on:click={() => changeMonth(-1)}>˂</button>
		<button class="btn btn-primary" on:click={() => changeMonth(1)}>˃</button>
	</span>
</div>
<table>
	<tr>
		<th>{dayDateFormat.format(dayjs().startOf("week").toDate())}</th>
		<th>{dayDateFormat.format(dayjs().startOf("week").add(1, "days").toDate())}</th>
		<th>{dayDateFormat.format(dayjs().startOf("week").add(2, "days").toDate())}</th>
		<th>{dayDateFormat.format(dayjs().startOf("week").add(3, "days").toDate())}</th>
		<th>{dayDateFormat.format(dayjs().startOf("week").add(4, "days").toDate())}</th>
		<th>{dayDateFormat.format(dayjs().startOf("week").add(5, "days").toDate())}</th>
		<th>{dayDateFormat.format(dayjs().startOf("week").add(6, "days").toDate())}</th>
	</tr>

	{#each Array(rows) as _, i}
		<tr>
			{#if i === 0}
				{#each Array(7) as __, d}
					{#if d + 2 > dayjs(targetDate).day()}
						<td style="height:{100 / rows}%">
							<div class="cell-date">
								{d - dayjs(targetDate).day() + 2 + i * 7}
							</div>
							{#if monthsEvent?.length}
								{#each monthsEvent.filter((f) => Number(dayjs(f.date).format("DD")) === d - dayjs(targetDate).day() + 2 + i * 7) as event (event.id)}
									<button class="cell-event btn btn-sm btn-secondary" on:click={() => calendarEventClick({ eventId: event.id })}
										>{event.label}</button
									>
								{/each}
							{/if}
						</td>
					{:else}
						<td />
					{/if}
				{/each}
			{:else if i === rows - 1}
				{#each Array(7) as __, d}
					{#if d - dayjs(targetDate).day() + 2 + i * 7 <= dayjs(targetDate).daysInMonth()}
						<td style="height:{100 / rows}%">
							<div class="cell-date">
								{d - dayjs(targetDate).day() + 2 + i * 7}
							</div>
							{#if monthsEvent?.length}
								{#each monthsEvent.filter((f) => Number(dayjs(f.date).format("DD")) === d - dayjs(targetDate).day() + 2 + i * 7) as event (event.id)}
									<button class="cell-event btn btn-sm btn-secondary" on:click={() => calendarEventClick({ eventId: event.id })}
										>{event.label}</button
									>
								{/each}
							{/if}
						</td>
					{:else}
						<td />
					{/if}
				{/each}
			{:else}
				{#each Array(7) as __, d}
					<td style="height:{100 / rows}%">
						<div class="cell-date">
							{d - dayjs(targetDate).day() + 2 + i * 7}
						</div>
						{#if monthsEvent?.length}
							{#each monthsEvent.filter((f) => Number(dayjs(f.date).format("DD")) === d - dayjs(targetDate).day() + 2 + i * 7) as event (event.id)}
								<button class="cell-event btn btn-sm btn-secondary" on:click={() => calendarEventClick({ eventId: event.id })}
									>{event.label}</button
								>
							{/each}
						{/if}
					</td>
				{/each}
			{/if}
		</tr>
	{/each}
</table>

<style lang="scss">
	@import "../styles/webcomponent.scss";
	@import "../styles/bootstrap.scss";

	table {
		margin-top: 40px;
		width: 100%;
		height: 100%;
		min-height: 550px;
		table-layout: fixed;
	}
	td {
		border: 1px solid #c3c0c0;
		vertical-align: baseline;
	}
	th {
		width: auto;
		text-align: center;
		text-transform: capitalize;
	}
	.cell-event {
		display: block;
		width: 100%;
		text-align: center;
	}
</style>
