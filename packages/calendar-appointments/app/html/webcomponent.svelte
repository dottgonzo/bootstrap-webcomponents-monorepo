<svelte:options tag="hb-calendar-appointments" />

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
	export let disable_header: boolean;

	let rows: number;
	let previousMonthOfTargetDate: Date;
	let nextMonthOfTargetDate: Date;
	let monthsEvent: IEvent[];
	let previousMonthEvents: IEvent[];
	let nextMonthEvents: IEvent[];
	let month: number;
	let year: number;

	let eventsOfThisMonthByDay: { day: number; events: IEvent[] }[];

	const holidays = new Holidays("IT");

	$: {
		if (!id) {
			id = "";
		}
		if (
			typeof disable_header === "string" &&
			((disable_header as string).toLowerCase() === "true" || (disable_header as string).toLowerCase() === "yes" || (disable_header as string) === "")
		) {
			disable_header = true;
		} else {
			disable_header = false;
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
			events = events.sort((a, b) => new Date(a.date).valueOf() - new Date(b.date).valueOf());
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
			eventsOfThisMonthByDay = [];
			for (const e of monthsEvent) {
				const dayOfEvent = Number(dayjs(e.date).format("D"));
				if (!eventsOfThisMonthByDay.find((f) => f.day === dayOfEvent)) {
					eventsOfThisMonthByDay.push({ day: dayOfEvent, events: [e] });
				} else {
					eventsOfThisMonthByDay.find((f) => f.day === dayOfEvent).events.push(e);
				}
			}
		}
		rows = Math.ceil((dayjs(date).daysInMonth() + dayjs(date).day()) / 7); //+ (dayjs(date).day() === 1 ? 0 : 1);
		if (typeof selected === "string") {
			selected = dayjs(selected).toDate();
		}
	}
	const detectedLang = navigator?.languages ? navigator.languages[0]?.split("-")[0]?.toLowerCase() : "en";
	const dayDateFormat = new Intl.DateTimeFormat(detectedLang, { weekday: "short" });
	const monthDateFormat = new Intl.DateTimeFormat(detectedLang, { month: "long" });
	const longDayDateFormat = new Intl.DateTimeFormat(detectedLang, { weekday: "long" });

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

<svelte:head>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@latest/font/bootstrap-icons.css" />
</svelte:head>
{#if !disable_header}
	<div id="calendar-header" part="calendar-header">
		<slot name="header">
			<span part="calendar-current-time-header" style="text-transform:capitalize;font-weight:bold;font-size:1.5rem">
				<slot name="calendar_month"
					>{monthDateFormat.format(dayjs(date).toDate())}
					{dayjs(date).format("YYYY")}</slot
				>
			</span>
			<span style="float:right">
				<span on:click={() => changeMonth(-1)}><slot name="header_month_icon_prev"><button>˂</button></slot></span>
				<span on:click={() => changeMonth(1)}><slot name="header_month_icon_next"><button>˃</button></slot></span>
			</span>
		</slot>
	</div>
{/if}

<div id="appointments_container">
	{#if eventsOfThisMonthByDay.length}
		{#each eventsOfThisMonthByDay as e (e.day)}
			<div class="events_day">
				<span class="events_day_fullname">{longDayDateFormat.format(dayjs(e.events[0].date).toDate())}</span>
				<span>{e.day}</span>
			</div>
			{#each e.events as event (event.id)}
				<div class="event_row" on:click={() => calendarEventClick({ eventId: event.id })}>
					<i style={event.color ? "color:" + event.color + ";" : ""} class="event_icon bi bi-dot" />
					<span class="event_row_time">
						{dayjs(event.date).format("HH:mm")}
					</span>
					<span class="event_label">{event.label}</span>
				</div>
			{/each}
		{/each}
	{/if}
</div>

<style lang="scss">
	// @import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
</style>
