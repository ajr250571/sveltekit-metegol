<script lang="ts">
	export let label;
	export let min = 0;
	export let max = 0;
	export let error = '';
</script>

<label class="form-control w-full max-w-xs">
	<div class="label">
		<span class="label-text">{label}</span>
	</div>
	<div class="flex justify-between gap-2">
		<div>
			<p>Minimo: {min.toLocaleString('es-AR')}</p>
			<input type="range" min="0" max="1000000" step="1000" bind:value={min} class="range range-primary range-sm" />
		</div>
		<div>
			<p>Maximo: {max.toLocaleString('es-AR')}</p>
			<input type="range" min="500000" max="1500000" step="1000" bind:value={max} class="range range-primary range-sm" />
		</div>
	</div>
	{#if error.length > 0}
		<p class="text-error-content bg-error border-y-2 font-semibold rounded-btn text-xs p-1">
			{error}
		</p>
	{/if}
</label>
