<script lang="ts">
	export let label;
	export let value: string | number;
	export let error = '';
	export let type;
	export let required = false;
</script>

<label class="form-control">
	<div class="label">
		<span class="label-text">{label}</span>
	</div>
	{#if type === 'email'}
		<input type="email" bind:value placeholder={label} class="input input-bordered input-primary input-sm" {required} />
	{/if}
	{#if type === 'text'}
		<input type="text" bind:value placeholder={label} class="input input-bordered input-primary input-sm" {required} />
	{/if}
	{#if type === 'password'}
		<input type="password" bind:value placeholder={label} class="input input-bordered input-primary input-sm" {required} />
	{/if}
	{#if type === 'number'}
		<input type="number" bind:value placeholder={label} class="input input-bordered input-primary input-sm" {required} />
	{/if}
	{#if error.length > 0}
		<p class="text-error-content bg-error border-y-2 font-semibold rounded-btn text-xs p-1">
			{error}
		</p>
	{/if}
</label>
