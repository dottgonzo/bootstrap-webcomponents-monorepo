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
		if (!month) {
			month = Number(dayjs().format("M"));
		}
		if (!year) {
			year = Number(dayjs().format("YYYY"));
		}

		targetDate = dayjs(`${year.toString()} ${month.toString()}`, "YYYY M").toDate();

		rows = Math.ceil(dayjs(targetDate).daysInMonth() / 7) + (dayjs(targetDate).day() === 1 ? 0 : 1);
	}
	function dispatch(name, detail) {
		// console.log(`svelte: ${name}`);
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}
</script>

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
				<td>Emil</td>
				<td>Tobias</td>
				<td>Linus</td>
			{:else if i === rows}{:else}{/if}
		</tr>
	{/each}
</table>

<style lang="scss">
	@import "../styles/webcomponent.scss";
</style>
