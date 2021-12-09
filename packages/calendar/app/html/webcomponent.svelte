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

	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();

	export let id: string;
	export let month: number;
	export let year: number;

	let rows: number;
	let targetDate: Date;

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

		rows = Math.ceil((dayjs(targetDate).daysInMonth() + dayjs(targetDate).day()) / 7); //+ (dayjs(targetDate).day() === 1 ? 0 : 1);
	}
	function dispatch(name, detail) {
		// console.log(`svelte: ${name}`);
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}
	function changeMonth(c) {
		targetDate = dayjs(targetDate).add(c, "month").toDate();
	}
</script>

<div>
	<span>
		{dayjs(targetDate).format("MMMM YYYY")}
	</span>
	<span style="float:right">
		<button class="btn btn-primary" on:click={() => changeMonth(-1)}>˂</button>
		<button class="btn btn-primary" on:click={() => changeMonth(1)}>˃</button>
	</span>
</div>
<table>
	<tr>
		<th>Monday</th>
		<th>Tuesday</th>
		<th>Wednesday</th>
		<th>Thursday</th>
		<th>Friday</th>
		<th>Saturday</th>
		<th>Sunday</th>
	</tr>

	{#each Array(rows) as _, i}
		<tr>
			{#if i === 0}
				{#each Array(7) as __, d}
					{#if d + 2 > dayjs(targetDate).day()}
						<td>{d - dayjs(targetDate).day() + 2}</td>
					{:else}
						<td />
					{/if}
				{/each}
			{:else if i === rows - 1}
				{#each Array(7) as __, d}
					{#if d - dayjs(targetDate).day() + 2 + i * 7 <= dayjs(targetDate).daysInMonth()}
						<td>{d - dayjs(targetDate).day() + 2 + i * 7}</td>
					{:else}
						<td />
					{/if}
				{/each}
			{:else}
				{#each Array(7) as __, d}
					<td>{d - dayjs(targetDate).day() + 2 + i * 7}</td>
				{/each}
			{/if}
		</tr>
	{/each}
</table>

<style lang="scss">
	@import "../styles/webcomponent.scss";
	table {
		width: 100%;
		height: 100%;
	}
</style>
