<script lang="ts">
	export let label;
	export let value: string;
	export let choices;
	export let error = '';
</script>

<label class="form-control w-full max-w-xs">
	<div class="label">
		<span class="label-text">{label}</span>
	</div>
	<select bind:value class="select select-bordered select-primary select-sm">
		{#each choices as item}
			<option value={item}>{item}</option>
		{/each}
	</select>
	{#if error.length > 0}
		<p class="text-error-content bg-error border-y-2 font-semibold rounded-btn text-xs p-1">
			{error}
		</p>
	{/if}
</label>
