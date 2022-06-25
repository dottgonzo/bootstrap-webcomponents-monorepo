<svelte:options tag="hb-calendar-events" />

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
	import Holidays from "date-holidays";
	import { createEventDispatcher } from "svelte";
	import { get_current_component } from "svelte/internal";

	import type { IEvent } from "@app/types/webcomponent.type";

	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();

	export let id: string;
	export let date: Date;
	export let events: IEvent[];
	export let selected: Date;

	let rows: number;
	let previousMonthOfTargetDate: Date;
	let nextMonthOfTargetDate: Date;
	let monthsEvent: IEvent[];
	let previousMonthEvents: IEvent[];
	let nextMonthEvents: IEvent[];
	let month: number;
	let year: number;

	const holidays = new Holidays("IT");

	$: {
		if (!id) {
			id = "";
		}

		// if (!options) {
		// 	options = {
		// 		selectable: selected ? true : false,
		// 		today: false,
		// 	};
		// } else if (typeof options === "string") {
		// 	options = JSON.parse(options);
		// }
		if (!date) date = dayjs().startOf("month").toDate();
		else if (typeof date === "string") dayjs(date).startOf("month").toDate();
		previousMonthOfTargetDate = dayjs(date).subtract(1, "month").toDate();
		nextMonthOfTargetDate = dayjs(date).add(1, "month").toDate();

		month = Number(dayjs(date).format("M"));
		year = Number(dayjs(date).format("YYYY"));

		if (events) {
			if (typeof events === "string") events = JSON.parse(events);
			monthsEvent = events.filter((f) => Number(dayjs(f.date).format("M")) === month && Number(dayjs(f.date).format("YYYY")) === year);
			previousMonthEvents = events.filter(
				(f) =>
					Number(dayjs(f.date).format("M")) === Number(dayjs(previousMonthOfTargetDate).format("M")) &&
					Number(dayjs(f.date).format("YYYY")) === Number(dayjs(previousMonthOfTargetDate).format("YYYY")),
			);
			nextMonthEvents = events.filter(
				(f) =>
					Number(dayjs(f.date).format("M")) === Number(dayjs(nextMonthOfTargetDate).format("M")) &&
					Number(dayjs(f.date).format("YYYY")) === Number(dayjs(nextMonthOfTargetDate).format("YYYY")),
			);
		}

		rows = Math.ceil((dayjs(date).daysInMonth() + dayjs(date).day()) / 7); //+ (dayjs(date).day() === 1 ? 0 : 1);
		if (typeof selected === "string") {
			selected = dayjs(selected).toDate();
		}
	}
	const detectedLang = navigator?.languages ? navigator.languages[0]?.split("-")[0]?.toLowerCase() : "en";
	const dayDateFormat = new Intl.DateTimeFormat(detectedLang, { weekday: "short" });
	const monthDateFormat = new Intl.DateTimeFormat(detectedLang, { month: "long" });

	function dispatch(name, detail) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}
	function changeMonth(c) {
		date = dayjs(date).add(c, "month").toDate();
		dispatch("changeCalendarDate", { date });
	}
	function calendarEventClick(detail: { eventId: string }) {
		dispatch("calendarEventClick", detail);
	}
	function selectDay(d: Date) {
		console.log(d);
		selected = d;
		dispatch("changeSelectedDate", { selectedDate: selected });
	}
</script>

<div id="calendar-header" part="calendar-header">
	<span part="calendar-current-time-header" style="text-transform:capitalize;font-weight:bold">
		{monthDateFormat.format(dayjs(date))}
		{dayjs(date).format("YYYY")}
	</span>
	<span style="float:right">
		<button class="btn btn-primary" on:click={() => changeMonth(-1)}>˂</button>
		<button class="btn btn-primary" on:click={() => changeMonth(1)}>˃</button>
	</span>
</div>
<table>
	<tr>
		<th>{dayDateFormat.format(dayjs().startOf("week").add(1, "days").toDate())}</th>
		<th>{dayDateFormat.format(dayjs().startOf("week").add(2, "days").toDate())}</th>
		<th>{dayDateFormat.format(dayjs().startOf("week").add(3, "days").toDate())}</th>
		<th>{dayDateFormat.format(dayjs().startOf("week").add(4, "days").toDate())}</th>
		<th>{dayDateFormat.format(dayjs().startOf("week").add(5, "days").toDate())}</th>
		<th>{dayDateFormat.format(dayjs().startOf("week").add(6, "days").toDate())}</th>
		<th>{dayDateFormat.format(dayjs().startOf("week").toDate())}</th>
	</tr>

	{#each Array(rows) as _, i}
		<tr>
			{#if i === 0}
				{#each Array(7) as __, d}
					{#if d + 2 > dayjs(date).day()}
						<td
							part="cell"
							class="cell {selected &&
							Number(dayjs(selected).format('DD')) === d - dayjs(date).day() + 2 + i * 7 &&
							Number(dayjs(selected).format('M')) === month &&
							Number(dayjs(selected).format('YYYY')) === year
								? 'cell-selected'
								: ''}"
							id="cal-{d - dayjs(date).day() + 2 + i * 7}-{month}-{year}"
							style="height:{100 / rows}%;"
							on:click={() => selectDay(dayjs(year + "-" + month + "-" + (d - dayjs(date).day() + 2 + i * 7).toString()))}
						>
							<div
								class="cell-date {Number(dayjs().format('DD')) === d - dayjs(date).day() + 2 + i * 7 &&
								Number(dayjs().format('M')) === month &&
								Number(dayjs().format('YYYY')) === year
									? 'cell-today'
									: ''}"
							>
								{d - dayjs(date).day() + 2 + i * 7}
							</div>

							{#if monthsEvent?.length}
								{#each monthsEvent.filter((f) => Number(dayjs(f.date).format("DD")) === d - dayjs(date).day() + 2 + i * 7) as event (event.id)}
									<button class="cell-event btn btn-sm btn-secondary" on:click={() => calendarEventClick({ eventId: event.id })}
										>{event.label}</button
									>
								{/each}
							{/if}
						</td>
					{:else}
						<td
							part="cell"
							class="cell {selected &&
							Number(dayjs(selected).format('DD')) === dayjs(previousMonthOfTargetDate).daysInMonth() + d - dayjs(date).day() + 2 + i * 7 &&
							Number(dayjs(selected).format('M')) === Number(dayjs(previousMonthOfTargetDate).format('M')) &&
							Number(dayjs(selected).format('YYYY')) === Number(dayjs(previousMonthOfTargetDate).format('YYYY'))
								? 'cell-selected'
								: ''}"
							id="cal-{d - dayjs(date).day() + 2 + i * 7}-{month}-{year}"
							style="height:{100 / rows}%;"
							on:click={() =>
								selectDay(
									dayjs(
										dayjs(previousMonthOfTargetDate).format("YYYY") +
											"-" +
											dayjs(previousMonthOfTargetDate).format("MM") +
											"-" +
											(dayjs(previousMonthOfTargetDate).daysInMonth() + d - dayjs(date).day() + 2 + i * 7).toString(),
									),
								)}
						>
							<div
								class="cell-date {Number(dayjs().format('DD')) ===
									dayjs(previousMonthOfTargetDate).daysInMonth() + d - dayjs(date).day() + 2 + i * 7 &&
								Number(dayjs().format('M')) === Number(dayjs(previousMonthOfTargetDate).format('M')) &&
								Number(dayjs().format('YYYY')) === Number(dayjs(previousMonthOfTargetDate).format('YYYY'))
									? 'cell-today'
									: ''}"
								style="color:grey"
							>
								{dayjs(previousMonthOfTargetDate).daysInMonth() + d - dayjs(date).day() + 2 + i * 7}
							</div>
							{#if previousMonthEvents?.length}
								{#each previousMonthEvents.filter((f) => Number(dayjs(f.date).format("DD")) === dayjs(previousMonthOfTargetDate).daysInMonth() + d - dayjs(date).day() + 2 + i * 7) as event (event.id)}
									<button class="cell-event btn btn-sm btn-secondary" on:click={() => calendarEventClick({ eventId: event.id })}
										>{event.label}</button
									>
								{/each}
							{/if}
						</td>
					{/if}
				{/each}
			{:else if i === rows - 1}
				{#each Array(7) as __, d}
					{#if d - dayjs(date).day() + 2 + i * 7 <= dayjs(date).daysInMonth()}
						<td
							part="cell"
							class="cell {selected &&
							Number(dayjs(selected).format('DD')) === d - dayjs(date).day() + 2 + i * 7 &&
							Number(dayjs(selected).format('M')) === month &&
							Number(dayjs(selected).format('YYYY')) === year
								? 'cell-selected'
								: ''}"
							id="cal-{d - dayjs(date).day() + 2 + i * 7}-{month}-{year}"
							style="height:{100 / rows}%;"
							on:click={() => selectDay(dayjs(year + "-" + month + "-" + (d - dayjs(date).day() + 2 + i * 7).toString()))}
						>
							<div
								class="cell-date {Number(dayjs().format('DD')) === d - dayjs(date).day() + 2 + i * 7 &&
								Number(dayjs().format('M')) === month &&
								Number(dayjs().format('YYYY')) === year
									? 'cell-today'
									: ''}"
							>
								{d - dayjs(date).day() + 2 + i * 7}
							</div>
							{#if monthsEvent?.length}
								{#each monthsEvent.filter((f) => Number(dayjs(f.date).format("DD")) === d - dayjs(date).day() + 2 + i * 7) as event (event.id)}
									<button class="cell-event btn btn-sm btn-secondary" on:click={() => calendarEventClick({ eventId: event.id })}
										>{event.label}</button
									>
								{/each}
							{/if}
						</td>
					{:else}
						<td
							part="cell"
							class="cell {selected &&
							Number(dayjs(selected).format('DD')) === d - dayjs(date).day() + 2 + i * 7 - dayjs(date).daysInMonth() &&
							Number(dayjs(selected).format('M')) === Number(dayjs(nextMonthOfTargetDate).format('M')) &&
							Number(dayjs(selected).format('YYYY')) === Number(dayjs(nextMonthOfTargetDate).format('YYYY'))
								? 'cell-selected'
								: ''}"
							id="cal-{d - dayjs(date).day() + 2 + i * 7}-{month}-{year}"
							style="height:{100 / rows}%;"
							on:click={() =>
								selectDay(
									dayjs(
										dayjs(nextMonthOfTargetDate).format("YYYY") +
											"-" +
											dayjs(nextMonthOfTargetDate).format("MM") +
											"-" +
											(d - dayjs(date).day() + 2 + i * 7 - dayjs(date).daysInMonth()).toString(),
									),
								)}
						>
							<div
								class="cell-date {Number(dayjs().format('DD')) === d - dayjs(date).day() + 2 + i * 7 - dayjs(date).daysInMonth() &&
								Number(dayjs().format('M')) === Number(dayjs(nextMonthOfTargetDate).format('M')) &&
								Number(dayjs().format('YYYY')) === Number(dayjs(nextMonthOfTargetDate).format('YYYY'))
									? 'cell-today'
									: ''}"
								style="color:grey"
							>
								{d - dayjs(date).day() + 2 + i * 7 - dayjs(date).daysInMonth()}
							</div>
							{#if nextMonthEvents?.length}
								{#each nextMonthEvents.filter((f) => Number(dayjs(f.date).format("DD")) === d - dayjs(date).day() + 2 + i * 7 - dayjs(date).daysInMonth()) as event (event.id)}
									<button class="cell-event btn btn-sm btn-secondary" on:click={() => calendarEventClick({ eventId: event.id })}
										>{event.label}</button
									>
								{/each}
							{/if}
						</td>
					{/if}
				{/each}
			{:else}
				{#each Array(7) as __, d}
					<td
						part="cell"
						class="cell {selected &&
						Number(dayjs(selected).format('DD')) === d - dayjs(date).day() + 2 + i * 7 &&
						Number(dayjs(selected).format('M')) === month &&
						Number(dayjs(selected).format('YYYY')) === year
							? 'cell-selected'
							: ''}"
						id="cal-{d - dayjs(date).day() + 2 + i * 7}-{month}-{year}"
						style="height:{100 / rows}%;"
						on:click={() => selectDay(dayjs(year + "-" + month + "-" + (d - dayjs(date).day() + 2 + i * 7).toString()))}
					>
						<div
							class="cell-date {Number(dayjs().format('DD')) === d - dayjs(date).day() + 2 + i * 7 &&
							Number(dayjs().format('M')) === month &&
							Number(dayjs().format('YYYY')) === year
								? 'cell-today'
								: ''}"
						>
							{d - dayjs(date).day() + 2 + i * 7}
						</div>
						{#if monthsEvent?.length}
							{#each monthsEvent.filter((f) => Number(dayjs(f.date).format("DD")) === d - dayjs(date).day() + 2 + i * 7) as event (event.id)}
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
	@import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";

	table {
		caption-side: bottom;
		border-collapse: collapse;
	}
	.cell-selected {
		background-color: var(--bs-primary);
	}

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

	td:hover {
		background-color: var(--bs-secondary);
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
	#calendar-header {
		line-height: 50px;
		margin: 10px;
		vertical-align: middle;
	}
	.cell-today {
		color: var(--bs-success);
		font-weight: bold;
	}
</style>
