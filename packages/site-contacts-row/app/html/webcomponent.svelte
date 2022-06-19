<svelte:options tag="hb-site-contacts-row" />

<script lang="ts">
	import { get_current_component, onDestroy, onMount } from "svelte/internal";

	import { createEventDispatcher } from "svelte";
	import parseStyle from "style-to-object";
	import { addComponent, getChildStyleToPass } from "@htmlbricks/hb-jsutils/main";
	import type { Component } from "@app/types/webcomponent.type";

	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();

	function dispatch(name, detail) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}

	export let id: string;
	export let style: string;

	export let addresses: Component["addresses"];
	export let phones: Component["phones"];
	export let emails: Component["emails"];
	export let websites: Component["websites"];
	export let model: Component["model"];
	export let availability: Component["availability"];

	let parsedStyle: { [x: string]: string };
	//  let componentStyleToSet: string = "";

	$: {
		if (!id) id = "";
		if (style) {
			parsedStyle = parseStyle(style);
			// componentStyleToSet = getChildStyleToPass(parsedStyle, componentStyleSetup?.vars);
		}
		if (!model) model = "small";
		if (typeof addresses === "string") {
			try {
				addresses = JSON.parse(addresses);
			} catch (err) {
				console.error("error parsing addresses", err);
			}
		}
		if (typeof phones === "string") {
			try {
				phones = JSON.parse(phones);
			} catch (err) {
				console.error("error parsing phones", err);
			}
		}
		if (typeof emails === "string") {
			try {
				emails = JSON.parse(emails);
			} catch (err) {
				console.error("error parsing emails", err);
			}
		}
		if (typeof websites === "string") {
			try {
				websites = JSON.parse(websites);
			} catch (err) {
				console.error("error parsing websites", err);
			}
		}
		if (typeof availability === "string") {
			try {
				availability = JSON.parse(availability);
			} catch (err) {
				console.error("error parsing availability", err);
			}
		}
	}
</script>

<svelte:head>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@latest/font/bootstrap-icons.css" />
</svelte:head>
<div id="row_container" part="container">
	{#if model === "small"}
		{#if addresses?.addresses?.filter?.((f) => f.address)?.length}
			<div class="col col_inline">
				<div class="inline_icon"><i class="bi bi-{addresses.icon || 'geo-alt'}" /></div>
				<div class="inline_content">
					<div class="title">{addresses.title || "addresses"}</div>
					<ul class="list">
						{#each addresses.addresses.filter((f) => f.address) as address (address.address)}
							<li>
								{#if address.link}
									<a href={address.link} target="_blank">{address.address}</a>
								{:else if address.latLng?.length}
									<a
										alt="google map for {address.address}"
										href="https://www.google.com/maps/@{address.latLng[0]},{address.latLng[1]},15z"
										target="_blank"
									>
										{address.address}
									</a>
								{:else}
									{address.address}
								{/if}
							</li>
						{/each}
					</ul>
				</div>
			</div>
		{/if}
		{#if phones?.phones?.filter?.((f) => f.number)?.length}
			<div class="col col_inline">
				<div class="inline_icon"><i class="bi bi-{phones.icon || 'telephone'}" /></div>
				<div class="inline_content">
					<div class="title">{phones.title || "phone"}</div>
					<ul class="list">
						{#each phones.phones.filter((f) => f.number) as phone (phone.number)}
							<li>{phone.number}</li>
						{/each}
					</ul>
				</div>
			</div>
		{/if}
		{#if emails?.emails?.filter?.((f) => f.address)?.length}
			<div class="col col_inline">
				<div class="inline_icon"><i class="bi bi-{emails.icon || 'envelope'}" /></div>
				<div class="inline_content">
					<div class="title">{emails.title || "email"}</div>
					<ul class="list">
						{#each emails.emails.filter((f) => f.address) as email (email.address)}
							{#if email.label}
								<li><a href="mailto:{email.address}">{email.label}</a></li>
							{:else}
								<li><a href="mailto:{email.address}">{email.address}</a></li>
							{/if}
						{/each}
					</ul>
				</div>
			</div>
		{/if}
		{#if websites?.websites?.filter?.((f) => f.url)?.length}
			<div class="col col_inline">
				<div class="inline_icon"><i class="bi bi-{websites.icon || 'globe'}" /></div>
				<div class="inline_content">
					<div class="title">{websites.title || "websites"}</div>
					<ul class="list">
						{#each websites.websites.filter((f) => f.url) as website (website.url)}
							{#if website.label}
								<li><a href={website.url}>{website.label}</a></li>
							{:else}
								<li><a href={website.url}>{website.url}</a></li>
							{/if}
						{/each}
					</ul>
				</div>
			</div>
		{/if}
		{#if availability?.times?.length}
			<div class="col col_inline">
				<div class="inline_icon"><i class="bi bi-{availability.icon || 'clock'}" /></div>
				<div class="inline_content">
					<div class="title">{availability.title || "availability"}</div>
					<ul class="list">
						{#each availability.times as time (time)}
							<li>{time}</li>
						{/each}
					</ul>
					{#if availability.appointment}
						<div class="appointment">*riceve per appuntamento</div>
					{/if}
				</div>
			</div>
		{/if}
	{:else if model === "big"}
		{#if addresses?.addresses?.filter?.((f) => f.address)?.length}
			<div class="col col_big">
				<div><i class="bi bi-{addresses.icon || 'geo-alt'}" /></div>
				<div class="title">{addresses.title || "addresses"}</div>
				<ul class="list">
					{#each addresses.addresses.filter((f) => f.address) as address (address.address)}
						<li>
							{#if address.name}
								<span>{address.name}: </span>
							{/if}
							{#if address.link}
								<a href={address.link} target="_blank">{address.address}</a>
							{:else if address.latLng?.length}
								<a
									alt="google map for {address.address}"
									href="https://www.google.com/maps/@{address.latLng[0]},{address.latLng[1]},15z"
									target="_blank"
								>
									{address.address}
								</a>
							{:else}
								{address.address}
							{/if}
						</li>
					{/each}
				</ul>
			</div>
		{/if}
		{#if phones?.phones?.filter?.((f) => f.number)?.length}
			<div class="col col_big">
				<div><i class="bi bi-{phones.icon || 'telephone'}" /></div>
				<div class="title">{phones.title || "phone"}</div>
				<ul class="list">
					{#each phones.phones.filter((f) => f.number) as phone (phone.number)}
						<li>
							{#if phone.name}
								<span>{phone.name}: </span>
							{/if}
							{phone.number}
						</li>
					{/each}
				</ul>
			</div>
		{/if}
		{#if emails?.emails?.filter?.((f) => f.address)?.length}
			<div class="col col_big">
				<div><i class="bi bi-{emails.icon || 'envelope'}" /></div>
				<div class="title">{emails.title || "email"}</div>
				<ul class="list">
					{#each emails.emails.filter((f) => f.address) as email (email.address)}
						<li>
							{#if email.name}
								<span>{email.name}: </span>
							{/if}
							<a href="mailto:{email.address}">
								{#if email.label}
									{email.label}
								{:else}
									{email.address}
								{/if}
							</a>
						</li>
					{/each}
				</ul>
			</div>
		{/if}
		{#if websites?.websites?.filter?.((f) => f.url)?.length}
			<div class="col col_big">
				<div><i class="bi bi-{websites.icon || 'globe'}" /></div>
				<div class="title">{websites.title || "websites"}</div>
				<ul class="list">
					{#each websites.websites.filter((f) => f.url) as website (website.url)}
						<li>
							{#if website.name}
								<span>{website.name}: </span>
							{/if}
							<a href={website.url}>
								{#if website.label}
									{website.label}
								{:else}
									{website.url}
								{/if}
							</a>
						</li>
					{/each}
				</ul>
			</div>
		{/if}
		{#if availability?.times?.length}
			<div class="col col_big">
				<div><i class="bi bi-{availability.icon || 'clock'}" /></div>
				<div class="title">{availability.title || "availability"}</div>
				<ul class="list">
					{#each availability.times as time (time)}
						<li>{time}</li>
					{/each}
				</ul>
				{#if availability.appointment}
					<div class="appointment">riceve per appuntamento</div>
				{/if}
			</div>
		{/if}
	{:else}
		wrong model provided {model}
	{/if}
</div>

<style lang="scss">
	@import "../styles/webcomponent.scss";
	// @import "../styles/bootstrap.scss";
</style>
