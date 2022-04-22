<svelte:options tag="hb-notification-item" />

<script lang="ts">
	export let avatar: string;
	export let url: string;
	export let text: string;
	export let ext: string;

	const isUrl = (string) => {
		try {
			return Boolean(new URL(string));
		} catch (e) {
			return false;
		}
	};
	let hasAvatarUrl = isUrl(avatar);
</script>

<div class="dropdown-item py-3 d-flex">
	{#if avatar}
		<div>
			{#if hasAvatarUrl}
				<img alt="||" src={avatar} class="avatar rounded-circle" />
			{:else}
				<div class="avatar bg-success text-white rounded-circle">{avatar}</div>
			{/if}
		</div>
	{/if}

	<div class="flex-fill ms-3">
		<div class="text-sm lg-snug w-64 text-wrap">
			{#if url}
				<a href={url}><slot>{text}</slot></a>
			{:else}
				<slot>{text}</slot>
			{/if}
		</div>
		{#if $$slots.ext || ext}
			<span class="text-muted text-xs"><slot name="ext">{ext}</slot></span>
		{/if}
	</div>
</div>

<style lang="scss">
	@import "../styles/bootstrap.scss";
	@import "../styles/item.scss";
</style>
