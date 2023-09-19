<svelte:options tag="hb-footer" />

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

	import { get_current_component } from "svelte/internal";
	import { createEventDispatcher } from "svelte";
	import pkg from "../../package.json";
	import type { IBrandAndContacts, IColumn, ICompany, IContacts, IPolicies, ISocials } from "@app/types/webcomponent.type";
	import { addComponent, getChildStyleToPass } from "wc-js-utils/main";
	import parseStyle from "style-to-object";
	let parsedStyle: { [x: string]: string };
	export let style: string;
	import { styleSetup as contactItemStyleSetup } from "@htmlbricks/hb-contact-item/release/docs";
	let contactItemStyleToSet: string = "";

	export let id: string;
	export let type: "small" | "regular" | "large";
	export let company: ICompany;
	export let brandandcontacts: IBrandAndContacts;
	export let columns: IColumn[];
	export let disable_expanding_small: boolean;

	export let socials: ISocials;
	export let contacts: IContacts;
	export let policies: IPolicies[];
	$: {
		if (!id) id = "";
		if (type !== "small" && type !== "regular" && type !== "large") type = "regular";
		if (style) {
			parsedStyle = parseStyle(style);
			contactItemStyleToSet = getChildStyleToPass(parsedStyle, contactItemStyleSetup?.vars);
		}
		if (!disable_expanding_small) {
			disable_expanding_small = false;
		} else if (typeof disable_expanding_small === "string") {
			if (disable_expanding_small === "yes" || disable_expanding_small === "true") disable_expanding_small = true;
			else disable_expanding_small = false;
		}

		if (!company) {
			company = null;
			console.warn("no company provided!");
		} else if (typeof company === "string") {
			company = JSON.parse(company);
		}

		if (!columns) {
			columns = [];
		} else if (typeof columns === "string") {
			columns = JSON.parse(columns);
		}

		let n = 0;
		for (const c of columns) {
			if (!c._id) c._id = "ccc_" + n.toString();
			n++;
		}

		if (!brandandcontacts) {
			brandandcontacts = null;
		} else {
			try {
				brandandcontacts = JSON.parse(brandandcontacts as unknown as string);
			} catch (err) {}
		}
		if (!socials) {
			socials = null;
		} else if (typeof socials === "string") {
			socials = JSON.parse(socials as unknown as string);
		}
		if (!contacts) {
			contacts = null;
		} else {
			try {
				contacts = JSON.parse(contacts as unknown as string);
				let n = 0;
				if (contacts.phones?.length) {
					for (const phone of contacts.phones) {
						n++;
						if (!phone._id) phone._id = n.toString();
					}
				}
				if (contacts.emails?.length) {
					for (const email of contacts.emails) {
						n++;
						if (!email._id) email._id = n.toString();
					}
				}
				if (contacts.addresses?.length) {
					for (const address of contacts.addresses) {
						n++;
						if (!address._id) address._id = n.toString();
					}
				}
				if (contacts.sites?.length) {
					for (const site of contacts.sites) {
						n++;
						if (!site._id) site._id = n.toString();
					}
				}
			} catch (err) {}
		}
		if (!policies) {
			policies = null;
		} else {
			try {
				policies = JSON.parse(policies as unknown as string);
			} catch (err) {}
		}
	}

	const component = get_current_component();
	const svelteDispatch = createEventDispatcher();

	function dispatch(name: string, detail: any) {
		svelteDispatch(name, detail);
		component.dispatchEvent && component.dispatchEvent(new CustomEvent(name, { detail }));
	}

	function footerClick(elClick: string) {
		dispatch("footerClick", {
			elClick,
		});
	}

	addComponent({ repoName: "@htmlbricks/hb-contact-item", version: pkg.version });
	let expand_small_footer = false;
	// function expand_small(){

	// }
</script>

<svelte:head>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@latest/font/bootstrap-icons.css" />
</svelte:head>
<footer>
	{#if type === "small" && !expand_small_footer}
		<!-- SMALL LAYOUT -->
		<div class="container-fluid">
			<div class="container" style="position:relative">
				{#if !disable_expanding_small}
					<div
						class="expand_from_small_footer"
						on:click={() => {
							expand_small_footer = true;
						}}
					>
						<i class="bi bi-arrow-up-square-fill" />
					</div>
				{/if}
				<div id="footer_small_content">
					<slot name="footer_small">
						{#if company?.siteName}
							<div style="max-height:40px;height:40px;margin:10px auto 5px auto">
								{#if company.logoUri}
									<span><img style="height: 100%;" alt="" src={company.logoUri} /></span>
								{/if}

								{new Date().getFullYear().toString() + " " + (company?.companyName ? " - " + (company?.companyName || "") : "")}
							</div>
						{/if}
					</slot>
				</div>
			</div>
		</div>
	{:else if type === "regular" || (type === "small" && expand_small_footer)}
		<!-- REGULAR LAYOUT -->
		{#if expand_small_footer}
			<div class="container-fluid">
				<div class="container" style="position:relative">
					<div
						style="margin-top:10px;"
						class="expand_from_small_footer"
						on:click={() => {
							expand_small_footer = false;
						}}
					>
						<i class="bi bi-arrow-down-square-fill" />
					</div>
				</div>
			</div>
		{/if}
		<div class="container">
			<slot name="footerheader" class="row">
				<!-- <div class="row">
			<div class="col" style="max-height:40px">
				{#if companylogouri}
					<span><img style="height: 100%;" alt="" src={companylogouri} /></span>
				{/if}

				{company.siteName}
			</div>
		</div> -->
			</slot>
			<slot name="footercontent">
				<div class="row">
					<div style="padding:20px 20px" class="col-md-{12 / (1 + (contacts ? 1 : 0) + (socials ? 1 : 0) + (columns?.length ? columns.length : 0))}">
						<div class="row">
							<div class="col">
								{#if company?.logoUri}
									<span><img style="height: 40px" alt="" src={company.logoUri} /></span>
								{/if}
								{company?.siteName || ""}
							</div>
						</div>
						<div id="description" style="margin:20px auto 10px auto">
							{company?.description || ""}
						</div>
						<div id="company" style="margin:20px auto 10px auto">
							{company?.companyName || ""}
						</div>
						<div id="fiscal" style="margin:20px auto 10px auto">
							{company?.vatNumber || company?.fiscalCode || ""}
						</div>
					</div>
					{#if contacts}
						<div
							style="padding:20px 20px"
							class="col-md-{12 / (1 + (contacts ? 1 : 0) + (socials ? 1 : 0) + (columns?.length ? columns.length : 0))}"
						>
							<h5 style="margin-bottom:20px">Contatti</h5>
							<ul class="list-unstyled">
								{#if contacts.phones?.length}
									{#each contacts.phones as phone (phone._id)}
										<li><hb-contact-item style={contactItemStyleToSet} phone={JSON.stringify(phone)} /></li>
									{/each}
								{/if}
								{#if contacts.addresses?.length}
									{#each contacts.addresses as address (address._id)}
										<li><hb-contact-item style={contactItemStyleToSet} address={JSON.stringify(address)} /></li>
									{/each}
								{/if}
								{#if contacts.emails?.length}
									{#each contacts.emails as email (email._id)}
										<li><hb-contact-item style={contactItemStyleToSet} email={JSON.stringify(email)} /></li>
									{/each}
								{/if}
								{#if contacts.sites?.length}
									{#each contacts.sites as site (site._id)}
										<li><hb-contact-item style={contactItemStyleToSet} site={JSON.stringify(site)} /></li>
									{/each}
								{/if}
							</ul>
						</div>
					{/if}
					{#if socials}
						<div
							style="padding:20px 20px"
							class="col-md-{12 / (1 + (contacts ? 1 : 0) + (socials ? 1 : 0) + (columns?.length ? columns.length : 0))}"
						>
							<h5 style="margin-bottom:20px">Social</h5>
							<ul class="list-unstyled">
								{#if socials.facebook}
									<li>
										<hb-contact-item
											style={contactItemStyleToSet}
											social={JSON.stringify({ name: "facebook", label: "pagina facebook", pageUri: "https://facebook.com" })}
										/>
									</li>
								{/if}

								{#if socials?.gmail}
									<li>
										<hb-contact-item
											style={contactItemStyleToSet}
											social={JSON.stringify({ name: "gmail", label: "pagina gmail", pageUri: "https://gmail.com" })}
										/>
									</li>
								{/if}
								{#if socials?.twitter}
									<li>
										<hb-contact-item
											style={contactItemStyleToSet}
											social={JSON.stringify({ name: "twitter", label: "pagina twitter", pageUri: "https://twitter.com" })}
										/>
									</li>
								{/if}
								{#if socials?.github}
									<li>
										<hb-contact-item
											style={contactItemStyleToSet}
											social={JSON.stringify({ name: "github", label: "pagina github", pageUri: socials.github })}
										/>
									</li>
								{/if}
								{#if socials?.twitch}
									<li>
										<hb-contact-item
											style={contactItemStyleToSet}
											social={JSON.stringify({ name: "twitch", label: "pagina twitch", pageUri: "https://twitch.com" })}
										/>
									</li>
								{/if}
								{#if socials?.youtube}
									<li>
										<hb-contact-item
											style={contactItemStyleToSet}
											social={JSON.stringify({ name: "youtube", label: "pagina youtube", pageUri: "https://youtube.com" })}
										/>
									</li>
								{/if}
								{#if socials?.discord}
									<li>
										<hb-contact-item
											style={contactItemStyleToSet}
											social={JSON.stringify({ name: "discord", label: "pagina discord", pageUri: "https://discord.com" })}
										/>
									</li>
								{/if}
							</ul>
						</div>
					{/if}
					{#if columns?.length}
						{#each columns as column (column._id)}
							<div
								style="padding:20px 20px"
								class="col-md-{12 / (1 + (contacts ? 1 : 0) + (socials ? 1 : 0) + (columns?.length ? columns.length : 0))}"
							>
								<h5 style="margin-bottom:20px">{column.title ? column.title : ""}</h5>
								<ul class="list-unstyled">
									{#each column.cells as cell (cell._id)}
										{#if cell.label}
											<li>
												<button
													part="column-cell-button-content"
													style="padding:0px"
													class="btn text-small"
													on:click={() => footerClick(cell._id)}>{cell.label}</button
												>
											</li>
										{:else if cell.phone}
											<li><hb-contact-item style={contactItemStyleToSet} phone={JSON.stringify(cell.phone)} /></li>
										{:else if cell.address}
											<li><hb-contact-item style={contactItemStyleToSet} address={JSON.stringify(cell.address)} /></li>
										{:else if cell.email}
											<li><hb-contact-item style={contactItemStyleToSet} email={JSON.stringify(cell.email)} /></li>
										{:else if cell.site}
											<li><hb-contact-item style={contactItemStyleToSet} site={JSON.stringify(cell.site)} /></li>
										{:else if cell.label}
											<li>
												<button
													part="column-cell-button-content"
													style="padding:0px"
													class="btn text-small"
													on:click={() => footerClick(cell._id)}>{cell.label}</button
												>
											</li>
										{/if}
									{/each}
								</ul>
							</div>
						{/each}
					{/if}
				</div>
			</slot>

			<div class="row">
				<slot name="footerpolicy">
					{#if policies?.length}
						{#each policies as policy (policy.key)}
							<div class="col" style="margin:20px auto 20px auto;max-height:20px;text-align:center;font-size:0.9rem;">
								{#if policy.link}
									<a href={policy.link} target="_blank" class="btn btn-link">{policy.label}</a>
								{:else}
									<button on:click={() => footerClick(policy.key)} class="btn btn-link">{policy.label}</button>
								{/if}
							</div>
						{/each}
					{/if}
				</slot>
			</div>
			<div class="row">
				<slot name="footerbottom">
					{#if company?.siteName}
						<div class="col" style="max-height:20px;text-align:center;font-size:0.8rem;margin:10px auto 5px auto">
							<!-- {#if company.logoUri}
						<span><img style="height: 100%;" alt="" src={company.logoUri} /></span>
					{/if} -->

							{company?.registration?.text ||
								(company.since ? `${company.since?.toString()} - ` : "") +
									new Date().getFullYear().toString() +
									" " +
									(company?.companyName ? " - " + (company?.companyName || "") : "")}
						</div>
					{/if}
				</slot>
			</div>
		</div>
	{:else if type === "large"}
		<!-- LARGE LAYOUT -->
		large
	{/if}
</footer>

<style lang="scss">
	@import "../styles/bootstrap.scss";
	@import "../styles/webcomponent.scss";
</style>
